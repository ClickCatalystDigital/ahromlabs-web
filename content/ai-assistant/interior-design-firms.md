---
kind: ai-assistant
slug: interior-design-firms
title: "An AI assistant for an interior design firm: what it should answer"
answer: >
  An interior design firm's assistant should answer how each project is going, who owes money, which workshop
  orders are late, what material is still to come and whether a project made money, all from the firm's own
  records and matching its screens. Atelier AI does this at Savistar & Saag today, in English and Hinglish, and
  refuses staff the payroll and bank questions.
description: "An AI assistant for interior designers and furniture workshops: the questions it should answer from your own projects, invoices and orders, and how to check it."
domain: [ai, interiors, selection]
published: 2026-10-25
updated: 2026-10-25
checked: 2026-10-25
---

A design studio runs on projects, quotations, site visits, a workshop and a lot of money owed. The owner's questions cut across all of them: how is this client's project going, who still owes us, are we delivering on time. An assistant earns its place if it answers those in one line, with the same figures as the screens.

## What should it answer?

The questions an owner, the accounts desk and the site team actually ask, each with the screen to check it against, are in the [question library](/ai-assistant/questions#interior-design-and-furniture). The ones that matter most:

- **One project, end to end:** milestones done and overdue, the next one, site visits, its workshop orders and what it has been invoiced and paid.
- **Money:** unpaid invoices with GST and days overdue, what was billed this month with the CGST and SGST split, and this month against last.
- **Quotations:** which are still waiting for a reply, and how many were won this month.
- **The workshop:** which orders are late, and the share delivered on time.
- **Material:** what is still to come from vendors for a project, and whether a transporter charged above the rate card.
- **Whether a project made money:** billed, minus materials, minus estimated workshop labour.

## What should it refuse?

Advice ("should we raise our design fee?") and anything a login can't see on the screens. A site supervisor asking for payroll should get a refusal, not a figure.

## How Atelier AI does it

[Atelier AI](/notes/assistant-that-answers-from-your-ledger) is the assistant in Savistar & Saag, an interior design studio and a furniture workshop sharing one system. A small model picks one of its fixed look-ups; code runs it with the same maths as the screens. It routed 55 of 55 test questions and 57 unseen real phrasings correctly, including Hinglish. Each person can pick a voice for it, and a written line with a number not in the table is dropped. "Remind me to call them on Friday" drafts a task that is saved only when the person presses Save.

You can ask it two questions yourself on the [interiors demo](https://interiors-erp.ahromlabs.com/demo), from any sample login.

## How to check a vendor's

Run the [vendor test](/ai-assistant/vendor-test) on a copy of your own projects, and paste its written answers into the [number check](/ai-assistant/number-check) with the finance screen beside them. If the assistant comes with a new system, the [ERP guide for interior design firms](/erp/interior-design-firms) lists what the system itself should do.
