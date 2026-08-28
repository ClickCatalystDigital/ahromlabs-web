---
kind: pattern
slug: human-confirmed-extraction
title: AI drafts, a person confirms — never auto-post extracted data
answer: >
  AI-based document extraction is fast but not perfect — even a good system
  leaves some share of documents needing correction. Post nothing
  automatically: every extraction sits in a review state until a person
  approves it. The cost is a manual step on every document; the alternative
  is trusting unreviewed numbers with real money.
domain: [ai-extraction, human-in-the-loop]
systems: [ls-crm]
evidence:
  - metric: purchase invoice zero-correction rate
    value: 94%
  - metric: bank statement zero-correction rate (hardest document type)
    value: 89%
published: 2026-08-29
updated: 2026-08-29
---

## Context

LLM-based document extraction is fast — a purchase invoice comes back parsed in seconds — but it isn't perfect. Even a well-tuned pipeline leaves a meaningful share of documents needing a correction before the numbers are right.

## Decision

Every extracted document sits in a review state. Nothing downstream — a posting, a saved record, anything else — happens until a person looks at it and approves it. The model drafts; it never commits on its own.

## Why

A wrong number in a financial posting is expensive to unwind after the fact — tracing it, reversing it, re-entering it correctly. A short review before it goes anywhere is cheaper than a correction after it's already downstream. Even at a 94% zero-correction rate on the best-performing document type, a meaningful share still needs a human to catch it.

## Trade-off

Every document gets a manual step and some latency it wouldn't have with straight auto-posting. That's the deliberate cost — the alternative is trusting an unreviewed model with money.

The same decision has been made independently a second time, in a separate engagement, for a completely different kind of document — not an accounting record at all. Same reasoning, same conclusion: AI drafts, a person confirms.
