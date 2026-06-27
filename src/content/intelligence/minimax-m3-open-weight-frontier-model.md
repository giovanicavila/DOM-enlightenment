---
title: "MiniMax M3 Becomes First Open-Weight Model to Combine Frontier Coding, 1M Context, and Native Multimodality"
description: "Shanghai-based MiniMax released M3 on June 1, 2026 — an open-weight 428B-parameter MoE model that rivals closed-source leaders on coding, agentic tasks, and long-context reasoning at a fraction of the cost."
publishedAt: 2026-06-27
source: "MiniMax Research Blog"
sourceUrl: "https://www.minimax.io/blog/minimax-m3"
---

MiniMax released M3 on June 1, 2026, claiming the title of the first open-weight model to simultaneously deliver frontier-level coding, a 1-million-token context window, and native multimodal understanding (text, image, and video) — capabilities previously limited to closed-source leaders like OpenAI and Anthropic. Built on a 428B-parameter Mixture-of-Experts architecture with approximately 22B active parameters per token, M3 uses the company's new MiniMax Sparse Attention (MSA) design that reduces per-token compute at 1M context to just 1/20th of the prior generation, achieving more than 9× faster prefill and more than 15× faster decoding.

On coding and agentic benchmarks, M3 scores 59.0% on SWE-Bench Pro (beating GPT-5.5 and Gemini 3.1 Pro, approaching Claude Opus 4.7), 66.0% on Terminal-Bench 2.1, and 74.2% on MCP Atlas. In one striking demonstration, M3 autonomously optimized a CUDA FP8 GEMM kernel on NVIDIA Hopper GPUs over 24 hours — producing 147 benchmark submissions and 1,959 tool calls — achieving a 9.4× speedup from 7.6% to 71.3% of hardware peak utilization without any human intervention. Input pricing starts at $0.30 per million tokens with cache rates as low as $0.06 per million, making it aggressively cheaper than comparable closed-source alternatives.

M3 also powers the updated MiniMax Code agent product, which supports "Agent Team" workflows for long-horizon multi-agent collaboration and computer use across desktop applications. The company has released all model weights as open-weight with a non-commercial license and has committed to publishing a full technical report.

**Why it matters:** M3 closes the gap between open-weight and closed-source frontier models on coding and agentic tasks while offering a 1M-token context at a fraction of the cost — a development that could accelerate the shift toward self-hosted, sovereign AI infrastructure for enterprises and developers worldwide.
