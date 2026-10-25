---
kind: ai-assistant
slug: manufacturers
title: "An AI assistant for a manufacturer: where to start"
answer: >
  For a manufacturer, start with how-to questions answered from the system's own help guide, for each person's
  departments, and add live-data questions (stock, purchase orders, approvals) once the owner has decided what may
  be sent to the AI provider. That is where Ember stands at a boiler manufacturer: how-to answers live, live data
  built and switched off.
description: "An AI assistant for a manufacturing ERP: start with how-to answers from your own help guide, then stock, purchase and approval questions, and how to check it."
domain: [ai, manufacturing, selection]
published: 2026-10-25
updated: 2026-10-25
checked: 2026-10-25
image:
  src: /ai/ai-manufacturers.webp
  alt: "A round steel pressure gauge on a short pipe stub."
  width: 1086
  height: 362
---

A manufacturing system has many departments and many screens, and most questions on the shop floor and in the office are "how do I". That is the safest place for an assistant to start: the answers come from the system's own help guide, and no business data leaves.

## Step 1: how-to answers from your own guide

The assistant picks the right section of the help guide for the question, from the departments the person works in, and answers from it with a link to the screen. Questions like:

- How do I raise a purchase request?
- How do I send a packing list for approval before dispatch?
- How do I assign test certificates to units?
- Where do I change my password?

Unrelated questions ("write me a poem") should get a fixed reply that never reaches a writing model. Each person gets a daily question limit set per department.

## Step 2: live data, when the owner decides

Stock on hand, items below minimum, purchase orders not received, an order's value and payments, approvals waiting. These need a decision first: in a design where the rows are worded by a writing model, the rows of each answer are sent to the AI provider. The owner should approve that by name, and each look-up should follow the same department limits as the screens. The [data safety guide](/ai-assistant/data-safety) sets out what to ask.

## How Ember does it

Ember is the assistant in a boiler manufacturer's system, open to staff. How-to answers are live; the live-data look-ups are built and switched off until the client records its approval. Job-card and work-in-progress questions are not built yet. On the [boiler demo](https://boiler-erp.ahromlabs.com/demo), with a sample company, live data is on: anyone can ask it two questions. Every question it handles is listed below.

## How to check a vendor's

Ask ten how-to questions from your own process and follow the answers: do the steps work? Then run the [vendor test](/ai-assistant/vendor-test). For the system itself, see the [ERP guide for small manufacturers](/erp/small-manufacturers).
