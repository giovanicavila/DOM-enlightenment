---
title: "Meta's Brain2Qwerty v2 Decodes Sentences From Brain Activity Without Surgery"
description: "Meta FAIR's latest non-invasive brain-to-text model achieves 39% word error rate using MEG scans, narrowing the gap with surgical implants through data scaling."
publishedAt: 2026-07-02
source: "Meta AI Blog"
sourceUrl: "https://ai.meta.com/blog/brain2qwerty-brain-ai-human-communication/"
---

Meta's FAIR research team released **Brain2Qwerty v2** on June 29, a model that reconstructs full typed sentences from non-invasive magnetoencephalography (MEG) recordings. The average word error rate drops to 39%, with the best participant achieving 22% WER — a significant improvement over version 1 and earlier non-invasive systems that managed only single-digit accuracy.

The system collects 22,000 typed sentences per participant (nine subjects, ~10 hours each) and uses a three-stage AI pipeline: a deep learning model converts raw MEG signals into characters, a second model stitches characters into words, and a fine-tuned large language model uses context to guess the intended sentence. The team showed that decoding accuracy improves log-linearly with data volume, suggesting the gap with invasive implants (which achieve <2% WER) can be partially bridged through scaling.

The research also deployed AI agents to iteratively refine the decoding pipeline itself, though human engineers retained final control. The current system requires a room-sized MEG scanner and cannot operate in real time, but the team points to portable MEG sensors that work at room temperature as a path toward clinical use.

**Why it matters:** This is the first demonstration that non-invasive brain-to-text can operate at a level of accuracy previously thought exclusive to surgical implants, opening a safer path toward brain-computer interfaces for people with severe motor impairments.
