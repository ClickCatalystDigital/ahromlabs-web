---
kind: asme
slug: impact-testing
group: design
title: "MDMT and impact test exemptions (UCS-66)"
related:
  - /asme/mawp
  - /asme/pwht
  - /asme/section-ii
  - /systems/heat-number
  - /industries/boiler-pressure-vessel-manufacturing
question: "When is impact testing required for an ASME pressure vessel?"
answer: >
  Carbon and low-alloy steels can turn brittle when cold, so ASME Section VIII Division 1 requires Charpy impact
  tests unless an exemption applies. UCS-66 gives exemption curves (A to D) by material and thickness against the
  vessel's MDMT; thin parts and lower stresses earn more exemption. Below −55 °F (−48 °C) most parts need testing.
description: "ASME impact testing and MDMT: UCS-66 exemption curves A to D, governing thickness, the stress-ratio credit, the UG-20(f) exemption and Charpy tests."
domain: [asme, design, materials]
published: 2026-11-01
updated: 2026-11-06
checked: 2026-11-06
sources:
  - title: "BPVC Section VIII Division 1 (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-viii-1-bpvc-section-viii-rules-construction-pressure-vessels-division-1
    date: 2025-07-01
  - title: "BPVC Section II Part A: Ferrous Material Specifications (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-iia-bpvc-section-ii-materials-part-ferrous-materials-specifications
    date: 2025-07-01
checks:
  - reg: ASME Section VIII Division 1 product page, description
    doc: asme-viii1
    quote: "ASME BPVC Section VIII Division 1 provides design, fabrication, inspection, testing & certification rules for pressure vessels operating over 15 psig, fired/unfired."
---

## When is impact testing required for an ASME pressure vessel?

When a carbon or low-alloy steel part's minimum design metal temperature (MDMT) is colder than the exemption
Division 1 allows for its material and thickness (UCS-66, 2025 Edition), and no other exemption applies. Steel that
is tough at room temperature can fracture like glass when cold; impact testing proves the steel, welds and
heat-affected zones are tough at the MDMT. The Code text and its curves are ASME's and paid; this guide outlines the
method, and your 2025 book is the authority.

## What is MDMT?

The coldest metal temperature at which the vessel may be at its MAWP: a cold winter start-up, an autorefrigerating
flash, a cold fluid. It goes on the nameplate and the [data report](/asme/data-reports) with its coincident pressure.
See [MAWP and MDMT](/asme/mawp).

## How does the UCS-66 exemption work?

Division 1 works it out part by part:

1. **Assign the material to a curve.** Figure UCS-66 has curves A to D. Curve A is for materials with the least toughness assurance; Curve D for the best (for example, normalized fine-grain plate). The Code lists which specification and heat treatment goes on which curve.
2. **Find the governing thickness** of each part: for a butt joint, the thicker of the two members, with rules for corner, fillet and lap joints and for flat heads.
3. **Read the curve.** It gives the coldest MDMT allowed without impact testing at that thickness. If the vessel's MDMT is warmer than that, the part is exempt.
4. **Take credit for low stress.** When the part is stressed below its full allowable (thicker than needed, or at lower pressure), Figure UCS-66.1 lowers the exemption temperature further.

## What are curves A to D?

Four material groups by toughness: A the least assured, D the best. Plate on a better curve is exempt to a colder
temperature at the same thickness, so when the MDMT is cold, buying plate to a specification and heat treatment on
the better curves (normalized SA-516, for example) can avoid impact testing altogether. The curve assignments are in
the Code; check the note for your specification and heat treatment.

## Is there a simple exemption for ordinary vessels?

Yes: UG-20(f) exempts P-No. 1 materials of limited thickness from impact testing when the vessel is hydrostatically
tested to UG-99(b) or (c), has a design temperature between −20 °F (−29 °C) and 650 °F (343 °C), and has no unusual
thermal or mechanical shock or cyclic loading. Most small carbon steel vessels in mild climates use it.

## Is impact testing always required below a certain temperature?

Generally below −55 °F (−48 °C): at such low MDMTs Division 1 requires impact testing unless the part is very lightly
stressed.

## What does impact testing involve?

Charpy V-notch specimens are cut from the material, or from a test weld for weld metal and heat-affected zones, and
broken at the test temperature. The energy absorbed must meet a minimum that depends on the material's strength and
thickness (UG-84). When impact testing applies, the welding procedure must also be qualified with impact tests,
which brings in Section IX's supplementary [essential variables](/asme/essential-variables).

## Can PWHT reduce the need for impact testing?

It can: Division 1 gives a temperature credit for post-weld heat treatment that the Code doesn't otherwise require
(UCS-68). See [PWHT](/asme/pwht).

## Who supplies the impact test results?

The mill, for the base metal: the results come on the [MTR](/asme/mtr) for the heat, tested at the temperature you
ordered. The shop supplies weld and heat-affected zone results from its PQR or production test plates. Order plate
with the impact test temperature on the purchase order, because adding it later means retesting.

## How do I specify MDMT?

Honestly: too warm is unsafe, too cold forces testing you didn't need. Set it from the coldest metal temperature at
pressure the vessel will really see, including start-up and upset cases, and write it on the purchase order with its
coincident pressure.

## When does UCS-66 apply?

To carbon and low-alloy steel parts (Part UCS) of Section VIII Division 1 vessels, the Division ASME describes as
covering "pressure vessels operating over 15 psig, fired/unfired". Other materials have their own toughness rules.

## What does our software keep for MDMT?

Our US boiler demo prints MDMT on the job's data report layout and files the plates' MTRs by heat number in the ASME
record package. It has no separate impact test records. See
[ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing).
