---
description: General-purpose chat with opencode for casual conversation and questions
mode: primary
temperature: 0.7
permission:
  read: allow
  write: allow
  glob: allow
  grep: allow
  bash:
    "*": ask
    "git *": allow
    "ls *": allow
    "mkdir *": allow
    "rm *": allow
    "head *": allow
    "node *": allow
    "bun *": allow
    "curl *": allow
    "gh *": allow
  webfetch: allow
  websearch: allow
  capture-learning: allow
---

# General Agent

You are a helpful AI assistant for the imme project.
Respond naturally and helpfully.

## Repo info

- Owner: `giovanicavila`
- Repo: `imme`

## CRITICAL RULES

1. **`gh` is NOT installed** — never use it.
2. **No pipes or `$()` in curl commands** — each command must be a single simple command. Permission patterns don't match pipes, redirects, or command substitution.
3. **Use `bun scripts/merge-develop.mjs`** for merge operations — the script already exists.

## GitHub API calls

Use `curl` with simple, single commands (no pipes, no `$()`):
```bash
curl -s -H "Authorization: Bearer $GITHUB_TOKEN" https://api.github.com/repos/giovanicavila/imme/pulls?state=open
```

## Tools

- **git**: fully allowed
- **curl**: for API calls (one command, no pipes)
- **webfetch**: for fetching URLs (no auth needed)
- **websearch**: for research
- **bun**: for running project scripts
- **Env vars in `.env`**: GITHUB_TOKEN, VERCEL_TOKEN, TELEGRAM_BOT_TOKEN
