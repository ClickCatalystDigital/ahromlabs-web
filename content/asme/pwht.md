---
kind: asme
slug: pwht
group: design
title: "Post-weld heat treatment requirements (UCS-56)"
question: "When is post-weld heat treatment required by ASME?"
answer: >
  ASME Section VIII Division 1 requires post-weld heat treatment (PWHT) by material and thickness: Table UCS-56
  sets, for each P-number, the holding temperature, the time per inch of thickness and when it can be skipped.
  For P-No. 1 carbon steel, PWHT is generally required above 1½ in, held at 1,100 °F or more, and some services
  need it at any thickness.
description: "ASME PWHT requirements under UCS-56: holding temperature and time for P-No. 1, thickness exemptions, service-driven PWHT, heating and cooling rates and records."
domain: [asme, design, welding]
published: 2026-11-01
updated: 2026-11-01
checked: 2026-11-01
sources:
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section VIII, Division 1)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
---

## Why heat treat after welding

Welding leaves high residual stresses and hard zones next to the weld. PWHT (stress relieving) heats the part below its transformation temperature and holds it, which relaxes the stresses and tempers the hard zones. It improves toughness and resistance to some kinds of cracking, at the cost of furnace time and, sometimes, strength.

## The table, for P-No. 1 carbon steel

Table UCS-56-1 sets requirements by P-number. For P-No. 1 (carbon steel, the commonest case), in outline:

| Item | Requirement |
|---|---|
| Minimum holding temperature | 1,100 °F (595 °C) |
| Holding time, up to 2 in thick | 1 hour per inch, at least 15 minutes |
| Holding time, over 2 in | Longer, on a sliding scale in the table |
| Exemption by thickness | PWHT is not mandatory up to 1¼ in, and up to 1½ in with a minimum preheat, subject to the table's notes |

Other P-numbers have their own temperatures and much narrower exemptions; chromium–molybdenum steels (P-No. 4, 5A) nearly always need it. Check the current edition's table for your material: the notes carry most of the detail.

## When service decides, not thickness

PWHT can be required whatever the thickness:

- **Lethal service** (UW-2): Division 1 requires PWHT of carbon and low-alloy steel vessels.
- **Low temperature**: some impact test exemptions depend on it; see [impact testing](/asme/impact-testing).
- **The owner's specification**: caustic, amine, wet H₂S and similar services often call for PWHT to resist stress-corrosion cracking, beyond the Code's minimum.

## Doing it

- Heating and cooling rates above 800 °F are limited by thickness (UCS-56(d)), so a thick vessel takes a long cycle.
- Temperatures are recorded by thermocouples on the part, and the chart is part of the record.
- PWHT is a procedure [essential variable](/asme/essential-variables): adding or removing it needs a PQR qualified that way.

## On the paperwork

The PWHT chart goes in the [data report](/asme/data-reports) package and PWHT is declared on the report itself. In India, IBR asks for heat treatment charts of welded drums with the registration documents; see [ASME vs IBR 2026](/asme/asme-vs-ibr).
