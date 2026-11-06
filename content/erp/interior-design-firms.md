---
kind: erp
slug: interior-design-firms
title: "ERP for interior design firms and fit-out businesses: what to require"
metaTitle: "ERP for interior design and fit-out firms: requirements"
related:
  - /boq/how-to-make-an-interior-boq
  - /industries/interior-design-and-furniture
  - /services/multi-company-finance
  - /ai-assistant/interior-design-firms
answer: >
  An interior design or fit-out business needs quotations built from a BOQ, projects that show what each is
  waiting on, vendor and freight charges checked against agreed rates, labour logged against each job and
  payroll computed from attendance, and, where there are sister companies, each invoicing on its own letterhead
  and GSTIN from one system.
description: "ERP requirements for interior design and fit-out firms in India: BOQ quotations, project blockers, vendor rate checks, payroll, two companies."
domain: [erp, interiors, requirements]
published: 2026-10-25
updated: 2026-11-06
checked: 2026-11-06
image:
  src: /erp/erp-interior-design-firms.webp
  alt: "A drafting table with a floor plan pinned to it and a roll of drawings."
  width: 1086
  height: 362
sources:
  - title: Companies (Accounts) Amendment Rules, 2021 (G.S.R. 205(E))
    publisher: Ministry of Corporate Affairs, Gazette of India
    url: https://egazette.gov.in/WriteReadData/2021/226081.pdf
    date: 2021-03-24
  - title: Notification No. 10/2023–Central Tax (e-invoice threshold)
    publisher: Central Board of Indirect Taxes and Customs (GST Council copy)
    url: https://gstcouncil.gov.in/sites/default/files/2024-05/10ct_eng.pdf
    date: 2023-05-10
  - title: Micro, Small and Medium Enterprises Development Act, 2006
    publisher: Gazette of India (Ministry of MSME copy)
    url: https://samadhaan.msme.gov.in/WriteReadData/DocumentFile/MSMED2006act.pdf
    date: 2006-06-16
checks:
  - reg: Companies (Accounts) Rules, 2014, rule 3(1), proviso
    doc: mca-audit-trail-2021
    quote: has a feature of recording audit trail of each and every transaction, creating an edit log of each change made in books of account along with the date when such changes were made and ensuring that the audit trail cannot be disabled
  - reg: Notification No. 10/2023–Central Tax
    doc: cbic-10-2023
    quote: the words “five crore rupees” shall be substituted
  - reg: MSMED Act, 2006, section 15, proviso
    doc: msmed-act-2006
    quote: Provided that in no case the period agreed upon between the supplier and the buyer in writing shall exceed forty-five days from the day of acceptance or the day of deemed acceptance
---

## What should an interior design firm require first?

BOQ quotations, project blockers, vendor rate checks, payroll and two companies' books:

1. **Quotations from a BOQ**, with revisions kept and the accepted one turned into the order without retyping. ([requirement](/erp/requirements#sales-quotation-format)) How to write the BOQ itself is in the [interior BOQ guide](/boq).
2. **What each project is waiting on**: material, drawing, approval or payment, worked out fresh each time. ([requirement](/erp/requirements#production-blockers))
3. **Vendor and freight charges checked** against agreed rates, with overcharges flagged. ([requirement](/erp/requirements#purchase-rate-check))
4. **Labour logged against each job**, so job costs include it. ([requirement](/erp/requirements#payroll-work-logs))
5. **Payroll computed** from attendance, rates and advances, never typed. ([requirement](/erp/requirements#payroll-computed))
6. **Two companies, one system**: each invoice under its own company's letterhead and GSTIN, from one client list. ([requirement](/erp/requirements#sales-multi-company))
7. **Staff see only their own cash entries**, and bank data is refused to them by the system. ([requirement](/erp/requirements#nonfunctional-role-access))

## Which rules usually apply?

The audit trail if you are a company, e-invoicing by turnover, and the MSME payment limit:

- **Being a company:** the books need an [audit trail](/systems/audit-trail). ([audit trail](/erp/requirements#accounts-audit-trail))
- **Above ₹5 crore:** e-invoices for B2B work. ([e-invoice](/erp/requirements#accounts-e-invoice))
- **Paying micro and small vendors:** due dates at most 45 days from acceptance. ([MSME](/erp/requirements#purchase-msme-due-dates))

All of them, quoted from the official text: [compliance requirements](/erp/compliance).

## What does this look like in a running system?

Savistar, an interior design studio, and Saag, its sister furniture workshop, run one system: projects and site visits for Savistar, workshop orders for Saag, and one combined finance ledger. Each invoice picks its own company's letterhead, logo and GSTIN; vendor and freight charges are checked against reference rates; payroll is days × rate − advances, never typed; and an AI assistant answers from their own records in English or Hinglish. Quotations are built from a BOQ library, with payment stages that become invoices. See [software for interior design firms](/industries/interior-design-and-furniture), or try the [interiors demo](https://interiors-erp.ahromlabs.com/demo), where one freight trip is overcharged on purpose.

## How do I build my own requirements list?

The [requirements builder](/erp/check) with "Project businesses" selected gives the full list for your turnover and whether Tally stays.

If the system will have an AI assistant, [what it should answer for this kind of business](/ai-assistant/interior-design-firms) lists the questions, with what Atelier AI answers today.
