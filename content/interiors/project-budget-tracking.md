---
kind: interiors
slug: project-budget-tracking
group: projects
title: "Interior design project budget vs client approval"
metaTitle: "Interior design project budget: track it against approval"
related:
  - /interiors/purchase-orders-and-procurement
  - /interiors/how-to-charge-for-interior-design
  - /systems/job-costing
  - /systems/change-order
  - /services/operational-intelligence
question: "How do interior designers track a project budget against what the client approved?"
answer: >
  Keep four numbers per room: the client's budget, what the client has approved, what is on order, and what has been
  invoiced. The proposal is the first working budget; every revision or added item changes the approved figure, and
  only approved items are ordered. On a $60,000 living and dining budget, a first proposal at $66,500 is brought back
  to $59,700 by dropping one rug, and that approved figure, not the first draft, is what orders and invoices are
  checked against.
description: "Track an interior design budget room by room: client budget, approved, on order, invoiced, worked on a $60,000 budget, with what to check in any software."
domain: [interiors, procurement]
published: 2026-11-07
updated: 2026-11-07
checked: 2026-11-07
sources:
  - title: "Proposal Confidence vs. Confusion: How Interior Designers Can Get It Right"
    publisher: Studio Designer
    url: https://www.studiodesigner.com/blog/proposal-confidence-vs-confusion-how-interior-designers-can-get-it-right/
    date: "2026-11-07"
  - title: Costs and Fees
    publisher: ASID Minnesota Chapter
    url: https://mn.asid.org/costs
    date: "2026-11-07"
  - title: Purchase orders for interior designers
    publisher: Programa
    url: https://programa.design/features/purchase-orders-for-interior-designers
    date: "2026-11-07"
  - title: QuickBooks Online pricing
    publisher: Intuit QuickBooks
    url: https://quickbooks.intuit.com/pricing/
    date: "2026-11-06"
checks:
  - reg: Studio Designer, the proposal as the first budget
    doc: sd-proposal
    quote: "For most firms, it also doubles as the project’s first working budget."
  - reg: Studio Designer, scoping a proposal
    doc: sd-proposal
    quote: "Scope a proposal to an entire project, a single room, or a specific phase"
  - reg: ASID, the client's budget
    doc: asid-mn
    quote: "Only you can decide what a reasonable budget for your project is."
  - reg: ASID, what raises the cost
    doc: asid-mn
    quote: "will significantly increase the cost of your project, as will requesting changes mid-project or making excessive demands on the designer’s time."
  - reg: ASID, options when the quoted cost is a concern
    doc: asid-mn
    quote: "If you are concerned about the quoted cost of furniture or furnishings, ask the designer to provide you with a list of options."
  - reg: Programa, client accepts or rejects products
    doc: programa-po
    quote: "Ask for clients to accept or reject products and projects"
  - reg: Intuit, Plus plan features
    doc: qbo-pricing
    quote: "Plan budgets Track project profitability"
---

## What should an interior design budget track?

Four numbers per room, each with a date: the client's budget, the amount the client has approved, the amount on order
with vendors, and the amount invoiced. A spreadsheet usually holds only the first two, which is why the surprise comes
when the last invoice goes out. Keeping all four per room shows, at any point, how much of the budget is left to
spend and how much has been spent without the client's sign-off.

| Number | Comes from | Changes when |
|---|---|---|
| Budget | The client, at the start | The client agrees a new figure |
| Approved | The proposal lines the client signed off | An item is approved, removed or revised |
| On order | Purchase orders placed, at the client's price | A PO is placed, changed or cancelled |
| Invoiced | Product invoices sent | An invoice goes out |

## Is the proposal the budget?

The proposal is the first working budget, and it should be kept as one. Studio Designer says that for most firms the
proposal doubles as the project's first working budget, and that it can be scoped to a whole project, a single room
or a phase. From then on, every change is a new version of it, never an edit over the old one, so the client and the
firm can both see what was agreed and when.

ASID's chapter, writing for clients, puts the budget in the client's hands (only the client can decide what is
reasonable) and names what pushes it up: custom furniture, structural changes, and changes requested mid-project. It
also tells clients worried about the quoted cost of furnishings to ask the designer for a list of options. A budget
that records options and their effect on the total answers that request in minutes.

## How does a budget move from first proposal to delivery?

A made-up living and dining project, with a $60,000 product budget, priced at the client's sell price:

| Room | Budget | Proposal 1 | Approved (proposal 2) | On order | Invoiced |
|---|---|---|---|---|---|
| Living | $36,000 | $41,800 | $35,000 (rug dropped, −$6,800) | $35,000 | $17,500 |
| Dining | $24,000 | $24,700 | $24,700 | $22,300 | $11,150 |
| **Total** | **$60,000** | **$66,500** | **$59,700** | **$57,300** | **$28,650** |

Reading it: proposal 1 was $6,500 over budget; the client dropped the living-room rug and approved $59,700, $300 under
budget. The dining room is $700 over its own line but the project is under, which the client accepted when approving.
$2,400 of approved dining items (a pair of lamps still being chosen) is not yet on order. Invoiced is 50% of what is on
order, the product deposit. If a PO is ever placed for an item that is not approved, "on order" exceeds "approved"
for that room, and the system should stop it before the PO goes.

## How should changes and added items be handled?

As a change to the approved figure, signed off before anything is ordered. A client who adds an ottoman mid-project
is approving a new line; a vendor price increase between proposal and order is a revised line the client should see.
Both should go through the same approval as the original proposal, and the budget table should show the approved
figure moving with a date and a reason. In construction, the same discipline is called a
[change order](/systems/change-order). Platforms that let the client accept or reject products online, as Programa
describes, make the approval a record instead of an email.

## How do you know if the project made money?

Compare, per project, what was billed against what it cost: product at net cost, freight, warehouse and installation,
and design hours at their cost. The budget tells the client what they spend; [job costing](/systems/job-costing) tells
the firm what it earned. On the example above, if the $59,700 of product was priced at a 35% markup, its net cost is
$59,700 ÷ 1.35 = $44,222, and the $15,478 difference has to pay for the purchasing work and the freight the firm
didn't charge. [How to charge for interior design](/interiors/how-to-charge-for-interior-design) works markup and
margin through, and [job costing for custom furniture shops](/interiors/custom-furniture-job-costing) does the same for
pieces a firm makes itself.

QuickBooks Online Plus lists budgets and project profitability among its features, at the level of the books. It has no
rooms, no approval, and no idea which proposal line a bill belongs to, so the budget-against-approval view lives in
the design system.

## What should budget software do for a design firm?

When comparing systems, check that it can:

- Hold the **client's budget per room or phase**, and the approved, on-order and invoiced figures beside it.
- Keep **every proposal version**, with what changed between them and the total's effect.
- Record **client approval per item**, with the date, and refuse a PO for an unapproved item.
- Show **options** (a cheaper fabric, a different table) and their effect on the total without changing the approved
  figure until chosen.
- Flag **vendor price changes** between proposal and order for the client's approval.
- Report **profit per project**: billed against net cost, freight, installation and hours.

## Does your demo do this?

Partly. In our [design studio demo](https://interiors-erp-us.ahromlabs.com/demo) a quote is built room by room, its PDF
shows a subtotal per room, and a revision keeps the quote number while the earlier version is kept as superseded; the
quote's past rates per item show what the studio charged before. Vendor POs can be linked to the project, and the
demo's assistant answers whether a project made money: billed, minus vendor materials and estimated shop labor. A
budget per room, client approval of single items, a PO check against approval, and option lines are what we'd build;
[purchase orders and procurement](/interiors/purchase-orders-and-procurement) lists what its PO side does today.
