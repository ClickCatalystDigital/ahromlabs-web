---
kind: erp
slug: small-manufacturers
title: "ERP for small manufacturers in India: the requirements that matter most"
metaTitle: "ERP for small manufacturers in India: key requirements"
related:
  - /erp/readiness
  - /erp/tally-vs-custom-erp
  - /industries/boiler-pressure-vessel-manufacturing
  - /notes/tally-vs-erpnext-vs-custom-erp
  - /notes/plate-remnants-back-into-stock
answer: >
  A small Indian manufacturer needs an ERP that works from its existing Excel BOMs, tracks material down to the
  plate or batch it cuts from, sets stock aside for each order, costs jobs from what was actually used, and keeps
  the GST books or posts cleanly into Tally. Above ₹5 crore turnover add e-invoicing; as a company, an audit trail.
description: "ERP requirements for small manufacturers in India: BOM import, traceability, remnants, job costing, reservations, GST or Tally, e-invoice."
domain: [erp, manufacturing, requirements]
published: 2026-10-25
updated: 2026-11-06
checked: 2026-11-06
image:
  src: /erp/erp-small-manufacturers.webp
  alt: "A small hydraulic workshop press with its hand pump."
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
  - title: "Advisory: time limit for reporting e-invoice on the IRP portal (AATO ₹10 crore and above)"
    publisher: GSTN
    url: https://www.mahagst.gov.in/public/uploads/gstnadvisory/1760531580_293%20Advisory%20Time%20Limit%20for%20Reporting%20e%20Invoice%20on%20the%20IRP%20Portal%20%20Lowering%20of%20Threshold%20to%20AATO%2010%20Crores%20and%20Above.pdf
    date: 2024-11-05
checks:
  - reg: Companies (Accounts) Rules, 2014, rule 3(1), proviso
    doc: mca-audit-trail-2021
    quote: has a feature of recording audit trail of each and every transaction, creating an edit log of each change made in books of account along with the date when such changes were made and ensuring that the audit trail cannot be disabled
  - reg: Notification No. 10/2023–Central Tax
    doc: cbic-10-2023
    quote: the words “five crore rupees” shall be substituted
  - reg: GSTN advisory, 5 November 2024
    doc: gstn-30-day
    quote: taxpayers with an AATO of 10 crores and above would not be allowed to report e-Invoices older than 30 days from the date of reporting on IRP portals
---

## What should a small manufacturer require first?

The lines a small manufacturer can least afford to get wrong, in the order they usually go live. Each links to its test.

1. **Your BOMs, from Excel.** Import the sheets you already keep, matched to the item master; a likely typo suggested, never silently corrected. ([requirement](/erp/requirements#production-bom-import))
2. **A released BOM is frozen.** Purchase and stores work from a version, not a moving sheet. ([requirement](/erp/requirements#production-bom-release))
3. **Shortfalls become purchase requests**, after stock and usable remnants are counted. ([requirement](/erp/requirements#purchase-need-to-request))
4. **Remnants go back into stock**, with weights from dimensions, offered to waiting BOM lines before anything is bought. ([requirement](/erp/requirements#production-cutting-remnants))
5. **Jobs costed from actual use**, material and labour. ([requirement](/erp/requirements#production-costing-from-use))
6. **What each job is waiting on**, worked out fresh, not typed. ([requirement](/erp/requirements#production-blockers))
7. **Certificates kept once and linked to what they cover**, with any link that ends in statutory paperwork confirmed by a person. ([requirement](/erp/requirements#quality-confirmed-links))

## Which rules does turnover bring in?

It depends on turnover and on being a company:

- **Being a company:** the books need an [audit trail](/systems/audit-trail) that can't be switched off. ([audit trail](/erp/requirements#accounts-audit-trail))
- **Above ₹5 crore:** e-invoices for B2B sales; **at ₹10 crore and above:** reported within 30 days. ([e-invoice](/erp/requirements#accounts-e-invoice))
- **Buying from micro and small enterprises:** due dates at most 45 days from acceptance. ([MSME](/erp/requirements#purchase-msme-due-dates))

All of them, quoted from the official text, are in [compliance requirements](/erp/compliance).

## What does this look like in a running system?

At a boiler and pressure-vessel manufacturer, Ahrom Labs' system imported six of the client's real BOM files through the interface, traces each plate and section through cutting, and assembled each boiler's [IBR statutory folder](/systems/ibr-statutory-folder) from a bank of [material test certificates](/systems/material-test-certificate). In a live cut test, a 157.00 kg plate became 127.17 kg used, 15.70 kg remnant and 14.13 kg scrap, conserved exactly. The same system keeps the books: GSTR-1, GSTR-3B, TDS and 23 reports, with Tally optional. See [ERP for boiler and pressure-vessel manufacturers](/industries/boiler-pressure-vessel-manufacturing), or try it with twelve sample logins, one per department, at the [manufacturing demo](https://boiler-erp.ahromlabs.com/demo).

## How do I build my own requirements list?

The [requirements builder](/erp/check) with "Manufacturing" selected gives the full list for your turnover and whether Tally stays, ready to send to vendors.

If the system will have an AI assistant, [what it should answer for this kind of business](/ai-assistant/manufacturers) lists the questions, with what Ember AI answers today.
