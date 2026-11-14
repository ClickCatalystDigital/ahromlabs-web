---
kind: interiors
slug: ffe-specifications
group: projects
title: "FF&E specifications: what goes on a spec sheet and schedule"
related:
  - /interiors/purchase-orders-and-procurement
  - /interiors/project-budget-tracking
  - /interiors/how-to-charge-for-interior-design
  - /systems/cutting-for-approval
  - /industries/interior-design-and-furniture
question: "What goes into an FF&E specification?"
answer: >
  An FF&E (furniture, fixtures and equipment) specification describes each item precisely enough to price, approve,
  order and receive it: a tag and location, manufacturer and model, finish and fabric with COM details, dimensions,
  quantity, lead time, vendor, cost and sell price, and the approvals it needs. The FF&E schedule lists every spec
  on the project, and it drives the proposal, the purchase orders and the budget.
description: "FF&E specifications for interior designers: spec sheet fields, the FF&E schedule, COM and finish approvals, and specs into proposals and orders."
domain: [interiors, procurement, specifications]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
sources:
  - title: "An interior design business model"
    publisher: Design Manager
    url: https://manuals.designmanager.com/manuals/dmpro/an_interior_design_business_model.htm
    date: 2026-11-07
  - title: "Purchase orders for interior designers"
    publisher: Programa
    url: https://programa.design/features/purchase-orders-for-interior-designers
    date: 2026-11-07
checks:
  - reg: Design Manager, business model help page
    doc: dm-model
    quote: "Enter the specifications, which are the goods and services for which you will order for and sell to your client."
  - reg: Programa, purchase orders page
    doc: programa-po
    quote: "Specify it once. Use it everywhere."
---

## What is FF&E?

Furniture, fixtures and equipment: the movable and installed items a design firm selects and often buys for a
client, as distinct from the building's construction. Sofas, beds, lighting, rugs, window treatments, art and
accessories in residential work; workstations, seating and casegoods in commercial and hospitality work. Each item
the firm specifies becomes a line that is priced, approved, ordered, received and installed.

## What goes on an FF&E spec sheet?

| Field | Example |
|---|---|
| Tag and location | LR-03, living room, north wall |
| Item and description | Three-seat sofa, tight back, loose seat cushions |
| Manufacturer, model, catalog page | Maker and style number |
| Dimensions | W 96 × D 38 × H 32 in, seat height 18 in |
| Finish, fabric or COM | Customer's own material: fabric, yardage, repeat, railroaded or up the bolt |
| Quantity and unit | 1 each |
| Vendor and trade account | Who it is ordered from, on which account |
| Cost, markup and sell price | Net cost, the firm's markup, client price |
| Freight, receiving and install | Estimated freight, receiving warehouse fees, delivery |
| Lead time | Quoted weeks from deposit and approvals |
| Approvals | Client approval date; cutting for approval (CFA) or strike-off where needed |
| Image and attachments | Photo, tear sheet, finish sample reference |

Two kinds of field matter later: everything the vendor needs to make the right item (finish, fabric, COM details), and
everything the firm needs to bill and track it (cost, sell, lead time, approval).

## What is an FF&E schedule?

The table of every spec on the project, grouped by room or by category, with status: specified, sent to client,
approved, ordered, acknowledged, shipped, received, installed. It is the designer's working list and the client's
picture of what they are buying. In commercial work it is often a contract document; in residential work it feeds the
proposal.

## How do COM and finish approvals work?

When the client supplies the fabric (customer's own material, COM), the spec carries the yardage the maker needs and
the fabric is shipped to the maker separately; the maker may need to approve it. For a fabric or finish from a dye
lot, a cutting for approval (CFA) or strike-off is sent before the order is released. Each approval is a date on the
spec, and an order released before it is the most common source of the wrong color. See
[cutting for approval](/systems/cutting-for-approval).

## How do specs become proposals and purchase orders?

By entering each item once and reusing it. Design Manager's help describes the order of work: "Enter the
specifications, which are the goods and services for which you will order for and sell to your client", then the
proposal, then purchase orders and vendor deposits. Programa's pitch is the same idea: "Specify it once. Use it
everywhere." The client approves the proposal; the approved lines become purchase orders to each vendor, with the
deposit; acknowledgements, shipping and receiving update the same line. See
[purchase orders and procurement](/interiors/purchase-orders-and-procurement).

## How does the spec connect to the budget?

Each spec's sell price rolls up into the room and project budget the client approved, and its cost into the firm's
margin. When a selection changes, the budget should show the difference before the client approves it, not when the
invoice arrives. See [project budget tracking](/interiors/project-budget-tracking).

## What does an FF&E schedule look like?

A residential example, grouped by room (made-up items):

| Tag | Room | Item | Vendor | Qty | Cost | Sell | Lead time | Status |
|---|---|---|---|---|---|---|---|---|
| LR-01 | Living | Sofa, COM | Workroom A | 1 | $4,200 | $5,880 | 10 weeks | Approved, CFA sent |
| LR-02 | Living | Lounge chair | Vendor B | 2 | $1,150 | $1,610 | 6 weeks | Ordered, acknowledged |
| LR-03 | Living | Rug 9x12 | Vendor C | 1 | $3,600 | $5,040 | 4 weeks | Proposal sent |
| DR-01 | Dining | Table, walnut | Vendor D | 1 | $5,800 | $8,120 | 14 weeks | Back-ordered |
| DR-02 | Dining | Pendant | Vendor E | 2 | $640 | $896 | 3 weeks | Received |

The status column is the one clients and installers care about, and it should change when the purchase order,
acknowledgement or receiving record changes, not when someone remembers to update the sheet.

## What goes wrong between spec and delivery?

- **The vendor builds the wrong finish** because the PO didn't carry the full spec; send the spec with the PO.
- **COM yardage is short** because the maker's requirement was for a plain fabric and the client chose a large
  repeat; ask the maker to confirm yardage for the chosen fabric.
- **Lead times slip** and nobody notices until the install date; ask for acknowledgements with ship dates and chase
  missing ones.
- **Damage on arrival** found weeks later at the receiving warehouse, past the claim deadline; see
  [freight damage claims](/interiors/freight-damage-claims).
- **The client changes their mind after ordering**: the spec should show the vendor's cancellation and restocking
  terms before approval, so the cost of a change is clear.

## What should FF&E software do?

Keep one record per item from selection to installation: the spec fields above, images, approvals, the proposal line,
the purchase order, vendor acknowledgement and deposit, freight, receiving and the client invoice, with the status
visible on a schedule. Our interior design system for Savistar & Saag builds quotes from an item library, tracks
each design project from brief to handover, and catches freight overcharges; see
[software for interior design firms](/industries/interior-design-and-furniture) and
[how to charge for interior design](/interiors/how-to-charge-for-interior-design).
