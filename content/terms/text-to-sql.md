---
kind: term
slug: text-to-sql
title: "Text-to-SQL"
answer: >
  An AI design where the model writes a database query from the user's question and the result is shown as the
  answer; flexible, but the model decides the maths, so a query that is slightly wrong gives a figure that is
  slightly wrong.
domain: [truth]
order: 15
published: 2026-10-25
updated: 2026-11-07
---

It matters because a buyer can't see the query, only the number, so a query that joins the wrong table or misses a filter gives a confident wrong figure. It is flexible, which is why demos use it; the cost is that every answer needs checking against the screens.

The alternative is a [fixed look-up](/systems/fixed-look-up) per question type; the trade-off is set out in [how an AI assistant answers from your records](/ai-assistant/how-it-works), and how to test any vendor's in [AI in ERP](/ai-assistant/ai-in-erp). Search over documents, rather than figures, is [retrieval and knowledge graphs](/services/rag-knowledge-graphs).
