---
kind: asme
slug: shell-thickness
group: design
title: "Shell thickness and MAWP (UG-27), with a calculator"
related:
  - /asme/joint-efficiency
  - /asme/mawp
  - /asme/heads
  - /notes/plate-remnants-back-into-stock
  - /industries/boiler-pressure-vessel-manufacturing
question: "How do you calculate pressure vessel shell thickness to ASME?"
answer: >
  For a cylindrical shell under internal pressure, ASME Section VIII Division 1 (UG-27) gives the required
  thickness as t = PR / (SE − 0.6P), where P is design pressure, R the inside radius, S the allowable stress and E
  the longitudinal joints' efficiency. Check the longitudinal-stress formula PR / (2SE + 0.4P) with the
  circumferential joints' efficiency too, take the larger, and add the corrosion allowance.
description: "ASME UG-27 shell thickness for cylinders and spheres with a free calculator: formulas, which joint efficiency goes where, corrosion allowance and MAWP."
domain: [asme, design]
published: 2026-11-01
updated: 2026-11-06
checked: 2026-11-06
tool: shell
sources:
  - title: "BPVC Section VIII Division 1 (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-viii-1-bpvc-section-viii-rules-construction-pressure-vessels-division-1
    date: 2025-07-01
  - title: "BPVC Section II Part D: Properties (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-iid-bpvc-section-ii-materials-part-d-properties
    date: 2025-07-01
checks:
  - reg: ASME Section VIII Division 1 product page, description
    doc: asme-viii1
    quote: "ASME BPVC Section VIII Division 1 provides design, fabrication, inspection, testing & certification rules for pressure vessels operating over 15 psig, fired/unfired."
  - reg: ASME Section II Part D product page, description
    doc: asme-ii-d
    quote: "provides material properties, allowable stress values, and design data for pressure equipment."
---

## How do you calculate pressure vessel shell thickness to ASME?

Use UG-27 of Section VIII Division 1 with the inside radius in the corroded condition, then add the corrosion
allowance. The formulas for internal pressure (2025 Edition):

| Shell | Required thickness | Valid while |
|---|---|---|
| Cylinder, circumferential (hoop) stress, governs the longitudinal joints | t = PR / (SE − 0.6P) | P ≤ 0.385SE and t ≤ R/2 |
| Cylinder, longitudinal stress, governs the circumferential joints | t = PR / (2SE + 0.4P) | P ≤ 1.25SE and t ≤ R/2 |
| Sphere | t = PR / (2SE − 0.2P) | P ≤ 0.665SE and t ≤ 0.356R |

- **P**: design pressure, plus any static head at that point.
- **R**: inside radius, increased by the corrosion allowance.
- **S**: maximum allowable stress at the design temperature, from [Section II Part D](/asme/section-ii).
- **E**: [joint efficiency](/asme/joint-efficiency) of the joint the formula governs.

The Code text is ASME's and paid; formulas are written out here so they can be checked against your 2025 book.

## Which joint efficiency goes in which formula?

The hoop-stress formula uses the efficiency of the **longitudinal** (Category A) joints, because hoop stress pulls
them apart; the longitudinal-stress formula uses the efficiency of the **circumferential** (Category B) joints. They
differ when the seams are radiographed differently, for example full radiography of the long seams and spot of the
girth seams. The calculator above takes both; leave the second blank when they are the same.

## Why use the corroded radius?

Because the shell has to hold the pressure at the end of its life, when the corrosion allowance has gone: the
inside wall has moved out and the wall is thinner. Using the corroded radius in the formula, then adding the
allowance to the result, gives the thickness to order.

## Can you show a worked example?

A carbon steel shell, 48 in inside diameter, design pressure 150 psi, allowable stress 20,000 psi, spot-radiographed
Type 1 joints (E = 0.85 for both), corrosion allowance 0.125 in:

1. Corroded radius: 24 + 0.125 = 24.125 in.
2. Hoop: t = 150 × 24.125 / (20,000 × 0.85 − 0.6 × 150) = 3,618.75 / 16,910 = **0.214 in**.
3. Longitudinal: t = 3,618.75 / (2 × 20,000 × 0.85 + 0.4 × 150) = 3,618.75 / 34,060 = 0.106 in. Hoop governs.
4. Add corrosion: 0.214 + 0.125 = **0.339 in** minimum.
5. Choose plate: ⅜ in (0.375) covers it, after allowing for mill under-tolerance and any forming thin-out.

With the long seams fully radiographed (E = 1.0) and the girth seams spot (0.85), hoop becomes 3,618.75 / 19,910 =
0.182 in and the longitudinal check is still 0.106 in, so the minimum falls to **0.307 in**. In metric: 1,220 mm
inside diameter, 1.03 MPa, 138 MPa, E = 0.85, 3 mm corrosion → corroded radius 613 mm, t = 1.03 × 613 / (138 × 0.85 −
0.6 × 1.03) = **5.4 mm**, plus 3 mm = 8.4 mm, so a 10 mm plate. Use MPa with mm or psi with inches; never mix them.

## How do you get the MAWP of a chosen thickness?

Rearrange each formula for pressure and take the lower: P = SEt / (R + 0.6t) for hoop stress and
P = 2SEt / (R − 0.4t) for longitudinal stress, with t and R corroded. The ⅜ in plate above allows 175.1 psi; see
[MAWP and design pressure](/asme/mawp) for the full working.

## Where does the allowable stress come from?

From Section II Part D, which ASME describes as providing "material properties, allowable stress values, and design
data for pressure equipment": Table 1A for ferrous materials, by specification, grade and temperature. The calculator
asks you to enter it rather than supplying it, because the values are ASME's and change between editions; read them
from your copy of the 2025 tables.

## What if the shell is thick or the pressure high?

Beyond the limits in the table (t > R/2, or P above 0.385SE for the hoop formula), the thin-shell formulas no longer
apply: use the thick-shell formulas in Mandatory Appendix 1-2. The calculator warns when you are outside the range.
Mandatory Appendix 1-1 gives formulas in terms of the outside radius, used for pipe ordered by outside diameter.

## What does the formula not cover?

- **Heads**: their own formulas; see [heads](/asme/heads).
- **Openings**: every nozzle needs reinforcement checked (UG-37 onwards).
- **External pressure and vacuum**: a separate check (UG-28) with Section II Part D charts, often thicker than internal pressure needs.
- **Other loads**: wind, seismic, supports, lifting and piping loads (UG-22).
- **Minimum thickness**: Division 1 sets a floor for shells and heads regardless of pressure (UG-16).

## When does a vessel need Section VIII at all?

ASME describes Division 1 as covering "pressure vessels operating over 15 psig, fired/unfired"; see
[Section VIII Division 1 vs 2](/asme/section-viii).

## What does our software keep for shell design?

Our US boiler demo keeps each job's calculation sheet with the UG-27(c)(1) shell formula (PG-27 for boiler shells)
and its inputs, then the plate actually issued with its heat number, so the [MTR](/asme/mtr) and the calculation
point at the same plate. See [ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing).
