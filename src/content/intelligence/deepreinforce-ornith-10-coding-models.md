---
title: "DeepReinforce Releases Ornith-1.0: Open-Source Coding Models That Write Their Own RL Training Scaffolds"
description: "The MIT-licensed model family spans 9B to 397B parameters and beats Claude Opus 4.7 on SWE-Bench Verified — with a novel architecture where the model learns to generate its own training harness."
publishedAt: 2026-06-25
source: "MarkTechPost"
sourceUrl: "https://www.marktechpost.com/2026/06/25/deepreinforce-releases-ornith-1-0-an-open-source-coding-model-family-that-learns-its-own-rl-scaffolds/"
---

DeepReinforce has released **Ornith-1.0**, a family of open-source coding models available under the MIT license on Hugging Face. The lineup spans four sizes: a 9B dense model for edge devices, a 31B dense variant, a 35B mixture-of-experts build, and a 397B MoE flagship — all built on top of pretrained Gemma 4 and Qwen 3.5 foundations.

The defining innovation is that Ornith-1.0 learns to write its own training scaffold during reinforcement learning, rather than relying on a fixed human-designed harness. The model jointly optimizes the solution-search structure and the solution itself, using three guard layers — a fixed trust boundary, a deterministic monitor, and a frozen LLM judge — to prevent reward hacking. The 397B flagship scores 82.4 on SWE-Bench Verified (beating Claude Opus 4.7's 80.8) and 77.5 on Terminal-Bench 2.1. The 35B MoE model scores 64.2 on Terminal-Bench 2.1, outperforming Qwen 3.5-397B despite having 10× fewer total parameters.

DeepReinforce's MIT licensing removes legal friction that has complicated adoption of some open-weight releases. The smaller models make a strong efficiency case: the 9B dense variant reaches 69.4 on SWE-Bench Verified, exceeding Gemma 4-31B despite its smaller size, while fitting on a single GPU for deployment.

Why it matters: Ornith-1.0 demonstrates that open-source coding models can reach near-frontier performance at a fraction of the compute cost, and its self-scaffolding training approach points toward a future where models improve their own training methodology.
