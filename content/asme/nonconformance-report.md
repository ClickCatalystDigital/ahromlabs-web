---
kind: asme
slug: nonconformance-report
group: quality
title: "Nonconformance reports (NCR) in an ASME fabrication shop"
related:
  - /asme/quality-control-manual
  - /asme/national-board-registration
  - /systems/nonconformance-report
  - /services/material-traceability
  - /industries/boiler-pressure-vessel-manufacturing
question: "What is an NCR in pressure vessel fabrication?"
answer: >
  A nonconformance report (NCR) records anything that doesn't meet the Code, the drawing or the purchase order:
  a failed weld, wrong material, a dimension out of tolerance. It holds the item, then records the disposition
  (repair, rework, use as is, reject), who approved it, the repair, the re-inspection and the close. For a Code
  item, use as is is only possible when the item still meets the Code.
description: "NCRs in ASME shops: what counts, dispositions (repair, rework, use as is, reject), weld repair and re-examination, R-1 after stamping, closing."
domain: [asme, quality, inspection]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
sources:
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section VIII, Division 1, UW-51, UW-52 and Mandatory Appendix 10)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
  - title: "National Board Inspection Code (NBIC)"
    publisher: The National Board of Boiler and Pressure Vessel Inspectors
    url: https://www.nationalboard.org/Index.aspx?pageID=4
    date: 2026-11-06
  - title: "R Certificate of Authorization"
    publisher: The National Board of Boiler and Pressure Vessel Inspectors
    url: https://www.nationalboard.org/Index.aspx?pageID=115&ID=160
    date: 2026-11-05
  - title: "NBIC report forms"
    publisher: The National Board of Boiler and Pressure Vessel Inspectors
    url: https://www.nationalboard.org/Index.aspx?pageID=113&ID=171
    date: 2026-11-06
checks:
  - reg: National Board, NBIC page, Part 3
    doc: nb-nbic
    quote: "This Part provides information and guidance to perform, verify, and document acceptable repairs or alterations to pressure-retaining items regardless of code of construction."
  - reg: National Board, R Certificate of Authorization page
    doc: nb-r-stamp
    quote: "The National Board offers the Certificate of Authorization and R symbol stamp for the repair and/or alteration of boilers, pressure vessels, and other pressure-retaining items."
  - reg: National Board, NBIC report forms page
    doc: nb-forms
    quote: "NB-66, Report of Repair"
---

## What is a nonconformance report?

A nonconformance report (NCR) is the record of something that doesn't meet a requirement, from the moment it is
found to the moment it is closed. In a pressure vessel shop the requirement is the Code, the drawing, the
purchaser's specification or the shop's own procedure: an RT that shows porosity beyond the limit, plate with a heat
number that doesn't match its [MTR](/asme/mtr), a nozzle out of position, a hydro test gauge out of calibration.

The Code doesn't prescribe the form. It requires the shop's quality control system to have a way of correcting
nonconformities that the [Authorized Inspector](/asme/authorized-inspector) agrees to (Section VIII Division 1,
Mandatory Appendix 10), and the shop's [quality control manual](/asme/quality-control-manual) describes it.

## What goes on an NCR?

| Field | Why |
|---|---|
| NCR number, job, part, weld or heat number | So the NCR can be found from the part and the part from the NCR |
| What was found, against which requirement | The drawing, Code paragraph or specification it fails |
| Who found it, when, at which [ITP](/asme/inspection-and-test-plan) step | Ties the failure to the inspection record |
| Hold | The item is tagged and the steps that depend on it are stopped |
| Disposition | Repair, rework, use as is, reject or return to supplier, with the reason |
| Approval of the disposition | QC manager; the Inspector where the manual says so; the purchaser where their order says so |
| Repair procedure | E.g. the repair WPS and the welder |
| Re-inspection | The new result, by the same method and criteria |
| Verification and close | Who checked the repair was done as dispositioned, and when the NCR closed |
| Cause and corrective action | Why it happened, and what stops it happening again |

## What are the NCR dispositions?

| Disposition | What it means | When it is allowed on a Code item |
|---|---|---|
| Rework | Make it conform to the original requirement (re-machine, re-fit) | Yes; re-inspect to the original criteria |
| Repair | Make it acceptable by an approved method that differs from the original, e.g. a weld repair | Yes, to a qualified procedure, re-examined |
| Use as is | Accept it unchanged | Only if it still meets the Code, e.g. a recalculation shows the thinner plate still meets the required thickness. A purchaser can waive their own specification, never the Code |
| Reject or scrap | Remove it from the job | Always |
| Return to supplier | Send bought material back | For material that fails receipt; the replacement needs its own MTR |

## How is a failed weld repaired and re-examined?

Remove the defect, re-weld to a qualified WPS (often a separate repair WPS) by a welder qualified for it, and
re-examine by the same method and acceptance criteria. For full radiography, Section VIII Division 1 requires
unacceptable imperfections to be repaired and the repaired area radiographed again (UW-51). Spot radiography adds a
step: when a spot fails, two more spots are taken in the same weld increment, and the results of those decide whether
the increment is repaired or fully radiographed (UW-52). If the vessel was post-weld heat treated or already
hydrotested, check whether the repair needs [PWHT](/asme/pwht) again and a new
[hydrostatic test](/asme/hydrostatic-test); plan on both, and agree it with the Inspector.

Keep the failed result. The NCR, the first report and the re-examination report together show the Inspector what
happened; overwriting the first result is the fastest way to lose an audit.

## Is a repair before stamping the same as an R stamp repair?

No. A repair during construction, before the data report is certified and the item stamped, is part of building it to
the Code and is handled through your own quality control system and NCR. Once a stamped item is in service, repairs
and alterations fall under the National Board Inspection Code (NBIC), whose Part 3 provides guidance "to perform,
verify, and document acceptable repairs or alterations to pressure-retaining items regardless of code of
construction". That work is done by an organization holding the National Board's R certificate and is documented on
Form R-1, the National Board's NB-66 Report of Repair (alterations use R-2). See
[National Board registration and the R stamp](/asme/national-board-registration).

## Who approves a disposition?

The shop's manual names who. Typically the QC manager approves the disposition and verifies the repair; engineering
signs off a use-as-is with its calculation; the Authorized Inspector accepts dispositions affecting Code
requirements; and the purchaser approves anything their order reserves, such as repairs to tube-to-tubesheet joints or
any use-as-is. Write the approval on the NCR, with the name and date, not in an email.

## When is an NCR closed?

When the item meets the requirement again and someone other than the person who did the repair has verified it:
repair done as dispositioned, re-inspection passed, records attached. An NCR that is closed before the
re-inspection passes is a gap an auditor will find. The ITP steps it held only open again after the close.

## What should NCR software do?

- Raise an NCR from the failed inspection itself, carrying the job, part, weld and heat number.
- Hold the steps that depend on the failed one, enforced by the server, and release them only when the NCR is closed
  and a later inspection has passed.
- Keep dispositions to the people allowed to make them, and record repair, re-inspection, verification and close as
  separate signed steps.
- Keep every attempt; never overwrite the failed one.
- Print the NCR log into the job's [data book](/asme/data-book).

Our US boiler demo runs this loop: on job AB-1005 an RT failed on weld L1 and an NCR was raised; the QC head
dispositions it as a repair to WPS-103R, Production records the repair, QC inspects again (RT pass), verifies and
closes, and only then does the held step open. The failed RT stays on file. Try it at the
[live demo](https://boiler-erp-us.ahromlabs.com/demo) (sample data) or see
[ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing). R-1 reports are not in
it yet.
