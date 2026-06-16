---
title: "Agentic RAG"
description: "A Retrieval-Augmented Generation API with hybrid search (BM25 + vector + RRF), agentic self-correction loop, and full observability. Built to be model-agnostic — swapping from OpenRouter to Ollama requires zero code changes."
url: "https://github.com/giovanicavila/Agentic_RAG"
githubUrl: "https://github.com/giovanicavila/Agentic_RAG"
image: "/images/r2d2.jpeg"
artistUrl: "https://br.pinterest.com/pin/1126040713104471571/"
featured: true
techs: ["FastAPI", "Python", "ChromaDB", "BM25", "RRF", "sentence-transformers", "RAGAS", "Pydantic"]
---

<div class="tab-content" data-tab="technical">

## Overview

This is a **Retrieval-Augmented Generation (RAG) API** built with FastAPI. It answers user questions by retrieving relevant document chunks using **hybrid search** (BM25 + vector similarity fused via Reciprocal Rank Fusion) and generating grounded responses via an LLM. The system includes an **agentic self-correction loop** that plans, retrieves, grades, and rewrites queries until relevant context is found.

### Core Philosophy

- **Model-agnostic:** Never tied to a single LLM or embedding provider. All external model calls go through abstract interfaces.
- **Provider Pattern:** Swapping from OpenRouter to Ollama or from local embeddings to OpenAI requires zero code changes — only environment variable updates.
- **Zero business logic in HTTP layer:** `routes.py` only validates and delegates. All intelligence lives in `core/`.
- **Agentic self-correction:** The system doesn't just retrieve once. It plans, retrieves, grades, and rewrites until it finds relevant context.
- **Hybrid search first:** Combining lexical (BM25) and semantic (vector) search through RRF produces more robust retrieval than either method alone.
- **Observability built-in:** A dedicated explain endpoint lets developers inspect every stage of the retrieval pipeline without invoking the LLM.

---

## Technology Stack

| Component | Technology |
|-----------|------------|
| Web Framework | FastAPI + Pydantic v2 |
| Vector Store | ChromaDB (local, persistent, on-disk) |
| Lexical Search | BM25Okapi via `rank-bm25` |
| Hybrid Fusion | Reciprocal Rank Fusion (RRF) |
| Embeddings | sentence-transformers or OpenAI-compatible APIs |
| LLM Generation | OpenAI-compatible APIs (OpenRouter, Ollama, OpenAI) |
| Semantic Chunking | Chonkie (SemanticChunker) |
| Evaluation | RAGAS |
| Orchestration | Custom agent loop (not LangChain) |

---

## Architecture

The system follows a layered architecture with clear separation of concerns:

```
main.py
  │
  ├── routes.py ← HTTP endpoints (thin, validation only)
  │     │
  │     └── pipeline.py ← Agentic RAG loop
  │           │
  │           ├── planner.py ──► decide: retrieve or direct answer
  │           ├── grader.py  ──► is the context relevant?
  │           ├── rewriter.py ──► reformulate vague queries
  │           └── retriever.py ──► Hybrid (BM25 + Vector + RRF)
  │
  ├── generation/ ← BaseLLM → OpenAICompatibleLLM
  ├── embeddings/ ← BaseEmbedder → SentenceTransformers / OpenAI
  └── schemas.py  ← Pydantic request/response models
```

### The Agentic Loop

The pipeline runs an adaptive agent loop with up to 3 retrieval attempts:

1. **Planner** decides: "retrieve" or "direct answer"
2. If "direct" → LLM generates from parametric memory, done
3. For up to 3 attempts:
   - **Retrieve** chunks via HybridRetriever (BM25 + Vector + RRF)
   - **Grade** if context is relevant to question
   - If relevant → build prompt, generate answer, done
   - If not → **Rewriter** reformulates query, retry
4. **Fallback**: if nothing found after 3 attempts → direct answer

### Dual LLM Pattern

The system uses two LLMs — a cheap/fast one for agent tasks and a powerful one for final answers:

| LLM | Role |
|-----|------|
| `agent_llm` (cheap) | Planner, Grader, Rewriter |
| `llm` (powerful) | Final RAG answer, direct answer |

---

## Hybrid Search: BM25 + Vector + RRF

Vector search excels at semantic similarity but fails on exact keyword matches. BM25 excels at keyword matching but ignores semantics. Hybrid search combines both via **Reciprocal Rank Fusion (RRF)**.

```
Query enters
  ├── VectorRetriever: embed query → ChromaDB → cosine similarity
  └── BM25Retriever: tokenize → BM25Okapi scores → raw rankings
        │
        └── RRF Fusion: 1/(k + rank_vec) + 1/(k + rank_bm25)
              │
              ▼
        Final ranked results (top_k)
```

**RRF** is used over score averaging because rankings are more comparable across heterogeneous systems (BM25 scores and cosine similarity operate on completely different scales).

---

## Retrieval Observability

The `/api/v1/retrieval/explain` endpoint lets developers debug the pipeline **without invoking the LLM**. It returns:

- Raw BM25 scores (unnormalized)
- Vector similarity scores
- RRF-fused hybrid results with per-document contributions

This makes debugging retrieval transparent — you can see exactly why a document was ranked where it was.

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| No LangChain | Custom agent loop is ~300 lines vs 1000+ with LCEL |
| Hybrid search | Vector search misses keywords; BM25 misses semantics |
| RRF over weighted sum | Rankings are more comparable than scores across systems |
| Separate agent LLM | Cheaper model for frequent agent calls reduces cost |
| Semantic chunking | Respects sentence/paragraph boundaries using embedding shifts |
| Singleton factories | Embedding models are ~100MB+; per-request instantiation is wasteful |
| Explain endpoint | Observability is a first-class feature, not an afterthought |

---

## Evaluation with RAGAS

The system includes a full evaluation pipeline using RAGAS metrics:

- **Quick mode:** context_precision, answer_relevancy
- **Full mode:** all metrics including faithfulness and context_recall
- Custom JSON datasets with questions and ground truth

Run with: `python -m evaluation.cli --mode full`

</div>

<div class="tab-content" data-tab="non-technical" style="display:none">

## Overview

Imagine you have a huge library of books and need to find answers to specific questions. Instead of reading every book cover to cover, you have a smart assistant that can search through all of them at once, find the most relevant passages, and give you a precise answer. If the first search doesn't find great results, it tries again with different keywords until it gets it right.

This system does exactly that — it searches through documents using multiple methods, checks if the results are actually useful, and keeps trying until it finds what you need. It's like having a research librarian who never gives up and always finds the answer.

### How it works (simplified)

1. **You ask a question** — "What is the capital of France?"
2. **The system searches** — It looks through documents using two methods at once: keyword matching (like Ctrl+F on steroids) and meaning-based search (understanding concepts, not just words)
3. **It checks the results** — "Did I actually find something useful?"
4. **If not, it tries again** — It rephrases your question and searches differently
5. **It answers** — Once it finds good information, it generates a clear answer

### What makes it smart

- **Hybrid search:** Combines the best of keyword search (like Google) and semantic search (understanding meaning) for more accurate results
- **Self-correction:** If it doesn't find good information, it doesn't just give up — it rethinks and tries again
- **Flexible:** Works with different AI models — you can swap between them without changing the code

**In simple terms:** A smart search engine that doesn't just find documents — it reads them, understands them, and gives you direct answers, trying multiple approaches until it gets it right.

</div>
