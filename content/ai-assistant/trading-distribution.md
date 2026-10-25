---
kind: ai-assistant
slug: trading-distribution
title: "An AI assistant for a trading or distribution business: what it should answer"
answer: >
  A trader's assistant should answer stock by item and store, what is running low or not moving, what came in and
  went out, where a particular reel or box is, which purchase orders are waiting, and which customers have stopped
  ordering. Ohm does this for the admin at LS Technologies today, and says "the data doesn't have that" when asked
  about money the system doesn't hold.
description: "An AI assistant for traders and distributors: the stock, shipment and customer questions it should answer from your own records, and how to check it."
domain: [ai, trading, selection]
published: 2026-10-25
updated: 2026-10-25
checked: 2026-10-25
---

A trading business asks the same few questions all day: do we have it, where is it, what went out, who hasn't ordered. The answers are in the stock records already; an assistant saves opening four reports to get them.

## What should it answer?

The full list, with the report to check each answer against, is in the [question library](/ai-assistant/questions#trading-and-distribution). The core of it:

- **Stock:** how much of an item, in each store; what is running low; what hasn't shipped in 30 days.
- **Movement:** what came in last week, what went to a customer in a month, what moved between stores, and what happened today.
- **Tracing:** where a particular reel or box is, who it went to and its transfers.
- **Orders and approvals:** purchase orders by status, and staff requests waiting for approval.
- **Statistics, as plain arithmetic:** which items will run out at the recent shipping rate, and which customers have gone quiet against their own usual gap between orders. Each answer should say how much history it used.
- **Follow-ups:** "and last month?" should keep the customer and the item.

## What should it refuse?

Questions about data the system doesn't keep. A stock system that doesn't hold receivables should say so when asked what a customer owes, not produce a figure.

## How Ohm does it

Ohm is the assistant in LS Technologies' inventory system, for the admin. A small model picks one of its fixed read-only look-ups; code resolves item, customer and reel names and runs the query. Questions it couldn't answer, and every thumbs-down, are listed in Settings, so the next look-up comes from what was asked. It runs on LS Technologies' own key with a daily question limit, at about a hundredth of a rupee per question.

## How to check a vendor's

Pick five items you know the stock of, and ask in the demo. Then run the [vendor test](/ai-assistant/vendor-test) and compare its written answers with the stock summary in the [number check](/ai-assistant/number-check). For the system underneath, see the [ERP guide for trading and distribution](/erp/trading-distribution).
