---
title: "Anthropic Ships Claude Opus 4.8 with 'Honesty' as a Feature, Tops SWE-Bench"
description: "Claude Opus 4.8 delivers the highest frontier model score on SWE-Bench Pro at 69.2%, with a 4x reduction in unflagged code flaws and new dynamic workflows for Claude Code."
publishedAt: 2026-06-27
source: "Anthropic Blog"
sourceUrl: "https://www.anthropic.com/news/claude-opus-4-8"
---

Anthropic released Claude Opus 4.8 on May 28, 2026, an upgrade that positions "honesty" as its defining feature. The model is roughly four times less likely than its predecessor to let code flaws pass unremarked — a quality Anthropic's alignment team describes as "supporting user autonomy and acting in the user's best interest." Opus 4.8 scores 69.2% on SWE-Bench Pro, the highest among frontier models, while also achieving 83.4% on OSWorld-Verified and claiming the top spot on the Artificial Analysis Intelligence Index at 61 — ahead of GPT-5.5 for the first time since OpenAI's April launch.

The release is accompanied by several significant product updates. **Dynamic workflows** in Claude Code allow the model to fan out a complex task across hundreds of parallel subagents in a single session, verify outputs, and report back — enabling codebase-scale migrations across hundreds of thousands of lines from kickoff to merge. **Effort control** gives users granular control over how deeply Claude thinks before responding, from fast/low-effort responses to "max" for the hardest reasoning tasks. The Messages API now accepts system entries inside the messages array, letting developers update instructions mid-task without breaking the prompt cache.

Opus 4.8 is priced the same as Opus 4.7 at $5 per million input tokens and $25 per million output tokens, with fast mode at 2.5× speed now three times cheaper than before. It is available on the Claude API, Amazon Bedrock, Google Cloud Vertex AI, and Microsoft Foundry.

Why it matters: Opus 4.8 demonstrates that the frontier model race is no longer just about raw benchmark scores — Anthropic is differentiating on reliability, honesty, and agentic judgment, qualities that matter more for production workloads than any single benchmark point.
