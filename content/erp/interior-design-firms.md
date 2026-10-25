---
kind: erp
slug: interior-design-firms
title: "ERP for interior design firms and fit-out businesses: what to require"
answer: >
  An interior design or fit-out business needs quotations built from a BOQ, projects that show what each is
  waiting on, vendor and freight charges checked against agreed rates, labour logged against each job and
  payroll computed from attendance, and, where there are sister companies, each invoicing on its own letterhead
  and GSTIN from one system.
description: "ERP requirements for interior design and fit-out firms in India: BOQ quotations, project blockers, vendor rate checks, payroll, two companies."
domain: [erp, interiors, requirements]
published: 2026-10-25
updated: 2026-10-25
checked: 2026-10-25
image:
  src: /erp/erp-interior-design-firms.webp
  alt: "A drafting table with a floor plan pinned to it and a roll of drawings."
  width: 1086
  height: 362
---

## Start with these

1. **Quotations from a BOQ**, with revisions kept and the accepted one turned into the order without retyping. ([requirement](/erp/requirements#sales-quotation-format)) How to write the BOQ itself is in the [interior BOQ guide](/boq).
2. **What each project is waiting on**: material, drawing, approval or payment, worked out fresh each time. ([requirement](/erp/requirements#production-blockers))
3. **Vendor and freight charges checked** against agreed rates, with overcharges flagged. ([requirement](/erp/requirements#purchase-rate-check))
4. **Labour logged against each job**, so job costs include it. ([requirement](/erp/requirements#payroll-work-logs))
5. **Payroll computed** from attendance, rates and advances, never typed. ([requirement](/erp/requirements#payroll-computed))
6. **Two companies, one system**: each invoice under its own company's letterhead and GSTIN, from one client list. ([requirement](/erp/requirements#sales-multi-company))
7. **Staff see only their own cash entries**, and bank data is refused to them by the system. ([requirement](/erp/requirements#nonfunctional-role-access))

## The rules that usually apply

- **Being a company:** the books need an audit trail. ([audit trail](/erp/requirements#accounts-audit-trail))
- **Above ₹5 crore:** e-invoices for B2B work. ([e-invoice](/erp/requirements#accounts-e-invoice))
- **Paying micro and small vendors:** due dates at most 45 days from acceptance. ([MSME](/erp/requirements#purchase-msme-due-dates))

All of them, quoted from the official text: [compliance requirements](/erp/compliance).

## What this looks like in a running system

Savistar, an interior design studio, and Saag, its sister furniture workshop, run one system: projects and site visits for Savistar, workshop orders for Saag, and one combined finance ledger. Each invoice picks its own company's letterhead, logo and GSTIN; vendor and freight charges are checked against reference rates; payroll is days × rate − advances, never typed; and an AI assistant answers from their own records in English or Hinglish. Quotations are built from a BOQ library, with payment stages that become invoices. See [software for interior design firms](/industries/interior-design-and-furniture), or try the [interiors demo](https://interiors-erp.ahromlabs.com/demo), where one freight trip is overcharged on purpose.

## Build your list

The [requirements builder](/erp/check) with "Project businesses" selected gives the full list for your turnover and whether Tally stays.

If the system will have an AI assistant, [what it should answer for this kind of business](/ai-assistant/interior-design-firms) lists the questions, with what Atelier AI answers today.
