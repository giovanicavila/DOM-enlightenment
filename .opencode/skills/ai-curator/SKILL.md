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

I search the web for the most interesting and useful AI news, then publish curated briefings to the Intelligence section of the site.

## When to Use Me

Use this to keep the site's Intelligence section fresh with noteworthy AI developments. I handle everything from research to git push.

## Workflow

1. Search the web for recent AI news (breakthroughs, releases, papers, tools)
2. Select 3-5 noteworthy stories
3. Create a markdown briefing for each in `src/content/intelligence/`
4. Include source attribution and "Why it matters" analysis
5. Commit and push to trigger Vercel deploy

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
