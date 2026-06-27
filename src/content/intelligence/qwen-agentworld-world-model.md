---
title: "Qwen Releases AgentWorld: Open-Source World Model That Simulates 7 Agent Environments"
description: "Alibaba's Qwen team launched the first language world model capable of simulating diverse agentic environments, enabling cheaper and faster agent training without real infrastructure."
publishedAt: 2026-06-23
source: "arXiv"
sourceUrl: "https://arxiv.org/abs/2606.24597"
---

Alibaba's Qwen team has released **Qwen-AgentWorld**, a family of language world models trained to simulate agent environments rather than just act in them. The models — available in 35B-A3B and 397B-A17B MoE variants — can simulate seven distinct agent domains including terminals, web browsers, Android devices, and more, using long chain-of-thought reasoning to predict environment state transitions.

The core idea is simple but powerful: instead of spinning up real terminals, browsers, or devices to train AI agents — which is expensive, slow, and hard to control — Qwen-AgentWorld predicts exactly what those environments would return after any action. The models were trained on over 10 million real-world interaction trajectories across 7 domains using a three-stage pipeline: continual pre-training to inject world modeling capabilities, supervised fine-tuning for next-state prediction reasoning, and reinforcement learning to sharpen simulation fidelity.

The team also released **AgentWorldBench**, a benchmark built from real-world interactions of 5 frontier models across 9 established benchmarks. Results show Qwen-AgentWorld significantly outperforms existing frontier models at environment simulation. Beyond serving as a drop-in simulator, the world model approach also works as a warm-up for downstream agent training — improving performance across 7 agentic benchmarks compared to training on real environments alone.

Why it matters: Qwen-AgentWorld provides an unlimited, cheap, and controllable sandbox for training AI agents, addressing a fundamental bottleneck in agentic AI development — the cost and complexity of real environment interaction.
