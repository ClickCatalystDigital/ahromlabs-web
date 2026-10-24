---
kind: erp
slug: compliance
title: "Indian compliance requirements for an ERP: audit trail, e-invoice, e-way bill, MSME, TDS"
answer: >
  An ERP used in India has to meet rules the business is bound by: an audit trail that can't be switched off
  for companies keeping books in software (from 1 April 2023), e-invoices above ₹5 crore turnover, reporting to
  the portal within 30 days at ₹10 crore and above, e-way bills above ₹50,000, MSME payment limits of 45 days,
  TDS on purchases above ₹50 lakh for larger buyers, and safeguards for personal data.
description: "The Indian rules an ERP must meet in 2026, by turnover: audit trail, e-invoice (IRN), 30-day IRP limit, e-way bill, MSME 45 days, TDS on goods, DPDP."
domain: [erp, compliance, gst]
published: 2026-10-25
updated: 2026-10-25
checked: 2026-10-25
image:
  src: /erp/erp-compliance-audit-trail.webp
  alt: "A closed ledger book with a padlock resting on its cover."
  width: 1086
  height: 362
sources:
  - title: Companies (Accounts) Amendment Rules, 2021 (G.S.R. 205(E))
    publisher: Ministry of Corporate Affairs, Gazette of India
    url: https://egazette.gov.in/WriteReadData/2021/226081.pdf
    date: 2021-03-24
  - title: Companies (Accounts) Second Amendment Rules, 2022 (G.S.R. 235(E))
    publisher: Ministry of Corporate Affairs, Gazette of India
    url: https://egazette.gov.in/WriteReadData/2022/234733.pdf
    date: 2022-03-31
  - title: Notification No. 10/2023–Central Tax (e-invoice threshold)
    publisher: Central Board of Indirect Taxes and Customs (GST Council copy)
    url: https://gstcouncil.gov.in/sites/default/files/2024-05/10ct_eng.pdf
    date: 2023-05-10
  - title: "Advisory: time limit for reporting e-invoice on the IRP portal (AATO ₹10 crore and above)"
    publisher: GSTN
    url: https://www.mahagst.gov.in/public/uploads/gstnadvisory/1760531580_293%20Advisory%20Time%20Limit%20for%20Reporting%20e%20Invoice%20on%20the%20IRP%20Portal%20%20Lowering%20of%20Threshold%20to%20AATO%2010%20Crores%20and%20Above.pdf
    date: 2024-11-05
  - title: Notification No. 12/2018–Central Tax (rule 138, e-way bill)
    publisher: Central Board of Indirect Taxes and Customs (GST Council copy)
    url: https://gstcouncil.gov.in/sites/default/files/2024-05/notification-12-2018-central_tax-english.pdf
    date: 2018-03-07
  - title: Micro, Small and Medium Enterprises Development Act, 2006
    publisher: Gazette of India (Ministry of MSME copy)
    url: https://samadhaan.msme.gov.in/WriteReadData/DocumentFile/MSMED2006act.pdf
    date: 2006-06-16
  - title: Income-tax Act, 2025 (30 of 2025)
    publisher: Ministry of Law and Justice, Gazette of India
    url: https://egazette.gov.in/WriteReadData/2025/265620.pdf
    date: 2025-08-22
  - title: Digital Personal Data Protection Act, 2023
    publisher: Ministry of Law and Justice, Gazette of India
    url: https://egazette.gov.in/WriteReadData/2023/248045.pdf
    date: 2023-08-11
checks:
  - reg: Companies (Accounts) Rules, 2014, rule 3(1), proviso
    doc: mca-audit-trail-2021
    quote: has a feature of recording audit trail of each and every transaction, creating an edit log of each change made in books of account along with the date when such changes were made and ensuring that the audit trail cannot be disabled
  - reg: Companies (Accounts) Second Amendment Rules, 2022
    doc: mca-audit-trail-2022
    quote: the figures, letters and words “1st day of April, 2023” shall be substituted
  - reg: Notification No. 10/2023–Central Tax
    doc: cbic-10-2023
    quote: the words “five crore rupees” shall be substituted
  - reg: GSTN advisory, 5 November 2024
    doc: gstn-30-day
    quote: taxpayers with an AATO of 10 crores and above would not be allowed to report e-Invoices older than 30 days from the date of reporting on IRP portals
  - reg: CGST Rules, 2017, rule 138
    doc: cgst-rule-138
    quote: consignment value exceeding fifty thousand rupees
  - reg: MSMED Act, 2006, section 15, proviso
    doc: msmed-act-2006
    quote: Provided that in no case the period agreed upon between the supplier and the buyer in writing shall exceed forty-five days from the day of acceptance or the day of deemed acceptance
  - reg: Income-tax Act, 2025, section 37(2)(g)
    doc: it-act-2025
    quote: amount payable by the assessee to a micro or small enterprise beyond the time limit specified in section 15 of the Micro, Small and Medium Enterprises Development Act, 2006
  - reg: Digital Personal Data Protection Act, 2023, section 8(5)
    doc: dpdp-act-2023
    quote: reasonable security safeguards to prevent personal data breach
---

## Which rules apply to you

Most rules turn on two facts: whether the business is a company, and its turnover. The [requirements builder](/erp/check) applies these for you.

| Rule | Applies when | What the ERP must do |
|---|---|---|
| Audit trail | A company keeps its books in software | Log every change with its date; can't be switched off |
| E-invoice (IRN) | Aggregate turnover above ₹5 crore in any year since 2017-18 | Get an IRN for each B2B invoice, credit and debit note |
| 30-day IRP limit | Annual aggregate turnover ₹10 crore and above | Report each e-invoice within 30 days of its date |
| E-way bill | Goods move with a consignment value above ₹50,000 | Produce the e-way bill from the dispatch |
| MSME payment limit | Buying from a micro or small enterprise | Track each bill's due date, at most 45 days from acceptance |
| TDS on purchase of goods | A buyer with turnover above ₹10 crore in the previous year | Track each seller's yearly total; deduct beyond ₹50 lakh |
| Personal data | Holding digital personal data of staff, customers or contacts | Reasonable security safeguards; breaches can be traced |

## Audit trail: every company keeping books in software

Since 1 April 2023, a company that keeps its books in accounting software must use software that records an audit trail of every transaction: an edit log of each change, with its date, that cannot be disabled. The rule is a proviso to rule 3(1) of the Companies (Accounts) Rules, 2014, inserted in March 2021 and deferred twice to 1 April 2023. The company's auditor reports on it.

For an ERP that keeps the books, this means the old value, the new value, who changed it and when, for every entry, with no setting anywhere that turns it off. It also means no gap at cutover: the trail has to run through the move from the old system to the new one. See the [audit-trail requirement](/erp/requirements#accounts-audit-trail).

## E-invoice, and the 30-day limit

From 1 August 2023, registered persons whose aggregate turnover exceeded ₹5 crore in any financial year from 2017-18 must e-invoice: each B2B invoice, credit note and debit note is registered on the invoice registration portal (IRP), which returns an IRN and a signed QR code. Notification 10/2023–Central Tax lowered the threshold from ₹10 crore.

From 1 April 2025, taxpayers with annual aggregate turnover of ₹10 crore and above cannot report a document to the IRP more than 30 days after its date; the portal refuses it. An ERP for such a business should show which invoices are still unreported and how many days each has left. See the [e-invoice requirements](/erp/requirements#accounts-e-invoice).

## E-way bill

Under rule 138 of the CGST Rules, an e-way bill is needed before goods move with a consignment value exceeding ₹50,000. The ERP should produce it from the invoice and the dispatch, not have someone retype the consignment into the portal at the gate. See the [e-way bill requirement](/erp/requirements#dispatch-eway-bill).

## MSME payment limits, and why they matter for tax

Section 15 of the MSMED Act, 2006 requires a buyer to pay a micro or small enterprise supplier by the agreed date, and the agreed period can never exceed 45 days from acceptance; with no written agreement, the Act's appointed day applies. Section 16 adds compound interest on late payment.

The Income-tax Act, 2025, in section 37(2)(g), allows the deduction for an amount owed to such a supplier only when it is actually paid, if it is paid beyond that limit, and the usual grace until the return due date doesn't apply to it. So the ERP needs to know which suppliers are micro or small enterprises, and show each of their bills with its due date. How the rule applies to a particular business, a trader for example, is a question for your CA. See the [MSME requirements](/erp/requirements#purchase-msme-due-dates).

## TDS on purchase of goods

Under the Income-tax Act, 2025, a buyer whose turnover exceeded ₹10 crore in the preceding tax year deducts tax on payments to a seller for goods beyond ₹50 lakh in the year (section 393(1), table row 8(ii), formerly section 194Q). The provision is a table, so it is cited here rather than quoted: read row 8(ii) and its note in the Act. The ERP has to keep each seller's running total for the year and start deducting on the bill that crosses it. See the [TDS requirement](/erp/requirements#accounts-tds-purchases).

## Personal data

A business holding digital personal data, of employees, customers or contacts, is a data fiduciary under the Digital Personal Data Protection Act, 2023. Section 8 requires reasonable security safeguards to prevent a personal data breach and intimation of a breach in the prescribed way. For an ERP, that means access to personal details limited by role and logged, and a way to see who saw what. Check which of the Act's provisions and rules are in force when you buy. See the [personal-data requirement](/erp/requirements#nonfunctional-personal-data).

## What changed, and when

| Date | Change |
|---|---|
| 7 Mar 2018 | Rule 138 substituted: e-way bill above ₹50,000 |
| 24 Mar 2021 | Audit-trail proviso added to the Companies (Accounts) Rules |
| 31 Mar 2022 | Audit trail deferred to financial years from 1 April 2023 |
| 1 Aug 2023 | E-invoice threshold lowered to ₹5 crore |
| 11 Aug 2023 | Digital Personal Data Protection Act published |
| 1 Apr 2025 | 30-day IRP reporting limit extended to ₹10 crore and above |
| 1 Apr 2026 | Income-tax Act, 2025 in force: MSME rule in section 37(2)(g), TDS on goods in section 393 |

## What to ask a vendor

Ask the vendor to do each test on the checklist, in front of you: change an entry and show the audit trail; generate an IRN for a test invoice; list the invoices that are near the 30-day limit; produce an e-way bill from a dispatch; show an MSME supplier's bills with due dates. A vendor who can't show it doesn't have it yet. Ahrom Labs states its own gaps the same way: it has not yet built an IRP connection, and its e-way bill client is built but not yet live.
