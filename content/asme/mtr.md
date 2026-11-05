---
kind: asme
slug: mtr
group: materials
title: "Material test reports (MTR) and heat number traceability"
related:
  - /asme/section-ii
  - /systems/heat-number
  - /notes/plate-remnants-back-into-stock
  - /services/material-traceability
  - /industries/boiler-pressure-vessel-manufacturing
question: "What does an MTR need to show for ASME pressure vessel material?"
answer: >
  A material test report (MTR, or mill test certificate) certifies one heat of material: its specification and
  grade, heat number, chemical analysis, mechanical test results and heat treatment. For ASME Section VIII work the
  shop checks plate against its MTR on receipt (UG-93), keeps the heat number on every piece when it is cut (UG-77),
  and records it against every part of the vessel.
description: "ASME MTRs: what they show, UG-93 receipt checks, UG-77 heat number transfer, EN 10204 3.1 vs 3.2, mill vs distributor certs, and records an Inspector checks"
domain: [asme, materials, traceability]
published: 2026-11-01
updated: 2026-11-05
checked: 2026-11-05
sources:
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section II Part A; Section VIII, Division 1, UG-10, UG-77, UG-93, UG-94)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
  - title: "BS EN 10204:2004, Metallic products. Types of inspection documents"
    publisher: BSI (British Standards Institution), publishing the CEN standard
    url: https://knowledge.bsigroup.com/products/metallic-products-types-of-inspection-documents
    date: 2026-11-05
  - title: "Boiler and Pressure Vessel Certificates of Authorization and the Certification Mark: Informational Handbook (BPV-GUI-03)"
    publisher: ASME
    url: https://www.asme.org/getmedia/cb8f63c5-3aa2-45ee-a2d1-b999d37733f7/bpv-gui-03-informational-handbook_1.pdf
    date: 2023-05-12
  - title: Indian Boiler Regulations, 2026 (Gazette of India, Extraordinary, No. 596)
    publisher: Central Boilers Board, Department for Promotion of Industry and Internal Trade
    url: https://egazette.gov.in/WriteReadData/2026/276813.pdf
    date: 2026-10-01
checks:
  - reg: IBR 2026, regulation 8(d)(i)
    doc: ibr-2026
    quote: "A certificate in Form-V(Part-A) from the steel maker and a certificate from the maker of the plates or bars"
---

## What is an MTR?

An MTR (material test report, also called a mill test report, mill test certificate or CMTR) is the producer's
certificate that one heat of material meets its specification, with the test results to prove it. A mill makes
steel in **heats** (one melt); the MTR certifies a heat, or a lot from it, against a specification such as SA-516
Grade 70.

| On the MTR | What the shop checks |
|---|---|
| Specification, grade, class and edition, e.g. SA-516 Grade 70 | Matches the drawing and a specification the Code accepts; see [Section II](/asme/section-ii) for SA vs A |
| Heat number (and slab or plate number) | Matches the number stamped or stenciled on the material |
| Size, thickness and quantity | Matches what was delivered |
| Chemical analysis (heat, and product if ordered) | Within the specification's limits |
| Tensile and yield strength, elongation | At or above the specification's minimums |
| Heat treatment (as-rolled, normalized, quenched and tempered) | What was ordered; it affects the [impact test](/asme/impact-testing) exemption |
| Charpy results, if ordered | Present, at the temperature ordered, when the part isn't exempt |
| Supplementary requirements | E.g. ultrasonic examination, simulated post-weld heat treatment, as ordered |
| Certification statement, signature, producer | Who certified it, and that the certificate is the producer's |

India and Europe usually call it a [material test certificate](/systems/material-test-certificate) and order it to
EN 10204 type 3.1; the US says MTR or CMTR. What the Code needs from it is the same.

## What does ASME Section VIII require for material certification?

[Section VIII, Division 1](https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025) requires plate for pressure parts to come with the producer's material test report (or a
certificate of compliance where the material specification allows one), which the shop obtains and the Authorized
Inspector examines to confirm it represents the material and meets its specification (UG-93). The paragraphs that
matter, in outline (the Code is copyrighted; read the edition your shop works to):

| Paragraph | What it covers |
|---|---|
| UG-93, inspection of materials | Plate: obtain the MTR and have the Inspector examine it. Other product forms (pipe, tube, forgings, fittings, bolting) may be accepted on the specification's marking on each piece, with supplementary reports where extra requirements were ordered. The shop also examines material for imperfections |
| UG-94, marking on materials | The Inspector checks that the material carries the marking its specification requires |
| UG-77, material identification | When plate is cut, the identification is transferred to every piece that goes into the vessel, or a coded marking system acceptable to the Inspector is used |
| UG-10 | How material not fully identified, or made to a specification not permitted, may be recertified for use |
| Section II, Part A | The material specifications themselves (SA-516 and others), and for plate, SA-20's general requirements for marking and test reports |

How the shop does all of this is written in its [quality control manual](/asme/quality-control-manual), which the
ASME joint review checks before the [U stamp](/asme/u-stamp) is issued.

## What is the difference between EN 10204 3.1 and 3.2?

An [EN 10204](https://knowledge.bsigroup.com/products/metallic-products-types-of-inspection-documents) type 3.1 certificate is issued by the manufacturer and validated by its own authorized inspection
representative, who is independent of the manufacturing department; a type 3.2 is validated jointly by that
representative and either the purchaser's authorized representative or an inspector designated by the regulations.
Both report specific test results on the material delivered.

| EN 10204 type | What it is | Who validates it |
|---|---|---|
| 2.1 | Declaration of compliance, no test results | The manufacturer |
| 2.2 | Test report, results from non-specific inspection (typical production, not this lot) | The manufacturer |
| 3.1 | Inspection certificate, results of tests on the product supplied | The manufacturer's inspection representative, independent of production |
| 3.2 | Inspection certificate, as 3.1 with a second, independent witness | The manufacturer's representative and the purchaser's or a regulator's inspector |

For ASME work, an MTR equivalent to 3.1 is normal. Specify 3.2 only when the purchase order, the customer or a
regulator needs a third party to witness the tests, and allow for the cost and lead time it adds. Types 2.1 and 2.2
don't carry the heat's own test results, so they don't serve as an MTR for plate.

## Is a distributor's certificate as good as a mill MTR?

A distributor (service center) usually passes on a copy of the mill's MTR; that copy is what the shop needs, provided
it is legible, complete and traceable to the heat delivered. EN 10204 covers intermediaries too: they may pass the
producer's document on, but not change its content. Watch for:

- **A distributor's own certificate of conformance** that lists only the grade. It isn't the producer's test report
  and won't satisfy UG-93 for plate.
- **Cut-to-size plate.** If the distributor cut the plate, each piece must still carry the heat number; ask how they
  transfer it.
- **A re-typed MTR on the distributor's letterhead.** Ask for the mill's original document.
- **Mixed heats in one delivery.** One MTR per heat; check every piece's heat number against a certificate.

## What should you check when material arrives?

Before material goes into stock:

1. The heat number on each piece matches an MTR in the delivery.
2. The specification, grade, class and size match the purchase order and the drawing.
3. Chemistry and mechanical results are within the specification; supplementary tests ordered are reported.
4. Heat treatment and any Charpy tests are as ordered.
5. The material isn't damaged, laminated or pitted beyond what the specification allows.
6. The MTR is the producer's, signed or otherwise certified, and filed against the receipt.
7. Anything that fails goes to a nonconformance hold, not the rack.

## How do you keep heat numbers when plate is cut?

Before the plate is cut, transfer the heat number (and any plate number) to every piece that will go into the
vessel, by stamp, stencil or a coded system the Inspector accepts, so each piece stays traceable (UG-77). Then record
which pieces came from which heat. A made-up example: one SA-516 Grade 70 plate, heat A71234, cut for one job.

| Piece | Part | Marking | Recorded against |
|---|---|---|---|
| A71234-1 | Shell course 1 | Heat number stenciled before cutting | Job 5021, shell 1 |
| A71234-2 | Shell course 2 | Heat number stenciled before cutting | Job 5021, shell 2 |
| A71234-3 | Nozzle reinforcing pad | Low-stress stamp | Job 5021, N1 pad |
| A71234-R | Remnant, 1.2 m × 0.8 m | Heat number transferred, back to stock | Remnant stock, MTR attached |

The [data report](/asme/data-reports) then lists the material of each part, and the Inspector can trace any part
back to its MTR.

## Where does traceability break?

- Offcuts and remnants returned to stock without their heat number, then reused on the next job.
- One MTR filed for a delivery that held two heats.
- Nozzle necks and pipe cut from a length whose marking ended up on the scrap end.
- Markings ground off or painted over in fabrication before anyone recorded them.
- MTRs scanned into a folder with no link to the parts they cover.

Each of these turns up at the [Authorized Inspector](/asme/authorized-inspector)'s check of the data report package.

## What should material traceability software do?

When comparing systems, check that it can:

- Record the heat number and attach the MTR at receipt, against the purchase order line.
- Hold material that fails the receipt check, with the reason.
- Split a plate into cut pieces and remnants that each inherit the heat number.
- Show, for any vessel part, its heat and MTR; and for any heat, every part and job it went into.
- Link welds to the WPS and welder, so the data report package comes from one record.

That is [material traceability](/systems/material-traceability): recording the heat number at receipt and carrying
it to every cut piece, remnant and weld removes the search at the end.

## What does India's IBR require?

IBR 2026 asks for the steel maker's certificate in Form V Part A and an extract of every material certificate (Form V
Part B) with the registration papers, and lists ASME SA specifications among acceptable materials. See
[ASME vs IBR 2026](/asme/asme-vs-ibr) and [IBR Form V Part A](/ibr/forms/form-v-part-a).
