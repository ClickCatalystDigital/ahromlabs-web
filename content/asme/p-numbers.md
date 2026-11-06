---
kind: asme
slug: p-numbers
group: welding
title: "P-numbers, F-numbers and A-numbers in ASME Section IX"
related:
  - /asme/section-ii
  - /asme/essential-variables
  - /systems/heat-number
  - /notes/plate-remnants-back-into-stock
  - /services/material-traceability
question: "What is a P-number in welding?"
answer: >
  A P-number groups base metals with similar welding behaviour, so a procedure or welder test on one covers the
  others in the group: P-No. 1 is carbon steel, P-No. 8 austenitic stainless. F-numbers group filler metals by
  usability, such as F-4 for low-hydrogen electrodes like E7018, and A-numbers group steel weld metal by
  chemistry.
description: "ASME Section IX P-numbers, Group numbers, F-numbers and A-numbers explained, with common materials and electrodes in each and what they mean for a PQR or WPQ."
domain: [asme, welding, materials]
published: 2026-11-01
updated: 2026-11-06
checked: 2026-11-06
sources:
  - title: "BPVC Section IX: Welding, Brazing, and Fusing Qualifications (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-ix-bpvc-section-ix-welding-brazing-fusing-qualifications
    date: 2025-07-01
  - title: "Required Code Books (Section II Part C for welding)"
    publisher: ASME
    url: https://www.asme.org/certification-accreditation/ASME-Certification-Process/Required-Code-Books
    date: 2026-11-05
  - title: "ASME Data Report Forms (Section IX suggested formats)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/publications-information/asme-data-report-forms
    date: 2026-11-05
checks:
  - reg: ASME Required Code Books, U and UM certificates
    doc: asme-books
    quote: "BPVC Section II-Materials Part C-Specifications for Welding Rods Electrodes and Filler Metals"
  - reg: ASME Data Report Forms, QW-483
    doc: asme-forms
    quote: "Suggested Format for Procedure Qualification Records (PQR)"
---

## What is a P-number in welding?

A P-number is Section IX's group for base metals that weld alike, so that a procedure qualified on one material
covers the others in its group. There are thousands of material specifications; without grouping, every pairing
would need its own procedure test. Section IX lists the assignments in QW/QB-422, by specification and grade.
Section IX is ASME's paid Code; this guide gives common cases, and the 2025 tables are the authority.

## What are the common P-numbers?

| P-No. | Materials | Examples |
|---|---|---|
| 1 | Carbon and carbon-manganese steels | SA-516 Gr 70, SA-106 Gr B, SA-105 |
| 3 | C–½Mo and low-chromium steels | SA-204, SA-335 P1 |
| 4 | 1–1¼Cr–½Mo steels | SA-387 Gr 11, SA-335 P11 |
| 5A | 2¼Cr–1Mo steels | SA-387 Gr 22, SA-335 P22 |
| 5B | 5Cr to 9Cr steels | SA-335 P5, P9 |
| 7 | Ferritic stainless | SA-240 Type 405, 409, 430 |
| 8 | Austenitic stainless | SA-240 Type 304, 316, 321 |
| 10H | Duplex stainless | SA-240 S31803, S32205 |
| 15E | Creep-strength enhanced ferritic steels | SA-335 P91 |
| 21–26 | Aluminum alloys | SB-209 5083 |
| 31–35 | Copper alloys | SB-171 |
| 41–49 | Nickel alloys | SB-168 Alloy 600, SB-443 Alloy 625 |
| 51–53 | Titanium | SB-265 Grade 2 |

The base metal's specification and grade come from its [MTR](/asme/mtr); see [Section II](/asme/section-ii) for SA
versus ASTM A specifications.

## What P-number is SA-516 Grade 70?

P-No. 1, Group 2. SA-516 is the carbon steel plate most pressure vessel and boiler shops buy, and Grade 70 sits in
Group 2 of P-No. 1 with other carbon steels of its strength. Check the grade's line in QW/QB-422 of the edition
you're working to before writing it on a WPS.

## What is a Group number for?

Group numbers split a ferrous P-number by toughness behaviour. They matter only when the construction code requires
impact testing: a change of Group number is then a supplementary essential variable, so a PQR on P-No. 1 Group 1
may not cover Group 2 for impact-tested work. See [essential variables](/asme/essential-variables) and
[impact testing](/asme/impact-testing).

## Do I need a new PQR to weld P-No. 1 to P-No. 8?

Yes. A joint between two different P-numbers is a dissimilar-metal joint and needs a procedure qualified for that
combination (or one the rules let it cover), usually with a nickel alloy or austenitic filler. A PQR for P-No. 1 to
P-No. 1 does not cover it.

## What is an F-number?

An F-number groups filler metals by usability, meaning how hard they are to weld with (QW-432):

| F-No. | Filler | Example |
|---|---|---|
| 1 | Heavy iron-powder steel electrodes | E7024 |
| 2 | Rutile steel electrodes | E6013 |
| 3 | Cellulosic steel electrodes | E6010, E6011 |
| 4 | Low-hydrogen steel electrodes | E7018 |
| 5 | Stainless steel electrodes | E308L-16 |
| 6 | Solid and metal-cored steel wires and rods (GTAW, GMAW, SAW) | ER70S-6 |
| 43 | Nickel alloy filler | ERNiCrMo-3 |

The filler metal specifications themselves (SFA-5.1 for carbon steel covered electrodes, SFA-5.18 for wires and rods)
are in Section II Part C, which ASME lists among the required code books for certificate holders that weld.

## Does an F-4 welder qualify for E6010?

Generally yes within the same process: F-numbers matter most for welders, and a welder qualified with an F-4
electrode is generally also qualified for F-1 to F-3, but not the other way round. Section IX's QW-433 table sets the
exact pairings, including the effect of welding with or without backing, so check it before assigning a welder.

## What is an A-number?

An A-number classifies the chemistry of deposited steel weld metal (QW-442): A-1 carbon steel, A-2 carbon–molybdenum,
up to A-8 austenitic chromium–nickel and others. A change of A-number is a procedure essential variable for most
processes, so a PQR made with a carbon steel filler doesn't cover a chromium–molybdenum one.

## Where should P-, F- and A-numbers be recorded?

On every WPS and PQR: ASME's suggested PQR format (QW-483) has fields for them, and reviewers check them first. Check
a material's P-number in the current edition, since new materials are added and occasionally regrouped. The
documents themselves are explained in [WPS vs PQR vs WPQ](/asme/wps-pqr-wpq).

## How does this connect to material traceability?

The P-number on a WPS is only as good as the record that says which plate is in which seam. A shop that keeps each
piece's heat number when plate is cut can show which specification, grade and P-number went into every weld; see
[MTRs and heat numbers](/asme/mtr). Our US boiler demo prints each WPS with its P-number range (for example P-No. 1
to P-No. 1) next to MTRs by heat number in the job's ASME record package.
