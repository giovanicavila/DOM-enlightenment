---
title: "NVIDIA Unveils Nemotron 3 Ultra 550B — Open-Weight Frontier Model with Hybrid Mamba-Transformer Architecture"
description: "Announced at Computex 2026, NVIDIA's Nemotron 3 Ultra is a 550B-parameter open-weight reasoning model with a 1M-token context window, hybrid Mamba-Transformer MoE design, and up to 6× higher inference throughput than comparable models."
publishedAt: 2026-06-27
source: "NVIDIA Research"
sourceUrl: "https://research.nvidia.com/labs/nemotron/Nemotron-3/"
---

NVIDIA unveiled the Nemotron 3 family at Computex 2026 in early June, headlined by the Nemotron 3 Ultra 550B A55B — a 550-billion-parameter open-weight reasoning model built on a novel hybrid Mamba-Transformer Mixture-of-Experts architecture. Designed for the most demanding enterprise agentic workflows, Ultra delivers frontier-level reasoning across multi-step planning, tool use, code generation, and deep research, with up to 6× higher inference throughput than state-of-the-art publicly available LLMs at comparable accuracy levels.

The Nemotron 3 family spans three tiers: Nano (optimized for cost-efficient specialized sub-agents, now with a new "Nano Omni" multimodal variant), Super (120B A12B for balanced accuracy and throughput in multi-agent applications), and Ultra (550B A55B for the highest reasoning accuracy on complex agentic tasks). All models support a 1M-token context window and leverage several architectural innovations including Multi-Token Prediction (MTP), NVFP4 pre-training with Blackwell-native precision, multi-environment RLVR, Multi-teacher On-Policy Distillation (MOPD) for post-training, and reasoning budget control. Blackwell-native MXFP4 support enables the RTX 5090 to run 30–70B models practically, with reported throughput of 5,841 tokens/second on Qwen 2.5-Coder-7B.

NVIDIA has released all Nemotron 3 model weights, training data, and recipes openly on Hugging Face, making them deployable on any NVIDIA GPU through open frameworks like vLLM, SGLang, Ollama, and llama.cpp, as well as through NVIDIA NIM microservices.

**Why it matters:** Nemotron 3 Ultra represents the most capable open-weight model ever released by a US-based company, giving enterprises a sovereign, auditable alternative to closed-source frontier models while setting new efficiency standards for production-grade agentic AI deployments.
