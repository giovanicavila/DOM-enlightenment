---
title: "Microsoft Debuts Seven In-House MAI Models at Build 2026, Ends OpenAI Dependency"
description: "Microsoft launched MAI-Thinking-1, MAI-Code-1-Flash, and five other proprietary models at Build 2026 — all trained from scratch without distillation, signaling a strategic pivot toward AI self-sufficiency."
publishedAt: 2026-06-27
source: "Microsoft AI Blog"
sourceUrl: "https://microsoft.ai/news/building-a-hillclimbing-machine-launching-seven-new-mai-models/"
---

At its Build 2026 developer conference on June 2, Microsoft unveiled seven new AI models under the MAI (Microsoft AI) umbrella — the strongest signal yet that the company is building toward long-term self-sufficiency beyond its OpenAI partnership. Mustafa Suleyman, CEO of Microsoft AI, announced the family as "a hill-climbing machine" designed to continuously improve across cycles of more compute, better data, and sharper evaluation.

The flagship **MAI-Thinking-1** is Microsoft's first proprietary reasoning model, a sparse MoE with 35 billion active parameters (~1 trillion total) and a 256K context window. It was trained entirely from scratch on clean, commercially licensed data with zero distillation from third-party models — a critical differentiator for enterprise compliance. On SWE-Bench Pro it matches Claude Opus 4.6, and independent blind raters preferred it over Claude Sonnet 4.6. **MAI-Code-1-Flash** (5B active parameters) ships in GitHub Copilot and VS Code, achieving 51% on SWE-Bench Pro at Haiku-level pricing.

Rounding out the family: **MAI-Image-2.5** (ranked #2 for image editing on Arena), **MAI-Voice-2** (expressive speech in 15 languages with zero-shot voice cloning), **MAI-Transcribe-1.5** (SOTA accuracy across 43 languages, 5x faster than competitors), and specialized Flash variants. All models are available on Microsoft Foundry, OpenRouter, Fireworks, and Baseten, with Frontier Tuning — a reinforcement learning service that lets enterprises customize models on their own workflow data. Microsoft also announced a collaboration with Mayo Clinic to co-create a frontier healthcare AI model.

**Why it matters:** The MAI family marks Microsoft's transition from reselling third-party intelligence to owning its AI stack — giving enterprises a vertically integrated alternative that competes with OpenAI, Anthropic, and Google on capability while offering unmatched data provenance and customization.
