---
kind: ai-assistant
slug: construction-contractors
title: "AI assistant for construction contractors: what it answers"
related:
  - /ai-assistant/how-it-works
  - /industries/construction-company
  - /construction/ra-bills
  - /construction/measurement-book
  - /ai-assistant/mcp-for-erp
  - /ai-assistant/actions-and-approvals
  - /ai-assistant/ai-assistant-cost
answer: >
  A contractor's assistant should answer whether each site is making money, which sites haven't sent today's
  report, what material is in the godown and at each site, which running bills are waiting and who owes money, all
  from the contractor's own records and matching its screens. Datum AI does this in the system built for a
  construction contractor, not yet live there, which anyone can try on the public demo with sample data, and refuses site staff the money, margin and payroll questions.
description: "An AI assistant for construction contractors: the site, material, billing and labour questions it should answer from your own records, and how to check it."
domain: [ai, construction, selection]
published: 2026-11-02
updated: 2026-11-14
checked: 2026-11-07
image:
  src: /ai/ai-construction-contractors.webp
  alt: "A surveyor's level on a tripod beside a white hard hat and a site diary: an assistant for a construction contractor."
  width: 1086
  height: 362
---

A contractor's work is spread over sites: daily reports from each one, material in the godown and on site, machines moving between them, labour, site cash, and running bills that wait weeks to be certified. The director's questions cut across all of it: is this site making money, who hasn't reported today, who owes us and how late. An assistant earns its place if it answers those in one line, with the same figures as the screens.

## What should it answer?

Every question Datum AI answers is listed below, with the screen to check each answer against. They cover one site end to end, margin against the estimate, daily reports filed and missing, material used against the BOQ norm, stock by location, idle machines, site cash, running-account bills and receivables by age, the cash book and the bank, attendance, KYC and gate passes, the wage register, and the trading desk's orders and supplier rates.

## What should it refuse?

Advice, changes nobody confirmed, and anything a login can't see on the screens. A site engineer asking whether a site is making money should get a refusal, not a margin; "mark the bill paid" should get a card to confirm, not a bill changed behind the person's back.

A site engineer asking "is this site making money?" gets a refusal: site staff don't see company money. Ask the
same as a director and it answers. That pair makes one of the episodes below.

## How does Datum AI do it?

Datum AI is the assistant in the system built for a construction contractor, a waterproofing and repair contractor that also trades construction chemicals; it is not yet live there, so today it answers on the demo's sample records. A small model picks one of its [fixed look-ups](/systems/fixed-look-up); code runs it with the same maths as the screens, so a site's margin is the Dashboard's margin and an RA bill's amount is the Billing tab's. Site engineers and storekeepers get the site questions but not company money, margins or payroll. It can also make everyday changes when asked: add the day's work, labour or an issue to a site's daily report, mark site attendance, record a measurement, raise the next RA bill and move it to certified or paid, log site cash, receive material, move a machine, 84 in all. Each change shows as a card and is saved when the person presses Save; where the owner has allowed Auto for that role, adds and edits save at once with an Undo, and deletes, payments and approvals still ask first, with the screen's own checks, so a site engineer still can't approve a report. [How it works](/ai-assistant/how-it-works) sets out the design.

You can ask it two questions yourself on the [construction demo](https://construction-erp.ahromlabs.com/demo), from any sample login, with sample sites, workers and bills.

## What does Datum AI answer, by role?

| Need | Example questions |
|---|---|
| Sites | "How are the sites doing?" "How is a named site going?" "Is a site making money?" |
| Material | "Is a site using more material than the BOQ allows?" "What material is still to come for a site?" |
| Reporting | "Did every site send its daily report today?" "When did a project manager last visit a site?" |
| Plant | "Which machines are idle?" |
| Money | "How much cash is at each site?" "Who owes us money, and how late is it?" |
| Billing | "Which running-account bills are not yet certified?" "Which change orders are still pending?" |
| Labour | "Who is on site today?" "Which advances haven't been recovered yet?" |

All of these are answered today. "Is a site making money?" shows the margin so far and the projected margin against
the estimate. The full list, with the screen to check each answer against, is below.

## What can Datum AI change?

It prepares changes as cards, with Manual or Auto and a 30-minute Undo for the roles the owner chooses; deletes,
payments and approvals always ask. See [actions and approvals](/ai-assistant/actions-and-approvals).

## Can I use Datum AI from ChatGPT or Claude?

Yes, on a contractor's own system: owners and admins add SiteBook as a connector, then ask Datum AI from the AI app,
by text or by voice where the app supports it, which suits a director on the road. It is off in the public demo. See
[MCP for ERP](/ai-assistant/mcp-for-erp).

## Which guides go with it?

India: [RA bills](/construction/ra-bills), [measurement book](/construction/measurement-book) and
[material consumption vs BOQ](/construction/material-consumption-vs-boq). US: [pay applications](/construction/pay-applications),
[retainage](/construction/retainage) and [job cost per site](/construction/job-cost-per-site).

## Which AI model does Datum AI use, and who controls the cost?

Two models, and you control both the choice and the spend. A small decision model, fixed on purpose so answers don't
change under you, only picks which look-up answers a question. The writing model, which adds a short summary when you
want one, is yours to choose in SiteBook's Settings from a searchable list of the hundreds of models OpenRouter offers,
so a newer model can be picked the day it appears there. Both run on your own OpenRouter key: Settings shows the
credit bought, used and left, every question is logged with its cost, and a daily limit stops runaway use. Through
the [MCP connector](/ai-assistant/mcp-for-erp) you can also ask Datum AI from ChatGPT, Claude or any other AI app that
supports MCP. See [what an AI assistant costs](/ai-assistant/ai-assistant-cost).

## How do I check a vendor's assistant?

Run the [vendor test](/ai-assistant/vendor-test) on a copy of your own sites, and paste its written answers into the [number check](/ai-assistant/number-check) with the dashboard beside them. Ask about one site's margin, then work it out by hand from its approved work, material, labour and site cash: the two should match.
