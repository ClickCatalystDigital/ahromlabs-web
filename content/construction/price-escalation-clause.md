---
kind: construction
slug: price-escalation-clause
group: india
title: "Price escalation in CPWD contracts: clause 10CC worked out"
metaTitle: "Price escalation clause 10CC, worked out"
related:
  - /construction/ra-bills
  - /construction/measurement-book
  - /boq/what-is-a-boq
  - /services/compliance-accounting
  - /industries/construction-company
question: "How does the price escalation clause (10CC) work in a CPWD contract, and how is escalation calculated?"
answer: >
  Clause 10CC of CPWD's General Conditions of Contract 2023 adjusts the contract price each quarter for rises and
  falls in the prices of cement, steel, labour, fuel and other materials. It applies to 85% of the work done in the
  quarter, split by the component percentages in Schedule F, and moves each component by the change in its index
  since the last date for tenders. Where 10CC doesn't apply, clause 10C pays only for changes caused by new laws.
description: "Price escalation in CPWD contracts: the clause 10CC formula, base date, quarterly bills, Schedule F components, indices, downward adjustment, clause 10C."
domain: [construction, billing, india]
published: 2026-11-05
updated: 2026-11-05
checked: 2026-11-05
sources:
  - title: "General Conditions of Contract 2023, Construction Works (with DG CPWD's office memorandum of 22.09.2023)"
    publisher: Central Public Works Department, Government of India (copy published by IIT Kanpur)
    url: https://iitk.ac.in/iwd/file/2026/18-Civil-D2-2026-27/GCC-2023.pdf
    date: "2023-09-22"
  - title: "CPWD circulars: General Conditions of Contract (amendments to GCC 2023)"
    publisher: Central Public Works Department
    url: https://cpwd.gov.in/AllCirculars.aspx?Type=24
    date: "2026-11-05"
checks:
  - reg: GCC 2023, Clause 10CC
    doc: cpwd-gcc-2023
    quote: "If the prices of materials and/or wages of labour required for execution of the work increase, the contractor shall be compensated for such increase as per provisions detailed below and the amount of the contract shall accordingly be varied"
  - reg: GCC 2023, Clause 10CC
    doc: cpwd-gcc-2023
    quote: "such compensation for escalation in prices and wages shall be available only for the work done during the stipulated period of the contract including the justified period extended under the provisions of clause 5 of the contract without any action under clause 2."
  - reg: GCC 2023, Clause 10CC(i) (base date)
    doc: cpwd-gcc-2023
    quote: "The base date for working out such escalation shall be the last stipulated date of receipt of tenders including extension, if any."
  - reg: GCC 2023, Clause 10CC(ii)
    doc: cpwd-gcc-2023
    quote: "Cost of work for which escalation is applicable (W) = 0.85M"
  - reg: GCC 2023, Clause 10CC(iii)(a)
    doc: cpwd-gcc-2023
    quote: "The compensation for escalation shall be worked out at quarterly intervals"
  - reg: GCC 2023, Clause 10CC(iii)(e)
    doc: cpwd-gcc-2023
    quote: "the variation in the rate for an unskilled Mazdoor alone shall form the basis for working out the escalation compensation payable on the labour component."
  - reg: GCC 2023, Clause 10CC(iv) (downward adjustment)
    doc: cpwd-gcc-2023
    quote: "there shall be a downward adjustment of the cost of work so that such price of materials and/or wages of labour shall be deductible from the cost of work under this contract"
  - reg: GCC 2023, Clause 10CC (indices)
    doc: cpwd-gcc-2023
    quote: "Wholesale Price Index for Pozzolana Cement published by office of the Economic Adviser"
  - reg: GCC 2023, Clause 10C
    doc: cpwd-gcc-2023
    quote: "increases as a direct result of the coming into force of any fresh, law or statutory rule or order (but not due to any variation of rate in GST applicable on such material(s) being considered under this clause)"
  - reg: GCC 2023, Clause 10C proviso
    doc: cpwd-gcc-2023
    quote: "Where provisions of clause 10CC are applicable, provisions of clause 10C will not be applicable."
---

## What is a price escalation clause?

A price escalation clause adjusts a fixed-price contract for changes in the cost of materials and labour while the
work is done, so a contractor isn't ruined by a steel price jump on a long job and the client gets the benefit when
prices fall. In CPWD contracts it is Clause 10CC of the General Conditions of Contract 2023: the contract amount is
"varied" by a formula worked out every quarter, both up and down. Private contracts often copy it or write their own.

## Does every CPWD contract have clause 10CC?

No: the NIT approving authority marks it applicable or not applicable in Schedule F for each work, and sets the
component percentages there. Where 10CC applies, Clause 10C doesn't; where 10CC isn't applicable, 10C applies instead.
Check Schedule F of your contract first.

## What does clause 10CC cover, and for which period?

Work done during the stipulated period of the contract, plus any extension justified under Clause 5 without action
under Clause 2 (the clause for the contractor's own delay). So escalation stops for work done during a delay the
contractor caused. The base date for every index is the last stipulated date for receipt of tenders, including any
extension.

## How is the cost of work for escalation worked out?

From the quarter's bills, in four parts, then 85% of the total:

| Part | What it is |
|---|---|
| C | Gross value of work done in the quarter (A, to this quarter, less B, to last quarter) |
| F | Secured advance paid in the quarter less secured advance recovered |
| I | Other advance payments made in the quarter less those recovered |
| J | Amounts paid at market rates for deviations and extra items under Clause 12 |
| M | C + F + I − J |
| **W** | **0.85 × M**, the cost of work on which escalation is worked out |

Items paid at market rates under Clause 12 are taken out because their rates are already current.

## What is the 10CC formula?

Escalation for the quarter is W times each component's percentage times the change in its index since the base
date, added up:

VW = W × (1/100) × [CP × (CI − CO)/CO + LP × (LI − LO)/LO + CMP × (CMI − CMO)/CMO + EMP × (EMI − EMO)/EMO + FP × (FI − FO)/FO + SP × (SI − SO)/SO + BP × (BI − BO)/BO]

CP, LP, CMP, EMP, FP, SP and BP are the percentages of cement, labour, other civil materials, E&M materials, fuel,
steel and bitumen in Schedule F; the "O" values are the indices on the base date and the "I" values those for the
quarter. During a maintenance period, only labour, civil and E&M materials and bitumen count.

## Which indices does clause 10CC use?

For materials, the wholesale price indices published by the Office of the Economic Adviser (for example the index for
Pozzolana cement, mild steel long products, high speed diesel and bitumen). For labour, the minimum daily wage of an
unskilled adult mazdoor fixed under law: whatever happens to other wage categories, only the unskilled rate counts.

## How is 10CC escalation calculated, in numbers?

A made-up quarter: gross value of work done ₹48,00,000, secured advance paid ₹4,00,000 and recovered ₹2,00,000, no
other advances or deviation items at market rates.

| | ₹ |
|---|---|
| C, work done in the quarter | 48,00,000 |
| F, secured advance (4,00,000 − 2,00,000) | 2,00,000 |
| M = C + F | 50,00,000 |
| W = 0.85 × M | 42,50,000 |

Schedule F: cement 10%, labour 25%, steel 15%. Index changes since the base date: cement 140 → 147 (+5%), unskilled
wage ₹700 → ₹735 (+5%), steel 150 → 144 (−4%).

VW = 42,50,000 × (10 × 5% + 25 × 5% − 15 × 4%) ÷ 100 = 42,50,000 × 1.15 ÷ 100 = **₹48,875** payable for the quarter.

Steel's fall reduces the escalation: the clause works both ways.

## When is escalation paid?

Quarterly, on the bills paid in the three calendar months of each quarter, with the date the contractor submitted each
bill deciding which quarter it falls in. The first payment is made three months after the month in which the
commencement letter is issued; the last period may be shorter than three months, ending on completion.

## Can escalation reduce what the contractor is paid?

Yes. If prices or wages fall, the cost of work is adjusted downward by the same formula and the amount is deducted.

## What is the difference between clause 10C and clause 10CC?

Clause 10C pays (or recovers) only price changes caused directly by a new law, statutory rule or order after the
tender date, such as a change in minimum wages, and not changes in GST rates. Clause 10CC follows market indices.
A contract has one or the other, as Schedule F says.

## What should a contractor's system do for escalation?

- Hold the base date, the Schedule F percentages and the base indices for each contract.
- Group bills by quarter on their submission date, and separate secured advance, other advances and Clause 12 items.
- Record the quarter's indices and work out VW, ready to claim.
- Stop the calculation for work done in a delay not justified under Clause 5.

The [construction demo](/industries/construction-company) builds [RA bills](/construction/ra-bills) from
measurements against the BOQ, but doesn't calculate price escalation; a 10CC claim worked out from the same bills and
the published indices would be a part we'd build. Its "escalation" means chasing overdue payments, not this clause.
For how measured work becomes those bills, see the [measurement book](/construction/measurement-book).
