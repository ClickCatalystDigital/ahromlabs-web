---
kind: ai-assistant
slug: trading-distribution
title: "An AI assistant for a trading or distribution business: what it should answer"
answer: >
  A trader's assistant should answer stock by item and store, what is running low or not moving, what came in and
  went out, where a particular reel or box is, which purchase orders are waiting, and which customers have stopped
  ordering. Ohm AI does this for LS Technologies' own staff today, and says "the data doesn't have that" when
  asked about money the system doesn't hold.
description: "An AI assistant for traders and distributors: the stock, shipment and customer questions it should answer from your own records, and how to check it."
domain: [ai, trading, selection]
published: 2026-10-25
updated: 2026-10-25
checked: 2026-10-25
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

## How Ohm AI does it

Ohm AI is the assistant in LS Technologies' inventory system, for its own staff; the partner store's logins and customers don't get it. A small model picks one of its fixed read-only look-ups; code resolves item, customer and reel names and runs the query. Questions it couldn't answer, and every thumbs-down, are listed in Settings, so the next look-up comes from what was asked. It runs on LS Technologies' own key with a daily question limit, at about a hundredth of a rupee per question. On the [electronics demo](https://electronics-erp.ahromlabs.com/demo) anyone can ask it two questions about a sample company.

## How to check a vendor's

Pick five items you know the stock of, and ask in the demo. Then run the [vendor test](/ai-assistant/vendor-test) and compare its written answers with the stock summary in the [number check](/ai-assistant/number-check). For the system underneath, see the [ERP guide for trading and distribution](/erp/trading-distribution).
