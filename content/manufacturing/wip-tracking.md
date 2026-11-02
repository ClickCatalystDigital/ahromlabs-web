---
kind: manufacturing
slug: wip-tracking
group: planning
title: "WIP tracking with barcoded job travelers"
question: "How do you track work in progress on a shop floor?"
answer: >
  Give every job a traveler with a barcode, list its operations in order, and have operators scan the job at
  each operation's start and finish, with the good and scrapped quantities. That one habit shows where every
  job is, what's queued in front of each machine, the actual hours for job costing, and the value of work in
  progress for the books. Fixed scan stations work better than tablets on most shop floors.
description: "How to track work in progress (WIP) in a job shop: travelers, scan points, a work order example, stations vs tablets, getting operators to scan."
domain: [manufacturing, wip, shop-floor]
published: 2026-11-02
updated: 2026-11-02
checked: 2026-11-02
sources:
  - title: Paperless (or less paper) job tracking and routing, job shop specific (forum discussion)
    publisher: Practical Machinist
    url: https://www.practicalmachinist.com/forum/threads/paperless-or-less-paper-job-tracking-routing-job-shop-specific.327437/
    date: 2026-11-02
  - title: Computers and tablets on the shop floor (forum discussion)
    publisher: Practical Machinist
    url: https://www.practicalmachinist.com/forum/threads/computers-tablets-on-the-shop-floor.322887/
    date: 2026-11-02
---

## What WIP tracking records

[Work in progress](/systems/work-in-progress) is every job that has started and not shipped. Tracking it means recording a small set of events, always against a job and an operation:

| Event | Who records it | What it gives you |
|---|---|---|
| Material issued to the job | Stores | Stock leaves the shelf and becomes WIP cost |
| Operation started | Operator | Where the job is; queue time before it |
| Operation finished, with good and scrapped quantity | Operator | Actual run time and scrap per operation |
| Inspection passed or held | Quality | Whether it can move on |
| Job finished and packed | Shipping | WIP becomes finished goods, ready to invoice |

Each scan moves the job from one state to the next ([state transitions](/systems#state-transition)), so the system can refuse impossible moves, such as finishing an operation that never started or shipping a job still waiting for inspection.

## A work order example

The [job traveler](/systems#job-traveler) is the work order as it travels with the parts. A made-up example for 200 steel brackets:

| Op | Operation | Machine | Setup (h) | Run (min each) | Started | Finished | Good | Scrap |
|---|---|---|---:|---:|---|---|---:|---:|
| 10 | Laser cut blanks | Laser | 0.5 | 1.0 | Tue 07:10 | Tue 11:05 | 208 | 0 |
| 20 | Bend, two flanges | Press brake | 1.0 | 1.5 | Tue 12:30 | Wed 09:40 | 200 | 8 |
| 30 | Weld gusset | Weld cell | 0.5 | 3.0 | Wed 10:15 | | | |
| 40 | Inspect, first and last piece | Quality | | | | | | |
| 50 | Powder coat | Outside vendor | | | | | | |

The header carries the job number (and its barcode), customer, part number and revision, quantity, due date, material with heat or lot number, and the drawing. Times and quantities come from scans, not handwriting. The quoted setup and run times on each line are what [job costing](/manufacturing/quickbooks-job-costing) compares the actual times against.

## Scan stations or tablets

Owners discussing this on Practical Machinist land in roughly the same place:

- **Fixed stations** (a screen and scanner at each work center, or one per area) survive coolant and dust, don't get dropped or walk off, and stay on a wired network.
- **Tablets** are convenient and have a camera that reads barcodes, but touchscreens get dirty, they're dropped or misplaced, and slow Wi-Fi in a metal building makes every scan a wait.
- **Phones** work for stores and shipping, where people move around anyway.

A common setup: a barcode on the paper traveler, a cheap scanner at each station, phones for stores.

## Getting operators to scan

Software is the easy part. What makes it stick, from shops that have done it:

- **One scan, not a form.** Scan the job, scan your badge, type a quantity. Anything longer gets skipped.
- **Tie it to pay.** When the same scans fill timesheets, people scan, because it pays them.
- **Say what it's for.** Scanning can feel like surveillance; it lands better framed as "so nobody has to walk the floor to find a job".
- **Watch for gaming**, such as closing an operation early. Compare scans with the schedule and look at outliers, not everyone.
- **Do it daily.** Time recorded at the end of the day, before clocking out, is close enough; time recorded at the end of the week is fiction.

## When it pays off

One owner on Practical Machinist puts the break-even around seven to ten people. Below that, the owner can see every job from the office door, and manual counts in QuickBooks may be enough. Above it, nobody can, and WIP tracking is what makes a [schedule](/manufacturing/production-scheduling-software) trustworthy: the plan knows what has actually finished. The accounting side matters too: WIP is an asset on the balance sheet, which QuickBooks Online doesn't hold as a stage of its own ([QuickBooks Online inventory](/manufacturing/quickbooks-online-inventory)).
