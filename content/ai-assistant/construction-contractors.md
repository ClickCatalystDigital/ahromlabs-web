---
kind: ai-assistant
slug: construction-contractors
title: "AI assistant for construction contractors: what it answers"
related:
  - /ai-assistant/how-it-works
  - /industries/construction-company
  - /construction/ra-bills
  - /construction/measurement-book
answer: >
  A contractor's assistant should answer whether each site is making money, which sites haven't sent today's
  report, what material is in the godown and at each site, which running bills are waiting and who owes money, all
  from the contractor's own records and matching its screens. Datum AI does this in the system built for a
  construction contractor, not yet live there, which anyone can try on the public demo with sample data, and refuses site staff the money, margin and payroll questions.
description: "An AI assistant for construction contractors: the site, material, billing and labour questions it should answer from your own records, and how to check it."
domain: [ai, construction, selection]
published: 2026-11-02
updated: 2026-11-07
checked: 2026-11-07
---

A contractor's work is spread over sites: daily reports from each one, material in the godown and on site, machines moving between them, labour, site cash, and running bills that wait weeks to be certified. The director's questions cut across all of it: is this site making money, who hasn't reported today, who owes us and how late. An assistant earns its place if it answers those in one line, with the same figures as the screens.

## What should it answer?

Every question Datum AI answers is listed below, with the screen to check each answer against. They cover one site end to end, margin against the estimate, daily reports filed and missing, material used against the BOQ norm, stock by location, idle machines, site cash, running-account bills and receivables by age, the cash book and the bank, attendance, KYC and gate passes, the wage register, and the trading desk's orders and supplier rates.

## What should it refuse?

Advice, changes to records, and anything a login can't see on the screens. A site engineer asking whether a site is making money should get a refusal, not a margin; "mark the bill paid" should get a pointer to the Billing tab, not a changed bill.

## How does Datum AI do it?

Datum AI is the assistant in the system built for a construction contractor, a waterproofing and repair contractor that also trades construction chemicals; it is not yet live there, so today it answers on the demo's sample records. A small model picks one of its [fixed look-ups](/systems/fixed-look-up); code runs it with the same maths as the screens, so a site's margin is the Dashboard's margin and an RA bill's amount is the Billing tab's. Site engineers and storekeepers get the site questions but not company money, margins or payroll. "Remind me to call them on Friday" drafts a task that is saved only when the person presses Save. [How it works](/ai-assistant/how-it-works) sets out the design.

You can ask it two questions yourself on the [construction demo](https://construction-erp.ahromlabs.com/demo), from any sample login, with sample sites, workers and bills.

## How do I check a vendor's assistant?

Run the [vendor test](/ai-assistant/vendor-test) on a copy of your own sites, and paste its written answers into the [number check](/ai-assistant/number-check) with the dashboard beside them. Ask about one site's margin, then work it out by hand from its approved work, material, labour and site cash: the two should match.
