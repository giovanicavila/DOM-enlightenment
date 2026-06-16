---
title: "Voice OpenCode"
description: "A real-time voice-controlled daemon that transcribes microphone audio via Whisper and routes it as commands or prompts to OpenCode — enabling hands-free AI pair programming from the terminal."
url: "https://github.com/giovanicavila/opencode-voice-commands"
githubUrl: "https://github.com/giovanicavila/opencode-voice-commands"
image: "/images/speech.jpeg"
artistUrl: "https://br.pinterest.com/pin/23855073020481208/"
featured: true
techs: ["Python", "Whisper", "PortAudio", "Rich", "NumPy", "scipy", "uv", "VAD"]
---

<div class="tab-content" data-tab="technical">

## Overview

Voice OpenCode is a **Python daemon** that runs in the background, listening to your microphone and translating speech into OpenCode commands. At its core it chains four responsibilities: capture audio in real time, transcribe it with Whisper, classify the transcribed text as a command or prompt, and execute it via `opencode run` as a subprocess.

### Key Features

- **Real-time audio capture:** Uses `sounddevice` (PortAudio bindings) to stream 16kHz mono audio in 0.5-second chunks
- **Energy-based VAD:** Simple RMS thresholding with a rolling pre-buffer to avoid clipping utterance onsets
- **Whisper STT:** Local speech-to-text via `openai-whisper` (base.en model), running entirely on-device
- **State machine:** `IDLE` ↔ `ACCUMULATING` modes allow trigger keywords, prompt accumulation, and command dispatch
- **OpenCode integration:** Launches `opencode run "<prompt>"` in a daemon thread — the VAD loop continues while the LLM responds
- **Rich terminal UI:** Styled startup panel showing model, agent, and available voice commands

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    voice-opencode                        │
│                                                          │
│  1. CAPTURE    microphone audio in real time             │
│       ↓                                                  │
│  2. TRANSCRIBE audio → text (Whisper STT model)          │
│       ↓                                                  │
│  3. ROUTE      text → voice command or prompt buffer     │
│       ↓                                                  │
│  4. EXECUTE    opencode run "<prompt>" as a subprocess   │
└──────────────────────────────────────────────────────────┘
```

### Voice Activity Detection

The VAD uses a simple energy-based approach with a rolling pre-buffer:

- Each 0.5s chunk is evaluated via RMS energy against a threshold
- A 3-chunk (1.5s) rolling `deque` prepends audio before speech onset — preventing clipped recordings
- Speech ends after 4 consecutive silent chunks (~2s)
- Tunable constants: `SILENCE_THRESHOLD`, `SILENCE_CHUNKS_TO_STOP`, `PRE_SPEECH_BUFFER`

### State Machine

```
          ┌─────────────────────────────────────────┐
          │                                         │
          ▼                                         │
        IDLE  ──── "input" / "hey code" ────→  ACCUMULATING
          ▲                                         │
          │                                         │
          ├──────── "cancel" / "clear" ─────────────┤
          │                                         │
          └──────── "send" / "run" ─────────────────┘
                    (fires opencode run)
```

In `IDLE`: only trigger commands are recognized. In `ACCUMULATING`: speech is appended to a prompt buffer until `send` or `cancel` is detected.

### Command Matching

Substring matching against priority-ordered command sets: quit → cancel → send → start. This ordering ensures quit always works regardless of mode.

---

## Technology Stack

| Component | Technology |
|-----------|------------|
| Audio Capture | sounddevice (PortAudio) |
| Speech-to-Text | openai-whisper (base.en) |
| VAD | Energy-based RMS thresholding |
| Terminal UI | rich (Panel, Console, markup) |
| Packaging | uv tool install (isolated venv) |
| Runtime | Python ≥3.10 |

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| `subprocess.run` over Python SDK | Decouples from OpenCode's internal API; survives SDK changes |
| Energy VAD over neural VAD | Simpler, zero dependencies, sufficient for clean mic input |
| `fp16=False` | Ensures CPU compatibility; half-precision unsupported on non-NVIDIA hardware |
| Pre-buffer deque | Prevents first ~0.5s of utterance from being cut off |
| `uv tool install` | Global CLI install without manual venv management |
| Daemon thread for execution | VAD loop continues while OpenCode processes the prompt |

---

## Packaging

The project uses `pyproject.toml` with a `[project.scripts]` entrypoint:

```toml
[project.scripts]
voice-opencode = "voice_opencode:main"
```

Installed via `uv tool install .`, which creates an isolated venv and exposes the `voice-opencode` binary globally. Dependencies include `openai-whisper`, `sounddevice`, `numpy`, `scipy`, and `rich`.

</div>

<div class="tab-content" data-tab="non-technical" style="display:none">

## Overview

Imagine having a programming assistant that you can talk to instead of type. Voice OpenCode turns your microphone into a hands-free coding tool — you speak, it listens, transcribes what you said, and sends it as a command to your AI coding assistant.

Think of it like a voice-activated intercom for your development environment. Instead of typing "refactor this function" you just say it out loud, and the system handles the rest.

### How it works (simplified)

1. **You speak** — say "input" to start, then dictate your prompt naturally
2. **It listens** — the daemon captures audio from your microphone in real time
3. **It transcribes** — Whisper (the same tech behind OpenAI's speech recognition) converts your speech to text, all on your own computer
4. **It executes** — the text is sent to OpenCode, which processes it and performs the requested task

### What makes it special

- **Hands-free coding:** Dictate prompts, commands, and queries without touching the keyboard — great for accessibility, multitasking, or just convenience
- **Runs entirely locally:** Your microphone audio never leaves your machine — Whisper runs locally, preserving privacy
- **Smart state machine:** The system knows when you're giving a command ("send", "cancel") versus dictating a prompt, so accidental words don't trigger actions
- **Always listening:** Once started, it runs in the background, ready for your voice — like having a copilot that's always paying attention

**In simple terms:** A voice-controlled assistant for coding — speak naturally, and your AI programming companion does the work.

</div>
