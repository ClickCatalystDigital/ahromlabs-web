---
kind: construction
slug: measurement-book
group: india
title: "Measurement book (MB): recording work for payment"
question: "What is a measurement book in construction, and how is it kept?"
answer: >
  The measurement book (MB) is the record of every quantity of work done, measured on site item by item, from which
  each running bill and the final bill is paid. In CPWD and most government works, measurements follow the contract's
  rules of measurement, are test-checked by senior engineers, and are now entered electronically as an e-MB; private
  contractors keep the same record for their clients and subcontractors.
description: "The measurement book in Indian construction: what it records, how it is test-checked, e-MB, extra and deviated items, and inadmissible items."
domain: [construction, measurement, india]
published: 2026-11-03
updated: 2026-11-03
checked: 2026-11-03
sources:
  - title: CPWD Works Manual 2022
    publisher: Central Public Works Department, Government of India (copy published by NDMC)
    url: https://www.ndmc.gov.in/departments/Departments/Finance/nodal_cell/CPWD%20Works%20Manual%202022.pdf
    date: "2022-06-30"
checks:
  - reg: CPWD Works Manual 2022, para 5.12
    doc: cpwd
    quote: "All measurements are to be done as per provisions of GCC and abstract of schedule of measurements and payments are to be entered through PFMS portal of CPWD using E-MB module."
  - reg: CPWD Works Manual 2022, para 5.12.1
    doc: cpwd
    quote: "The procedures on operation of MB i.e writing of MB, Recording of measurements, Movement of MB, Transfer of MB, Review of MB, Loss of MB etc are given in SOP 5/20."
  - reg: CPWD Works Manual 2022, para 5.14
    doc: cpwd
    quote: "Test Checking of measurements shall be carried out by respective officers as given in SOP 5/24."
  - reg: CPWD Works Manual 2022, para 5.12.3 (inadmissible items)
    doc: cpwd
    quote: "Inadmissible items claimed but not included in the payment"
  - reg: CPWD Works Manual 2022, para 5.11
    doc: cpwd
    quote: "Extra items are those items which are not available in the agreement but are required to complete the work. Deviation means increase or decrease in the quantities of items of work in the agreement."
  - reg: CPWD Works Manual 2022, para 5.6.4 (responsibility for quality of work)
    doc: cpwd
    quote: "The officer who records/test checks the measurements for an item of work will be responsible for the quality, quantity/ measurements and dimensional accuracy of that item of work."
---

## What does a measurement book record?

For each item of the BOQ, every time work is measured: the date, the location (floor, grid, chainage), the
dimensions taken (number, length, breadth, depth), the quantity worked out, who measured it and who accepted it for
the contractor. The quantities, multiplied by the agreement rates, become the
[running account bill](/construction/ra-bills).

| Item | Location | No. | L (m) | B (m) | D (m) | Qty |
|---|---|---|---|---|---|---|
| RCC M25 in columns | Ground floor, C1–C8 | 8 | 0.45 | 0.30 | 3.20 | 3.456 m³ |
| Brickwork 230 mm | First floor, grid A–D | 1 | 18.40 | 0.23 | 3.00 | 12.696 m³ |

The figures are made up. How each item is measured (deductions for openings, which faces count) comes from the
contract's mode of measurement, usually an IS 1200 part or the department's schedule; see
[measurement rules for interior BOQs](/boq/measurement-rules) for the same idea applied to interiors.

## Who records and checks it?

In CPWD works the site engineers record measurements and the officers named in CPWD's standard operating
procedures test-check them. The officer who records or test-checks an item is responsible
for its quality, quantity and dimensional accuracy, which is why measurements are signed, not just entered.

CPWD now records measurements electronically through its e-MB module on PFMS; the physical MB, where still used,
has its own rules for writing, movement, transfer and loss.

## Extra, deviated and inadmissible items

- **Extra items** are needed to complete the work but aren't in the agreement; **deviation** is a change in an
  agreement item's quantity. Rates beyond the contract's deviation limit are fixed as the general conditions say.
- **Inadmissible items**: where the contractor claims an item the department won't pay, CPWD still records the
  measurements, for record only, under a separate heading, so the quantity is known if the claim is admitted later.

## What your system should do

- Measurements entered on site, per BOQ item and location, with dimensions, not only quantities.
- Who measured, who checked, and the contractor's acceptance, with dates.
- A running total per item against the BOQ quantity, flagging deviation beyond the contract limit.
- Extra items held apart until their rate is approved.
- Each [RA bill](/construction/ra-bills) built from the measurements since the last bill, so nothing is paid twice.
- The same records feed [TDS](/construction/tds-on-contractor-payments) and [GST](/construction/gst-on-works-contracts) on each bill.
