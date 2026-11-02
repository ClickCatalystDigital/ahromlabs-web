---
kind: manufacturing
slug: production-schedule-template
group: planning
title: "Free job shop production schedule template (Excel)"
question: "Is there a free production scheduling template in Excel for a job shop?"
answer: >
  Yes. This free Excel template plans a job shop by machine: list each job's operations in routing order with
  their hours and a planned day, and it flags any operation planned after the job's due date or before its
  previous operation, and shows the hours booked on each machine each day in red when they exceed that
  machine's shift. It suits up to a few dozen open jobs and one planner; past that, use scheduling software.
description: "A free Excel production schedule template for job shops: routings by machine, planned days, due-date checks and daily machine load against shift hours."
domain: [manufacturing, scheduling, template]
published: 2026-11-02
updated: 2026-11-02
checked: 2026-11-02
---

## Download

[**Job shop schedule template (Excel)**](/manufacturing/job-shop-schedule-template.xlsx), free under CC BY 4.0. It opens in Excel or Google Sheets and needs no macros.

It is filled in with the six made-up jobs from the [schedule demo](/manufacturing/production-scheduling-software), so you can see it working before you replace them with your own.

## What's in it

| Sheet | What you enter | What it works out |
|---|---|---|
| **Machines** | Each machine or work center and its hours per day (8 for one shift, 16 for two) | Nothing; the other sheets read it |
| **Jobs** | One row per operation, in routing order: job, due date, operation number, machine, hours, planned day | A check on every row: OK, "After due date", or "Before previous operation" |
| **Load** | The first day of the plan | Hours booked per machine for each of the next 20 working days, red where a machine is over its hours |

The machine column is a drop-down from the Machines sheet, so a typo can't create a machine that doesn't exist.

## How to use it

1. List your machines and their shift hours.
2. Enter each open job's operations from its [routing](/systems/routing), with the quoted hours. If your quotes are built from operations and times, copy them; that's also what [job costing](/manufacturing/quickbooks-job-costing) compares against.
3. Give each operation a planned day, earliest due date first, and each operation no earlier than the one before it.
4. Look at the Load sheet. Red means that machine has more hours booked than it has that day: move an operation, split it across days, or add a shift.
5. Fix every "After due date" either by moving work or by telling the customer now, not on the due date.

The sample shows the point of step 4. Three days come up red, and the welding cell on Wednesday is the real problem: 13 hours booked on an 8-hour day, which is why frame job J-103 runs late in the demo. The other two (the laser on Monday, the press brake on Tuesday, 9 hours each) are operations that run over into the next day, which the template counts on the day they start.

## Its limits

A spreadsheet schedule is honest about what it is:

- **One planner.** Two people editing copies of it will drift apart; owners on forums say this is where spreadsheets break.
- **Nothing moves by itself.** When an operation slips, you move the later ones by hand. Scheduling software moves the whole chain ([finite capacity](/systems#finite-capacity-scheduling)).
- **It doesn't know what's finished.** Progress has to be typed in; without it the plan drifts from the floor. That's what [WIP tracking](/manufacturing/wip-tracking) fixes.
- **Hours land on one day.** An operation's hours all count on its planned day, so long operations show as an overload; split them into one row per day if that matters.

When those limits cost you late jobs every week, read [what production scheduling software does](/manufacturing/production-scheduling-software) and try the demo with your own jobs.
