---
kind: asme
slug: hydrostatic-test
group: design
title: "ASME hydrostatic test pressure calculator (UG-99)"
related:
  - /asme/mawp
  - /asme/section-i-vs-iv
  - /ibr/registration-documents
  - /industries/boiler-pressure-vessel-manufacturing
  - /services/material-traceability
question: "What is the ASME hydrostatic test pressure for a pressure vessel?"
answer: >
  For a Section VIII Division 1 vessel, the minimum hydrostatic test pressure is 1.3 times the MAWP, multiplied by
  the lowest ratio of allowable stress at test temperature to allowable stress at design temperature (UG-99(b)).
  A pneumatic test uses 1.1 instead (UG-100). A Section I boiler is tested to at least 1.5 times its MAWP
  (PG-99).
description: "ASME hydrostatic test pressure with a free calculator: UG-99 (1.3 × MAWP × stress ratio), pneumatic UG-100 (1.1), Section I PG-99 (1.5), gauges and holds."
domain: [asme, design, testing]
published: 2026-11-01
updated: 2026-11-06
checked: 2026-11-06
tool: hydrotest
sources:
  - title: "BPVC Section VIII Division 1 (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-viii-1-bpvc-section-viii-rules-construction-pressure-vessels-division-1
    date: 2025-07-01
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section I)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
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

## What is the ASME hydrostatic test pressure?

For a Section VIII Division 1 vessel it is at least 1.3 × MAWP × the lowest stress ratio (UG-99(b)); for a Section I
boiler, at least 1.5 × MAWP (PG-99). The calculator above works out either, and the pneumatic test, for any unit.
The Code text is ASME's and paid; this guide cites the 2025 Edition's paragraphs.

| Equipment | Test | Minimum test pressure |
|---|---|---|
| Section VIII Div. 1 vessel | Hydrostatic, UG-99(b) | 1.3 × MAWP × stress ratio |
| Section VIII Div. 1 vessel | Pneumatic, UG-100 | 1.1 × MAWP × stress ratio |
| Section I boiler | Hydrostatic, PG-99 | 1.5 × MAWP |

## What is the stress ratio in UG-99?

It is the allowable stress at the test temperature divided by the allowable stress at the design temperature, taken
for the pressure-part material where that ratio is lowest; bolting is left out. Both values come from Section II
Part D. At ordinary temperatures they are often equal and the ratio is 1, so the test is 1.3 × MAWP; for a hot
vessel, whose allowable stress falls with temperature, the ratio is above 1 and the test pressure rises.

## Can you show worked examples?

- **Room-temperature vessel**: MAWP 100 psi, ratio 1 → 1.3 × 100 = **130 psi**.
- **Hot vessel**: MAWP 100 psi at 650 °F, allowable 20,000 psi at test temperature and 16,000 psi at 650 °F → 1.3 × 100 × 1.25 = **162.5 psi**. In metric, MAWP 10 bar with the same materials → **16.25 bar**.
- **Section I boiler**: MAWP 150 psi → 1.5 × 150 = **225 psi**.

## Is the test pressure measured at the top or the bottom?

At the top of the vessel. If the gauge is at the bottom, add the static head of the water column: a vessel 10 ft
tall adds 10 × 0.433 = 4.3 psi, so a 130 psi test reads about 134.3 psi on a bottom gauge.

## At what pressure is the vessel inspected?

After reaching the test pressure, it is reduced to not less than the test pressure divided by 1.3 and held while
every joint and connection is examined (UG-99(g)), normally with the [Authorized Inspector](/asme/authorized-inspector)
present. For the 130 psi test above, that is at least 100 psi.

## What gauge range do I need for a hydro test?

A dial about twice the test pressure, never less than 1.5 times or more than 4 times it (UG-102), calibrated before
the test. For a 130 psi test that means a range between 195 and 520 psi, ideally about 260 psi, so a 0–300 psi gauge;
a 0–600 psi gauge is too coarse. For a 225 psi boiler test, 0–600 psi is within range.

## How warm should the test water be?

Warm enough that the metal is at least 30 °F (17 °C) above the vessel's [MDMT](/asme/impact-testing), to avoid
brittle fracture, and Division 1 recommends not above 120 °F (49 °C) so the vessel can be approached safely during
the examination (UG-99(h)).

## When is a pneumatic test used instead?

Only where water can't be: vessels that can't be supported full of water, or that must not see any water. A gas
stores far more energy than water at the same pressure, so Division 1 adds conditions (examination of certain welds
first, raising pressure in steps), the test pressure is 1.1 × MAWP × the stress ratio (UG-100), and the examination
pressure is the test pressure divided by 1.1.

## Does the Authorized Inspector have to witness it?

Yes. The pressure test is one of the Inspector's hold points on every stamped vessel and boiler, and the test pressure
goes on the [data report](/asme/data-reports) they sign.

## What should the hydro test record show?

The date, test pressure and where it was measured, water temperature, hold time, the gauge used and its calibration
date, the examination pressure, the result, and who witnessed it. How MAWP is set is in
[MAWP and design pressure](/asme/mawp); how a vessel needs Section VIII at all is in
[Section VIII](/asme/section-viii), which ASME says covers "pressure vessels operating over 15 psig".

## How does this work under IBR in India?

IBR 2026 sets its own hydraulic test rules and asks for the test record among the registration documents; see
[boiler registration documents](/ibr/registration-documents) and [ASME vs IBR 2026](/asme/asme-vs-ibr).

## What does our software keep for the hydro test?

Our US boiler demo records each job's hydro test (pressure, temperature, hold, gauge and its calibration date,
witness) and prints it in the ASME record package next to the data report layout: 130 psi for its Division 1 vessel
and 225 psi for its boilers. See [ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing).
