---
kind: ai-assistant
slug: ai-assistant-cost
title: "What an AI assistant on your ERP costs, and what drives the price"
metaTitle: "AI assistant for ERP: cost and what drives it"
related:
  - /ai-assistant/vendor-test
  - /ai-assistant/mcp-for-erp
  - /services/custom-ai-assistant
  - /engagement
question: "How much does an AI assistant for my ERP cost?"
answer: >
  It depends less on the AI model than on the work around it: how many fixed look-ups and actions it needs, how many
  roles and permission rules, and whether it is part of a new system or added to one you have. The model's usage is
  small and is billed by the model provider to your own account. For a system we build, the assistant is scoped and
  priced with the project, and support runs under the annual maintenance contract.
description: "What drives the cost of an AI assistant on an ERP: look-ups, actions, roles, connectors and model usage, who pays for what, and what to ask a vendor."
domain: [ai, pricing, selection]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
---

## What are you actually paying for?

| Part | What it is | What drives its cost |
|---|---|---|
| Look-ups | One tested, read-only query per kind of question, with the same maths as the screens | The number of questions; how messy the data is |
| Actions | The changes it may prepare, each through the app's own route | The number of actions; which need Undo |
| Permissions | Role and department rules, refusals | How many roles see different data |
| Connector | The [MCP server](/ai-assistant/mcp-for-erp) and sign-in for ChatGPT and Claude | Mostly built once; switched on per client |
| Model usage | The small model that recognises the question | Number of questions per day |
| Support | Keeping look-ups right as the system changes | Part of the annual maintenance contract |

The model is the cheapest line. The look-ups are where the value and the cost are: each one is written against your
data and checked against your screens.

## Who pays for the AI model?

You, directly, and at the provider's price. Our assistants use an API key saved (encrypted) in the system's
settings; the provider bills that account for what is used. A daily question cap in settings keeps spending
predictable: when the cap is reached, the assistant says so and resets at midnight. The model that recognises
questions is a small one, so usage per question is low.

## Is it cheaper to add an assistant to an existing ERP?

Sometimes. If the ERP has clean data and an API, look-ups can be written against it. If the data is spread across
spreadsheets and an accounting package, the assistant can only be as good as what it reads; building the system
first is usually the better spend. See [AI in ERP](/ai-assistant/ai-in-erp).

## How is it priced when we build the system?

The assistant is scoped with the system: which questions, which actions, for which roles. It is priced with the
project, and support after go-live runs under the annual maintenance contract, which our
[engagement terms](/engagement) put at 15 to 21% of the project value a year. Ownership, hosting and data use are on
the same page.

## What should you ask any vendor about price?

- Is the price per user, per question, or fixed? What happens in a busy month?
- Who pays for the model's usage, and can you see it?
- How many questions does it answer at launch, and what does adding one cost?
- Are changes (actions) included, or only questions?
- Is the ChatGPT and Claude connector included?
- What happens to the assistant if you stop paying support?

## What is the cheapest way to start?

Pick ten questions your team asks every week, and check whether each can be answered from your records today. If
they can, those ten look-ups are a small first project and pay for themselves in meetings shortened and calls not
made. If they can't, the gap is in the data, and that is the first thing to fix. The
[question library](/ai-assistant/questions) has examples by industry and role to choose from.
