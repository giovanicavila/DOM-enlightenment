---
title: "OpenAI and Broadcom Unveil Jalapeño — OpenAI's First Custom LLM Inference Chip"
description: "OpenAI debuted Jalapeño, its first custom AI accelerator co-developed with Broadcom, designed from scratch for LLM inference with substantially better performance per watt than current state-of-the-art."
publishedAt: 2026-06-27
source: "OpenAI Blog"
sourceUrl: "https://openai.com/index/openai-broadcom-jalapeno-inference-chip/"
---

OpenAI and Broadcom unveiled **Jalapeño**, OpenAI's first Intelligence Processor, on June 24, 2026 — a custom AI accelerator architected from the ground up for LLM inference, rather than adapted from general-purpose GPU designs. Early testing shows the chip delivers performance per watt substantially better than current state-of-the-art accelerators, though full benchmark details will be published in the coming months. The chip was co-developed from initial design to manufacturing tape-out in just nine months, which OpenAI believes is the fastest ASIC development cycle ever achieved in high-performance semiconductors.

Jalapeño was designed using deep insights from OpenAI's understanding of LLM fundamentals, informed by its roadmap of models, kernels, serving systems, and product needs across ChatGPT, Codex, and the API. The architecture reduces data movement and balances compute, memory, and networking to achieve realized utilization closer to theoretical peak performance. Engineering samples are already running ML workloads in the lab at production target frequency and power, including GPT-5.3-Codex-Spark. The chip was co-developed with Broadcom (silicon implementation and Tomahawk networking) and Celestica (board, rack, and system integration).

The chip is the first step in a multi-generation compute platform designed for initial deployment by the end of 2026, scaling to gigawatt-level data centers. OpenAI also used its own models to accelerate parts of the chip design process — creating a flywheel where the same models served to users helped improve the infrastructure used to run future models. The chip's development expands OpenAI's full-stack strategy spanning models, products, and now custom silicon, with the explicit goal of making inference cheaper, faster, and more reliable at scale.

**Why it matters:** Jalapeño marks OpenAI's transition from a model and product company to a full-stack AI infrastructure player — custom silicon gives it direct control over the cost and latency of serving its models, which is the single biggest lever for making frontier AI more accessible and economically sustainable at planetary scale.
