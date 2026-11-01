---
kind: asme
slug: impact-testing
group: design
title: "MDMT and impact test exemptions (UCS-66)"
question: "When is impact testing required for an ASME pressure vessel?"
answer: >
  Carbon and low-alloy steels can turn brittle when cold, so ASME Section VIII Division 1 requires Charpy impact
  tests unless an exemption applies. UCS-66 gives exemption curves (A to D) by material and thickness against the
  vessel's MDMT; thin parts and lower stresses earn more exemption. Below about −55 °F most parts need testing.
description: "ASME impact testing and MDMT explained: UCS-66 exemption curves A to D, governing thickness, the stress-ratio reduction, UG-20(f), and what testing involves."
domain: [asme, design, materials]
published: 2026-11-01
updated: 2026-11-01
checked: 2026-11-01
sources:
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section VIII, Division 1)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
---

## Why it matters

Steel that is tough at room temperature can fracture like glass when cold. The **MDMT** (minimum design metal temperature) is the coldest the metal may be while the vessel is at pressure; impact testing proves the steel, welds and heat-affected zones are tough at that temperature. See [MAWP and MDMT](/asme/mawp).

## How the exemption works

For carbon and low-alloy steels (Part UCS), Division 1 works it out part by part:

1. **Assign the material to a curve.** Figure UCS-66 has curves A to D. Curve A is for materials with the least toughness assurance; Curve D for the best (for example, normalized fine-grain plate). The curve assignments are listed in the Code.
2. **Find the governing thickness** of each part: for a butt joint, the thicker of the two members, with rules for other joints.
3. **Read the curve.** It gives the coldest MDMT allowed without impact testing at that thickness. If the vessel's MDMT is warmer, the part is exempt.
4. **Take credit for low stress.** When the part is less stressed than its full allowable (thicker than needed, or at lower pressure), Figure UCS-66.1 allows a further reduction in the exemption temperature.

There's also a blanket exemption for simple cases (UG-20(f)): P-No. 1 materials of limited thickness, hydrostatically tested to UG-99(b), with design temperatures between −20 °F and 650 °F and no unusual shock or cyclic loading.

Below −55 °F, impact testing is generally required unless the part is very lightly stressed.

## What impact testing involves

Charpy V-notch specimens are cut from the material, or from a test weld for welds and heat-affected zones, and broken at the test temperature. The energy absorbed must meet a minimum that depends on the material's strength and thickness (UG-84). When impact testing applies, the welding procedure must also be qualified with impact tests, which brings in Section IX's supplementary [essential variables](/asme/essential-variables).

## Practical points

- Specify MDMT honestly: too warm is unsafe; too cold forces testing you didn't need.
- Buy plate to a specification and heat treatment on the better curves (normalized SA-516, for example) when the MDMT is cold.
- The MDMT and any impact test results go on the [data report](/asme/data-reports), and the steel's own test results come on its [MTR](/asme/mtr).
