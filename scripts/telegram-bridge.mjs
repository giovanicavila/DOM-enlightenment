/**
 * Telegram → OpenCode Bridge
 *
 * Provides two commands:
 *   /write <topic>   — writes a blog post via the blog-writer agent
 *   /curate          — searches the web for AI news and publishes briefings
 *   Plain text       — defaults to /write
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

// ── Load .env manually ──────────────────────────────────────────────
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
console.log("🤖 Telegram bot started — commands: /write, /curate, /help");

// ── Run opencode with a given agent and prompt ─────────────────────
function runOpenCode(agent, prompt) {
  const escaped = prompt.replace(/"/g, '\\"').replace(/\n/g, "\\n");
  return execSync(
    `opencode run --agent ${agent} "${escaped}"`,
    {
      cwd: PROJECT_ROOT,
      encoding: "utf-8",
      timeout: 300_000,
      maxBuffer: 10 * 1024 * 1024,
    },
  );
}
// ───────────────────────────────────────────────────────────────────

// ── Command: write a blog post ─────────────────────────────────────
async function handleWrite(chatId, topic) {
  await bot.sendChatAction(chatId, "typing");
  const prompt = `Write a blog post about this topic:\n\n${topic}`;
  runOpenCode("blog-writer", prompt);
  await bot.sendMessage(
    chatId,
    `✍️ Published! Blog post on "${topic.slice(0, 100)}" has been written, committed, and pushed. It'll be live on Vercel in a minute.`,
  );
}
// ───────────────────────────────────────────────────────────────────

// ── Command: curate AI news ────────────────────────────────────────
async function handleCurate(chatId) {
  await bot.sendMessage(chatId, "🔍 Searching the web for interesting AI news...");
  await bot.sendChatAction(chatId, "typing");

  const prompt =
    `Search the web for the most interesting and useful AI news from the past few days. ` +
    `Select 3-5 noteworthy stories, create a briefing file for each in src/content/intelligence/, commit, and push.`;

  runOpenCode("ai-curator", prompt);
  await bot.sendMessage(
    chatId,
    `✅ Intelligence briefings written, committed, and pushed! Check the site in a minute.`,
  );
}
// ───────────────────────────────────────────────────────────────────

// ── Message handler ────────────────────────────────────────────────
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  const raw = msg.text?.trim() || "";
  const isGroup = msg.chat.type === "group" || msg.chat.type === "supergroup";

  // ── Authorization ────────────────────────────────────────────
  if (ALLOWED_USER_IDS.length > 0 && userId && !ALLOWED_USER_IDS.includes(userId)) return;
  if (!raw) return;

  // ── Group chat: only respond to @mentions or replies to bot ──
  if (isGroup) {
    const botInfo = await bot.getMe();
    const mention = `@${botInfo.username}`;
    const isMentioned = raw.includes(mention);
    const isReplyToBot = msg.reply_to_message?.from?.is_bot;
    if (!isMentioned && !isReplyToBot) return;
  }

  // ── Parse command ────────────────────────────────────────────
  const text = raw.replace(/@\w+/g, "").trim(); // strip mentions
  const cmd = text.startsWith("/") ? text.split(" ")[0].toLowerCase() : null;
  const args = cmd ? text.slice(cmd.length).trim() : text;

  console.log(`📩 From ${userId}: "${raw.slice(0, 80)}..."`);

  try {
    switch (cmd) {
      case "/write":
        if (!args) {
          await bot.sendMessage(chatId, "Send a topic after /write — e.g. `/write React Server Components`", { parse_mode: "Markdown" });
          return;
        }
        await handleWrite(chatId, args);
        break;

      case "/curate":
      case "/intelligence":
        await handleCurate(chatId);
        break;

      case "/help":
        await bot.sendMessage(
          chatId,
          `*Available commands:*\n\n` +
          `• \`/write <topic>\` — Write and publish a blog post\n` +
          `• \`/curate\` — Search the web and publish AI news briefings\n` +
          `• Just send text — same as /write\n` +
          `• \`/help\` — Show this message`,
          { parse_mode: "Markdown" },
        );
        break;

      default:
        // Unknown command or plain text — treat as /write
        await handleWrite(chatId, text);
    }
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

// ── Graceful shutdown ──────────────────────────────────────────────
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down...");
  bot.stopPolling();
  process.exit(0);
});
