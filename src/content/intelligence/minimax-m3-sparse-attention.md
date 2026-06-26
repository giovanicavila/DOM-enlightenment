---
title: "MiniMax M3 Brings Sparse Attention Breakthrough: 1M Context at 1/20th the Compute"
description: "The Shanghai lab's open-weight model combines frontier coding, native multimodality, and million-token context using a novel MiniMax Sparse Attention architecture."
publishedAt: 2026-06-01
source: "MiniMax Blog"
sourceUrl: "https://www.minimax.io/blog/minimax-m3"
---

MiniMax released **M3** on June 1, 2026, positioning it as the first open-weight model to simultaneously deliver frontier coding capability, a 1-million-token context window, and native multimodal understanding. The model uses roughly 428B total parameters with only ~23B activated per token via a Mixture-of-Experts design, and achieves competitive or superior scores against closed-source models: 59.0% on SWE-Bench Pro (beating GPT-5.5 and Gemini 3.1 Pro) and 83.5 on BrowseComp (surpassing Claude Opus 4.7).

The headline innovation is **MiniMax Sparse Attention (MSA)**, a novel attention architecture published on arXiv that dramatically improves long-context efficiency. At 1M tokens, MSA reduces per-token compute to 1/20th of the previous generation, delivers 9× faster prefill speeds, and 15× faster decoding compared to standard attention. This makes million-token contexts practical for real-time applications without the quadratic blowup that typically limits transformer models.

M3 is natively multimodal — trained on mixed text, image, and video data from step zero rather than stitching separate encoders onto a text model after the fact. MiniMax demonstrated this with a 12-hour autonomous ICLR paper replication and a CUDA kernel optimization that achieved 9.4× speedup over 147 iterations. The model is available via API, MiniMax Code, and open weights on Hugging Face.

Why it matters: M3 proves that sparse attention can make million-token contexts economically viable, and that open-weight models can compete with — and in some areas beat — the best closed-source frontier systems.
