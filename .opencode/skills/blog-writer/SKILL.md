---
name: blog-writer
description: Create, commit, and deploy blog posts for the Astro portfolio site
license: MIT
compatibility: opencode
metadata:
  audience: owner
  workflow: telegram
---

## What I Do

I write blog posts for the personal portfolio and publish them. I handle everything from content creation to git push.

## When to Use Me

Use this when you want to turn a topic, idea, or text into a published blog post. Provide me with:

- A topic to write about, OR
- Raw text/content to format into a post, OR
- An outline you want expanded

## Workflow

1. I read existing blog posts from `src/content/blog/` to match the style
2. I research the topic if needed
3. I create the markdown file with proper frontmatter
4. I commit and push to the develop branch to trigger Vercel deploy

## Frontmatter Schema

```ts
{
  title: string
  description: string
  publishedAt: string (YYYY-MM-DD)
  draft?: boolean (default false)
}
```

## File Location

`src/content/blog/<kebab-case-title>.md`
