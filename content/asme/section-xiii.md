---
kind: asme
slug: section-xiii
group: code
title: "ASME Section XIII: relief valves and overpressure protection"
related:
  - /asme/mawp
  - /asme/stamps
  - /asme/national-board-registration
  - /industries/boiler-pressure-vessel-manufacturing
  - /systems/nbic
question: "What is ASME Section XIII?"
answer: >
  Section XIII, first published in the 2021 Edition, holds the Code's rules for pressure relief devices: relief
  valves, rupture disks and pin devices, how their capacity is certified and how they are marked. The construction
  sections still say when a boiler or vessel needs protection and at what pressure; Section XIII says what the device
  must be. Device makers hold V, HV, UV, UD and related certificates.
description: "ASME Section XIII explained: why relief device rules moved there in 2021, V, HV, UV and UD certificates, capacity tests, and what stays with the designer."
domain: [asme, relief-devices]
published: 2026-11-01
updated: 2026-11-06
checked: 2026-11-06
sources:
  - title: "BPVC Section XIII: Rules for Overpressure Protection (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-xiii-bpvc-section-xiii-rules-overpressure-protection
    date: 2025-07-01
  - title: "Boiler and Pressure Vessel Certification (certificates offered)"
    publisher: ASME
    url: https://www.asme.org/certification-accreditation/Boiler-and-Pressure-Vessel-Certification
    date: 2026-11-05
  - title: "Boiler and Pressure Vessel Certificates of Authorization and the Certification Mark: Informational Handbook (BPV-GUI-03)"
    publisher: ASME
    url: https://www.asme.org/getmedia/cb8f63c5-3aa2-45ee-a2d1-b999d37733f7/bpv-gui-03-informational-handbook_1.pdf
    date: 2023-05-12
  - title: "National Board Inspection Code (NBIC)"
    publisher: The National Board of Boiler and Pressure Vessel Inspectors
    url: https://www.nationalboard.org/Index.aspx?pageID=4
    date: 2026-11-06
checks:
  - reg: ASME Section XIII product page, description
    doc: asme-xiii
    quote: "BPVC Section XIII sets requirements for design, materials, inspection, testing, and marking of pressure relief valves, rupture disks, and related devices."
  - reg: ASME certification page, Section XIII certificates
    doc: asme-bpv-cert
    quote: "UV - Pressure Vessel Pressure Relief Valves"
  - reg: ASME certification page, Section XIII certificates
    doc: asme-bpv-cert
    quote: "UD - Pressure Vessel Pressure Relief Devices"
  - reg: ASME BPV-GUI-03, section 2
    doc: asme-handbook
    quote: "ASME will notify the ASME Designated Organization, The National Board of Boiler and Pressure Vessel Inspectors, to appoint an ASME Designee to conduct the review."
  - reg: ASME BPV-GUI-03, section 2
    doc: asme-handbook
    quote: "it is necessary that all required capacity certification tests be scheduled within ninety days from the date of the review. If the tests are not successfully completed within six months from the date of the review, a new review must be conducted."
  - reg: NBBI NBIC page
    doc: nb-nbic
    quote: "The NBIC is adopted into law by most US and Canadian jurisdictions."
---

## What is ASME Section XIII?

Section XIII, Rules for Overpressure Protection, is the Code's section for pressure relief devices; ASME says it "sets
requirements for design, materials, inspection, testing, and marking of pressure relief valves, rupture disks, and
related devices". It was first published in the 2021 Edition, and the current one is 2025. The Code text is ASME's and
paid; this guide cites paragraphs and your 2025 book is the authority.

## Why did the relief valve rules move to Section XIII?

So that a device maker works to one book. Until 2021 each construction section carried its own relief device rules:
Section VIII Division 1 in its UG-125 series, Sections I and IV in theirs. The 2021 Edition gathered the device rules
into Section XIII, and the construction sections kept the requirement to protect the equipment, pointing to Section
XIII for the device. Older drawings and data sheets still say "UG-125"; on new Division 1 work the vessel side is in
the UG-150 series and the device side in Section XIII.

## Which certificates does Section XIII use?

| Designator | Device |
|---|---|
| V | Boiler pressure relief valves |
| HV | Heating boiler safety valves |
| UV | Pressure vessel pressure relief valves |
| UD | Pressure vessel pressure relief devices (rupture disks and similar nonreclosing devices) |
| UV3, UD3 | High-pressure vessel (Division 3) valves and devices |
| TV, TD | Transport tank valves and devices |

The list is as ASME's [certification page](https://www.asme.org/certification-accreditation/Boiler-and-Pressure-Vessel-Certification) gives it. See [ASME stamps](/asme/stamps) for the full set.

## How does a relief valve maker get certified?

Through a review led by the National Board, not an inspection agency. ASME's handbook says that for these
certificates ASME "will notify the ASME Designated Organization, The National Board of Boiler and Pressure Vessel
Inspectors, to appoint an ASME Designee to conduct the review", and no Authorized Inspection Agency agreement is
needed. The device's relieving capacity must also be certified by test at an ASME-accepted laboratory: the tests must
be scheduled within 90 days of the review and completed within six months, or the review is repeated.

## What stays with the vessel or boiler designer?

The construction section still decides:

- that the vessel or boiler needs protection, and from what (a blocked outlet, a fire, a failed control);
- the set pressure, normally not above the [MAWP](/asme/mawp);
- how far pressure may rise while the device relieves: in Division 1, generally 10% or 3 psi above MAWP for one device, 16% or 4 psi with several, and 21% for fire.

The designer sizes the device for the worst relieving case and specifies it; the device maker certifies its capacity
and marks it.

## Can a vessel be protected without a relief valve?

In defined cases. Division 1 allows overpressure protection by system design, where the vessel can't be
overpressured by the system it sits in, under conditions the Code sets and the owner documents. It is the owner's
responsibility and needs the jurisdiction's acceptance in many states; check your 2025 Division 1 and the
jurisdiction before relying on it.

## Who repairs relief valves in service?

Not a Section XIII certificate holder as such: repair and resetting of valves in service is done under the National
Board's VR program to Part 4 of the National Board Inspection Code, which the National Board says is adopted into law
by most US and Canadian jurisdictions. In-service testing has its own T/O program. See
[National Board registration and the R stamp](/asme/national-board-registration).

## What does our software keep for relief devices?

Our US boiler demo records each boiler's safety valves (size, set pressure, capacity) on its data report layout in
the ASME record package. It doesn't size or certify valves. See
[ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing).
