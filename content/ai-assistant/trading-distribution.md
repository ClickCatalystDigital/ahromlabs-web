---
kind: ai-assistant
slug: trading-distribution
title: "AI assistant for traders and distributors: what it answers"
related:
  - /ai-assistant/how-it-works
  - /erp/trading-distribution
  - /industries/electronics-component-trading
  - /notes/reels-boxes-and-two-stores
  - /ai-assistant/mcp-for-erp
  - /ai-assistant/actions-and-approvals
  - /ai-assistant/ai-assistant-cost
answer: >
  A trader's assistant should answer stock by item and store, what is running low or not moving, what came in and
  went out, where a particular reel or box is, which purchase orders are waiting, and which customers have stopped
  ordering. Ohm AI does this for LS Technologies' own staff today, and says "the data doesn't have that" when
  asked about money the system doesn't hold.
description: "An AI assistant for traders and distributors: the stock, shipment and customer questions it should answer from your own records, and how to check it."
domain: [ai, trading, selection]
published: 2026-10-25
updated: 2026-11-14
checked: 2026-11-07
image:
  src: /ai/ai-trading-distribution.webp
  alt: "A reel of electronic components on carrier tape, partly unspooled."
  width: 1086
  height: 362
---

A trading business asks the same few questions all day: do we have it, where is it, what went out, who hasn't ordered. The answers are in the stock records already; an assistant saves opening four reports to get them.

## What should it answer?

Every question Ohm AI answers today is listed below, each with the report to check the answer against. The core of it: stock by item and store, what is running low or not moving, what came in and went out, where a particular reel or box is, purchase orders and approvals, and two plain-arithmetic statistics: which items will run out at the recent shipping rate, and which customers have gone quiet against their own usual gap between orders. Each statistic says how much history it used, and "and last month?" keeps the customer and the item.

## What should it refuse?

Questions about data the system doesn't keep. A stock system that doesn't hold receivables should say so when asked what a customer owes, not produce a figure.

Anything the system doesn't hold. Inventory Ops keeps stock and orders, not money, so "how much does a customer owe
us?" gets "the data doesn't have that" instead of a guess. Off-topic requests get a fixed reply.

## How does Ohm AI do it?

Ohm AI is the assistant in LS Technologies' inventory system, for its own staff; the partner store's logins and customers don't get it. A small model picks one of its fixed read-only look-ups; code resolves item, customer and reel names and runs the query. Questions it couldn't answer, and every thumbs-down, are listed in Settings, so the next look-up comes from what was asked. It can also make everyday changes when asked: receive reels, ship to a customer, move a box between stores, approve a staff request, reserve stock for a purchase order, set an item's rate, 47 in all. Each change shows as a card and is saved when the person presses Save; where the owner has allowed Auto for that role, adds and edits save at once with an Undo, and deletes, payments and approvals still ask first, with the same checks as the screen, so a staff entry still goes for approval. It runs on LS Technologies' own key with a daily question limit, at about a hundredth of a rupee per question. On the [electronics demo](https://electronics-erp.ahromlabs.com/demo) anyone can ask it two questions about a sample company.

## What does Ohm AI answer, by role?

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
pieces shipped per day over the last 90 days. The full list, with the screen to check each answer against, is below.

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

## Which AI model does Ohm AI use, and who controls the cost?

Two models, and you control both the choice and the spend. A small decision model, fixed on purpose so answers don't
change under you, only picks which look-up answers a question. The writing model, which adds a short summary when you
want one, is yours to choose in Inventory Ops's Settings from a searchable list of the hundreds of models OpenRouter offers,
so a newer model can be picked the day it appears there. Both run on your own OpenRouter key: Settings shows the
credit bought, used and left, every question is logged with its cost, and a daily limit stops runaway use. Through
the [MCP connector](/ai-assistant/mcp-for-erp) you can also ask Ohm AI from ChatGPT, Claude or any other AI app that
supports MCP. See [what an AI assistant costs](/ai-assistant/ai-assistant-cost).

## How do I check a vendor's assistant?

Pick five items you know the stock of, and ask in the demo. Then run the [vendor test](/ai-assistant/vendor-test) and compare its written answers with the stock summary in the [number check](/ai-assistant/number-check). For the system underneath, see the [ERP guide for trading and distribution](/erp/trading-distribution).
