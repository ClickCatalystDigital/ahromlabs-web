---
kind: erp
slug: implementation-plan
title: "ERP implementation plan: phases from mapping the business to go-live"
answer: >
  A custom ERP goes live in phases, each in use before the next starts: a short modeling phase that maps the
  business and ends with a dated, fixed-price plan; then the records that must be right; then the daily work of
  each department; then reports and AI. Data migration is its own scoped piece of work, and the requirements'
  tests are the acceptance tests for each phase.
description: "ERP implementation plan for Indian manufacturers and traders: phases from modeling to go-live, migration, acceptance tests, timeline and cost."
domain: [erp, implementation, planning]
published: 2026-10-25
updated: 2026-10-25
checked: 2026-10-25
image:
  src: /erp/erp-implementation-phases.webp
  alt: "A path of five stepping stones leading to a flag."
  width: 1086
  height: 362
---

## Why phases, each in use before the next

ERP projects in Indian SMEs usually fail the same way: people go back to Excel and WhatsApp because the system doesn't match how the business runs, and the old data turns out messier than anyone planned for. Phases that each go live and get used before the next one starts catch both early. You never pay for months of work you can't see, and a wrong assumption costs a phase, not the project.

## The phases

| Phase | What it delivers | Done when |
|---|---|---|
| 0. Modeling | A map of the business (entities, workflows, approvals, rules) and a dated plan with a fixed price per phase | The owner agrees the map and the plan |
| 1. Records that must be right | Masters, stock, opening balances, the ledger or the Tally link; migration of what's needed | Counts and balances tie to the old system |
| 2. Daily work, department by department | Sales, purchase, stores, production, dispatch, accounts, as the plan orders them | Each department works in the system, not beside it |
| 3. Portals | Customer and supplier access | Customers and suppliers use their links |
| 4. Reports and AI | Dashboards from the same records; assistants and document reading with human review | Figures trace to records; AI answers match the reports |

The order inside phase 2 comes from the map: whatever the business can least afford to get wrong goes first.

## Data migration is its own piece of work

Migration is scoped and quoted separately, before it starts, rather than discovered halfway. Every import is checked against its source, doubtful rows are held for a person, and each import is tagged so it can be removed as one batch. See [moving from Tally](/erp/tally-migration).

## The requirements are the acceptance tests

Every line on the [requirements checklist](/erp/requirements) has a test. Before a phase is signed off, run the tests for the lines it covers, on your own data. The same tests made the [vendor demo script](/erp/vendor-demo-script); using them again at go-live is how you find out whether what was shown is what was built.

## How long it takes

It depends on how new the problem is. Something already built for another business can ship in days or weeks; genuinely new ground takes a couple of months, delivered in phases so part of it is in use early. The modeling phase ends with a date for each phase, so you know the timeline before you commit to the build.

## What it costs

Published 2026 guides from other firms put a custom ERP for a small Indian manufacturer at roughly ₹3–15 lakh, and a fuller build for a mid-sized manufacturer at ₹15–40 lakh. Those are market figures, not a price list: two businesses that both want "an ERP" can need very different systems, which is why the price is fixed per phase only after the modeling phase. Maintenance after go-live usually runs as an annual contract. Ahrom Labs' terms, and the sources for those ranges, are on the [engagement page](/engagement); what to settle in the contract is in the [contract checklist](/erp/contract-checklist).

## Your plan, in one line per phase

Write the plan as a table: phase, what it delivers, the requirement lines it covers, the acceptance tests, the date, the price. If a vendor can't fill that table before the build, the plan isn't ready.
