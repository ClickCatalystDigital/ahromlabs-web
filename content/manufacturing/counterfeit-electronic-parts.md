---
kind: manufacturing
slug: counterfeit-electronic-parts
group: inventory
title: "Counterfeit electronic parts: DFARS, AS5553 and AS6081"
related:
  - /industries/electronics-component-trading
  - /systems/material-traceability
  - /services/inventory-and-reservations
  - /manufacturing/electronic-component-inventory
  - /manufacturing/distributor-inventory-control
question: "How do distributors and manufacturers avoid counterfeit electronic parts?"
answer: >
  Buy from the original manufacturer or its authorized distributors first; when a part is only available elsewhere,
  use approved independent distributors, inspect and test the parts, and keep the paperwork tracing every lot. For
  US defense work DFARS 252.246-7007 and 7008 make this a contract requirement; SAE AS5553 (for users) and AS6081
  (for distributors) set out how.
description: "Avoiding counterfeit electronic parts: DFARS 252.246-7007 and 7008, authorized vs independent sources, AS5553 and AS6081, inspection and traceability."
domain: [manufacturing, inventory, electronics]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
sources:
  - title: "DFARS 252.246-7007, Contractor Counterfeit Electronic Part Detection and Avoidance System"
    publisher: eCFR, Title 48
    url: https://www.ecfr.gov/current/title-48/chapter-2/subchapter-H/part-252/subpart-252.2/section-252.246-7007
    date: 2026-11-14
  - title: "DFARS 252.246-7008, Sources of Electronic Parts"
    publisher: eCFR, Title 48
    url: https://www.ecfr.gov/current/title-48/chapter-2/subchapter-H/part-252/subpart-252.2/section-252.246-7008
    date: 2026-11-14
  - title: "SAE AS5553 and AS6081 (counterfeit electronic parts)"
    publisher: SAE International
    url: https://www.sae.org/standards/content/as6081/
    date: 2026-11-14
checks:
  - reg: DFARS 252.246-7007(a), definition
    doc: dfars-7007
    quote: "means an unlawful or unauthorized reproduction, substitution, or alteration that has been knowingly mismarked, misidentified, or otherwise misrepresented to be an authentic, unmodified electronic part from the original manufacturer"
  - reg: DFARS 252.246-7008(b)(1)
    doc: dfars-7008
    quote: "First obtain electronic parts that are in production by the original manufacturer or an authorized aftermarket manufacturer or currently available in stock from"
  - reg: DFARS 252.246-7008(b)(1)(iii)
    doc: dfars-7008
    quote: "Suppliers that obtain such parts exclusively from the original manufacturers of the parts or their authorized suppliers"
  - reg: DFARS 252.246-7008(b)(3)(ii)(B)
    doc: dfars-7008
    quote: "Be responsible for inspection, testing, and authentication, in accordance with existing applicable industry standards"
  - reg: DFARS 252.246-7008(b)(2)(ii)
    doc: dfars-7008
    quote: "The Contractor assumes responsibility for the authenticity of parts provided by such contractor-approved suppliers"
---

## What counts as a counterfeit electronic part?

A part that is not what it is sold as: remarked, recycled from scrap boards, a cheaper grade relabelled, or a copy.
DFARS 252.246-7007 defines a counterfeit electronic part as one that "means an unlawful or unauthorized reproduction,
substitution, or alteration that has been knowingly mismarked, misidentified, or otherwise misrepresented to be an
authentic, unmodified electronic part from the original manufacturer". A suspect counterfeit is one with credible
evidence that it may be, before that is proven.

## Where should parts be bought from?

In order, for defense contractors under DFARS 252.246-7008, and as good practice for everyone:

| Order | Source | Risk |
|---|---|---|
| 1 | The original manufacturer, its authorized distributors, or suppliers buying only from them | Lowest: the part is traceable by contract |
| 2 | Contractor-approved suppliers (usually independent distributors), approved using industry standards for inspection, testing and authentication | The buyer "assumes responsibility for the authenticity of parts provided by such contractor-approved suppliers" |
| 3 | Any other source, only when 1 and 2 have none | The buyer must notify the contracting officer and "Be responsible for inspection, testing, and authentication" |

The clause opens with the rule: "First obtain electronic parts that are in production by the original manufacturer or
an authorized aftermarket manufacturer or currently available in stock from" those sources. Obsolete parts are where
the risk lives: when the authorized channel has none, the part comes from the broker market.

## What are AS5553 and AS6081?

SAE aerospace standards for counterfeit prevention. AS5553 is for organizations that use electronic parts in what
they build (manufacturers and contract manufacturers): supplier selection, purchasing, verification, reporting and
material control. AS6081 is for distributors that buy from outside the authorized channel: how they qualify sources,
inspect and test, quarantine and report. Defense customers often ask for either by name, and some for certification
to it. AS6171 sets out the test methods.

## What inspection is done on parts from independent sources?

It scales with risk and the customer's requirement. Typically: documentation review (certificates of conformance,
the chain of custody back to the manufacturer); external visual inspection under magnification for marking, lead
condition and resurfacing; solvent tests for remarking; X-ray for die and bond wire comparison against a known good
part; X-ray fluorescence for lead finish; and for higher risk, decapsulation and electrical testing. Record the
results against the lot.

## What happens to a suspect part?

It is quarantined, not returned to the supplier who may resell it. Under DFARS the contractor must report counterfeit
and suspect counterfeit parts (GIDEP is the usual channel) and keep records. The inventory system should be able to
hold a whole lot with one action, show where any of it already went, and stop it being picked.

## How do you qualify an independent distributor?

Before buying, and on a schedule after:

1. Ask for the distributor's counterfeit avoidance procedure and any certification to AS6081.
2. Check its test capability or the third-party labs it uses, and the inspections it performs by default.
3. Ask for its history of reported suspect parts and how it handled them.
4. Agree in the purchase order what documentation comes with each lot (certificate of conformance, traceability,
   test reports) and the return terms for suspect parts.
5. Rate each supplier by results: lots rejected, documentation missing, delivery.

## What red flags show up at receiving?

- Date codes that are inconsistent within a reel or tube, or later than the part's end-of-life.
- Marking that rubs off with solvent, or blacktopping (a resurfaced top coat).
- Leads that are bent, re-tinned or show signs of having been soldered before.
- Packaging that doesn't match the manufacturer's: wrong reel labels, missing moisture barrier bags for MSL parts.
- A price far below the market for a part that is scarce.
- Documentation that is a copy of a copy, or a certificate from a company with no traceable history.

Each goes on the receiving inspection record for the lot, and any one is a reason to quarantine and test before
use.

## Does this apply outside defense work?

The DFARS clauses apply to defense contractors and flow down to their suppliers. Commercial customers in medical,
industrial and automotive work increasingly write similar requirements into their purchase orders, and any business
that buys obsolete or allocated parts from brokers faces the same risk. A distributor that can show traceability per
lot wins business the cheaper broker doesn't.

## What should the inventory system record?

For every package: the supplier, whether the supplier is authorized or independent, the purchase order, the
manufacturer's lot and date code, certificates and test reports, and the inspection result; and for every shipment,
which packages went to which customer. That is the traceability DFARS 252.246-7008 asks for, and the same record
answers a recall. See [distributor inventory control](/manufacturing/distributor-inventory-control), [electronic component inventory](/manufacturing/electronic-component-inventory) and our
[inventory software for component distributors](/industries/electronics-component-trading).
