---
title: "Qwen-AgentWorld: Open-Source Language World Models That Simulate 7 Agent Environments"
description: "Alibaba's Qwen team released the first language world models capable of simulating seven diverse agentic environments, outperforming GPT and Claude on environment simulation while enabling cheaper, controllable agent training."
publishedAt: 2026-06-27
source: "ArXiv / Qwen Team"
sourceUrl: "https://arxiv.org/abs/2606.24597"
---

The Qwen team at Alibaba released **Qwen-AgentWorld** on June 23, 2026 — the first family of open-source language world models (LWMs) capable of simulating agentic environments across seven domains: MCP tools, web search, terminal, software engineering (SWE), Android, web browsing, and desktop OS. Rather than training agents directly in expensive, slow real environments, Qwen-AgentWorld acts as a "flight simulator for AI agents" — predicting what an environment would return after any action, enabling unlimited, cheap, and controllable agent training. The models come in two sizes: Qwen-AgentWorld-35B-A3B and Qwen-AgentWorld-397B-A17B.

The models are trained on more than 10 million real-world environment interaction trajectories through a three-stage pipeline: Continual Pre-Training (CPT) injects world modeling capabilities from state transition dynamics, Supervised Fine-Tuning (SFT) activates next-state-prediction reasoning, and Reinforcement Learning (RL) sharpens simulation fidelity using a hybrid rubric-and-rule reward system. The evaluation benchmark, AgentWorldBench, is constructed from real interactions of 5 frontier models across 9 established benchmarks. Qwen-AgentWorld-397B significantly outperforms existing frontier models (including GPT and Claude) on environment simulation fidelity across both text-based and GUI domains.

Beyond pure simulation, the team demonstrated two powerful applications. First, as a decoupled simulator, Qwen-AgentWorld enables scalable, controllable RL training across thousands of environments, yielding gains that surpass real-environment training alone — including +12.3 on MCPMark and +16.3 on WideSearch. Second, world-model training acts as a meta-reasoning warm-up for agents, improving downstream performance across 7 agentic benchmarks including Terminal-Bench, SWE-Bench, and BFCL-v4. The model weights, code, and benchmark are available on GitHub under an open-source license.

**Why it matters:** Qwen-AgentWorld inverts the traditional agent training paradigm — instead of running expensive real environments for every training iteration, a single world model can simulate thousands of environments cheaply and controllably, potentially democratizing agentic RL research and making it accessible to teams without massive infrastructure budgets.
