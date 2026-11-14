---
kind: ai-assistant
slug: ohm-ai
title: "Ohm AI: the AI assistant for electronic component traders"
metaTitle: "Ohm AI: AI assistant for electronic component traders"
related:
  - /ai-assistant/trading-distribution
  - /industries/electronics-component-trading
  - /ai-assistant/mcp-for-erp
  - /ai-assistant/actions-and-approvals
  - /ai-assistant/questions
question: "What is Ohm AI and what does it answer?"
answer: >
  Ohm AI is the assistant inside Inventory Ops, the system we built for LS Technologies, an electronic component trader with two stores. It answers stock questions reel by reel (what is running low, what hasn't shipped in 30 days, where a reel went, which customers have stopped ordering) from the system's own records, prepares changes for approval, and can be used from ChatGPT or Claude by the admin who connects it.
description: "Ohm AI in Inventory Ops: stock, reels, dead stock, stock-outs and quiet customers for electronic component traders, its actions, ChatGPT access, episodes."
domain: [ai, assistant]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
---

## What is Ohm AI?

Ohm AI is the assistant built into Inventory Ops, the stock and order system we built for LS Technologies, an
electronic component trader with two stores, and run as a public demo with a made-up distributor. It answers about
parts, reels, stores, customers and purchase orders in plain words, from the system's records.

## What does Ohm AI answer?

| Need | Example questions |
|---|---|
| Stock | "Do we stock a particular part?" "How many reels of an item do we have, in each store?" |
| Running out | "What is running low?" "Which items will run out in 30 days?" |
| Dead stock | "Which items haven't shipped in 30 days?" |
| Tracing | "Where is a particular reel?" "What moved between our two stores this month?" |
| Customers | "What did we ship to a customer in September?" "Which customers have stopped ordering?" |
| The day | "What happened today?" "Are any approval requests waiting?" |
| Orders | "Which purchase orders are confirmed but not dispatched?" |

All of these are answered today. "Which items will run out in 30 days?" shows its rule: stock divided by the average
pieces shipped per day over the last 90 days. The full list is in
[AI assistant for traders and distributors](/ai-assistant/trading-distribution).

## What does Ohm AI refuse?

Anything the system doesn't hold. Inventory Ops keeps stock and orders, not money, so "how much does a customer owe
us?" gets "the data doesn't have that" instead of a guess. Off-topic requests get a fixed reply.

## What can Ohm AI change?

It prepares changes as cards for approval, with Manual or Auto and a 30-minute Undo, under the same rules as every
assistant we build. See [actions and approvals](/ai-assistant/actions-and-approvals).

## Can I use Ohm AI from ChatGPT or Claude?

Yes: the admin who connects it adds Inventory Ops as a connector and asks Ohm AI from the AI app. It is off in the
public demo. See [MCP for ERP](/ai-assistant/mcp-for-erp).

## Which guides go with it?

For the processes behind the questions: [electronic component inventory](/manufacturing/electronic-component-inventory),
[reorder points and safety stock](/manufacturing/reorder-point-safety-stock) and
[excess and obsolete inventory](/manufacturing/excess-and-obsolete-inventory).

## Where can I try Ohm AI?

On the [Inventory Ops demo](https://electronics-erp.ahromlabs.com/demo): pick a sample login and ask two questions. The data is a made-up company;
nothing real is shown. Each episode in the series below is a question you can ask there yourself.
