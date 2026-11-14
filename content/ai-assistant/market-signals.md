---
kind: ai-assistant
slug: market-signals
title: "Market and economic signals in an ERP assistant: steel prices, policy and rates"
metaTitle: "Market and economic signals in an ERP AI assistant"
related:
  - /ai-assistant/predictions-and-recommendations
  - /ai-assistant/analytics-levels
  - /ai-assistant/manufacturers
  - /services/operational-intelligence
  - /ai-assistant/ember-ai
question: "Can an ERP assistant use market data like steel prices or interest rates?"
answer: >
  It can, if each outside figure comes from a named, approved source with its date, and the calculation stays in
  code. Today Ember AI's steel purchase what-if uses prices and rates you enter. Feeding approved price indices, policy
  changes and rates in automatically is planned, one industry and country at a time, starting with steel for boiler
  makers in India. Nothing outside your own records is answered automatically yet.
description: "How outside signals (steel prices, policy changes, interest rates) can feed an ERP assistant safely, what is live today, and the plan by industry and country."
domain: [ai, analytics, market-data]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
---

## Why would an ERP assistant need outside data?

Because the biggest swings in a small manufacturer's or contractor's margin often come from outside the business:
steel and copper prices, freight, interest rates, tax changes, and new rules from a regulator. Your own records
tell you what you have committed to buy and when; an outside signal tells you what that commitment is now worth.
Put together, they answer "which open orders lose money if steel rises 8% before we buy?"

## What is live today?

Only figures you enter. Ember AI's steel purchase what-if compares buying now with buying later from the prices,
rates and dates you type in, with every assumption listed. It does not fetch market prices itself. Every other
answer from our assistants comes from the system's own records. See
[predictions and recommendations](/ai-assistant/predictions-and-recommendations).

## What is planned, and in what order?

One industry and country at a time, because each needs its own trusted sources. The order below is our current
plan and may change:

| Industry and market | First signals | Used for |
|---|---|---|
| Boiler and pressure vessel makers, India | An approved steel plate and tube price index; IBR and BIS changes; interest rates | Exposure of open orders to price rises; cost of buying early |
| Boiler and pressure vessel shops, US | Steel price indices; ASME and state code changes | The same exposure questions in dollars |
| Electronic component traders | Lead times and allocation notices; import duty changes | Reorder timing; landed cost |
| Construction contractors, India | Cement, steel and bitumen price indices; GST and TDS changes | Escalation claims; site margin |
| Interior design firms | Freight and material price changes; sales tax rules (US) | Quote validity; budget risk |

None of these is live. Each will be published here with its source and status when it is.

## What rules will outside data follow?

- **Named sources only**, each with the date of the figure. No "market sentiment" from the web.
- **Approved by a person** in the business before it is used in a calculation.
- **Arithmetic in code**, never in the AI model, the same as every other figure.
- **Change explained**: what changed, why it matters to you, and how sure the assistant is.
- **Your decision**: the assistant shows the effect; a person decides what to do.

These follow the rule we already use for statutory rates: a rate is only used once a person has checked it against
its source. See [human-verified statutory rates](/patterns/human-verified-statutory-rates).

## How is this different from a general AI chatbot reading the news?

A chatbot can summarise news about steel prices. It can't tell you which of your open orders are exposed, because it
doesn't know your bill of materials, your fixed-price purchase orders or your payment milestones. And it can't be
held to a figure: ask twice, get two answers. An assistant on your records, with a named price source and the maths
in code, can.

## Can I get this for my business now?

The what-if pattern can be built for any business whose costs swing with a commodity or a rate: the inputs are typed
in, the arithmetic is fixed and tested, and the assumptions are shown. Automatic feeds come later, source by source.
See [operational intelligence](/services/operational-intelligence), or [book a call](/#contact).
