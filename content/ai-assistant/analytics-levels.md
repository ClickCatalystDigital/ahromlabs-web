---
kind: ai-assistant
slug: analytics-levels
title: "Descriptive, diagnostic, predictive and prescriptive analytics for a business"
metaTitle: "Descriptive to prescriptive analytics, with real examples"
related:
  - /ai-assistant/predictions-and-recommendations
  - /ai-assistant/market-signals
  - /ai-assistant/how-it-works
  - /systems/descriptive-analytics
  - /systems/prescriptive-analytics
  - /services/operational-intelligence
  - /ai-assistant/ohm-ai
  - /ai-assistant/atelier-ai
question: "What are descriptive, diagnostic, predictive and prescriptive analytics?"
answer: >
  Four levels of question. Descriptive asks what happened ("what did we bill this month?"); diagnostic asks why
  ("which milestones are overdue, and what is holding them?"); predictive asks what will happen ("which items will
  run out in 30 days?"); prescriptive asks what to do about it ("what should we deal with first this week?"). Our
  assistants answer descriptive and many diagnostic questions today, a few predictive ones from stated rules, and
  prescriptive questions are planned.
description: "The four levels of business analytics with real ERP questions for each, what our AI assistants answer at each level today, and what is planned."
domain: [ai, analytics, data-science]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
---

## What are the four levels?

| Level | The question | Example from a real system | Status in our assistants |
|---|---|---|---|
| [Descriptive](/systems/descriptive-analytics) | What happened? | "How much did we bill this month, and how much GST?" | Live |
| [Diagnostic](/systems/diagnostic-analytics) | Why did it happen? | "Is a site using more material than the BOQ allows?" | Live for fixed questions |
| [Predictive](/systems/predictive-analytics) | What will happen? | "Which items will run out in 30 days?" | Live for a few, from stated rules |
| [Prescriptive](/systems/prescriptive-analytics) | What should we do? | "What should we deal with first this week, and why?" | Planned |

Each level needs the one below it. A forecast built on wrong history is wrong; a recommendation built on a wrong
forecast is worse. That is why we build them in this order and publish which questions are live.

## What does descriptive look like?

Figures straight from the records, with the same maths as the screens: stock by store, orders received, billing this
month, dues by customer, attendance, cash at each site. Most of the [question library](/ai-assistant/questions) is
here. Examples that work today:

- Ohm AI: "What came in last week?" "What moved between our two stores this month?"
- Atelier AI: "How much did we bill this month, and how much GST?"
- Datum AI: "How much cash is at each site?"

## What does diagnostic look like?

Answers that explain a figure by comparing it with something: a plan, a norm, a previous period, a rule.

- Datum AI: "Is a site using more material than the BOQ allows?" compares material issued with what approved work
  should have used.
- Atelier AI: "How did billing this month compare with last month?" and "Did a transporter charge us above the rate
  card?"
- Ohm AI: "Which customers have stopped ordering?" flags customers silent for more than twice their own usual gap.
- Datum AI: "Who owes us money, and how late is it?" by ageing bucket.

What is not here yet: open-ended root cause ("why did margins fall?") across every record. The assistant answers the
diagnostic questions it was built for and says "the data doesn't have that" for the rest.

## What does predictive look like?

Projections from stated rules on the system's own history, with the rule shown:

- Ohm AI: "Which items will run out in 30 days?" divides stock by the average pieces shipped per day over the last 90
  days and says how much history it used.
- Datum AI: "Is a site making money?" gives the margin so far and the projected margin against the estimate.
- Ember AI: the steel purchase what-if is a calculator: you enter the prices and rates, it shows what buying now
  rather than later would cost, with every assumption listed. It runs in code, never in the AI model. See
  [predictions and recommendations](/ai-assistant/predictions-and-recommendations).

No machine-learning forecast is live in our systems today; when one is, its error on past data will be shown next to
it.

## What does prescriptive look like?

A ranked list of what to do, with the reason and the records behind each item. For a boiler maker, the planned
questions are already written into Ember AI as cards marked "planned": which open orders are exposed if steel prices
rise before purchase, what the cash gap on an order will cost, which delayed milestones will hold up dispatch, and
what to deal with first this week. They are not answered yet, and the assistant says so.

## How do you know an analytics answer is right?

- **Descriptive:** it matches the screen it names, to the rupee or dollar.
- **Diagnostic:** the comparison and the threshold are stated ("over twice their usual gap", "against the BOQ norm").
- **Predictive:** the rule and the history used are stated, and the forecast can be checked when the date arrives.
- **Prescriptive:** each recommendation lists the records and assumptions behind it, and a person decides.

Use the [number check](/ai-assistant/number-check) to test any assistant's answer for figures that aren't in the
report it should have used.

## Can I ask these through ChatGPT or Claude?

Yes. The same questions work through the [MCP connector](/ai-assistant/mcp-for-erp), by text or, where the AI app
supports it, by [voice](/ai-assistant/voice). The AI app adds the words; the levels and their limits are the same.
