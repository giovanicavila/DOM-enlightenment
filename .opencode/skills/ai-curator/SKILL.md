---
name: ai-curator
description: Curate AI news from the web and publish intelligence briefings
license: MIT
compatibility: opencode
metadata:
  audience: owner
  workflow: telegram
---

## What I Do

I search the web for the most interesting and useful AI news from the past 5 weeks, then publish curated briefings to the Intelligence section of the site.

## When to Use Me

Use this to keep the site's Intelligence section fresh with noteworthy AI developments. I handle everything from research to git push.

## Workflow

1. Search the web for the most exciting AI news from the past 5 weeks (breakthroughs, releases, papers, tools)
2. Select 3-5 noteworthy stories
3. Create a markdown briefing for each in `src/content/intelligence/`
4. Include source attribution and "Why it matters" analysis
5. **Enforce max 5**: After adding new files, use the Glob tool to list `src/content/intelligence/*.md`, then Read each file's frontmatter to check `publishedAt`. If more than 5 files, delete the oldest ones (by date) so that exactly 5 remain. Use the Write tool to delete (overwrite with empty content) or the Edit tool as needed.
6. Commit and push to trigger Vercel deploy

## Frontmatter Schema

```ts
{
  title: string
  description: string
  publishedAt: string (YYYY-MM-DD)
  source?: string
  sourceUrl?: string (URL)
  draft?: boolean (default false)
}
```

## File Location

`src/content/intelligence/<kebab-case-title>.md`
