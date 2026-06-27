---
title: "Gemini 3.5 Flash Gets Built-In Computer Use for Cross-Platform AI Agents"
description: "Google DeepMind integrated computer use as a native tool in Gemini 3.5 Flash, enabling developers to build agents that can see, reason, and act across browser, mobile, and desktop environments."
publishedAt: 2026-06-27
source: "Google Blog"
sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-computer-use-gemini-3-5-flash/"
---

Google DeepMind announced on June 24, 2026 that computer use is now a built-in tool in Gemini 3.5 Flash, marking a significant maturation of the model's agentic capabilities. Previously available only as a standalone Gemini 2.5 computer use model, the capability is now integrated natively into the main Flash model — giving developers a unified API for building agents that interact with graphical interfaces across operating systems.

The integration means Gemini 3.5 Flash can now see screen content, reason about it, and take actions such as clicking buttons, filling forms, navigating menus, and interacting with desktop applications — all through the same API that handles function calling, Search grounding, and Maps integration. Google reports that this unified approach delivers its best performance yet for agentic computer use tasks, unlocking improvements for long-horizon automation scenarios like continuous software testing, enterprise workflow automation, and knowledge work across professional applications.

To address the heightened security risks of agents operating in live environments, Google deployed targeted adversarial training for prompt injection resistance — a critical concern when models can click buttons and submit forms. Two optional enterprise safeguard systems are also available: one requiring explicit user confirmation for sensitive or irreversible actions, and another that automatically stops tasks if an indirect prompt injection is identified. Google recommends a "defense-in-depth" approach combining these features with secure sandboxing and human-in-the-loop verification.

Developers can start building with computer use via the Gemini API and the Gemini Enterprise Agent Platform. Google also released a demo environment hosted by Browserbase for hands-on testing, alongside a reference implementation on GitHub.

**Why it matters:** Making computer use a native, built-in capability in the main model — rather than a separate product — signals that GUI-level agentic interaction is becoming a standard expectation for AI models. This could accelerate the shift from chat-based assistants to autonomous agents that operate software on behalf of users.
