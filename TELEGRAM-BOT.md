# Telegram Bot — imme Portfolio

A Telegram bot that powers the **Intelligence** (AI news curation) and **Blog** sections of the portfolio site at [imme-navy.vercel.app](https://imme-navy.vercel.app/).

## Commands

| Command | What it does |
|---|---|
| `/write <topic>` | Writes a blog post via the `blog-writer` agent, commits, pushes, auto-deploys |
| `/curate` | Searches the web for AI news → creates briefing files → enforces max 5 → commits |
| `/merge` | Opens a PR from `develop` → `main` with changelog → squash-merges → returns overview |
| `/urls` | Shows production and latest preview deployment URLs |
| `/help` | Lists available commands |
| *Plain text* | Same as `/write` |

---

## Setup

### 1. Create the Telegram bot

1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Send `/newbot` and follow the prompts
3. Copy the API token (looks like `123456:ABC-DEF...`)

### 2. Environment variables (`.env`)

Create a `.env` file in the project root:

```env
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
ALLOWED_USER_IDS=            # optional — comma-separated Telegram user IDs to restrict access
VERCEL_TOKEN=                # optional — from https://vercel.com/account/tokens (live preview URLs)
VERCEL_PROJECT=imme-navy     # optional — defaults to imme-navy
GITHUB_TOKEN=ghp_...         # optional — classic PAT from https://github.com/settings/tokens (scope: repo)
```

- **TELEGRAM_BOT_TOKEN** — required. Get from @BotFather.
- **ALLOWED_USER_IDS** — optional. Restrict the bot to specific Telegram user IDs.
- **VERCEL_TOKEN** — optional. Enables live preview URLs in `/urls`, `/curate`, and `/write`. Create at Vercel → Settings → Tokens.
- **GITHUB_TOKEN** — optional. Enables PR-based merge flow in `/merge`. Classic token with `repo` scope. Without it, `/merge` falls back to direct git merge.
- **SCHEDULED_CHAT_ID** — optional. Your Telegram user ID to receive daily 7 AM `/curate` → `/merge` results. Find it by messaging [@userinfobot](https://t.me/userinfobot).

### 3. Install and run

```bash
bun add node-telegram-bot-api
bun run scripts/telegram-bridge.mjs
```

The bot runs as a long-lived process. Use `tmux`, `screen`, or a process manager like `pm2` to keep it alive.

---

## Architecture

```
Telegram ──→ telegram-bridge.mjs ──→ opencode run --agent <agent>
                          │
                          ├── /write  → blog-writer agent
                          ├── /curate → ai-curator agent
                          ├── /merge  → scripts/merge-develop.mjs
                          └── /urls   → Vercel API (curl)
```

The bot uses **opencode agents** for content creation. Each agent is an AI that has access to tools (web search, file read/write, git, etc.) and acts autonomously.

### Agent files

| File | Role |
|---|---|
| `.opencode/agents/ai-curator.md` | AI news curator — searches web, writes briefings, enforces max 5, commits |
| `.opencode/agents/blog-writer.md` | Blog post writer — researches, writes, commits |
| `.opencode/skills/ai-curator/SKILL.md` | Skill definition for the curator workflow |
| `opencode.jsonc` | Project-level permission rules for the opencode CLI |

### Scripts

| File | Role |
|---|---|
| `scripts/telegram-bridge.mjs` | Main bot — listens for Telegram messages and dispatches commands |
| `scripts/merge-develop.mjs` | PR + merge logic — reads commits, creates PR via GitHub API, squash-merges |

---

## Daily schedule (7 AM)

If `SCHEDULED_CHAT_ID` is set in `.env`, the bot runs `/curate` followed by `/merge` every day at 7 AM automatically. Results are sent to that chat.

1. `⏰ Daily curation starting...` → runs `/curate`
2. `⏰ Merge starting...` → runs `/merge`
3. `✅ Daily cycle complete!` → both succeeded

To find your chat ID, message [@userinfobot](https://t.me/userinfobot) on Telegram.

---

## How each command works

### `/write <topic>`

1. Bot calls `opencode run --agent blog-writer "Write a blog post about: <topic>"`
2. The agent researches the topic (web search if needed), creates a markdown file in `src/content/blog/`
3. Agent runs `git add -A && git commit -m "blog: <title>" && git push`
4. Vercel auto-deploys from the pushed branch
5. Bot responds with the preview URL (requires `VERCEL_TOKEN`)

### `/curate`

1. Bot calls `opencode run --agent ai-curator` with a prompt to search for AI news
2. The agent:
   - Searches the web for the most interesting/useful AI news from the past 5 weeks
   - Selects 3-5 noteworthy stories
   - Creates a markdown briefing file for each in `src/content/intelligence/`
   - Lists all `.md` files in the directory and reads their `publishedAt` frontmatter dates
   - If more than 5 files exist, deletes the oldest ones (by date) — keeps exactly 5
   - Runs `git add -A && git commit -m "intelligence: <title>" && git push`
3. Vercel auto-deploys
4. Bot responds with the preview and production URLs

**Why max 5?** The Intelligence section shows a fixed number of briefings. Keeping only the 5 most recent ensures fresh content is always visible.

### `/merge`

1. Bot runs `bun scripts/merge-develop.mjs`
2. The script:
   - Fetches latest from `origin`
   - Gets commits in `develop` not in `main` (`git log origin/main..origin/develop`)
   - If no new commits, responds "nothing to merge"
   - **With GITHUB_TOKEN:** Checks for an existing open PR from `develop` → `main`. If one exists, reuses it. Otherwise creates a new PR with an auto-generated title and body listing each commit. Then squash-merges the PR via the GitHub API, updates local branches.
   - **Without GITHUB_TOKEN:** Falls back to `git checkout main && git merge origin/develop && git push` (direct merge, no PR).
3. Bot responds with PR number, URL, and list of merged commits

### `/urls`

1. Calls the Vercel API (requires `VERCEL_TOKEN`) to fetch the latest production and preview deployment URLs
2. Without `VERCEL_TOKEN`, shows the hardcoded production URL and a hint to set the token

---

## Permission model

### Project-level (`opencode.jsonc`)

```json
{
  "permission": {
    "bash": {
      "ls *": "allow",
      "rm *": "allow",
      "bun *": "allow",
      "node *": "allow",
      "git *": "allow",
      "opencode *": "allow",
      "*": "ask"
    }
  }
}
```

Allows common project commands silently; everything else prompts for approval.

### AI-curator agent (`.opencode/agents/ai-curator.md`)

The agent has explicit permissions:

| Tool | Permission |
|---|---|
| `read`, `edit`, `write`, `glob`, `grep` | `allow` |
| `webfetch`, `websearch` | `allow` |
| `git status`, `diff`, `add`, `commit`, `push`, `log` | `allow` |
| `mkdir`, `rm`, `head` | `allow` |
| Any other bash command | `ask` (auto-rejects in non-interactive mode) |

This means the agent can create/delete files, run git commands, search the web — but cannot run arbitrary system commands without approval.

---

## Intelligence lifecycle

```
/curate
  │
  ├── 1. Search web for AI news (past 5 weeks)
  ├── 2. Select 3-5 noteworthy stories
  ├── 3. Create .md files in src/content/intelligence/
  ├── 4. Glob *.md → Read frontmatter → Check publishedAt dates
  ├── 5. If >5 files → bash rm oldest → keep exactly 5
  ├── 6. git add -A && git commit && git push
  └── 7. Vercel auto-deploys

Site: https://imme-navy.vercel.app/intelligence
```

## Deploy workflow

```
                    ┌─ Push to develop ──→ Vercel preview deploy
                    │
  /curate or /write ─┼─ git push ────────→ Vercel preview deploy
                    │
  /merge ───────────┼─ Create PR ──→ Squash merge to main ──→ Vercel production deploy
                    │
                    └─ git push main ────→ Vercel production deploy
```

---

## Troubleshooting

### Permission errors when running `/curate`

The agent's bash commands are restricted. If you see auto-rejected errors:
- Check `.opencode/agents/ai-curator.md` — add `"<command> *": "allow"` for any new command the agent needs
- Common ones: `rm`, `head`

### "Resource not accessible by personal access token"

- You're using a **fine-grained PAT** (`github_pat_...`). These have known restrictions with PR merge operations.
- Switch to a **classic PAT** (`ghp_...`) with the `repo` scope.

### Token not updating after `.env` change

If the bot is already running, the merge script reads `.env` fresh each time. If you still see the old token:
- Kill and restart the bot process (`SIGINT` to stop, then `bun run scripts/telegram-bridge.mjs` again)

### Preview URL not showing

- Set `VERCEL_TOKEN` in `.env` (from Vercel dashboard → Settings → Tokens)
- Without it, the bot shows "Not available (set VERCEL_TOKEN in .env)"

---

## File locations

```
opencode.jsonc                          # Project-wide opencode permissions
.opencode/
├── agents/
│   ├── ai-curator.md                   # AI curator agent definition + permissions
│   └── blog-writer.md                  # Blog writer agent definition + permissions
└── skills/
    └── ai-curator/
        └── SKILL.md                    # Curator skill workflow reference
scripts/
├── telegram-bridge.mjs                 # Main Telegram bot
└── merge-develop.mjs                   # PR creation and merge logic
src/content/
├── intelligence/                       # AI briefing files (max 5)
└── blog/                               # Blog posts
```
