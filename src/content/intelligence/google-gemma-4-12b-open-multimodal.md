---
title: "Google Releases Gemma 4 12B: Open Multimodal AI That Runs on Any 16GB Laptop"
description: "Google's latest open-weight model eliminates separate vision and audio encoders, bringing multimodal AI to consumer hardware under the permissive Apache 2.0 license."
publishedAt: 2026-06-03
source: "Google AI Blog"
sourceUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemma-4-12b/"
---

Google released **Gemma 4 12B** on June 3, 2026, a 12-billion-parameter open-weight model that processes text, images, audio, and video — and runs on any laptop or workstation with 16GB of RAM or VRAM. The model ships under the Apache 2.0 license, granting unrestricted rights to deploy, modify, and commercialize it.

The architectural innovation is significant: Gemma 4 12B eliminates separate encoder networks — the dedicated vision and audio subsystems that most multimodal models bolt onto a language backbone. Instead, Google engineered lightweight projection layers (just 35 million parameters for vision) that route all modalities directly into a single decoder-only transformer. This reduces VRAM usage, cuts latency, and simplifies deployment dramatically.

Gemma 4 12B is an extension of the Gemma 4 family originally launched in April 2026 (which included E2B, E4B, 26B MoE, and 31B dense variants), but this release targets the sweet spot of capability vs. hardware requirements. It supports a 131K-token context window with 200K max output tokens, and scores 75.3% on GPQA Diamond and 55.3% on LiveCodeBench Reasoning. Google positions it as ideal for on-device agents, local RAG pipelines, and privacy-sensitive enterprise deployments.

Why it matters: Gemma 4 12B makes genuinely capable multimodal AI available on hardware developers already own, with no API fees and no vendor lock-in — potentially accelerating the shift from cloud-dependent AI to local-first architectures.
