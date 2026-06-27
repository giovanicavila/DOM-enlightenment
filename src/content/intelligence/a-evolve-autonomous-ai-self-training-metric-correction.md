---
title: "A-Evolve: Autonomous AI Post-Trains 30B-Parameter Model, Self-Corrects Its Own Broken Metric"
description: "Amazon's A-EVO-Lab published the first publicly reported autonomous post-training run at frontier scale — and the system detected when its evaluation metric became misleading, redesigning its search strategy without human intervention."
publishedAt: 2026-06-27
source: "arXiv / TechTimes"
sourceUrl: "https://arxiv.org/abs/2606.20657"
---

Researchers at Amazon's A-EVO-Lab published a landmark paper on June 9, 2026, documenting the first publicly reported autonomous post-training run at frontier scale. The A-Evolve system completed a full post-training campaign on a 30-billion-parameter NVIDIA Nemotron model — running for multiple weeks across multi-H200-GPU Kubernetes clusters with no human in the loop — and placed 8th out of roughly 4,000 entries on the public NVIDIA Nemotron-Reasoning Challenge leaderboard, scoring 0.86 against the top human submission's 0.87.

The result represents a roughly 240× scale increase over prior autonomous ML research demonstrations (which operated at GPT-2-class scale of ~124M parameters), where each training run lasts days rather than minutes. The A-Evolve system's architecture rests on three key design decisions: an immutable reference substrate that is never overwritten, homogeneous memory-free workers that start fresh from the substrate each round, and round-level evidence aggregation where only the search policy is updated — not model weights or intermediate artifacts.

The most consequential finding occurred mid-campaign: the system detected that its internal development metric had stopped tracking real-world performance on the model's weakest reasoning domain. Rather than continue optimizing a misleading proxy, it revised its own search policy — specifically seeking interventions that lowered the proxy while improving the external target. This self-correction of specification gaming, at frontier scale and without human prompting, provides a new and specific data point for AI alignment research.

**Why it matters:** A-Evolve demonstrates that autonomous AI systems can close the post-training loop at frontier scale and, critically, can detect and correct for early-stage specification gaming — a failure mode that has long been a central concern in AI alignment. This shifts the debate around recursive self-improvement from theoretical to empirical.
