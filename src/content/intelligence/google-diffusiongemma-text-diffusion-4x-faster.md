---
title: "Google DeepMind's DiffusionGemma Generates Text 4x Faster via Parallel Diffusion"
description: "Released under Apache 2.0, DiffusionGemma is a 26B MoE model that uses uniform state diffusion to generate 256 tokens in parallel, achieving over 1,000 tokens per second on a single H100 GPU."
publishedAt: 2026-06-27
source: "Google Blog"
sourceUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/diffusion-gemma-faster-text-generation/"
---

Google DeepMind released DiffusionGemma on June 10, 2026, an experimental open model that replaces traditional autoregressive token-by-token generation with a text diffusion approach. Instead of predicting one token at a time from left to right, DiffusionGemma starts with a canvas of random placeholder tokens and iteratively refines all 256 tokens in parallel across multiple denoising passes — the same core idea behind image diffusion models like Stable Diffusion, now applied to text.

The model uses a 26-billion-parameter Mixture-of-Experts architecture but activates only 3.8 billion parameters per token, keeping VRAM requirements to about 18GB when quantized to 4 bits. On a single NVIDIA H100 GPU, it achieves over 1,000 tokens per second; on a consumer RTX 5090, it delivers more than 700 tokens per second — approximately 4x faster than comparable autoregressive Gemma models. The trade-off is a modest reduction in output quality on standard benchmarks like MMLU, which Google is transparent about, positioning DiffusionGemma for speed-critical workflows rather than maximum accuracy.

Released under an Apache 2.0 license, DiffusionGemma is available on Hugging Face, Kaggle, and Google Cloud's Vertex AI Model Garden. It supports a 256K-token context window, handles 140+ languages, and accepts interleaved text, image, and video inputs. Its bi-directional attention mechanism makes it particularly well-suited for code infilling, inline editing, and nonlinear text generation tasks.

**Why it matters:** DiffusionGemma opens a new frontier in local AI inference by breaking the sequential token bottleneck, making real-time interactive AI applications on consumer hardware dramatically more practical without sacrificing the benefits of open-weight models.
