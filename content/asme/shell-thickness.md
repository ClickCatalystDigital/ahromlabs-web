---
kind: asme
slug: shell-thickness
group: design
title: "Shell thickness and MAWP (UG-27), with a calculator"
question: "How do you calculate pressure vessel shell thickness to ASME?"
answer: >
  For a cylindrical shell under internal pressure, ASME Section VIII Division 1 (UG-27) gives the required
  thickness as t = PR / (SE − 0.6P), where P is design pressure, R the inside radius, S the allowable stress and E
  the joint efficiency. Add the corrosion allowance, check the longitudinal-stress formula too, and take the
  larger.
description: "ASME UG-27 shell thickness for cylinders and spheres, with a free calculator: formulas, corrosion allowance, joint efficiency and MAWP."
domain: [asme, design]
published: 2026-11-01
updated: 2026-11-01
checked: 2026-11-01
tool: shell
sources:
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section VIII, Division 1)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
---

## The formulas

Section VIII Division 1, UG-27, for internal pressure, using the **inside radius in the corroded condition**:

| Shell | Required thickness | Valid while |
|---|---|---|
| Cylinder, circumferential stress (governs the longitudinal joints) | t = PR / (SE − 0.6P) | P ≤ 0.385SE and t ≤ R/2 |
| Cylinder, longitudinal stress (governs the circumferential joints) | t = PR / (2SE + 0.4P) | P ≤ 1.25SE and t ≤ R/2 |
| Sphere | t = PR / (2SE − 0.2P) | P ≤ 0.665SE and t ≤ 0.356R |

- **P**: design pressure, plus any static head at that point.
- **R**: inside radius, increased by the corrosion allowance.
- **S**: maximum allowable stress at the design temperature, from [Section II Part D](/asme/section-ii).
- **E**: [joint efficiency](/asme/joint-efficiency) of the relevant joint.

Outside the limits, use the thick-shell formulas in Mandatory Appendix 1-2. Each formula can also be rearranged to give the **MAWP** a known thickness allows; for a cylinder, P = SEt / (R + 0.6t).

## A worked example

A carbon steel shell, 48 in inside diameter, design pressure 150 psi, allowable stress 20,000 psi, spot radiographed Type 1 joints (E = 0.85), corrosion allowance 0.125 in:

1. Corroded radius: 24 + 0.125 = 24.125 in.
2. Circumferential: t = 150 × 24.125 / (20,000 × 0.85 − 0.6 × 150) = 3,618.75 / 16,910 = **0.214 in**.
3. Longitudinal: t = 150 × 24.125 / (2 × 20,000 × 0.85 + 0.4 × 150) = 0.106 in. Circumferential governs.
4. Add corrosion: 0.214 + 0.125 = **0.339 in** minimum.
5. Choose plate: ⅜ in (0.375) covers it, after allowing for any mill undertolerance and forming thin-out.

The same shell in metric: 1,220 mm inside diameter, design pressure 1.03 MPa (10.3 bar), allowable stress 138 MPa, E = 0.85, corrosion allowance 3 mm. Corroded radius 613 mm; t = 1.03 × 613 / (138 × 0.85 − 0.6 × 1.03) = **5.4 mm**, plus 3 mm corrosion = **8.4 mm**, so a 10 mm plate. Use MPa with mm, or psi with inches, and never mix them.

The calculator above repeats these steps for your numbers and works the MAWP back from a chosen thickness. The allowable stress is yours to enter: it comes from ASME's tables for your material, grade and temperature, which change between editions and aren't reproduced here.

## What the formula doesn't cover

- **Heads**: their own formulas; see [heads](/asme/heads).
- **Openings**: every nozzle needs reinforcement checked (UG-37 and onwards).
- **External pressure and vacuum**: a separate check (UG-28) with charts from Section II Part D; often thicker than internal pressure needs.
- **Other loads**: wind, seismic, supports, lifting and piping loads (UG-22).
- **Minimum thickness**: Division 1 sets a floor for shells and heads regardless of pressure (UG-16).

Related: [MAWP and design pressure](/asme/mawp), and the [hydrostatic test](/asme/hydrostatic-test) that proves the result.
