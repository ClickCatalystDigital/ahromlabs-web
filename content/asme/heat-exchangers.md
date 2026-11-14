---
kind: asme
slug: heat-exchangers
group: design
title: "ASME heat exchangers: Part UHX, TEMA and the U-5 sheet"
related:
  - /asme/section-viii
  - /asme/data-reports
  - /systems/hydrostatic-test
  - /industries/boiler-pressure-vessel-manufacturing
  - /manufacturing/job-shop-erp
question: "Which ASME rules apply to a shell-and-tube heat exchanger?"
answer: >
  A shell-and-tube heat exchanger built to Section VIII Division 1 is a multi-chamber vessel: the shell and channel
  follow the usual rules, the tubesheets are designed to Part UHX, and the data report is a U-1 with the U-5
  supplementary sheet. Most purchasers also specify TEMA, which adds mechanical standards, tolerances and the type
  code such as AES or BEM. Each side is pressure tested.
description: "Shell-and-tube heat exchangers under ASME Section VIII: Part UHX tubesheets, TEMA classes and types, tube joints, testing both sides, U-1 with U-5."
domain: [asme, design, heat-exchangers]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
sources:
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section VIII, Division 1, Part UHX, UG-99)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
  - title: "ASME Data Report Forms"
    publisher: ASME
    url: https://www.asme.org/codes-standards/publications-information/asme-data-report-forms
    date: 2026-11-05
  - title: "TEMA Standards"
    publisher: Tubular Exchanger Manufacturers Association
    url: https://tema.org/
    date: 2026-11-14
checks:
  - reg: ASME Data Report Forms page
    doc: asme-forms
    quote: "U-5"
---

## Which ASME rules apply to a heat exchanger?

A shell-and-tube heat exchanger is built as a [Section VIII Division 1](/asme/section-viii) vessel with two
pressure chambers, the shell side and the tube side. The shell, channel, heads, nozzles and flanges follow the same
rules as any Division 1 vessel ([shell thickness](/asme/shell-thickness), [heads](/asme/heads),
[joint efficiency](/asme/joint-efficiency)). The parts unique to an exchanger, the tubesheets and their joints to the
shell and channel, are designed to Part UHX. Plate heat exchangers have their own data report, U-1P.

## What does Part UHX cover?

Tubesheet design: the thickness of fixed, floating and U-tube tubesheets under the pressures on each side, the
effect of the tubes acting as stays, and for fixed tubesheet exchangers the loads from differential thermal
expansion between shell and tubes, which may call for an expansion joint in the shell. It is calculation-heavy and
usually done in design software; the shop's job is to build what the calculation assumed (tubesheet thickness after
grooving and corrosion allowance, tube pitch and pattern, tube-hole tolerances).

## What is TEMA and how does it relate to ASME?

TEMA, the Tubular Exchanger Manufacturers Association, publishes mechanical standards for shell-and-tube exchangers
that sit on top of the ASME Code: minimum thicknesses, tube-hole tolerances, baffle and tie-rod rules, nozzle loads
and fabrication tolerances. ASME decides whether the exchanger is safe as a pressure vessel; TEMA decides much of how
it is built and how it fits the plant. TEMA defines three classes, chosen by the purchaser:

| TEMA class | Typical service |
|---|---|
| R | Severe service, typically petroleum and refinery processing |
| C | Moderate service, general commercial and process use |
| B | Chemical process service |

TEMA's three-letter type code names the front head, shell and rear head: an **AES** has a removable channel and
cover, a one-pass shell and a split-ring floating head; a **BEM** has a bonnet, one-pass shell and a fixed tubesheet;
a **BEU** is a U-tube bundle. The type code goes on the datasheet and drives most of the bill of materials.

## How are tube-to-tubesheet joints made and checked?

By expanding the tubes into the tubesheet holes (roller or hydraulic expansion, with or without grooves), by
welding the tube ends, or both (strength-welded and expanded, or seal-welded and expanded). Section VIII gives rules
for the allowable load on each joint type. What the [inspection and test plan](/asme/inspection-and-test-plan)
usually holds on:

- tube-hole diameter and ligament checks before tubes go in;
- expansion procedure and its qualification, with wall-thinning checks;
- a qualified WPS and welders for welded joints; mock-up joints when the purchaser asks;
- a leak test of the joints before the shell is closed or the bundle inserted.

## How is a heat exchanger pressure tested?

Each chamber is tested to its own [hydrostatic test pressure](/asme/hydrostatic-test) under UG-99, the shell side
and the tube side, usually with the other side open so the tube joints can be seen. With a removable bundle, the
shell-side test is often done with a test ring so the tube joints are visible. Where the design is for differential
pressure only, the test sequence must not exceed the differential the tubesheet was designed for; agree the sequence
with the Inspector.

## Which data report does a heat exchanger need?

A U-1 for the multi-chamber vessel, with the U-5 supplementary sheet for shell-and-tube exchangers: the sheet records
the tubesheets, tubes and tube-to-tubesheet joints, the parts a U-1 has no room for. ASME's forms page lists U-5
among the Division 1 forms. See [data reports](/asme/data-reports) and the job's [data book](/asme/data-book).

## What does an exchanger datasheet tell the shop?

The purchaser's datasheet carries the process side (fluids, flows, temperatures, fouling factors) and the mechanical
side that drives fabrication: TEMA type and class, design pressure and temperature on each side, corrosion
allowances, materials for shell, channel, tubesheets, tubes and baffles, tube size, gauge, length, pitch and layout,
number of passes, nozzle sizes and ratings, and test pressures. A shop should check it against the drawing before
material is bought: a tube gauge or tubesheet material that differs between the two is a common source of NCRs.

## What fails most often in exchanger fabrication?

- Tube holes out of tolerance or with poor finish, which spoils the expanded joint.
- Over-expansion that thins tubes beyond the procedure's limit, or under-expansion that leaks on test.
- Tubesheet and baffle holes that don't line up, making the bundle hard to insert.
- Leaks at tube-to-tubesheet welds found only on the hydro test.
- Gasket surfaces damaged during handling, found at the final test.

Each is cheapest to catch at its own hold point on the inspection and test plan, which is why exchanger ITPs carry
more points than a simple vessel's.

## What should an exchanger shop's system keep?

Everything above, per job: the TEMA type and class, tubesheet and tube materials with their [MTRs](/asme/mtr),
tube-hole and expansion records, the joint WPS and welders, the leak test, both hydro tests and the U-1 with U-5.
Our US boiler demo runs the same quality loop on an exchanger inspection plan (60 points for a full exchanger, 25 for
a bundle only): failed inspections hold the next step until the NCR closes, and the data book fills as the job runs.
See [ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing). U-5 output is not
in the demo yet.
