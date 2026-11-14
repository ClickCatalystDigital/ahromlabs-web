---
kind: asme
slug: inspection-and-test-plan
group: quality
title: "Inspection and test plan (ITP) for pressure vessels"
related:
  - /asme/quality-control-manual
  - /asme/authorized-inspector
  - /systems/hold-point
  - /manufacturing/wip-tracking
  - /industries/boiler-pressure-vessel-manufacturing
  - /asme/hardness-and-pmi
question: "What is an inspection and test plan (ITP) for a pressure vessel?"
answer: >
  An inspection and test plan (ITP) lists every inspection and test on a job in the order the work happens, with
  the document each is checked against, the acceptance criteria, the record it produces, and who must review,
  witness or release it: the shop's QC, the Authorized Inspector and the customer. Hold points stop the work until
  the named party signs; witness points need notice; review points are document checks.
description: "Pressure vessel and heat exchanger ITPs: hold, witness, review and surveillance points, the columns, a worked example, and enforcing holds."
domain: [asme, quality, inspection]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
sources:
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section VIII, Division 1, UG-90 and Mandatory Appendix 10)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
  - title: "Boiler and Pressure Vessel Certificates of Authorization and the Certification Mark: Informational Handbook (BPV-GUI-03)"
    publisher: ASME
    url: https://www.asme.org/getmedia/cb8f63c5-3aa2-45ee-a2d1-b999d37733f7/bpv-gui-03-informational-handbook_1.pdf
    date: 2023-05-12
checks:
  - reg: ASME BPV-GUI-03, section 3
    doc: asme-handbook
    quote: "It is expected that fabrication functions be demonstrated using typical Code work."
  - reg: ASME BPV-GUI-03, section 3
    doc: asme-handbook
    quote: "a demonstration of implementation of the program"
---

## What is an inspection and test plan?

An inspection and test plan (ITP, sometimes a quality plan or inspection traveler) is the job's list of every
inspection and test, in fabrication order, with who checks each one and what proves it was done. It turns the
[quality control manual](/asme/quality-control-manual)'s general promises into one job's steps: this shell, these
welds, this hydro test.

The ASME Code doesn't use the term "ITP". What it does require is an examination and inspection program in the
shop's quality control system (Section VIII Division 1, Mandatory Appendix 10), and inspections by the
[Authorized Inspector](/asme/authorized-inspector) during construction (UG-90). Most purchasers of Code vessels,
heat exchangers and boilers then ask for a job ITP with the bid or the purchase order, so their own inspector can mark
the points they want to see.

## What are hold, witness, review and surveillance points?

They are industry conventions, written on the ITP, for how much a party is involved at a step. ASME doesn't define
them; the purchase order or the shop's procedure does.

| Code on the ITP | Meaning | What happens on the floor |
|---|---|---|
| **H**, hold | Work may not go past this step until the named party has inspected and released it | The next step is blocked; nobody starts it, whatever the schedule says |
| **W**, witness | The party is given notice and may attend; if they don't come within the agreed notice, work goes on | The notice is recorded, then the step proceeds |
| **R**, review | The party reviews records (an MTR, a WPS, an NDE report), not the work itself | Documents are sent or opened; work isn't held unless the review fails |
| **S**, surveillance | The party may look in at any time without notice | No stop, no notice |

A step can carry a different code for each party: hold for shop QC, witness for the customer, review for the
Inspector. That is why an ITP has one column per party.

## What columns does an ITP need?

| Column | Example |
|---|---|
| Step number | 4.2 |
| Activity | RT of long seam L1 |
| Reference document | Drawing 1005-02 rev B; weld map; WPS-103 |
| Acceptance criteria | The Code paragraph or the customer specification, e.g. UW-51 for full radiography |
| Record produced | RT report with film or digital image numbers |
| Shop QC | H |
| Authorized Inspector | R (or the points the Inspector has chosen) |
| Customer or third-party inspector | W |
| Prerequisites | Steps that must pass first, e.g. 4.1 VT of L1 |
| Sign-off | Name, date, result, and the NCR number if it failed |

The prerequisites column is the one paper ITPs leave implicit. It is what makes a failed step stop the right later
steps and not the whole job.

## What does an ITP for a heat exchanger look like?

A made-up shell-and-tube example (an ITP for a real job follows the customer's specification and your manual):

| Step | Activity | QC | AI | Customer |
|---|---|---|---|---|
| 1.1 | Drawing and calculation review | R | R | R |
| 2.1 | Material receipt: plate, tube, forgings against [MTRs](/asme/mtr) | H | R | R |
| 2.2 | Heat number transfer before cutting | H | S | S |
| 3.1 | Shell long seam fit-up | H | S | S |
| 3.2 | Shell long seam welding to WPS, welder stamps recorded | S | S | S |
| 4.1 | VT of long seam | H | S | S |
| 4.2 | RT or UT of long seam | H | R | R |
| 5.1 | Nozzle fit-up and welding, reinforcement pads | H | S | W |
| 6.1 | Tubesheet drilling and dimensional check | H | S | W |
| 6.2 | Tube-to-tubesheet joints: expansion or welding, leak test | H | W | W |
| 7.1 | [PWHT](/asme/pwht), where required, with the chart | H | R | R |
| 8.1 | [Hydrostatic test](/asme/hydrostatic-test), shell side and tube side | H | H | W |
| 9.1 | Final dimensional and visual | H | H | W |
| 9.2 | Nameplate stamping and [data report](/asme/data-reports) signature | H | H | R |
| 10.1 | Painting, preservation and shipping release | H | S | H |

The Inspector's points in practice: the Inspector decides what to inspect and when, within the shop's program, and
always signs off the final inspection and the pressure test before the data report is certified.

## Who decides the hold points?

Three parties, each for their own reasons:

- **Your quality control manual** says where QC must release work (material receipt, fit-up before welding, NDE
  before closing a joint).
- **The Authorized Inspector** chooses the stages they will inspect, and must be told when the work reaches them.
- **The purchaser** adds witness and hold points through the purchase order or their own inspection specification,
  usually with a notice period. The ITP is often an attachment to the order and signed by both sides before work
  starts.

When the three disagree, the strictest wins at that step. Agree the ITP before material is cut, not after the first
missed witness point.

## How does a failed inspection affect the ITP?

It holds the steps that depend on it until the failure is closed. A failed RT on one seam should stop the work that
would cover it up or rely on it (closing welds, PWHT, the hydro test) while the rest of the vessel goes on. The
failure becomes a [nonconformance report](/asme/nonconformance-report): disposition, repair to an approved repair
WPS, re-examination by the same method, verification, close. The failed result stays on the record next to the pass
that followed it.

## Why do holds get skipped?

Because on paper a hold point is a box on a sheet, and the schedule is louder. The common failures:

- The traveler and the ITP are separate papers, and the floor works from the traveler.
- The customer's witness notice is sent by email and never confirmed, so nobody knows whether the step may proceed.
- A repair is re-examined and passed, but the NCR is still open, and the next step starts anyway.
- The ITP is revised by the customer mid-job and the floor still has the old copy.

An auditor or joint review team will pick a weld and ask to see its step on the ITP, its NDE, the welder and the
release. ASME's handbook expects the shop to show its program working: "It is expected that fabrication functions be
demonstrated using typical Code work."

## Is there a free ITP template?

Yes: an inspection and test plan as [Excel](/asme/itp-template.xlsx), [Word](/asme/itp-template.docx), [PDF](/asme/itp-template.pdf), free under CC BY 4.0, with the columns above
and eight sample steps from drawing review to the data report. The hold, witness and review points in the sample are
an example only: the Inspector, the customer's specification and your quality manual set the real ones.

## How can software enforce an ITP?

By making the hold real at the place work is started, not only on a screen. What to look for:

- The ITP entered once as a template (one per product type), copied to each job, and revisable per job with the
  revision kept.
- Each point carrying its type for each party, its prerequisites and the test it needs.
- Starting a step refused by the server when a prerequisite hasn't passed or an NCR is open, with the reason shown.
- Every attempt kept: a failed inspection stays visible after the re-inspection passes.
- Witness notices recorded with their time, and the customer's release recorded with how it was given.
- Shipping refused while any point or NCR is open.

Our US boiler demo does this. Its ITP templates carry R, W and H points with the points each depends on (an exchanger
template has 60). On job AB-1005, RT failed on weld L1, so the server refuses to start the dependent step, and the
screen says why; the NCR is dispositioned, the repair recorded, the weld re-inspected and passed, verified, closed and
released, after which the step opens. Try it at the [live demo](https://boiler-erp-us.ahromlabs.com/demo) (sample
data) or read [ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing). The
Inspector and the customer don't log in to sign points yet; their releases are recorded by the shop.
