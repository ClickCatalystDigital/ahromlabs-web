---
kind: construction
slug: measurement-book
group: india
title: "Measurement book (MB): recording work for payment"
related:
  - /construction/ra-bills
  - /boq/measurement-rules
  - /systems/bill-of-quantities
  - /systems/measurement-basis
  - /industries/construction-company
question: "What is a measurement book in construction, and how is it kept?"
answer: >
  The measurement book (MB) is the record of every quantity of work done, measured on site item by item, from which
  each running bill and the final bill is paid. In CPWD and most government works, measurements follow the contract's
  rules of measurement, are test-checked by senior engineers, and are now entered electronically as an e-MB; private
  contractors keep the same record for their clients and subcontractors.
description: "The measurement book in Indian construction: what an entry records, test checks, e-MB, extra and deviated items under GCC Clause 12, and how it feeds RA bills."
domain: [construction, measurement, india]
published: 2026-11-03
updated: 2026-11-05
checked: 2026-11-05
sources:
  - title: CPWD Works Manual 2022
    publisher: Central Public Works Department, Government of India (copy published by NDMC)
    url: https://www.ndmc.gov.in/departments/Departments/Finance/nodal_cell/CPWD%20Works%20Manual%202022.pdf
    date: "2022-06-30"
  - title: "General Conditions of Contract 2023, Construction Works (with DG CPWD's office memorandum of 22.09.2023)"
    publisher: Central Public Works Department, Government of India (copy published by IIT Kanpur)
    url: https://iitk.ac.in/iwd/file/2026/18-Civil-D2-2026-27/GCC-2023.pdf
    date: "2023-09-22"
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
  - reg: CPWD Works Manual 2022, para 5.11
    doc: cpwd
    quote: "The rates for deviated items beyond the limit specified in schedule F of the agreement as well as those of extra items shall be worked out in the manner prescribed in clause 12 of GCC."
  - reg: CPWD Works Manual 2022, para 5.11 (time limits)
    doc: cpwd
    quote: "Engineer-in-Charge within his own competency"
  - reg: CPWD Works Manual 2022, para 5.6.4 (responsibility for quality of work)
    doc: cpwd
    quote: "The officer who records/test checks the measurements for an item of work will be responsible for the quality, quantity/ measurements and dimensional accuracy of that item of work."
  - reg: GCC 2023, Clause 7
    doc: cpwd-gcc-2023
    quote: "the interim or running account bills shall be submitted by the contractor for the work executed on the basis of such recorded measurements on the format of the Department"
  - reg: GCC 2023, Clause 12.2 (extra items)
    doc: cpwd-gcc-2023
    quote: "In the case of extra item(s) (items which are not available in the contract), the contractor"
---

## What is a measurement book (MB)?

The measurement book is the record of every quantity of work measured on site, item by item, from which each
[running account bill](/construction/ra-bills) and the final bill is paid. CPWD's general conditions say running
bills are submitted "on the basis of such recorded measurements", so a quantity that isn't in the MB isn't billed.
Private contractors keep the same record for their own clients and, in the other direction, for the subcontractors
they pay.

## What details go into an MB entry?

For each BOQ item, every time it's measured: the date, the location (floor, grid, chainage), the dimensions taken
(number, length, breadth, depth), the quantity worked out, who measured it and who accepted it for the contractor.

| Item | Location | No. | L (m) | B (m) | D (m) | Qty |
|---|---|---|---|---|---|---|
| RCC M25 in columns | Ground floor, C1–C8 | 8 | 0.45 | 0.30 | 3.20 | 3.456 m³ |
| Brickwork 230 mm | First floor, grid A–D | 1 | 18.40 | 0.23 | 3.00 | 12.696 m³ |

The figures are made up. How each item is measured (deductions for openings, which faces count) comes from the
contract's mode of measurement, usually an IS 1200 part or the department's schedule; see
[measurement rules for interior BOQs](/boq/measurement-rules) for the same idea applied to interiors.

## Who records and test-checks measurements?

On CPWD works, site engineers record the measurements and the officers named in CPWD's standard operating procedure
SOP 5/24 test-check them. The officer who records or test-checks an item is responsible for its quality, quantity and
dimensional accuracy, which is why measurements are signed, not just entered. The contractor (or its representative)
accepts each measurement, so a disagreement is settled before the bill, not after it.

## What is an e-MB?

CPWD's electronic measurement book: measurements and payments are entered through its e-MB module on PFMS, the
government's financial management system. Where a physical MB is still used, CPWD's SOP 5/20 sets the rules for
writing it, recording measurements, moving and transferring it, reviewing it and what to do if it's lost.

## How does the MB become an RA bill?

The abstract adds up each item to date, multiplies by the agreement rate, and takes off what was paid in earlier
bills; the difference is this bill. An item "PU membrane", BOQ quantity 500 m² at ₹850:

| | Quantity | Amount |
|---|---|---|
| Previous bills | 300 m² | ₹2,55,000 |
| This bill | 180 m² | ₹1,53,000 |
| Up to date | 480 m² | ₹4,08,000 |

Every bill is cumulative, so a mistake in one measurement is corrected in the next bill's up-to-date figure rather
than lost. The [RA bill page](/construction/ra-bills) shows the deductions that follow.

## What are extra and deviated items?

Extra items are needed to complete the work but aren't in the agreement; a deviation is an increase or decrease in an
agreement item's quantity. Quantities within the deviation limit in the contract's Schedule F are paid at the
agreement rate; beyond it, and for extra items, the rate is worked out as Clause 12 of the general conditions
prescribes. The CPWD manual gives the Engineer-in-Charge 30 days to decide a claim within his own powers, longer when
it goes to a higher authority.

If the same PU membrane item reaches 640 m² against 500 m² in the BOQ, it's 28% over. Whether the excess is paid at
the BOQ rate or a new one depends on the Schedule F limit for that work.

## What happens to items the department won't pay?

They are still measured and recorded, under a separate heading as inadmissible items claimed but not included in the
payment, so the quantity is on record if the claim is accepted later.

## Can work be paid before it is measured?

On conditions. CPWD's rules allow an advance on a running bill for work measured but not yet checked, or done but
not yet measured, adjusted once the measurements are recorded; see [RA bills](/construction/ra-bills).

## What should a contractor's system keep for measurements?

- Measurements entered on site, per BOQ item and location, with the dimensions, not only the quantity.
- Who measured, who checked, and the contractor's acceptance, with dates.
- A running total per item against the BOQ quantity, flagging deviation beyond the contract's limit.
- Extra items held apart until their rate is approved.
- Each [RA bill](/construction/ra-bills) built from the measurements since the last bill, so nothing is paid twice.
- The same records feeding [TDS](/construction/tds-on-contractor-payments) and
  [GST](/construction/gst-on-works-contracts) on each bill.

In the [construction demo](/industries/construction-company), measurements are recorded per BOQ line with the date,
quantity, a note and who measured, entered by hand or filled from approved daily reports; once work is reported
against a line only its quantity can change, and quantities beyond the BOQ are flagged. It doesn't yet record
dimensions (number × length × breadth × depth), test checks or the contractor's acceptance; those are parts we'd build.
