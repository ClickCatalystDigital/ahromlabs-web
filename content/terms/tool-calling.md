---
kind: term
slug: tool-calling
title: "Tool calling"
answer: >
  The way an AI model uses software: instead of answering from memory, it asks for a named tool to be run with certain inputs, reads the result, and answers from it.
domain: [truth]
order: 21
published: 2026-11-14
updated: 2026-11-14
---

Tool calling is what lets an assistant give a figure it didn't make up: the model asks for the receivables look-up for a customer, code runs it, and the model reads the rows back. The safety of the whole design rests on which tools exist and what each is allowed to do. A tool that runs any database query is very different from one that runs one tested, read-only look-up.

See [fixed look-up](/systems/fixed-look-up), [Model Context Protocol](/systems/model-context-protocol) and [how it works](/ai-assistant/how-it-works).
