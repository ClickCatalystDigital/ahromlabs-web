---
kind: asme
slug: section-ii
group: code
title: "ASME Section II materials and SA vs A specifications"
question: "What is the difference between SA-516 and A516?"
answer: >
  ASME Section II holds the material specifications the Code allows: Part A ferrous, Part B nonferrous, Part C
  filler metals, Part D properties and allowable stresses. An SA specification is ASME's adoption of an ASTM one,
  sometimes with changes; SA-516 is ASME's version of ASTM A516. Code pressure parts must be certified to the SA
  specification, often on a dual-marked MTR.
description: "ASME Section II explained: Parts A, B, C and D, SA vs A (SA-516 vs A516), dual certification, and where the allowable stress values come from."
domain: [asme, materials]
published: 2026-11-01
updated: 2026-11-01
checked: 2026-11-01
sources:
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section II, Parts A to D)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
---

## The four Parts

| Part | Contents | Typical specifications |
|---|---|---|
| A | Ferrous material specifications | SA-516 plate, SA-106 pipe, SA-105 forgings, SA-240 stainless plate |
| B | Nonferrous material specifications | SB-168 nickel alloy plate, SB-209 aluminum plate |
| C | Welding rods, electrodes and filler metals | SFA-5.1 (carbon steel electrodes such as E7018), SFA-5.18 (GMAW and GTAW wires) |
| D | Properties | Allowable stresses, tensile and yield strength at temperature, external pressure charts, physical properties |

Part D comes in customary (psi, °F) and metric volumes. The [shell thickness](/asme/shell-thickness) and [hydrostatic test](/asme/hydrostatic-test) calculators both need its allowable stress values, which is why those tools ask you for them rather than supply them: the tables are ASME's, and they change between editions.

The specifications a boiler or vessel shop buys most, with P-numbers and their IBR 2026 status, are in the [materials list](/asme/items).

## SA vs A

ASTM writes most of the material standards; ASME adopts them into Section II, adds an "S" (SA, SB) and sometimes adds requirements. Section II prints each adopted specification with a note of which ASTM edition it matches and any differences.

What that means in practice:

- A pressure part must be certified to the SA specification (or to an ASTM edition the Code accepts as identical), not just "A516".
- Mills therefore often **dual-certify**: the MTR reads "SA-516/A516 Grade 70", stating it meets both.
- If an MTR shows only the ASTM number, the [MTR guide](/asme/mtr) explains what the Code lets you do about it, and the Inspector decides whether it is acceptable.

## Allowable stress in Part D

Section VIII Division 1 and Section I take their maximum allowable stresses from Part D tables (Table 1A for ferrous materials, Table 1B for nonferrous), by specification, grade and temperature. Division 2 has its own, higher, values because of its smaller design margin; see [Section VIII Division 1 vs 2](/asme/section-viii).

## Welding consumables

Part C's SFA specifications classify filler metals; Section IX then groups them by F-number and A-number for qualification. See [P-numbers, F-numbers and A-numbers](/asme/p-numbers). In India, IBR 2026 classifies covered electrodes by these same SFA specifications or AWS ones; see [ASME vs IBR 2026](/asme/asme-vs-ibr).
