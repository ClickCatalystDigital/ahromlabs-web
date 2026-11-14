---
kind: ai-assistant
slug: predictions-and-recommendations
title: "Predictions and recommendations from an ERP assistant: what is safe today"
metaTitle: "AI predictions and recommendations in an ERP, safely"
related:
  - /ai-assistant/analytics-levels
  - /ai-assistant/market-signals
  - /ai-assistant/manufacturers
  - /systems/predictive-analytics
  - /systems/prescriptive-analytics
  - /ai-assistant/ember-ai
question: "Can an AI assistant on my ERP make predictions and recommendations?"
answer: >
  Some, safely, if the arithmetic stays in code and every assumption is shown. Our assistants give projections from
  stated rules (days of stock cover, projected site margin) and Ember AI has a steel purchase what-if that compares
  buying now with buying later from figures you enter. Ranked recommendations ("what to deal with first this week")
  are planned and labelled as planned. A language model never produces the forecast itself.
description: "What an ERP AI assistant can safely predict and recommend: projections from stated rules, a what-if calculator, planned recommendations, and how to check them."
domain: [ai, analytics, forecasting]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
---

## Why not let the AI model forecast?

A language model is good at words and bad at arithmetic it can't show. Ask it to forecast cash and it will give a
neat figure that nobody can trace; ask again and the figure moves. For a decision that spends money, a forecast has
to be repeatable, and its inputs and assumptions have to be visible. So in our systems the model does one job:
it recognises which question is being asked and passes it to code. The code does the projection, and the answer
shows the rule.

## What can be predicted safely today?

Projections from a stated rule on the system's own records:

| Assistant | Question | The rule shown with the answer |
|---|---|---|
| Ohm AI | "Which items will run out in 30 days?" | Stock ÷ average pieces shipped per day over the last 90 days, and how much history there was |
| Datum AI | "Is a site making money?" | Margin so far, and projected margin against the site's estimate |
| Ohm AI | "Which customers have stopped ordering?" | Silent for more than twice that customer's own usual gap between orders |
| Ember AI | Steel purchase what-if | Your prices, rates and dates; every assumption listed |

Each can be checked: the stock-out date arrives, the site closes, the customer orders or doesn't.

## How does Ember AI's steel purchase what-if work?

A boiler maker buys plate and tube months before the boiler ships. Buying early protects against a price rise and
costs interest; buying late saves interest and risks the rise. The what-if takes the order's material, the prices
and rates you enter and the dates, and shows the cost of each choice, with the assumptions listed under the result.
When someone asks Ember AI "what changes if we purchase steel now rather than later?", it points to the calculator
rather than answering in words, because the answer depends on figures only you can enter. It is live on the
[boiler demo](https://boiler-erp.ahromlabs.com/demo) for the owner, sales and marketing roles. See
[AI assistant for manufacturers](/ai-assistant/manufacturers).

## What recommendations are planned?

For a boiler maker, these are written into Ember AI as cards marked "planned", so nobody mistakes them for live
features:

- Which plates, pipes and fittings still to buy are exposed if prices rise, using the BOM, reserved stock,
  fixed-price purchase orders, quoted rates and an approved price index.
- What the cash gap on an order will cost, from its payment terms, milestones and payments.
- Which delayed milestones will hold up dispatch.
- What to deal with first this week, and why.

A first version of the operational questions has been built and tested by us on sample boiler orders. The same pattern is planned for the other
industries, for example: interiors (projects that will miss handover), electronics (reorder
suggestions by lead time), construction (sites heading over budget).

## How will a recommendation be shown?

With the records it used, the assumptions it made, how sure it is, and what would change it. A recommendation that
can't show its working isn't shown. The person decides; the assistant can prepare the follow-up action as a card
for approval. See [actions and approvals](/ai-assistant/actions-and-approvals).

## How should a buyer test predictions from any vendor?

- Ask the same forecast twice. If the figure changes, the model is making it up.
- Ask what rule and history produced it. "Our AI analysed your data" is not an answer.
- Ask for last quarter's forecast and compare it with what happened.
- Ask what the assistant does when there is too little history. It should say so.

The [vendor test](/ai-assistant/vendor-test) has more, with pass and fail for each.
