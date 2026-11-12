---
kind: ai-assistant
slug: manufacturers
title: "AI assistant for manufacturers: where to start"
related:
  - /ai-assistant/how-it-works
  - /erp/small-manufacturers
  - /industries/boiler-pressure-vessel-manufacturing
  - /services/custom-ai-assistant
answer: >
  For a manufacturer, start with how-to answers from the system's own help guide and everyday changes a person
  confirms, then add live-data questions once the owner has decided what may be sent to the AI provider. Keep the
  money arithmetic out of the AI's hands: Ember AI, the assistant in a boiler manufacturer's system, points to a fixed
  steel purchase calculation instead of working one out, and that calculation is live on the boiler demo.
description: "An AI assistant for a manufacturing ERP: how-to answers from your help guide, changes you confirm, live data once approved, and no AI arithmetic on money."
domain: [ai, manufacturing, selection]
published: 2026-10-25
updated: 2026-11-12
checked: 2026-11-12
image:
  src: /ai/ai-manufacturers.webp
  alt: "A round steel pressure gauge on a short pipe stub."
  width: 1086
  height: 362
---

A manufacturing system has many departments and many screens, and most questions on the shop floor and in the office are "how do I". That is the safest place for an assistant to start: the answers come from the system's own help guide, and no business data leaves.

## Where should a manufacturer's AI assistant start?

With how-to answers from the company's own help guide. The assistant picks the right section of the help guide for the question, from the departments the person works in, and answers from it with a link to the screen. Questions like:

- How do I raise a purchase request?
- How do I send a packing list for approval before dispatch?
- How do I assign test certificates to units?
- Where do I change my password?

Unrelated questions ("write me a poem") should get a fixed reply that never reaches a writing model. Each person gets a daily question limit set per department.

## When should it answer from live data?

When the owner decides who may see what. Stock on hand, items below minimum, purchase orders not received, an order's value and payments, approvals waiting. These need a decision first: in a design where the rows are worded by a writing model, the rows of each answer are sent to the AI provider. The owner should approve that by name, and each look-up should follow the same department limits as the screens. The [data safety guide](/ai-assistant/data-safety) sets out what to ask.

## How does Ember AI do it?

Ember AI is the assistant in a boiler manufacturer's system, open to staff. How-to answers come from the help guide. The live-data look-ups are built, and in a client's system they stay switched off until the client records its approval. Job-card and work-in-progress questions are not built yet. It can also make everyday changes when asked: add an enquiry, log a follow-up, record a payment against a sale order, close a milestone, log a truck at the gate, issue material, record a QC test, mark attendance, 99 in all. Each change shows as a card and is saved when the person presses Save; where the owner has allowed Auto for that role, adds and edits save at once with an Undo, and deletes, payments and approvals still ask first, run as that person, so the same department limits and approvals apply as on the screens. On the [boiler demo](https://boiler-erp.ahromlabs.com/demo), with a sample company, live data is on: anyone can ask it two questions. Every question it handles is listed below, each with its status.

## How does it handle a question about money?

It doesn't do the arithmetic. A question like "should we buy the steel now or wait?" is a calculation, and a language model is the wrong tool for one: it can't be relied on to get the same figure twice, and nobody can check how it got there. So Ember answers that kind of question with a fixed reply that points to a calculator on the project page, and the calculator does the sums.

That calculator, the steel purchase what-if, is **live on the [boiler demo](https://boiler-erp.ahromlabs.com/demo)** for the owner, sales and marketing roles; it is not yet in a client's system. What it does:

- You enter the steel still to buy, the rate assumed in the quotation, today's rate, three later rates you think possible (low, expected, high), the order's payment terms and your own borrowing rate.
- It shows two things, separately: the **steel cost** above the quoted rate for buying now or waiting, and the **financing cost** of the order's cash gap for each timing.
- It never adds the two together and never shows a percentage of margin. Every input is labelled with where it came from.

An invented example, in any currency: an order worth 12,000,000 with 40 tonnes of steel still to buy, quoted at 62,000 a tonne and 66,000 today. Buying now costs 160,000 above the quote. Waiting costs 80,000 less than the quote if the rate falls to 60,000, or 480,000 more if it rises to 74,000. Paying for the steel three months early, with a 5% advance, adds about 56,400 of interest at 12% a year. The calculator shows both sides; the decision stays yours.

Every result carries what the estimate leaves out: cash in hand is treated as earning nothing, the steel is valued at the quoted rate in the cash timeline, and supplier credit, storage costs and the value of securing supply are not included. The later rates are what you typed, not a forecast. The calculation is checked against worked examples on every change, and the same examples are checked in both places it runs.

## How do I check what it says and does?

Ask ten how-to questions from your own process and follow the answers: do the steps work? For figures, compare each answer with the screen named under "Check it against" in the list below. For changes, look at the record before and after you press Save. For the steel purchase what-if, work one line by hand: quantity still to buy × (rate paid − quoted rate). Then run the [vendor test](/ai-assistant/vendor-test). For the system itself, see the [ERP guide for small manufacturers](/erp/small-manufacturers).

## What is Ahrom Labs building next?

None of this is available yet. The next step is to answer from a company's own orders, purchases, milestones and payments, with the evidence and assumptions behind every answer:

- which open orders are exposed if steel prices rise before the steel is bought;
- what the cash gap on an order will cost, from its own payment terms;
- which delayed milestones will hold up dispatch;
- which unpaid balances put a project at risk;
- what to deal with first this week, ordered by measured amount and urgency, with the records behind each item.

The calculations would stay fixed arithmetic, and the company's data would stay in its own system. These are in the list below as not yet built.

## Where is this heading?

Further out, we are working towards industry intelligence: combining checked industry knowledge, steel and policy changes, approved calculations and a company's own results, to say what changed, why it matters to that business and which actions it supports, with how fresh and how certain each conclusion is. It is a direction, not something Ember does today.

## What keeps the owner in control?

- **Permissions:** every answer and every change runs as the person asking, with the same department limits as the screens.
- **Confirmation:** a change is a card first; deletes, payments and approvals always ask.
- **Evidence:** answers come from the help guide or from records you can open; a figure the data doesn't have is not given.
- **No AI arithmetic on money:** calculations are fixed code checked against worked examples, and the AI only points to them.
- **Data:** live-data answers stay off until the owner approves them by name.
