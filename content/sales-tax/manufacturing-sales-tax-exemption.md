---
kind: sales-tax
slug: manufacturing-sales-tax-exemption
group: exemptions
title: "Sales tax exemptions for manufacturers: what qualifies"
question: "Do manufacturers pay sales tax on raw materials and equipment?"
answer: >
  Usually not on material that becomes part of a product made for sale, and often not on the machinery that makes
  it, but each state draws its own line. Texas exempts components and equipment that physically or chemically
  change the product; California gives a partial exemption on qualified manufacturing equipment until June 30,
  2030. Hand tools, forklifts and office supplies usually stay taxable.
description: "The manufacturing sales tax exemption: materials and machinery that qualify, what stays taxable, how to claim it and divergent use, in Texas and California."
domain: [sales-tax, exemptions, manufacturing]
published: 2026-11-03
updated: 2026-11-03
checked: 2026-11-03
sources:
  - title: Manufacturing Exemptions (publication 94-124)
    publisher: Texas Comptroller of Public Accounts
    url: https://comptroller.texas.gov/taxes/publications/94-124.php
    date: "2026-11-03"
  - title: Tax Guide for Manufacturing, and Research & Development, and Electric Power Equipment & Buildings Exemption
    publisher: California Department of Tax and Fee Administration
    url: https://cdtfa.ca.gov/industry/manufacturing-and-research-and-development-equipment-exemption/
    date: "2026-11-03"
checks:
  - reg: Texas Comptroller, Manufacturing Exemptions
    doc: tx-mfg
    quote: "Texas sales and use tax exempts tangible personal property that becomes an ingredient or component of an item manufactured for sale, as well as taxable services performed on a manufactured product to make it more marketable."
  - reg: Texas Comptroller, Manufacturing Exemptions
    doc: tx-mfg
    quote: "The exemption also applies to tangible personal property that makes a chemical or physical change in the product being manufactured and is necessary and essential in the manufacturing process."
  - reg: Texas Comptroller, Manufacturing Exemptions
    doc: tx-mfg
    quote: "A hammer, for example, is taxable even if it is used in fabricating a product for sale."
  - reg: Texas Comptroller, Manufacturing Exemptions (does not qualify)
    doc: tx-mfg
    quote: "Persons repairing real or tangible personal property belonging to others."
  - reg: Texas Comptroller, Manufacturing Exemptions (does not qualify)
    doc: tx-mfg
    quote: "Intraplant transportation equipment such as conveyors, pipes, forklifts, hoists, cranes and hydraulic lifts."
  - reg: Texas Comptroller, Manufacturing Exemptions
    doc: tx-mfg
    quote: "Examples of non-qualifying, taxable manufacturing support equipment include air conditioning for employee comfort, equipment used to make molds or dies, and equipment used to make other equipment that is then used to make a product for sale."
  - reg: Texas Comptroller, Manufacturing Exemptions (divergent use)
    doc: tx-mfg
    quote: "If divergent use during a month is 5 percent or less of the total use of the equipment, no tax is due in that month."
  - reg: Texas Comptroller, Manufacturing Exemptions (divergent use)
    doc: tx-mfg
    quote: "After four years, there is no tax on divergent use."
  - reg: California CDTFA, manufacturing exemption guide
    doc: ca-mfg
    quote: "may qualify for a partial exemption from sales and use tax on the purchase or lease of qualified machinery and equipment primarily used in manufacturing, research and development, and electric power generation or production, storage or distribution."
  - reg: California CDTFA, manufacturing exemption guide
    doc: ca-mfg
    quote: "Extended the sunset date of R&TC section 6377.1 from June 30, 2022, to June 30, 2030."
---

## What do manufacturers usually not pay sales tax on?

Many states exempt some of a manufacturer's purchases, so that the same product isn't taxed twice:
once on the inputs and again when it's sold. What's exempt is each state's own law. Texas is a
useful model, since its rules are spelled out item by item:

| Purchase | Texas | Why |
|---|---|---|
| Steel, castings, fasteners that go into the product | Exempt | Becomes a component of an item made for sale |
| Machines that cut, form, weld or heat-treat the product | Exempt | Causes a physical or chemical change and is essential |
| Quality-control equipment testing products for sale | Exempt | Listed by the Comptroller |
| Safety apparel required in production, not resold | Exempt | Listed by the Comptroller |
| Hand tools (a hammer) | Taxable | Excluded even when used in fabrication |
| Forklifts, conveyors, hoists, cranes | Taxable | Intraplant transportation is excluded |
| Molds and dies equipment, air conditioning for comfort | Taxable | Manufacturing support, not production |
| Equipment rented for less than a year, R&D items | Taxable | Excluded |

Repair work doesn't qualify in Texas: a shop repairing equipment that belongs to others is not a manufacturer for
the exemption. A job shop that both makes parts and repairs customers' equipment buys for the two differently.

## What does California exempt?

California has a partial exemption, not a full one: manufacturers (and certain research and development and
electric power businesses) may get a partial exemption on qualified machinery and equipment used primarily in
manufacturing. Three conditions apply: the buyer is a "qualified person" by its line of business, the property is
qualified, and it's used in a qualified way. The law behind it, Revenue and Taxation Code section 6377.1, runs to
June 30, 2030. CDTFA's guide sets out who and what qualifies; ask CDTFA in writing for your case.

## How do you claim it?

Not by paying and asking for a refund, in most cases: you give your vendor an exemption certificate when you buy.
In Texas, a manufacturer gives a properly completed Form 01-339 exemption certificate describing the item, the
reason it's exempt, and signed and dated. Your vendor keeps it on file, the same way you keep your customers'
[resale certificates](/sales-tax/resale-certificates). Where a vendor charged tax on an exempt purchase anyway,
states have refund procedures.

## What is divergent use?

Exempt equipment used for something other than making products for sale is in "divergent use". Texas lets you buy
the equipment exempt, then pay tax on the share of use that diverges, measured in hours or output each month. If
divergent use is 5% or less in a month, no tax is due that month, and after four years there's no tax on divergent
use. A plant that runs a machine for its own maintenance parts part of the time needs the machine's hours split
by purpose, which is a shop-floor record, not an accounting one.

## What should your records show?

An auditor checking a manufacturer's exemption asks three things: what did you buy tax-free, why was each purchase
exempt, and was it used that way? The system that answers them holds:

- the exemption reason on each purchase order line and vendor bill, not just "no tax"
- the item's use: a component on the bill of materials, production equipment, or neither
- machine hours by job, which split production from other use for divergent use
- materials issued from stock to something other than a product for sale, such as maintenance or samples, which
  owe [use tax](/sales-tax/use-tax)

A [job shop ERP](/manufacturing/job-shop-erp) that records material issues and machine hours by job already has most
of this; see [how an ERP should handle sales tax](/sales-tax/sales-tax-in-erp) for the rest.
