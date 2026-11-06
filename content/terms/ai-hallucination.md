---
kind: term
slug: ai-hallucination
title: "AI hallucination"
answer: >
  When an AI model states something that isn't in the data it was given, such as a total it added up wrong, a
  rounded figure or a name it invented, in the same confident tone as a true answer.
domain: [truth]
order: 12
published: 2026-10-25
updated: 2026-11-07
---

It matters most in a business system, where the dangerous kind is a number that is nearly right: a total off by one invoice reads as true and gets acted on. Better prompts reduce it but don't rule it out.

The way to rule it out is to keep the model away from the numbers, as described in [how an AI assistant answers from your records](/ai-assistant/how-it-works); the way to catch it is a [grounding check](/systems/grounding-check), which you can run yourself with the [number check](/ai-assistant/number-check). How to test a vendor for it is in [AI in ERP](/ai-assistant/ai-in-erp).
