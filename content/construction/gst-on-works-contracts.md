---
kind: construction
slug: gst-on-works-contracts
group: india
title: "GST on works contracts: what counts and input tax credit"
question: "How is GST applied to a works contract in India?"
answer: >
  Under GST, a works contract is a contract for building, construction, repair or similar work on immovable property
  where goods pass to the client in the course of the work. It is treated as a supply of services, taxed as one
  composite service on the whole contract value. Input tax credit on works contract services for building your own
  immovable property is blocked, except for a contractor using them to supply further works contracts.
description: "GST on works contracts in India: the section 2(119) definition, supply of service under Schedule II, input tax credit rules, and billing RA bills with GST."
domain: [construction, gst, india]
published: 2026-11-03
updated: 2026-11-03
checked: 2026-11-03
sources:
  - title: Works Contracts in GST
    publisher: GST Council (Directorate General of Taxpayer Services, CBEC)
    url: https://gstcouncil.gov.in/sites/default/files/e-version-gst-flyers/Work%20Contracts%20in%20GST.pdf
    date: "2017-07-01"
checks:
  - reg: CGST Act, 2017, section 2(119), as quoted by the GST Council
    doc: gst-wc
    quote: "“works contract” means a contract for building, construction, fabrication, completion, erection, installation, fitting out, improvement, modification, repair, maintenance, renovation, alteration or commissioning of any immovable property wherein transfer of property in goods (whether as goods or in some other form) is involved in the execution of such contract."
  - reg: GST Council, Works Contracts in GST
    doc: gst-wc
    quote: "the term works contract has been restricted to contract for building construction, fabrication etc of any immovable property only."
  - reg: CGST Act, 2017, section 17(5)(c), as explained by the GST Council
    doc: gst-wc
    quote: "input tax credit shall not be available in respect of the works contract services when supplied for construction of an immovable property (other than plant and machinery) except where it is an input service for further supply of works contract service."
  - reg: CGST Act, 2017, Schedule II, paragraph 6(a), as quoted by the GST Council
    doc: gst-wc
    quote: "works contracts as defined in section 2(119) of the CGST Act, 2017 shall be treated as"
---

## What is a works contract under GST?

Section 2(119) of the CGST Act, 2017 defines it: a contract for building, construction, fabrication, completion,
erection, installation, fitting out, improvement, modification, repair, maintenance, renovation, alteration or
commissioning of any **immovable property**, where property in goods passes in the course of the work. The GST
Council's note stresses the limit: only work on immovable property qualifies. Painting a car or fabricating a
machine with your own material is a composite supply, but not a works contract.

Schedule II, paragraph 6(a) of the Act treats a works contract as a supply of services. So the whole contract
value, materials included, is taxed as one service, not split into goods and labour as under VAT.

## Can you claim input tax credit?

| Who receives the works contract service | Input tax credit |
|---|---|
| A business building its own office, factory shed or other immovable property | Blocked (section 17(5)(c)) |
| The same, for plant and machinery | Allowed: plant and machinery is excluded from the block |
| A main contractor buying a subcontractor's works contract to supply its own works contract | Allowed |

The Council's example is a builder engaging a subcontractor for part of the work: the subcontractor charges GST to
the main contractor, who can take the credit because it uses the service for its own works contract supply.

## What rate applies?

The rate depends on the work, the client and the date: rates for works contracts were set by notification and have
been changed since 2017. Take the rate from the current CBIC rate
notification for your service, or from your tax adviser, not from an old article.

## How GST sits on an RA bill

Each [running account bill](/construction/ra-bills) is a supply: the contractor issues a tax invoice for the bill's
value, with GST on top. Recoveries for materials supplied by the client need care, because they may change what
is being supplied; ask your adviser how your contract treats them. Government departments and certain other buyers
also deduct TDS under GST, separate from [income-tax TDS](/construction/tds-on-contractor-payments).

## What your system should do

- Classify each contract as a works contract or not, with the place of supply (where the property is).
- Issue a GST invoice for each RA bill from the [measured](/construction/measurement-book) value.
- Keep input tax credit apart where it is blocked (your own buildings) and where it is allowed.
- Reconcile GST invoices with RA bills and payments, so nothing is billed or credited twice.
