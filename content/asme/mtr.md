---
kind: asme
slug: mtr
group: materials
title: "Material test reports (MTR) and heat number traceability"
question: "What does an MTR need to show for ASME pressure vessel material?"
answer: >
  A material test report (MTR, or mill test certificate) certifies one heat of material: its specification and
  grade, heat number, chemical analysis, mechanical test results and heat treatment. For ASME work the plate's
  heat number must match its MTR, stay legible or be transferred when the plate is cut (UG-77), and be recorded
  against every part.
description: "ASME material traceability: what an MTR must show, heat numbers, UG-77 marking transfer, SA vs A on certificates, EN 10204 3.1, and records an Inspector checks."
domain: [asme, materials, traceability]
published: 2026-11-01
updated: 2026-11-01
checked: 2026-11-01
sources:
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section VIII, Division 1)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
  - title: Indian Boiler Regulations, 2026 (Gazette of India, Extraordinary, No. 596)
    publisher: Central Boilers Board, Department for Promotion of Industry and Internal Trade
    url: https://egazette.gov.in/WriteReadData/2026/276813.pdf
    date: 2026-10-01
checks:
  - reg: IBR 2026, regulation 8(d)(i)
    doc: ibr-2026
    quote: "A certificate in Form-V(Part-A) from the steel maker and a certificate from the maker of the plates or bars"
---

## What an MTR is

A mill makes steel in **heats** (one melt). The MTR certifies a heat, or a lot from it, against a specification:

| On the MTR | Why the shop checks it |
|---|---|
| Specification and grade, e.g. SA-516 Grade 70 ([common ones](/asme/items)) | Must match the drawing and the Code's accepted specification; see [Section II](/asme/section-ii) for SA vs A |
| Heat number (and slab or plate number) | The link between the paper and the steel |
| Chemical analysis | Within the specification's limits |
| Tensile and yield strength, elongation | Within the specification |
| Heat treatment (as-rolled, normalized) | Affects the impact test curve; see [impact testing](/asme/impact-testing) |
| Charpy results, if ordered | Needed when the part isn't exempt from impact testing |
| Supplementary requirements | E.g. ultrasonic examination, simulated PWHT |
| Certification statement and signature | The mill's certification |

India and Europe usually call it a [material test certificate](/systems/material-test-certificate) and order it to EN 10204 type 3.1; the US says MTR or CMTR. The content the Code needs is the same.

## The Code's rules, in outline

- **Receiving** (UG-93): plate for pressure parts comes with the mill's certified test report; the shop checks it against the material and keeps it. Other product forms (pipe, forgings, fittings) need the certification the Code allows for that form.
- **Marking** (UG-94 and the material specification): the material carries its specification, grade and heat number.
- **Cutting** (UG-77): when plate is cut, the marking is transferred to every piece that goes into the vessel before it's cut, or a coded system is used that the Inspector accepts, so each piece stays traceable.
- **Records**: the quality control manual describes how; see [the quality control manual](/asme/quality-control-manual).

## Where traceability breaks

- Offcuts and remnants returned to stock without their heat number, then reused on the next job.
- One MTR filed for a delivery that held two heats.
- Nozzle necks and pipe cut from a length whose marking ended up on the scrap end.
- MTRs scanned into a folder with no link to the parts they cover.

Each of these turns up at the [Authorized Inspector](/asme/authorized-inspector)'s check of the [data report](/asme/data-reports) package. A system that keeps [material traceability](/systems/material-traceability), recording the heat number at receipt and carries it to every cut piece, remnant and weld removes the search at the end.

## In India

IBR 2026 asks for the steel maker's certificate in Form V Part A and an extract of every material certificate (Form V Part B) with the registration papers, and lists ASME SA specifications among acceptable materials. See [ASME vs IBR 2026](/asme/asme-vs-ibr) and [IBR Form V Part A](/ibr/forms/form-v-part-a).
