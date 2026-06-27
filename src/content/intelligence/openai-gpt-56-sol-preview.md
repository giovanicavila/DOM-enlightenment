---
title: "OpenAI Previews GPT-5.6 Sol, Terra, and Luna — Introducing 'Ultra' Subagent Mode"
description: "OpenAI unveiled its next-generation GPT-5.6 family with Sol as the flagship, featuring a new 'max' reasoning effort and 'ultra' subagent mode for complex agentic tasks across coding, biology, and cybersecurity."
publishedAt: 2026-06-27
source: "OpenAI Blog"
sourceUrl: "https://openai.com/index/previewing-gpt-5-6-sol/"
---

OpenAI announced the GPT-5.6 series on June 26, 2026, introducing three new models under a refreshed naming system: **Sol** (flagship), **Terra** (balanced), and **Luna** (fast and affordable). The tiered lineup gives developers clearer trade-offs across intelligence, speed, and cost. Terra matches GPT-5.5's performance at half the price, while Luna delivers strong capability at the lowest cost tier to date.

GPT-5.6 Sol introduces two new reasoning modes: `max` reasoning effort for deep thinking on hard problems, and `ultra` mode — a novel architecture that goes beyond single-agent capabilities by dynamically spawning subagents to parallelize complex work. On Terminal-Bench 2.1, which tests command-line workflows requiring planning and tool coordination, Sol sets a new state of the art. In biology, it achieves stronger results on GeneBench v1 than GPT-5.5 while using fewer tokens. For cybersecurity, Sol is competitive with Anthropic's Mythos Preview on ExploitBench while using roughly one-third of the output tokens.

Safety is a central theme of the release. OpenAI dedicated over 700,000 A100-equivalent GPU hours to automated red-teaming, deployed layered safeguards including real-time output classifiers, and implemented account-level review for cross-context risk detection. The company also built targeted adversarial training for prompt injection resistance. Sol did not cross the Cyber Critical threshold under OpenAI's Preparedness Framework, though the company acknowledges benchmark limitations and has paired the release with phased access.

Pricing is set at $5/$30 per million tokens (input/output) for Sol, $2.50/$15 for Terra, and $1/$6 for Luna. OpenAI also announced a partnership with Cerebras to deliver Sol at up to 750 tokens per second starting in July. The preview is initially limited to select trusted partners, with broader availability planned in the coming weeks.

**Why it matters:** GPT-5.6 Sol represents a meaningful step in agentic AI capability, particularly through the ultra subagent architecture. Combined with aggressive pricing and the Cerebras speed partnership, OpenAI is pushing both the performance ceiling and the cost floor of frontier AI simultaneously.
