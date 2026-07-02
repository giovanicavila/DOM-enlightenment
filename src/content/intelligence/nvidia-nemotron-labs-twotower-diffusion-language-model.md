---
title: "NVIDIA's Nemotron-Labs-TwoTower Delivers 2.4× Faster Text Generation"
description: "NVIDIA's novel diffusion language model architecture separates context and denoising into two towers, achieving 2.42× throughput while retaining 98.7% of autoregressive quality."
publishedAt: 2026-07-02
source: "NVIDIA Research / ArXiv"
sourceUrl: "https://arxiv.org/abs/2606.26493"
---

NVIDIA released **Nemotron-Labs-TwoTower** on July 1, a diffusion language model that fundamentally rethinks how text generation is structured. Instead of a single network handling both context and denoising — the standard approach for diffusion LMs — TwoTower splits the job into a frozen autoregressive "context tower" and a trained "denoiser tower" that collaborate via cross-attention.

Built on the Nemotron-3-Nano-30B-A3B backbone (trained on 25 trillion tokens), the denoiser was trained on just ~2.1 trillion additional tokens. At its default operating point, the model achieves **2.42× higher generation throughput** than the autoregressive baseline while retaining **98.7% of benchmark quality** across MMLU, ARC-Challenge, GSM8K, and HumanEval. A single checkpoint supports diffusion, mock-autoregressive, and standard autoregressive decoding modes.

The weights ship under the permissive NVIDIA Nemotron Open Model License, making the architecture available for commercial use and further research. This efficiency gain is particularly relevant for high-volume synthetic data pipelines and any deployment where generation throughput is the bottleneck.

**Why it matters:** TwoTower demonstrates that diffusion language models can be efficiently grafted onto existing pretrained autoregressive backbones, offering a practical path to faster inference without sacrificing quality or requiring expensive full retraining.
