/**
 * Telegram → OpenCode Bridge
 *
 * Listens for Telegram messages and pipes them into opencode's CLI
 * using the custom blog-writer agent.
 *
 * Setup:
 *   1. Create a bot via https://t.me/BotFather and get the token
 *   2. Set TELEGRAM_BOT_TOKEN in .env
 *   3. bun add node-telegram-bot-api
 *   4. bun run scripts/telegram-bridge.mjs
 */

import TelegramBot from "node-telegram-bot-api";
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");

// ── Load .env manually (no dotenv dependency needed) ────────────────
const envPath = resolve(PROJECT_ROOT, ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const sep = trimmed.indexOf("=");
    if (sep === -1) continue;
    const key = trimmed.slice(0, sep).trim();
    const val = trimmed.slice(sep + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}
// ────────────────────────────────────────────────────────────────────

// ── Config ──────────────────────────────────────────────────────────
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_USER_IDS = (process.env.ALLOWED_USER_IDS || "")
  .split(",")
  .map(Number)
  .filter(Boolean);
// ───────────────────────────────────────────────────────────────────

if (!BOT_TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN not set in .env");
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
console.log("🤖 Telegram bot started, polling for messages...");

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  const text = msg.text?.trim();
  const isGroup = msg.chat.type === "group" || msg.chat.type === "supergroup";

  // ── Authorization ────────────────────────────────────────────
  if (ALLOWED_USER_IDS.length > 0 && userId && !ALLOWED_USER_IDS.includes(userId)) {
    return; // silently ignore unauthorized users
  }

  if (!text || text.startsWith("/")) return;

  // Skip group messages that don't mention the bot or reply to it
  if (isGroup) {
    const botUsername = (await bot.getMe()).username;
    const isMentioned = text.includes(`@${botUsername}`);
    const isReplyToBot = msg.reply_to_message?.from?.is_bot;
    if (!isMentioned && !isReplyToBot) return;
  }

  console.log(`📩 From ${userId}: "${text.slice(0, 80)}..."`);

  await bot.sendChatAction(chatId, "typing");

  try {
    // ── Build the prompt for opencode ───────────────────────────
    // Uses `opencode run` (non-interactive) with the blog-writer agent
    const prompt = `Write a blog post about this topic:\n\n${text}`;

    const result = execSync(
      `opencode run --agent blog-writer "${prompt.replace(/"/g, '\\"')}"`,
      {
        cwd: PROJECT_ROOT,
        encoding: "utf-8",
        timeout: 300_000, // 5 min — blog posts take time
        maxBuffer: 10 * 1024 * 1024,
      },
    );

    console.log(`✅ Blog post created for: "${text.slice(0, 60)}"`);
    await bot.sendMessage(
      chatId,
      `✅ Published! Your blog post on "${text.slice(0, 100)}" has been written, committed, and pushed.\n\nIt'll be live on Vercel in a minute.`,
    );
  } catch (err) {
    const msg = err.stderr || err.message || String(err);
    console.error(`❌ Failed: ${msg.slice(0, 300)}`);
    await bot.sendMessage(
      chatId,
      `❌ Something went wrong:\n\`\`\`\n${msg.slice(0, 500)}\n\`\`\``,
      { parse_mode: "Markdown" },
    );
  }
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down...");
  bot.stopPolling();
  process.exit(0);
});
