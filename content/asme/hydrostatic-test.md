---
kind: asme
slug: hydrostatic-test
group: design
title: "ASME hydrostatic test pressure (UG-99, UG-100, PG-99), with a calculator"
question: "What is the ASME hydrostatic test pressure for a pressure vessel?"
answer: >
  For a Section VIII Division 1 vessel, the minimum hydrostatic test pressure is 1.3 times the MAWP, multiplied by
  the lowest ratio of allowable stress at test temperature to allowable stress at design temperature (UG-99(b)).
  A pneumatic test uses 1.1 instead (UG-100). A Section I boiler is tested to at least 1.5 times its MAWP
  (PG-99).
description: "ASME hydrostatic test pressure with a free calculator: UG-99 (1.3 × MAWP × stress ratio), pneumatic UG-100 (1.1), Section I PG-99 (1.5), procedure and gauges."
domain: [asme, design, testing]
published: 2026-11-01
updated: 2026-11-01
checked: 2026-11-01
tool: hydrotest
sources:
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section I and Section VIII, Division 1)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
---

## The rules

| Equipment | Test | Minimum test pressure |
|---|---|---|
| Section VIII Div. 1 vessel | Hydrostatic, UG-99(b) | 1.3 × MAWP × stress ratio |
| Section VIII Div. 1 vessel | Pneumatic, UG-100 | 1.1 × MAWP × stress ratio |
| Section I boiler | Hydrostatic, PG-99 | 1.5 × MAWP |

The **stress ratio** is the allowable stress at the test temperature divided by the allowable stress at the design temperature, taken for the material where that ratio is lowest. At ordinary temperatures the two are often equal and the ratio is 1, so the test is simply 1.3 × MAWP. For a hot vessel, whose allowable stress falls with temperature, the ratio is above 1 and the test pressure rises.

The test pressure is at the **top** of the vessel. If the gauge is at the bottom, add the static head of the water column.

## Example

A vessel with MAWP 100 psi at 650 °F, where the material's allowable stress is 20,000 psi at test temperature and 16,000 psi at 650 °F: 1.3 × 100 × (20,000 ÷ 16,000) = **162.5 psi**. In metric units it reads the same: MAWP 10 bar with the same materials gives 1.3 × 10 × 1.25 = **16.25 bar**. The calculator above does this for any rule and unit.

## How the test is done (Division 1)

- **Water temperature**: the metal should be at least 30 °F (17 °C) above the [MDMT](/asme/impact-testing) to avoid brittle fracture, and Division 1 recommends not above 120 °F (49 °C) so the vessel can be approached safely.
- **Inspection**: after reaching test pressure, it is reduced to at least the test pressure divided by 1.3 and held while every joint and connection is examined, normally with the [Authorized Inspector](/asme/authorized-inspector) present.
- **Gauges**: the dial should read about twice the test pressure, and never less than 1.5 or more than 4 times it (UG-102). Calibrate before the test.
- **Vents**: vent the high points so no air is trapped.

## Pneumatic tests

A gas stores far more energy than water at the same pressure, so a pneumatic test is used only where water can't be: vessels that can't be supported full, or that must not see any water. Division 1 adds conditions (examination of certain welds first, raising pressure in steps from half the test pressure), and the inspection pressure is the test pressure divided by 1.1.

## On the paperwork

The test pressure goes on the [data report](/asme/data-reports) and the nameplate record. How MAWP is set is in [MAWP and design pressure](/asme/mawp); the Indian practice for boilers is in [ASME vs IBR 2026](/asme/asme-vs-ibr).
