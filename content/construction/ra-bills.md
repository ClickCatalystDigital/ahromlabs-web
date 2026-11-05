---
kind: construction
slug: ra-bills
group: india
title: "RA bills: how a running account bill works"
related:
  - /construction/measurement-book
  - /ai-assistant/construction-contractors
  - /systems/bill-of-quantities
  - /services/custom-erp-crm
question: "What is an RA bill in construction, and what is deducted from it?"
answer: >
  A running account (RA) bill is a contractor's interim bill for work done and measured so far, paid while the work
  continues; the final bill closes the contract. Each RA bill is drawn from the measurement book, cumulative to date
  less earlier bills, and carries deductions: security deposit, TDS, any mobilisation or secured advance being
  recovered, and other recoveries the contract sets.
description: "Running account (RA) bills in Indian construction: drawn from the measurement book, security deposit, TDS, advances, final bill."
domain: [construction, billing, india]
published: 2026-11-03
updated: 2026-11-05
checked: 2026-11-03
sources:
  - title: CPWD Works Manual 2022
    publisher: Central Public Works Department, Government of India (copy published by NDMC)
    url: https://www.ndmc.gov.in/departments/Departments/Finance/nodal_cell/CPWD%20Works%20Manual%202022.pdf
    date: "2022-06-30"
checks:
  - reg: CPWD Works Manual 2022, para 5.5 (security deposit)
    doc: cpwd
    quote: "The security deposit shall be deducted from the running bill as well as final bill as per provisions of the GCC."
  - reg: CPWD Works Manual 2022, para 5.10 (secured advance)
    doc: cpwd
    quote: "Secured advance is a term applied specifically to an advance made on the materials brought at site of work, to a contractor whose contract is for the completed item of work."
  - reg: CPWD Works Manual 2022, para 5.12.5 (advance payments)
    doc: cpwd
    quote: "Advance payments can be made to the contractor on a running account bill form for the work done and measurements submitted by him, but not checked or work done but not measured"
  - reg: CPWD Works Manual 2022, para 5.12 (measurement of work)
    doc: cpwd
    quote: "All measurements are to be done as per provisions of GCC and abstract of schedule of measurements and payments are to be entered through PFMS portal of CPWD using E-MB module."
---

## What is an RA bill?

On an item-rate contract, a contractor is paid by measured quantity at the agreed rate for each BOQ item. Waiting
for the end of the job would starve the contractor of cash, so the work is billed in stages: the 1st RA bill, the
2nd, and so on, each for the work measured up to its date, and a final bill when the work is complete. The CPWD
Works Manual uses the term throughout, and most private contracts in India follow the same pattern.

## How an RA bill is drawn up

Every RA bill comes from the [measurement book](/construction/measurement-book), and is cumulative:

| Line | Example (made up) |
|---|---|
| Value of work done to date, item by item at agreement rates | ₹48,00,000 |
| Add: extra and deviated items approved | ₹1,50,000 |
| Gross value to date | ₹49,50,000 |
| Less: paid in previous RA bills (gross) | ₹31,00,000 |
| **Gross value of this bill** | **₹18,50,000** |

Then the deductions, on this bill's value, as the contract sets them:

- **Security deposit**, a percentage of each bill, held until the defects period ends. CPWD deducts it from running
  bills and the final bill as the general conditions of contract provide.
- **TDS** under the Income-tax Act; see [TDS on payments to contractors](/construction/tds-on-contractor-payments).
- **Recovery of advances**: mobilisation advance in instalments, and secured advance on materials once they are
  built in.
- **Recoveries for materials issued** by the client, water and electricity, and any penalties.

GST is charged on top of the bill as the contractor's invoice; see [GST on works contracts](/construction/gst-on-works-contracts).

## Advances against an RA bill

The CPWD manual describes two that change an RA bill's maths:

- **Secured advance:** paid on materials brought to site for an item not yet complete, and recovered from later
  bills as the material is used.
- **Advance payment for work done but not yet checked or measured**, paid as a lump sum on the contractor's request,
  subject to conditions, and adjusted when the measurements are recorded.

## What your system should do

- Hold the BOQ with agreement rates, and take each RA bill from the measurements, never typed totals.
- Keep every bill cumulative, so this bill is always to-date less previous.
- Track each deduction by type across bills: security deposit held, advances still to recover, TDS deducted.
- Mark extra and deviated items until they are approved, so they're billed once.
- Close with a final bill that releases the security deposit only when the defects period has passed.
