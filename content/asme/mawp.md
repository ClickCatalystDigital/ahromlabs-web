---
kind: asme
slug: mawp
group: design
title: "MAWP, design pressure, operating pressure and MDMT"
related:
  - /asme/shell-thickness
  - /asme/section-xiii
  - /asme/hydrostatic-test
  - /industries/boiler-pressure-vessel-manufacturing
  - /manufacturing/job-shop-erp
question: "What is the difference between MAWP and design pressure?"
answer: >
  Design pressure is the pressure a vessel is designed for, set from the process with a margin. MAWP (maximum
  allowable working pressure) is the highest pressure the finished vessel can take at its top, at the design
  temperature, worked out from the thicknesses actually used, so it is at least the design pressure. Operating
  pressure sits below both, and the relief device is normally set at or below MAWP.
description: "MAWP vs design pressure vs operating pressure in ASME Section VIII, worked from plate thickness, with static head, relief set pressure and MDMT."
domain: [asme, design]
published: 2026-11-01
updated: 2026-11-06
checked: 2026-11-06
sources:
  - title: "BPVC Section VIII Division 1 (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-viii-1-bpvc-section-viii-rules-construction-pressure-vessels-division-1
    date: 2025-07-01
  - title: "BPVC Section XIII: Rules for Overpressure Protection (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-xiii-bpvc-section-xiii-rules-overpressure-protection
    date: 2025-07-01
  - title: "BPVC Section II Part D: Properties (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-iid-bpvc-section-ii-materials-part-d-properties
    date: 2025-07-01
checks:
  - reg: ASME Section VIII Division 1 product page, description
    doc: asme-viii1
    quote: "ASME BPVC Section VIII Division 1 provides design, fabrication, inspection, testing & certification rules for pressure vessels operating over 15 psig, fired/unfired."
  - reg: ASME Section XIII product page, description
    doc: asme-xiii
    quote: "BPVC Section XIII sets requirements for design, materials, inspection, testing, and marking of pressure relief valves, rupture disks, and related devices."
  - reg: ASME Section II Part D product page, description
    doc: asme-ii-d
    quote: "provides material properties, allowable stress values, and design data for pressure equipment."
---

## What is the difference between MAWP and design pressure?

Design pressure is what the vessel is designed for; MAWP is what the finished vessel can actually take. The owner
or designer sets the design pressure, with its coincident temperature, from the process (UG-21 in Section VIII
Division 1, 2025 Edition). MAWP is calculated afterwards from the thicknesses actually used, less corrosion
allowance, for every part, and the weakest part sets it (UG-98 and Mandatory Appendix 3). It is therefore at least
the design pressure. The Code text is ASME's and paid; this guide cites paragraphs and works examples.

| Pressure | What it is | Who sets it |
|---|---|---|
| Operating pressure | What the process normally runs at | The process |
| Relief set pressure | Where the relief device opens; normally at or below MAWP | The designer, within Code limits |
| Design pressure | What the vessel is designed for, at the top, with the coincident temperature | The owner or designer (UG-21) |
| MAWP | The most the completed vessel can take at the top, at the design temperature, from its actual thicknesses | Calculated (UG-98) |

## How do you calculate MAWP from a plate thickness?

Rearrange the thickness formula for pressure, using the corroded thickness and radius. For a cylindrical shell under
UG-27(c)(1), MAWP = SEt / (R + 0.6t). Worked example, the same shell as the [shell thickness guide](/asme/shell-thickness):
⅜ in plate, corrosion allowance 0.125 in, inside radius 24 in, S = 20,000 psi, E = 0.85.

1. Corroded thickness t = 0.375 − 0.125 = 0.250 in; corroded radius R = 24 + 0.125 = 24.125 in.
2. Hoop stress: MAWP = 20,000 × 0.85 × 0.25 / (24.125 + 0.6 × 0.25) = 4,250 / 24.275 = **175.1 psi**.
3. Longitudinal stress (UG-27(c)(2)): 2SEt / (R − 0.4t) = 8,500 / 24.025 = 353.8 psi, so the hoop case governs.
4. If the plate may arrive 0.01 in thin (the under-tolerance UG-16(c) allows for plate), t = 0.240 in and MAWP = 4,080 / 24.269 = **168.1 psi**.

The shell calculator on that page does the same, taking the lower of the two cases. The heads, nozzles and flanges
have their own MAWPs, and the vessel's MAWP is the lowest of all of them.

## Can MAWP be higher than design pressure?

Yes. Plate comes in standard thicknesses, so the shell above, designed for 150 psi, can take 168 psi as built. Many
owners still stamp MAWP equal to the design pressure to keep the relief valve and the nameplate simple; that is
allowed. A higher MAWP leaves room for a later rerate.

## Where is MAWP measured?

At the top of the vessel in its normal operating position, at the stated temperature. Parts lower down also see the
static head of the liquid and are designed for it: 20 ft of water adds 20 × 0.433 = 8.7 psi, so with an MAWP of 150 psi
at the top the bottom course is checked for 158.7 psi.

## Does MAWP use new or corroded thickness?

Corroded: the thickness left at the end of the corrosion allowance, at the design temperature, where the allowable
stress from Section II Part D is lowest. Some owners also ask for a "new and cold" pressure, which is higher; it is an
owner's term, not a Division 1 one. The [hydrostatic test](/asme/hydrostatic-test) is set from MAWP.

## What design pressure margin should I use?

A common practice is design pressure about 10% above the maximum operating pressure, or 25 psi (1.7 bar) above it at
low pressures, so normal swings don't lift the relief valve. That margin is practice, not a Code rule: the Code only
requires that the vessel is protected and the relief device set within its limits.

## Where should the relief valve be set?

Normally at or below MAWP for a single device. Division 1's overpressure protection rules (the UG-150 series since the
2021 Edition) say when a vessel needs protection and how much pressure may rise while it relieves; the device itself
is built to [Section XIII](/asme/section-xiii), which ASME describes as setting "requirements for design, materials,
inspection, testing, and marking of pressure relief valves, rupture disks, and related devices".

## How far can pressure rise above MAWP while a valve relieves?

In Division 1, generally by 10% or 3 psi (whichever is greater) with one device, 16% or 4 psi with several, and 21%
for fire exposure. Worked example: MAWP 150 psi, one valve set at 150 psi → pressure may reach 165 psi while
relieving; under fire, 181.5 psi. Check the overpressure paragraphs of your 2025 Division 1 for the exact conditions.

## What is MDMT?

The minimum design metal temperature: the coldest the metal may be while the vessel is at its MAWP, from a winter
start-up, an autorefrigerating flash or a cold fluid. It decides whether materials need impact testing; see
[MDMT and impact testing](/asme/impact-testing). MAWP at its temperature and MDMT at its pressure both go on the
nameplate and the [data report](/asme/data-reports).

## When does a vessel have to be designed to Section VIII at all?

ASME describes Division 1 as providing rules "for pressure vessels operating over 15 psig, fired/unfired"; at 15 psi
or less a vessel is outside its scope, though the law where it is installed may still regulate it. See
[Section VIII](/asme/section-viii) and [US boiler laws](/asme/state-boiler-laws).

## What does our software keep for MAWP?

Our US boiler demo keeps each job's calculation sheet (UG-27(c)(1) for vessel shells, PG-27 for boiler shells) and
prints MAWP at temperature and MDMT on the job's data report layout in the ASME record package, with the hydro test
record set from it. See [ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing).
