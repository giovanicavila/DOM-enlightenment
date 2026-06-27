---
title: "Google DeepMind Adds Native Computer Use to Gemini 3.5 Flash"
description: "Computer use is now a built-in tool in Gemini 3.5 Flash, enabling developers to build agents that see, reason, and take action across browser, mobile, and desktop environments."
publishedAt: 2026-06-27
source: "Google AI Blog"
sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-computer-use-gemini-3-5-flash/"
---

Google DeepMind announced that computer use is now a **native built-in tool** in Gemini 3.5 Flash, moving the capability from a standalone experimental model into the main production model. Previously available only as a separate Gemini 2.5 computer use model, the integration means any developer using Gemini 3.5 Flash can now build agents that see, reason, and act across browsers, mobile apps, and desktop interfaces — without stitching together separate components.

The feature arrives with simplified actions via intents, built-in support for all three environment types, and configurable safety policies. Google also released two optional enterprise safeguard systems: one that requires explicit user confirmation for sensitive or irreversible actions, and another that automatically stops tasks if an indirect prompt injection is detected. The company recommends a "defense-in-depth" approach combining these with sandboxing and human-in-the-loop verification.

Early adopters are already reporting strong results. Browserbase, Browser Use, and UiPath have integrated the capability into their agent platforms for use cases ranging from continuous software testing to enterprise knowledge work automation. The computer use tool is available via the Gemini API and the Gemini Enterprise Agent Platform.

Why it matters: Making computer use a native model capability rather than a separate service dramatically lowers the barrier for building production-grade AI agents — developers can now deploy autonomous browser-and-desktop agents with a single API call rather than complex orchestrations of multiple models and tools.
