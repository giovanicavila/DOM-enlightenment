---
title: "Microsoft Launches MAI-Thinking-1, a Proprietary Reasoning Model Built From Scratch"
description: "Microsoft's first in-house reasoning model, a 35B-active MoE, matches Claude Opus 4.6 on SWE-Bench Pro and achieves 97% on AIME 2025 — trained entirely without distillation from third-party models."
publishedAt: 2026-06-27
source: "Microsoft AI Blog"
sourceUrl: "https://microsoft.ai/news/introducing-mai-thinking-1/"
---

Microsoft AI introduced MAI-Thinking-1 on June 2, 2026 — its first proprietary reasoning model, built entirely without distillation from other labs' models. The model is a 35B-active, ~1T-total-parameter sparse Mixture-of-Experts architecture designed for a smaller inference footprint than comparably capable models. Despite its mid-weight class, it goes toe-to-toe with Claude Opus 4.6 on SWE-Bench Pro and achieves 97.0% on AIME 2025 and 94.5% on AIME 2026, demonstrating advanced mathematical and scientific reasoning.

The launch is anchored by what Microsoft calls its "Hill-Climbing Machine" — a co-designed pipeline for continual, reliable capability improvement. Three principles guide the approach: capabilities should be learned not inherited (hence no distillation from third-party models), training data must be clean and traceable for enterprise-grade provenance, and self-sufficiency across the full stack — from co-design with Microsoft's own accelerators to the reinforcement learning framework. In blind human side-by-side evaluations spanning 1,276 tasks, professional raters preferred MAI-Thinking-1 over Claude Sonnet 4.6.

The model supports a 256K-token context window (enough for a ~600-page document), function calling, multi-layer instruction following, and is compatible with the Chat Completions API. It is available in private preview on Microsoft Foundry, with a public preview on MAI Playground forthcoming. Microsoft frames MAI-Thinking-1 as a step toward "Humanist Superintelligence" — advanced AI designed to serve people and organizations, not replace them — and has published a full technical paper alongside the release.

**Why it matters:** MAI-Thinking-1 marks Microsoft's serious entry into the frontier reasoning race with a fully proprietary, non-distilled model. For enterprises, its clean-data provenance and competitive benchmark performance offer a compelling alternative to closed-source leaders, while its medium-sized footprint opens the door to broader deployment within cost-sensitive production environments.
