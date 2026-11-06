---
kind: asme
slug: section-ii
group: code
title: "ASME Section II materials and SA vs A specifications"
related:
  - /asme/mtr
  - /asme/p-numbers
  - /systems/heat-number
  - /notes/plate-remnants-back-into-stock
  - /services/material-traceability
question: "What is the difference between SA-516 and A516?"
answer: >
  ASME Section II holds the material specifications the Code allows: Part A ferrous, Part B nonferrous, Part C
  filler metals, Part D properties and allowable stresses. An SA specification is ASME's adoption of an ASTM one,
  sometimes with changes; SA-516 is ASME's version of ASTM A516. Code pressure parts must be certified to the SA
  specification, often on a dual-marked MTR.
description: "ASME Section II explained: Parts A to D, SA vs A (SA-516 vs A516), dual certification, which Parts a shop must own, and where allowable stresses come from."
domain: [asme, materials]
published: 2026-11-01
updated: 2026-11-06
checked: 2026-11-06
sources:
  - title: "BPVC Section II Part A: Ferrous Material Specifications (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-iia-bpvc-section-ii-materials-part-ferrous-materials-specifications
    date: 2025-07-01
  - title: "BPVC Section II Part D: Properties (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-iid-bpvc-section-ii-materials-part-d-properties
    date: 2025-07-01
  - title: "Required Code Books"
    publisher: ASME
    url: https://www.asme.org/certification-accreditation/ASME-Certification-Process/Required-Code-Books
    date: 2026-11-05
  - title: "2025 ASME Boiler and Pressure Vessel Code"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
checks:
  - reg: ASME Section II Part A product page, description
    doc: asme-ii-a
    quote: "BPVC Section II-A provides material specifications for ferrous materials adequate for safety in the field of pressure equipment."
  - reg: ASME Section II Part D product page, description
    doc: asme-ii-d
    quote: "provides material properties, allowable stress values, and design data for pressure equipment."
  - reg: ASME Required Code Books, U and UM certificates
    doc: asme-books
    quote: "BPVC Section II-Materials-Part D-Properties-(Customary or Metric)"
  - reg: ASME Required Code Books, U and UM certificates
    doc: asme-books
    quote: "BPVC Section II-Materials Part C-Specifications for Welding Rods Electrodes and Filler Metals"
---

## What is the difference between SA-516 and A516?

SA-516 is ASME's adopted version of ASTM A516, printed in Section II Part A; a Code pressure part must be certified to
the SA specification, or to an ASTM edition the Code accepts as identical. ASTM writes most material standards; ASME
adopts them into Section II, adds an "S" (SA for ferrous, SB for nonferrous) and sometimes adds requirements. Each
adopted specification in Section II notes the ASTM edition it matches and any differences.

## What are the four Parts of Section II?

| Part | Contents | Typical specifications |
|---|---|---|
| A | Ferrous material specifications (two volumes) | SA-516 plate, SA-106 pipe, SA-105 forgings, SA-240 stainless plate |
| B | Nonferrous material specifications | SB-168 nickel alloy plate, SB-209 aluminum plate |
| C | Welding rods, electrodes and filler metals | SFA-5.1 (carbon steel covered electrodes such as E7018), SFA-5.18 (carbon steel wires and rods) |
| D | Properties | Allowable stresses, tensile and yield strength at temperature, external pressure charts, physical properties |

ASME describes Part A as providing "material specifications for ferrous materials adequate for safety in the field
of pressure equipment", and Part D as providing "material properties, allowable stress values, and design data".

## What is a dual-certified MTR?

A mill test report that certifies the material to both specifications at once, reading for example "SA-516/A516
Grade 70". Mills dual-certify so the same plate can go into Code and non-Code work; for a pressure part the SA
certification is the one that matters. See [MTRs and heat numbers](/asme/mtr).

## What if the MTR shows only the ASTM number?

Then the material isn't certified to the SA specification on its face. Division 1 has routes for accepting or
recertifying material that wasn't produced to the SA specification (UG-10), and the
[Authorized Inspector](/asme/authorized-inspector) decides whether the documentation is acceptable. The
[MTR guide](/asme/mtr) explains the options.

## Where do allowable stresses come from?

From Part D. Section VIII Division 1 and Section I take their maximum allowable stresses from Table 1A (ferrous) and
Table 1B (nonferrous), by specification, grade and temperature; Division 2 uses its own tables (5A and 5B), with
higher values because of its smaller design margin. The [shell thickness](/asme/shell-thickness) and
[hydrostatic test](/asme/hydrostatic-test) calculators ask you to enter these values rather than supply them,
because the tables are ASME's and change between editions.

## Which Part D volume should I buy?

Customary (psi, °F) or Metric (MPa, °C): ASME sells both, and its required code book list for the U and S
certificates names "Part D-Properties-(Customary or Metric)", so one is enough. Use the volume that matches the units
of your calculations.

## Which Parts does a shop need for an ASME certificate?

For a U or S certificate, ASME's [required list](https://www.asme.org/certification-accreditation/ASME-Certification-Process/Required-Code-Books) is Parts A, B, C and D. Part C (filler metals) can
be left out only if welding, brazing and fusing aren't in the shop's scope. See [BPVC sections](/asme/bpvc-sections).

## How do filler metals connect to Section IX?

Part C's SFA specifications classify filler metals; Section IX then groups them by F-number and A-number for
qualification. See [P-numbers, F-numbers and A-numbers](/asme/p-numbers).

## Does IBR in India accept SA materials?

Yes. IBR 2026's material rules allow materials to ASME and other international codes, and its own table names ASME SA
and SB specifications; covered electrodes are classified to ASME Section II Part C (SFA) or AWS specifications. See
[ASME vs IBR 2026](/asme/asme-vs-ibr).

## What does our software keep for Section II materials?

Our US boiler demo files each plate, tube and pipe's MTR by heat number and prints them in the job's ASME record
package, so every part on the data report points back to a certified specification and grade. The calculation sheets
use an illustrative SA-516 Grade 70 stress excerpt, not ASME's table. See
[material traceability](/services/material-traceability).
