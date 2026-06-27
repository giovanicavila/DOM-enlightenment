---
title: "MIRA: Autonomous Medical AI Agent Outperforms Physicians in Clinical Decision-Making"
description: "Published in Nature, MIRA is an autonomous AI agent operating within a sandboxed EHR environment that outperformed physicians in diagnostic accuracy and treatment planning across real patient cases."
publishedAt: 2026-06-27
source: "Nature"
sourceUrl: "https://www.nature.com/articles/s41586-026-10675-5"
---

A landmark study published in Nature on June 17, 2026, introduced MIRA (Medical Intelligence for Reasoning and Action) — an autonomous AI agent that operates within a sandboxed electronic health record (EHR) environment and performs clinical decision-making at or above physician level. Unlike prior LLM applications in healthcare that addressed isolated subtasks or provided free-text advice, MIRA can navigate the full clinical action space: obtain patient histories, order and interpret laboratory tests and imaging, generate differential diagnoses, and formulate treatment plans including prescribing medications, scheduling surgical procedures, and planning admissions.

In simulations on real patient cases spanning multiple diagnoses, MIRA outperformed physicians in diagnostic accuracy and made guideline-concordant, medication-safe admission decisions. The system demonstrated strong medication safety across renal dosing, drug interactions, allergies, QT prolongation, and opioid risk. Follow-up evaluations showed stable performance under bias-perturbation scenarios, suggesting robustness against distribution shifts common in clinical practice.

MIRA is built on a general-purpose, standards-compliant framework designed to integrate with existing EHR infrastructure — a critical distinction from narrow, chat-based clinical AI tools. The authors emphasize that further work is needed to establish generalization, safety, and governance through prospective real-world studies, but the results represent a proof-of-concept that an EHR-integrated AI agent can turn clinical intent into structured, accountable actions.

**Why it matters:** MIRA demonstrates that autonomous AI agents can navigate the full complexity of clinical workflows — not just answer questions but order tests, interpret results, and manage treatment — at a level that exceeds human physicians in controlled simulations. This marks a significant step toward AI systems that function as genuine decision-support partners in healthcare, rather than narrow chat tools.
