---
title: "NVIDIA Open-Sources NeMo AutoModel: One-Line Import for 3.7x MoE Fine-Tuning Speedup"
description: "NVIDIA released NeMo AutoModel, an open-source tool that accelerates MoE model fine-tuning by 3.4-3.7x and reduces GPU memory by 29-32% with just a single import line change to existing Hugging Face Transformers v5 code."
publishedAt: 2026-06-27
source: "NVIDIA / HTX Insights"
sourceUrl: "https://www.htx.com/news/nvidias-new-open-source-moe-one-line-of-import-fine-tuning-a-jiDqpPC9/"
---

NVIDIA open-sourced **NeMo AutoModel** on June 26, 2026, a tool purpose-built to dramatically accelerate fine-tuning of Mixture-of-Experts (MoE) large language models. The headline feature is simplicity: developers already using Hugging Face Transformers v5 need only add **one line of import** to their existing code to achieve a 3.4x to 3.7x increase in training throughput while reducing GPU memory usage by 29% to 32% — with zero API changes. Benchmarks on Qwen3-30B-A3B show training throughput jumping from 3,075 to 11,340 tokens per second per GPU on a single 8×H100 node.

The performance gains come from three core technologies integrated on top of Transformers v5. **Expert Parallelism (EP)** distributes expert weights across GPUs so each GPU holds only a fraction of the total parameters — with ep_size=8, MoE memory footprint drops to 1/8 per GPU. **DeepEP** fuses token distribution and composition operations into optimized GPU kernels, overlapping communication with expert computation. **TransformerEngine** kernels accelerate fused attention, linear layers, and RMSNorm across all layers, not just MoE ones. The combination enables full-parameter fine-tuning of models previously impossible at scale — NVIDIA demonstrated NeMo AutoModel fine-tuning the 550B-parameter Nemotron 3 Ultra on 128 H100 GPUs with 815 tokens/sec/GPU throughput and 58 GiB peak memory, a workload that standard Transformers v5 cannot handle (it runs out of memory).

The release includes code, configurations, and benchmark scripts on GitHub, with full documentation on NVIDIA's developer portal. MoE architectures have become the dominant paradigm for frontier models (used by all leading labs), but their complex routing and sparse activation patterns create unique engineering challenges for fine-tuning. By packaging NVIDIA's distributed training expertise into a drop-in replacement for the most widely used training framework, NeMo AutoModel makes production-grade MoE fine-tuning accessible to any team with access to standard GPU clusters.

**Why it matters:** NeMo AutoModel removes a major barrier to MoE adoption — fine-tuning these models has required specialized engineering that most teams don't have — and by making it a one-line import on the industry-standard Transformers framework, NVIDIA is effectively commoditizing MoE fine-tuning in the same way Hugging Face commoditized model inference.
