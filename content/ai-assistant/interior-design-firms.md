---
kind: ai-assistant
slug: interior-design-firms
title: "AI assistant for interior design firms: what it answers"
related:
  - /ai-assistant/how-it-works
  - /erp/interior-design-firms
  - /industries/interior-design-and-furniture
  - /notes/assistant-that-answers-from-your-ledger
  - /ai-assistant/mcp-for-erp
  - /ai-assistant/actions-and-approvals
  - /ai-assistant/ai-assistant-cost
answer: >
  An interior design firm's assistant should answer how each project is going, who owes money, which workshop
  orders are late, what material is still to come and whether a project made money, all from the firm's own
  records and matching its screens. Atelier AI does this at Savistar & Saag today, in English and Hinglish, and
  refuses staff the payroll and bank questions.
description: "An AI assistant for interior designers and furniture workshops: the questions it should answer from your own projects, invoices and orders, and how to check it."
domain: [ai, interiors, selection]
published: 2026-10-25
updated: 2026-11-14
checked: 2026-11-07
image:
  src: /ai/ai-interior-design-firms.webp
  alt: "A fan of fabric and wood-veneer swatches beside a rolled tape measure."
  width: 1086
  height: 362
---

A design studio runs on projects, quotations, site visits, a workshop and a lot of money owed. The owner's questions cut across all of them: how is this client's project going, who still owes us, are we delivering on time. An assistant earns its place if it answers those in one line, with the same figures as the screens.

## What should it answer?

Every question Atelier AI answers today is listed below, with the screen to check each answer against. Its money questions name the tax its own studio charges; a US studio asks the same ones about sales tax and QuickBooks. They cut across the whole firm: one project end to end, money owed and billed with the GST split, quotations waiting and won, late workshop orders and on-time delivery, material still to come, attendance and payroll, the cash book and the bank, and whether a project made money.

## What should it refuse?

Advice ("should we raise our design fee?") and anything a login can't see on the screens. A site supervisor asking for payroll should get a refusal, not a figure.

What the person can't see on screen. A staff login asking for the payroll gets a refusal, the same as on the payroll
screen.

## How does Atelier AI do it?

[Atelier AI](/notes/assistant-that-answers-from-your-ledger) is the assistant in Savistar & Saag, an interior design studio and a furniture workshop sharing one system. A small model picks one of its [fixed look-ups](/systems/fixed-look-up); code runs it with the same maths as the screens. It routed 55 of 55 test questions and 57 unseen real phrasings correctly, including Hinglish. Each person can pick a voice for it, and a written line with a number not in the table is dropped. It can also make everyday changes when asked: add a client, log a call, mark attendance, accept a quote, raise the next stage invoice, mark an invoice paid, 59 in all. Each change shows as a card and is saved when the person presses Save; where the owner has allowed Auto for that role, adds and edits save at once with an Undo, and deletes, payments and approvals still ask first, with the same checks on who may do it as the screen.

You can ask it two questions yourself on the [interiors demo](https://interiors-erp.ahromlabs.com/demo), from any sample login.

## What does Atelier AI answer, by role?

| Need | Example questions |
|---|---|
| The week | "What's on this week?" |
| Projects | "How is a named project going?" "Which milestones are overdue?" "Did a project make money?" |
| Clients | "Which clients haven't we spoken to in two weeks?" |
| Sales | "Which quotations are still waiting for a reply?" "How many quotes did we win this month?" |
| Billing | "How much did we bill this month, and how much GST?" "How did billing compare with last month?" |
| Money | "Who owes us money?" "How much money do we have?" |
| Workshop | "Which workshop orders are late?" "Are we delivering workshop orders on time?" |
| Costs | "Did a transporter charge us above the rate card?" |

All of these are answered today. The full list, with the screen to check each answer against, is below.

## What can Atelier AI change?

It drafts reminders ("remind me to call a client on Friday") and changes such as logging a conversation, adding a
client or a task, as cards that save on Save, or at once under Auto with a 30-minute Undo for the roles the owner
chooses. See [actions and approvals](/ai-assistant/actions-and-approvals).

## Can I use Atelier AI from ChatGPT or Claude?

Yes, on a studio's own system: owners and admins add Designer Ops as a connector, then ask from the AI app, by text or
voice where the app supports it. It is off in the public demo. See [MCP for ERP](/ai-assistant/mcp-for-erp).

## Which guides go with it?

[Interior design invoices, deposits and retainers](/interiors/invoices-deposits-and-retainers),
[project budget tracking](/interiors/project-budget-tracking) and the
[interior quotation format](/boq/interior-quotation-format).

## Which AI model does Atelier AI use, and who controls the cost?

Two models, and you control both the choice and the spend. A small decision model, fixed on purpose so answers don't
change under you, only picks which look-up answers a question. The writing model, which adds a short summary when you
want one, is yours to choose in Designer Ops's Settings from a searchable list of the hundreds of models OpenRouter offers,
so a newer model can be picked the day it appears there. Both run on your own OpenRouter key: Settings shows the
credit bought, used and left, every question is logged with its cost, and a daily limit stops runaway use. Through
the [MCP connector](/ai-assistant/mcp-for-erp) you can also ask Atelier AI from ChatGPT, Claude or any other AI app that
supports MCP. See [what an AI assistant costs](/ai-assistant/ai-assistant-cost).

## How do I check a vendor's assistant?

Run the [vendor test](/ai-assistant/vendor-test) on a copy of your own projects, and paste its written answers into the [number check](/ai-assistant/number-check) with the finance screen beside them. If the assistant comes with a new system, the [ERP guide for interior design firms](/erp/interior-design-firms) lists what the system itself should do.
