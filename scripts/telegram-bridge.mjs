/**
 * Telegram → OpenCode Bridge
 *
 * Commands:
 *   /write <topic>   — writes a blog post, pushes to develop, opens PR, merges to main
 *   /curate          — searches the web for AI news and publishes briefings
 *   /merge           — merges develop into main (deploy to production)
 *   /urls            — shows production and dev preview URLs
 *   /chat [stop]     — start/stop a chat session with opencode
 *
 * Setup:
 *   1. Create a bot via https://t.me/BotFather and get the token
 *   2. Set TELEGRAM_BOT_TOKEN in .env
 *   3. Set VERCEL_TOKEN in .env (from https://vercel.com/account/tokens) for live preview URLs
 *   4. bun add node-telegram-bot-api
 *   5. bun run scripts/telegram-bridge.mjs
 */

import TelegramBot from "node-telegram-bot-api";
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import cron from "node-cron";

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
    process.env[key] = val;
  }
}
// ────────────────────────────────────────────────────────────────────

// ── Config ──────────────────────────────────────────────────────────
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_USER_IDS = (process.env.ALLOWED_USER_IDS || "")
  .split(",")
  .map(Number)
  .filter(Boolean);
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT = process.env.VERCEL_PROJECT || "imme-navy";
const PRODUCTION_URL = `https://${VERCEL_PROJECT}.vercel.app/`;
const SCHEDULED_CHAT_ID = process.env.SCHEDULED_CHAT_ID
  ? Number(process.env.SCHEDULED_CHAT_ID)
  : null;
// ───────────────────────────────────────────────────────────────────

// ── Chat mode state ────────────────────────────────────────────────
// Tracks which chat IDs are currently in chat mode with opencode.
const chatSessions = new Map();
// ───────────────────────────────────────────────────────────────────

if (!BOT_TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN not set in .env");
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
console.log("🤖 Telegram bot started — commands: /write, /curate, /merge, /urls, /help");

if (SCHEDULED_CHAT_ID) {
  cron.schedule("0 7 * * *", async () => {
    console.log("⏰ Daily schedule triggered: /curate → /merge");
    try {
      await bot.sendMessage(SCHEDULED_CHAT_ID, "⏰ Daily curation starting...");
      await handleCurate(SCHEDULED_CHAT_ID);
      await bot.sendMessage(SCHEDULED_CHAT_ID, "⏰ Merge starting...");
      await handleMerge(SCHEDULED_CHAT_ID);
      await bot.sendMessage(SCHEDULED_CHAT_ID, "✅ Daily cycle complete!");
    } catch (err) {
      const msg = err.message || String(err);
      await bot.sendMessage(SCHEDULED_CHAT_ID, `❌ Daily cycle failed:\n\`\`\`\n${msg.slice(0, 500)}\n\`\`\``);
    }
  });
  console.log("⏰ Daily schedule set for 7 AM (curate → merge)");
} else {
  console.log("⏰ No SCHEDULED_CHAT_ID set — daily schedule disabled. Set it in .env to enable.");
}
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

function runScript(scriptName) {
  return execSync(
    `bun scripts/${scriptName}`,
    {
      cwd: PROJECT_ROOT,
      encoding: "utf-8",
      timeout: 120_000,
    },
  );
}
// ───────────────────────────────────────────────────────────────────

// ── Fetch Vercel deployment URLs ───────────────────────────────────
function fetchVercelUrl(target) {
  if (!VERCEL_TOKEN) return null;
  try {
    const params = target === "production"
      ? `projectId=${VERCEL_PROJECT}&target=production&limit=1`
      : `projectId=${VERCEL_PROJECT}&limit=5`;
    const output = execSync(
      `curl -sf -H "Authorization: Bearer ${VERCEL_TOKEN}" "https://api.vercel.com/v1/deployments?${params}"`,
      { encoding: "utf-8", timeout: 15000 },
    );
    const data = JSON.parse(output);
    const deployments = data.deployments || [];
    if (target === "production") {
      const prod = deployments.find(d => d.target === "production");
      return prod ? `https://${prod.url}` : null;
    }
    const preview = deployments.find(d => d.target !== "production");
    return preview ? `https://${preview.url}` : null;
  } catch {
    return null;
  }
}

function getPreviewUrl() {
  return fetchVercelUrl("preview") || "Not available (set VERCEL_TOKEN in .env)";
}

function getProductionUrl() {
  return fetchVercelUrl("production") || PRODUCTION_URL;
}
// ───────────────────────────────────────────────────────────────────

// ── Command: write a blog post ─────────────────────────────────────
async function handleWrite(chatId, topic) {
  await bot.sendChatAction(chatId, "typing");
  const prompt = `Write a blog post about this topic:\n\n${topic}`;
  runOpenCode("blog-writer", prompt);

  // Merge develop → main (same flow as /merge)
  await bot.sendMessage(chatId, "🔀 Opening PR and merging develop into main...");
  await handleMerge(chatId);
}
// ───────────────────────────────────────────────────────────────────

// ── Command: curate AI news ────────────────────────────────────────
async function handleCurate(chatId) {
  await bot.sendMessage(chatId, "🔍 Searching the web for interesting AI news...");
  await bot.sendChatAction(chatId, "typing");

  const prompt =
    `Search the web for the most interesting and useful AI news from the past 5 weeks. ` +
    `Select 3-5 noteworthy stories, create a briefing file for each in src/content/intelligence/, commit, and push. ` +
    `After adding new files, enforce: if there are more than 5 total .md files in src/content/intelligence/ (excluding .gitkeep), ` +
    `delete the oldest ones (by publishedAt date) to keep exactly 5. ` +
    `Use the Glob and Read tools (not bash ls) to list and inspect files.`;

  runOpenCode("ai-curator", prompt);
  const preview = getPreviewUrl();
  await bot.sendMessage(
    chatId,
    `✅ Intelligence briefings written, committed, and pushed!\n\n🔗 Preview: ${preview}\n🌐 Production: ${PRODUCTION_URL}`,
  );
}
// ───────────────────────────────────────────────────────────────────

// ── Command: toggle chat mode with opencode ────────────────────────
async function handleChat(chatId, args, userId) {
  const session = chatSessions.get(chatId);
  const action = args?.toLowerCase();

  if (action === "stop" || action === "end" || action === "off") {
    if (session) {
      chatSessions.delete(chatId);
      await bot.sendMessage(chatId, "👋 Chat session ended. Send `/chat` to start a new one.", { parse_mode: "Markdown" });
    } else {
      await bot.sendMessage(chatId, "ℹ️ No active chat session.");
    }
    return;
  }

  if (session) {
    // Already in chat mode — send message to opencode
    await bot.sendChatAction(chatId, "typing");
    try {
      const output = runOpenCode("general", args || "Hello");
      await bot.sendMessage(chatId, `🤖 ${output.slice(0, 3000)}`);
    } catch (err) {
      await bot.sendMessage(chatId, `❌ Error:\n\`\`\`\n${(err.message || String(err)).slice(0, 500)}\n\`\`\``);
    }
    return;
  }

  // Start chat session
  chatSessions.set(chatId, true);
  await bot.sendMessage(
    chatId,
    "💬 *Chat mode activated!*\n\nSend any message and I'll relay it to opencode.\nUse `/chat stop` to end the session.",
    { parse_mode: "Markdown" },
  );
}

async function handleMerge(chatId) {
  await bot.sendMessage(chatId, "🔀 Opening PR and merging develop into main...");
  await bot.sendChatAction(chatId, "typing");

  try {
    const output = runScript("merge-develop.mjs");
    const lines = output.trim().split("\n");
    const result = JSON.parse(lines[lines.length - 1]);

    switch (result.status) {
      case "noop":
        await bot.sendMessage(chatId, `✅ ${result.message}`);
        break;

      case "merged_direct":
        await bot.sendMessage(
          chatId,
          `✅ develop merged into main!\n\n📦 ${result.message}\n\n🌐 Production: ${PRODUCTION_URL}`,
        );
        break;

      case "found_existing_pr":
        await bot.sendMessage(
          chatId,
          `🔀 Found existing PR #${result.prNumber}\n📄 *Title:* ${result.title}\n🔗 ${result.prUrl}\n\n⏳ Merging...`,
          { parse_mode: "Markdown" },
        );
        break;

      case "pr_created":
        await bot.sendMessage(
          chatId,
          `🆕 PR #${result.prNumber} created!\n📄 *Title:* ${result.title}\n🔗 ${result.prUrl}\n\n⏳ Merging...`,
          { parse_mode: "Markdown" },
        );
        break;

      case "pr_merged": {
        const commitList = result.commitList.map((m, i) => `${i + 1}. ${m}`).join("\n");
        await bot.sendMessage(
          chatId,
          `✅ *PR #${result.prNumber} merged!*\n\n` +
          `📄 *Title:* ${result.title}\n` +
          `🔗 *PR:* ${result.prUrl}\n` +
          `📦 *Commits merged:* ${result.commits}\n` +
          `🔑 *SHA:* ${result.sha.slice(0, 7)}\n\n` +
          `━━━ Changes ━━━\n${commitList}\n\n` +
          `🌐 Production: ${PRODUCTION_URL}`,
          { parse_mode: "Markdown" },
        );
        break;
      }

      case "merge_conflict":
        await bot.sendMessage(
          chatId,
          `❌ *Merge conflict in PR #${result.prNumber}*\n\n${result.message}\n🔗 ${result.prUrl}`,
          { parse_mode: "Markdown" },
        );
        break;

      default:
        await bot.sendMessage(chatId, `✅ Merge complete.\n\n🌐 Production: ${PRODUCTION_URL}`);
    }
  } catch (err) {
    const raw = err.stderr || err.message || String(err);
    try {
      const parsed = JSON.parse(raw);
      await bot.sendMessage(chatId, `❌ Merge failed:\n\`\`\`\n${parsed.message.slice(0, 500)}\n\`\`\``);
    } catch {
      await bot.sendMessage(chatId, `❌ Merge failed:\n\`\`\`\n${raw.slice(0, 500)}\n\`\`\``);
    }
  }
}
// ───────────────────────────────────────────────────────────────────

// ── Command: show URLs ─────────────────────────────────────────────
async function handleUrls(chatId) {
  const prod = getProductionUrl();
  const preview = getPreviewUrl();
  const tokenHint = !VERCEL_TOKEN ? "\n\n💡 Set VERCEL_TOKEN in .env for live preview URL" : "";
  await bot.sendMessage(
    chatId,
    `🌐 *Environments*\n\n` +
    `• *Production:* ${prod}\n` +
    `• *Preview:* ${preview}${tokenHint}`,
    { parse_mode: "Markdown" },
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

      case "/merge":
        await handleMerge(chatId);
        break;

      case "/chat":
        await handleChat(chatId, args, userId);
        break;

      case "/urls":
        await handleUrls(chatId);
        break;

      case "/help":
        await bot.sendMessage(
          chatId,
          `*Available commands:*\n\n` +
          `• \`/write <topic>\` — Write a blog post, push to develop, and merge to main\n` +
          `• \`/curate\` — Search the web and publish AI news briefings\n` +
          `• \`/merge\` — Merge develop into main (deploy to production)\n` +
          `• \`/chat\` — Start a conversation with opencode (use \`/chat stop\` to end)\n` +
          `• \`/urls\` — Show production and dev URLs\n` +
          `• \`/help\` — Show this message`,
          { parse_mode: "Markdown" },
        );
        break;

      default:
        if (chatSessions.has(chatId)) {
          // In chat mode — send to opencode
          await bot.sendChatAction(chatId, "typing");
          try {
            const output = runOpenCode("general", text);
            await bot.sendMessage(chatId, `🤖 ${output.slice(0, 3000)}`);
          } catch (err) {
            await bot.sendMessage(chatId, `❌ Error:\n\`\`\`\n${(err.message || String(err)).slice(0, 500)}\n\`\`\``);
          }
        } else {
          // Unknown command or plain text without chat mode — show help
          await bot.sendMessage(
            chatId,
            `Unknown command. Use /help to see available commands, or /chat to start a conversation with opencode.`,
          );
        }
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
