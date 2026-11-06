---
kind: asme
slug: pwht
group: design
title: "Post-weld heat treatment requirements (UCS-56)"
related:
  - /asme/essential-variables
  - /asme/impact-testing
  - /ibr/registration-documents
  - /industries/boiler-pressure-vessel-manufacturing
  - /services/material-traceability
question: "When is post-weld heat treatment required by ASME?"
answer: >
  ASME Section VIII Division 1 requires post-weld heat treatment (PWHT) by material and thickness: Table UCS-56-1
  sets, for each P-number, the minimum holding temperature, the time per inch of thickness and when it can be
  skipped. For P-No. 1 carbon steel, PWHT is generally required above 1½ in (38 mm), held at 1,100 °F (595 °C) or
  more, and some services need it at any thickness.
description: "ASME PWHT under UCS-56-1: P-No. 1 temperature, hold time and thickness exemption, service-driven PWHT, heating and cooling rates, and the WPS effect."
domain: [asme, design, welding]
published: 2026-11-01
updated: 2026-11-06
checked: 2026-11-06
sources:
  - title: "BPVC Section VIII Division 1 (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-viii-1-bpvc-section-viii-rules-construction-pressure-vessels-division-1
    date: 2025-07-01
  - title: "BPVC Section IX: Welding, Brazing, and Fusing Qualifications (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-ix-bpvc-section-ix-welding-brazing-fusing-qualifications
    date: 2025-07-01
checks:
  - reg: ASME Section VIII Division 1 product page, description
    doc: asme-viii1
    quote: "ASME BPVC Section VIII Division 1 provides design, fabrication, inspection, testing & certification rules for pressure vessels operating over 15 psig, fired/unfired."
  - reg: ASME Section IX product page, description
    doc: asme-ix
    quote: "Section IX of the BPVC contains rules relating to the qualification of welding, brazing, and fusing procedures as required by other BPVC sections."
---

## When is post-weld heat treatment required by ASME?

For Section VIII Division 1 carbon and low-alloy steel vessels, PWHT is required by P-number and thickness under
Table UCS-56-1, and by service whatever the thickness in some cases. The table gives, for each P-number, the minimum
holding temperature, the minimum time at temperature by thickness, and the conditions under which PWHT may be
omitted; its notes carry most of the detail. The Code text is ASME's and paid; this guide outlines the 2025 rules and
your copy of UCS-56 is the authority.

## Why heat treat after welding?

Welding leaves high residual stresses and hard zones beside the weld. PWHT (stress relieving) heats the part below
its transformation temperature and holds it there, which relaxes the stresses and tempers the hard zones. It improves
toughness and resistance to some kinds of cracking, at the cost of furnace time and, sometimes, strength.

## What are the PWHT requirements for carbon steel?

For P-No. 1, the commonest case, Table UCS-56-1 sets in outline:

| Item | Requirement |
|---|---|
| Minimum holding temperature | 1,100 °F (595 °C) |
| Holding time, up to 2 in (50 mm) thick | 1 hour per inch, at least 15 minutes |
| Holding time, over 2 in (50 mm) | 2 hours plus 15 minutes for each inch over 2 in |
| Exemption by thickness | Not mandatory up to 1¼ in (32 mm) nominal thickness, and up to 1½ in (38 mm) with a minimum preheat of 200 °F (95 °C), subject to the table's notes |

Other P-numbers have their own temperatures and much narrower exemptions; chromium–molybdenum steels (P-No. 4, 5A)
nearly always need it.

## When is PWHT required whatever the thickness?

- **Lethal service**: Division 1 requires PWHT of carbon and low-alloy steel vessels in lethal service (UW-2).
- **Low temperature**: some impact-test exemptions depend on it; see [impact testing](/asme/impact-testing).
- **The owner's specification**: caustic, amine, wet H₂S and similar services often call for PWHT to resist stress-corrosion cracking, beyond the Code minimum.

## Can you show a worked example?

A 1½ in (38 mm) P-No. 1 shell that needs PWHT (no preheat credit taken): hold at no less than 1,100 °F for
1.5 hours. Above 800 °F (425 °C), UCS-56(d) limits the heating rate to 400 °F per hour divided by the thickness in
inches, so 400 / 1.5 = 267 °F/h at most, and the cooling rate to 500 °F per hour divided by the thickness, so
500 / 1.5 = 333 °F/h, each with an overall cap. A 3 in shell holds for 2 h 15 min, with heating at no more than 133 °F/h.

## How is PWHT done and recorded?

In a furnace (whole vessel or in sections) or locally around a weld band, under UW-40's rules. Temperatures are
recorded by thermocouples on the part, and the chart showing heating rate, hold temperature and time, and cooling
rate is part of the vessel's record. PWHT is declared on the [data report](/asme/data-reports).

## Does PWHT change the welding procedure?

Yes. Adding or removing PWHT, or changing its temperature and time range, is a procedure essential variable in
Section IX (QW-407), so the WPS must be supported by a PQR heat treated the same way. Section IX is the Code's section
that ASME says "contains rules relating to the qualification of welding, brazing, and fusing procedures as required
by other BPVC sections". See [essential variables](/asme/essential-variables).

## What about Section I boilers?

Section I has its own PWHT table (PW-39) with its own thickness exemptions. A boiler shop and a vessel shop working
the same steel can therefore have different PWHT triggers on the same day.

## When does UCS-56 apply?

To carbon and low-alloy steel parts of Section VIII Division 1 vessels, the Division ASME describes as covering
"pressure vessels operating over 15 psig, fired/unfired". High-alloy steels follow Part UHA.

## How does this work under IBR in India?

IBR 2026 asks for heat treatment charts of welded drums with a boiler's registration documents; see
[boiler registration documents](/ibr/registration-documents) and [ASME vs IBR 2026](/asme/asme-vs-ibr).

## What does our software keep for PWHT?

Our US boiler demo records each job's PWHT decision with its basis (for example "P-No. 1 at ½ in nominal thickness,
below 1½ in"), and the temperature, hold, rate and chart where it is done, and prints it in the ASME record package
next to each WPS's PWHT condition. See [ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing).
