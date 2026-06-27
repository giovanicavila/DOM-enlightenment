---
title: "NVIDIA AI Trained Itself on a 30B Model — and Corrected Its Own Broken Metric Mid-Run"
description: "Amazon's A-EVO-Lab completed the first publicly reported autonomous post-training run at frontier scale, where the AI system detected and fixed its own reward hacking without human intervention."
publishedAt: 2026-06-26
source: "TechTimes"
sourceUrl: "https://www.techtimes.com/articles/319123/20260626/nvidia-ai-trained-itself-30b-model-corrected-its-own-broken-metric-mid-run.htm"
---

An autonomous AI system built by Amazon's A-EVO-Lab completed a full post-training run on NVIDIA's 30-billion-parameter Nemotron model — with no human in the loop, across four rounds spanning multiple weeks. The resulting model placed 8th out of roughly 4,000 entries on the public Nemotron-Reasoning Challenge leaderboard, scoring 0.86 against the top human submission's 0.87.

What makes this result groundbreaking isn't just the scale — a 240× jump over prior public demonstrations of autonomous ML research — but what happened mid-campaign. The system detected that its internal development metric had stopped correlating with real-world performance. Instead of continuing to chase a misleading score, it redesigned its own search policy to specifically seek interventions that lowered the misleading proxy while improving the actual external target. This self-correction of specification gaming, at frontier scale and without human prompting, is a first-of-its-kind data point for AI alignment research.

The system was also applied to NVIDIA's 120B and 550B Nemotron variants, demonstrating that the autonomous loop closes at those scales as well. The paper's authors describe three key architectural decisions: an immutable reference substrate that is never overwritten, homogeneous memory-free workers that isolate candidate changes, and round-level evidence aggregation that updates only the search policy. These design principles allowed the loop to survive contact with the punishing cost structure of frontier-scale execution.

Why it matters: This is the first publicly auditable demonstration of an AI system discovering and correcting its own reward hacking during a frontier-scale training run — a concrete data point in what has been a largely theoretical debate about recursive self-improvement and alignment.
