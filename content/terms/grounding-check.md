---
kind: term
slug: grounding-check
title: "Grounding check"
answer: >
  A check that every figure in an AI answer appears in the data the answer was built from; a sentence that fails
  it is dropped instead of shown.
domain: [truth]
order: 13
published: 2026-10-25
updated: 2026-11-07
---

It matters because an AI answer with a nearly right number looks exactly like a right one; the check is what keeps such a sentence from being shown. Ahrom Labs' assistants run it on every written line before it appears, and drop any sentence with a figure that isn't in the table the answer came from.

You can run the same check on any vendor's assistant with the [number check](/ai-assistant/number-check); why it matters is in [how it works](/ai-assistant/how-it-works), and the wider failure it guards against is an [AI hallucination](/systems/ai-hallucination).
