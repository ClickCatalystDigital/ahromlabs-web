---
kind: construction
slug: material-consumption-vs-boq
group: india
title: "Material consumption vs BOQ: theoretical quantity and wastage"
metaTitle: "Material consumption vs BOQ norms on site"
related:
  - /construction/measurement-book
  - /construction/job-cost-per-site
  - /boq/material-specifications
  - /systems/bill-of-quantities
  - /industries/construction-company
question: "How does a contractor check material used on site against the BOQ, and what wastage does CPWD allow?"
answer: >
  Work out the theoretical quantity each BOQ item should have used, from its consumption norm and the work done,
  and compare it with the material actually issued to the site. On CPWD works Clause 38 of the GCC sets the rule:
  cement and bitumen from the Schedule of Rates constants, steel as designed plus 3% for cutting, pipes and cables
  plus 5%, sheets plus 10%, with a further variation allowed in Schedule F. Beyond that, the difference is questioned.
description: "Material consumption against BOQ norms: CPWD Clause 38 theoretical quantities, wastage for steel, pipes and sheets, worked examples, reconciliation."
domain: [construction, materials, india]
published: 2026-11-06
updated: 2026-11-07
checked: 2026-11-06
sources:
  - title: "General Conditions of Contract 2023, Construction Works (with DG CPWD's office memorandum of 22.09.2023)"
    publisher: Central Public Works Department, Government of India (copy published by IIT Kanpur)
    url: https://iitk.ac.in/iwd/file/2026/18-Civil-D2-2026-27/GCC-2023.pdf
    date: "2023-09-22"
  - title: CPWD Works Manual 2022
    publisher: Central Public Works Department, Government of India (copy published by NDMC)
    url: https://www.ndmc.gov.in/departments/Departments/Finance/nodal_cell/CPWD%20Works%20Manual%202022.pdf
    date: "2022-06-30"
checks:
  - reg: GCC 2023, Clause 38(i)
    doc: cpwd-gcc-2023
    quote: "in the event of Non reconciliation of materials issued"
  - reg: GCC 2023, Clause 38(ii)(a), cement and bitumen
    doc: cpwd-gcc-2023
    quote: "Quantity of cement & bitumen shall be calculated on the basis of quantity of cement & bitumen required for different items of work as shown in the Schedule of Rates mentioned in Schedule 'F'."
  - reg: GCC 2023, Clause 38(ii)(b), steel
    doc: cpwd-gcc-2023
    quote: "plus 3% wastage due to cutting into pieces, such theoretical quantity being determined and compared with the actual, each diameter wise, section wise and category wise separately."
  - reg: GCC 2023, Clause 38(ii)(c), pipes, wires and sheets
    doc: cpwd-gcc-2023
    quote: "plus 5% for wastage due to cutting into pieces (except in the case of G.I./M.S. sheets it shall be 10%)"
  - reg: GCC 2023, Clause 38(ii)(d), other materials
    doc: cpwd-gcc-2023
    quote: "For any other material as per actual requirements."
  - reg: GCC 2023, Clause 38, variation
    doc: cpwd-gcc-2023
    quote: "Over the theoretical quantities of materials so computed a variation shall be allowed as specified in Schedule 'F'"
  - reg: CPWD Works Manual 2022, para 5.6.7
    doc: cpwd
    quote: "The consumption of steel and cement at site shall be monitored as per processes given in SOP 5/13."
  - reg: CPWD Works Manual 2022, para 5.7(2)
    doc: cpwd
    quote: "For maintaining and operating other site documents viz Site order book, physical inspection register (wherever applicable), cement register, dismantle register etc details are given in SOP 5/14 which may be referred."
---

## What is material consumption against BOQ norms?

It's the check that the material a site has used matches what its work should have needed. Each BOQ item has a
consumption norm (so much cement per cubic metre of concrete, so many bags of mortar per square metre of repair):
multiply the norm by the quantity of work done and you get the theoretical quantity; compare it with what was
actually issued to the site. Material used above the norm is wastage, theft or rework; material below it can mean
work done thinner than specified, or issues not recorded.

## What does CPWD's Clause 38 say about theoretical consumption?

On CPWD works, Clause 38 of the General Conditions of Contract 2023 works out the theoretical quantity of material
after completion, and at any intermediate stage if the materials issued don't reconcile:

| Material | Theoretical quantity |
|---|---|
| Cement and bitumen | Quantity per item from the Schedule of Rates named in Schedule F; for other items, a formula the Engineer-in-Charge sets |
| Steel reinforcement and structural steel | Quantity as designed or authorised, including laps and chairs, plus 3% for cutting, compared diameter-wise and section-wise |
| GI and CI pipes, conduits, wires, cables, pig lead | Quantity actually required and measured, plus 5% for cutting |
| GI and MS sheets | Quantity actually required, plus 10% |
| Any other material | Actual requirements |

A further variation over these theoretical quantities is allowed as specified in Schedule F of the contract. For
non-scheduled items the Superintending Engineer decides the theoretical quantity.

## How do you work out theoretical consumption of steel?

From the design quantity for each diameter, plus 3%. A made-up example for 12 mm bars:

| | Tonnes |
|---|---|
| Design quantity, including laps and chairs | 12.000 |
| Plus 3% for cutting | 0.360 |
| **Theoretical quantity** | **12.360** |
| Issued to the work | 12.800 |
| Excess over theoretical | 0.440 (3.6%) |

Whether 0.440 t is acceptable depends on the variation Schedule F allows; beyond it, the department questions the
difference. Each diameter and section is compared separately, so a surplus of 16 mm can't hide a shortfall of 12 mm.

## How do you check cement or mortar against the BOQ?

Multiply the work done on each item by its constant from the schedule of rates (or the norm in your own BOQ), add the
items up per material, and compare with the bags issued. A made-up example from a repair job with a norm of 0.45 bag
of repair mortar per square metre: 700 m² of approved work should have used 315 bags; 360 bags were issued, 45 bags
(14%) over, which is worth investigating before the next order.

## Why does material reconciliation matter to a contractor?

Because it's where a site's margin leaks first, and where a client's audit looks. A site that uses 10% more material
than its norm on a material-heavy job can lose most of its margin without anyone noticing until the end; on CPWD
works, consumption of steel and cement is monitored under the Works Manual's standard procedures, with a cement
register kept at site. Checking each week, against approved work, finds the problem while the job can still recover.

## Which records does a reconciliation need?

The norms, the work done and every movement of material to and from the site:

- The BOQ with a consumption norm for each item and the material it uses.
- Work done per item, from approved daily reports or the [measurement book](/construction/measurement-book).
- Every issue of material to the site, and every return, with dates.
- Stock at site at the date of the check, so material lying on site isn't counted as used.
- The variation allowed in the contract, so the check uses the same limit as the client.

## How does this connect to job cost?

Material is often the largest part of a site's cost. The value of material issued, at its purchase rate, is the
material line of the site's [job cost](/construction/job-cost-per-site); the reconciliation explains whether that
cost is what the work should have cost.

## What does the construction demo do?

In the [construction demo](/industries/construction-company), each BOQ line can carry a norm: so much of one
material per unit of work. Expected use of a material is the approved work on each line times its norm; actual use
is what the site's daily reports issued from site stock. The site's Material tab shows expected, actual and the
difference with its value, and flags anything more than 10% over or under. Datum AI answers "is the Bhatt site
wasting material?" from the same figures. It doesn't apply CPWD's Clause 38 allowances (3%, 5%, 10%) by material or
compare steel diameter-wise; those are parts we'd build.
