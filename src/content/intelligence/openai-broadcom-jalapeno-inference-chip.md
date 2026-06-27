---
title: "OpenAI and Broadcom Unveil Jalapeño, Their First Custom LLM Inference Chip"
description: "OpenAI's first Intelligence Processor, co-developed with Broadcom in a record nine months, promises substantially better performance per watt than current state-of-the-art accelerators and will deploy at gigawatt scale starting in 2026."
publishedAt: 2026-06-27
source: "OpenAI Blog"
sourceUrl: "https://openai.com/index/openai-broadcom-jalapeno-inference-chip/"
---

OpenAI and Broadcom unveiled Jalapeño on June 24, 2026 — OpenAI's first custom Intelligence Processor, purpose-built for LLM inference. Designed from a blank slate around the inference patterns of modern large language models, Jalapeño is not a general-purpose accelerator adapted from earlier AI workloads but an ASIC architected specifically for the kernels, memory movement, and serving patterns that matter most for frontier AI. Early testing shows performance per watt "substantially better than current state-of-the-art," with a detailed technical report expected in the coming months.

The chip was co-developed from initial design to manufacturing tape-out in just nine months — reportedly the fastest ASIC development cycle ever achieved in high-performance semiconductors. OpenAI used its own models to accelerate parts of the design and optimization process, creating a virtuous loop where the same models served to users help improve the infrastructure running future models. Broadcom contributed silicon implementation, Tomahawk networking silicon, and manufacturing expertise, while Celestica handled board, rack, and system integration.

Jalapeño is the first step in a multi-generation compute platform. Initial deployment is targeted for end of 2026 at prototype scale, with gigawatt-scale data center deployment planned for 2027+ alongside Microsoft and other partners. OpenAI frames the chip as a critical pillar of its full-stack strategy — spanning products, models, and now silicon — to make AI faster, more reliable, and more affordable. Engineering samples are already running GPT-5.3-Codex-Spark at production target frequency and power in lab conditions.

**Why it matters:** By bringing chip design in-house, OpenAI gains the ability to optimize the entire inference stack from silicon to serving — reducing dependence on NVIDIA, lowering inference costs, and potentially reshaping the economics of frontier AI deployment at scale. The nine-month tape-out cycle also demonstrates that AI-accelerated chip design is becoming a practical competitive advantage.
