---
kind: manufacturing
slug: custom-vs-off-the-shelf-erp
group: choosing
title: "Custom vs off-the-shelf ERP for a small manufacturer"
question: "Should a small manufacturer build a custom ERP or buy one off the shelf?"
answer: >
  Buy off the shelf if your work fits a standard package, you can live with its scheduling and reports, and
  nobody in the business has time to own a software project. Build custom, in phases, when your workflow is
  what sets you apart, packages force workarounds that bring the spreadsheets back, and you can get in writing
  your data, the code and licence terms, and a fixed scope per phase. Many shops are best served in between.
description: "Custom vs off-the-shelf ERP for small manufacturers: when each wins, the real costs over five years, one-builder risk, and questions to ask before you sign."
domain: [manufacturing, erp, build-vs-buy]
published: 2026-11-02
updated: 2026-11-02
checked: 2026-11-02
sources:
  - title: ERP systems (forum discussion)
    publisher: Practical Machinist
    url: https://www.practicalmachinist.com/forum/threads/erp-systems.395119/page-2
    date: 2026-11-02
  - title: Free ERP system (forum discussion)
    publisher: Practical Machinist
    url: https://www.practicalmachinist.com/forum/threads/free-erp-system.394704/page-2
    date: 2026-11-02
---

## The short version

| Off-the-shelf wins when | Custom wins when |
|---|---|
| Your jobs move the way the package expects | The way you quote, schedule or trace is why customers pick you |
| You need to start in weeks, not months | Every package you've tried needs side spreadsheets to work |
| Nobody can spend time defining requirements | An owner or manager can spend a few hours a week shaping it |
| Per-user pricing stays small at your size | You'd pay for many modules and users to use a fraction |
| You want a large vendor's roadmap and user community | You want changes in days, decided by you |

Ahrom Labs builds custom systems, so read the rest knowing that. We've tried to make the case for buying as fairly as the case for building.

## What shop owners say

Owners debating this on Practical Machinist split along predictable lines:

- **For building:** custom software is cheaper to change than custom machinery; shops that built their own say they adjust it constantly and that order entry got much faster.
- **Against building:** large custom builds can cost far more and take far longer than planned; cheap builders sometimes don't finish; one shop that had a contractor build its system was glad of it but wouldn't advise writing your own.
- **Against buying big:** packages carry modules you never use, and the scheduling is often the weak part.
- **Middle paths:** low-code tools (Airtable, FileMaker), open-source ERPs (ERPNext, Odoo), or a configurable package with in-house customization.

## The costs to compare, over five years

Compare the same things on both sides, not a license price against a build quote:

| Cost | Off-the-shelf | Custom |
|---|---|---|
| Up front | Implementation, setup, data migration, training | The build, data migration, training |
| Every year | Subscription or maintenance per user, usually rising with headcount | Hosting, support and changes (a care plan) |
| Changes | Configuration if it allows it; otherwise workarounds | Paid changes, but anything is possible |
| Your time | Fitting your process to the package | Defining and testing what gets built |
| Leaving | Exporting data, usually in the vendor's format | Depends on the contract: get this in writing |

The hidden cost on the off-the-shelf side is the workaround: the spreadsheet that runs beside the ERP because it can't model one thing, and the person who keeps it. On the custom side it is dependence on one builder.

## Reducing the risk of custom

If you build, these protect you:

1. **Phases with a fixed scope and price each.** A prototype of one workflow on your own data first, then the build; never one large open-ended project.
2. **Your data, exportable any time,** in plain files, without asking.
3. **Code and licence terms in writing:** who owns the code, what licence you hold, and what happens to both if you stop paying for support.
4. **Documentation and a handover path,** so another developer could take over.
5. **Acceptance tests you write:** two or three of your real jobs, run end to end before go-live, like the [ten tests in our job shop ERP guide](/manufacturing/job-shop-erp).
6. **Keep the accounting system you trust.** A shop system that posts to QuickBooks is a smaller, safer project than one that replaces it ([QuickBooks beside a shop system](/manufacturing/quickbooks-for-manufacturing)).

## Questions to ask a builder

- Show me a system you built that's been running for over a year, and let me talk to its owner.
- What happens on day one if you disappear? Where is the code and who can deploy it?
- How do changes get priced, and how fast do small ones happen?
- What's in the first phase, what isn't, and what's the price?
- How will my data come out if I leave?

The same comparison for Indian manufacturers, with TallyPrime and ERPNext in place of QuickBooks, is in [Tally vs ERPNext vs custom ERP](/notes/tally-vs-erpnext-vs-custom-erp). For the scheduling piece that packages most often get wrong, see [production scheduling software](/manufacturing/production-scheduling-software).
