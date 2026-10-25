---
kind: erp
slug: vendor-demo-script
title: "ERP vendor demo script: what to make every vendor show you"
answer: >
  Don't let an ERP vendor run their own demo. Bring your own data, give them a list of tests, and watch them do
  each one: change an entry and show the audit trail, reserve stock and try to ship it elsewhere, post an
  invoice to Tally and delete it there. A yes you didn't see demonstrated is a partly.
description: "ERP vendor demo script for Indian manufacturers and traders: the tests to make every vendor do in front of you, by department, and red flags."
domain: [erp, selection, demo]
published: 2026-10-25
updated: 2026-10-25
checked: 2026-10-25
image:
  src: /erp/erp-vendor-demo.webp
  alt: "A laptop on a stand showing a dashboard, with a stopwatch beside it."
  width: 1086
  height: 362
---

## How to run the demo

A vendor's own demo shows what their product does well, on data made to look good. Yours should show whether it does what your business needs, on data that looks like yours.

1. **Send the tests a week ahead.** The vendor should know what they'll be asked; a vendor who can't prepare for a known test won't handle an unknown one.
2. **Bring your own data.** A real BOM, a real supplier bill, ten real stock items. Sample data hides the edge cases you live with.
3. **You drive, or you call every click.** Watching a smooth run-through tells you little; asking "now change that" tells you a lot.
4. **Score as you go.** Yes only for what you saw done. Use the [Excel template](/erp/template): it has a column for each answer and scores vendors for you.
5. **Keep the script.** The same tests are your acceptance tests before go-live.

## The tests, by department

Pick the ones that apply from the [requirements builder](/erp/check). These are the ones most often promised and least often shown.

**Accounts**
- Enter a purchase bill, change its amount, and show the edit log with the old value, the new value, the user and the time. Then show there is no setting that turns the log off. ([audit trail](/erp/requirements#accounts-audit-trail))
- If your turnover is above ₹5 crore: generate an IRN for a test invoice and show the QR code on the print. ([e-invoice](/erp/requirements#accounts-e-invoice))
- Lock last month and try to edit an invoice in it. ([period lock](/erp/requirements#accounts-period-lock))
- If Tally stays: approve an invoice, find the voucher in TallyPrime, delete it there, and show it flagged after the next sync. ([Tally posting](/erp/requirements#accounts-tally-posting))

**Stores**
- Receive two units of the same item with different quantities and show each with its own label. ([unit-level stock](/erp/requirements#stores-unit-level))
- Reserve a unit for one order, then try to ship it on another. ([reservations](/erp/requirements#stores-reservations))
- Show the movements behind one item's balance, and that they add up to it exactly. ([derived balances](/erp/requirements#stores-balances-derived))

**Purchase**
- Receive less than ordered, enter the bill for the full quantity, and show the mismatch flagged before approval. ([three-way match](/erp/requirements#purchase-three-way-match))
- Mark a supplier as a micro enterprise and show its bills with due dates. ([MSME](/erp/requirements#purchase-msme-due-dates))

**Production**
- Import one of your real BOM sheets and show how each unmatched line is handled. ([BOM import](/erp/requirements#production-bom-import))
- Cut a plate and show the remnant back in stock with its weight. ([remnants](/erp/requirements#production-cutting-remnants))

**Access and reliability**
- Sign in as staff and open a bank page directly by its address. It should refuse. ([role access](/erp/requirements#nonfunctional-role-access))
- Pull the network cable during a sync and show what happens to the queued entries. ([offline](/erp/requirements#nonfunctional-offline))
- Ask for a full export of the demo data and open it in Excel. ([data export](/erp/requirements#nonfunctional-data-export))

**AI**
- Ask the assistant this month's sales, then compare its answer with the sales report. A number that doesn't match is the answer to whether you can trust it. ([assistant](/erp/requirements#reporting-assistant-no-invented-numbers); the full set of tests for an AI assistant is in the [AI assistant vendor test](/ai-assistant/vendor-test))

## What a demo won't tell you

Some answers only come in writing:

- **Who owns the code**, and what you hold if you stop paying. See the [contract checklist](/erp/contract-checklist).
- **How changes are priced** after the contract is signed.
- **Support response time**, and who else could take the system over.
- **A reference customer** like you, whom you call yourself.

## Red flags

- "That's on the roadmap" for a Must line.
- A demo only on the vendor's own sample company.
- "It's configurable" without configuring it in front of you.
- An AI feature that can't show where its numbers came from.
- No written answer on code ownership or data export.

## Try the tests on a live system

Every test above can be tried today on Ahrom Labs' demos, with sample data that resets nightly: [manufacturing](https://boiler-erp.ahromlabs.com/demo), [trading](https://electronics-erp.ahromlabs.com/demo) and [interiors](https://interiors-erp.ahromlabs.com/demo). Use them to see what a pass looks like before you watch anyone else's demo.
