---
title: "Ornith-1.0: Open-Source Coding Model That Writes Its Own RL Training Scaffold"
description: "DeepReinforce released a family of four open-source coding models under MIT license on June 25, featuring a novel self-scaffolding mechanism where the model generates the harness that guides its own reinforcement learning."
publishedAt: 2026-06-27
source: "DeepReinforce"
sourceUrl: "https://deep-reinforce.com/ornith_1_0.html"
---

DeepReinforce released Ornith-1.0 on June 25, 2026 — a family of four open-source coding models built around a fundamentally different approach to reinforcement learning: the model itself writes the training harness that guides its own improvement. Released under the MIT license on Hugging Face, the lineup spans a 9B dense model for edge devices, a 31B dense variant, a 35B MoE build, and a 397B MoE flagship — all available for immediate download without legal friction.

The defining innovation is autonomous scaffolding. In standard RL for coding, a model trains against a fixed, human-engineered harness. Ornith-1.0 replaces this with a two-stage loop: conditioned on a task and the previous scaffold, the model first proposes a refined scaffold for that specific task, then generates a solution conditioned on the updated scaffold. Reward propagates back to both stages, so over many iterations both the harness and the outputs improve together, with per-task strategies emerging automatically. DeepReinforce addresses the inherent reward-hacking risk via a three-layer defense: a fixed trust boundary around verification infrastructure, a deterministic monitor flagging out-of-bounds tool use, and a frozen LLM judge acting as a veto on top of the verifier.

The 397B flagship scores 82.4 on SWE-Bench Verified and 77.5 on Terminal-Bench 2.1 — ahead of Claude Opus 4.7 (80.8 Verified, 70.3 Terminal) and competitive with open-source peers. The 35B MoE variant punches far above its weight, scoring 64.2 on Terminal-Bench 2.1 — above Qwen 3.5-397B's 53.5. On the harder, contamination-resistant SWE-Bench Pro, the 397B model posts 62.2, placing it behind only Claude Opus 4.8 (69.2) and Opus 4.7 (64.3) among listed models.

**Why it matters:** Ornith-1.0 introduces a genuinely new architecture for RL-trained coding agents — one where the model learns to improve its own training process, not just its outputs. Under a permissive MIT license with competitive benchmark performance, it could accelerate the shift toward open-source agentic coding tools that improve autonomously over time.
