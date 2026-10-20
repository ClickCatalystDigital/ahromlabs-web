---
kind: note
slug: suppliers-quote-on-a-link
title: Suppliers quote on a link, not a login, and see their PO when it's issued
description: How a manufacturer's suppliers quote, see the PO and record dispatch through one private link, while conversations stay on WhatsApp and phone.
answer: >
  At a boiler manufacturer Ahrom Labs built for, each supplier gets one private
  link per request for quotation, sent on WhatsApp or email. They enter their
  rates there with no account to create, see whether they were chosen, then
  download the PO and record each dispatch with its LR number and photos. Stores
  sees the goods as on the way before the truck arrives.
domain: [procurement, manufacturing, workflow]
evidence:
  - metric: what a supplier needs to quote
    value: the link — no login, no account, no app
  - metric: how the link is sent
    value: WhatsApp, email or copied, from the RFQ screen; conversations stay where they already happen
  - metric: after a quote arrives
    value: the buyer who raised the RFQ is alerted; quotes compared side by side; choosing one drafts the PO
  - metric: after the PO is issued
    value: the same link shows the PO copy and a form to record each dispatch (lines and quantities, transporter, vehicle, LR number, up to 3 photos or PDFs)
  - metric: what Stores sees
    value: the PO line marked On the way, with the LR number and transporter, before the goods arrive
published: 2026-10-20
updated: 2026-10-20
---

Buying for a boiler means hundreds of lines (plates, tubes, valves, fittings), each quoted by two or three suppliers. At one boiler and pressure-vessel manufacturer, that used to mean quotes arriving as WhatsApp photos, PDFs and phone calls, typed into a spreadsheet by the buyer to compare them, and then a round of calls to ask whether the material had left. The operations system Ahrom Labs built changed where the numbers land, not how people talk.

## Why a link and not a supplier portal?

Suppliers won't create an account and remember a password for every customer they sell to. A portal they have to log in to stays empty. So each supplier gets a private link per request for quotation. The buyer picks the lines and the suppliers, and the system sends each supplier their own link by WhatsApp or email, or the buyer copies it into a chat. The supplier opens it on their phone, enters a rate and delivery date per line, and submits. Nothing to install, nothing to sign up for.

Conversations stay where they already happen. The buyer still calls and still messages on WhatsApp. The system is built around the way this manufacturer already works with its suppliers, not the other way round. What changes is that the rates arrive as data, against the right line, instead of in a photo.

## What happens when quotes come in?

The buyer who raised the request is alerted as each one arrives. Procurement sees the quotes for each line side by side and picks a supplier. Picking one drafts the purchase order, so nothing is typed twice. A request can be edited after it's sent: suppliers added, a supplier who hasn't quoted removed, a line taken out.

## What does the supplier see after that?

Their link tells them whether they were chosen. Once the PO is issued, the same link shows their copy of the PO as a PDF and a form to record each dispatch: which lines and how much are on the truck (part shipments allowed, never more than is left), the transporter, vehicle, LR number and date, and up to three photos or PDFs of the bill or the loaded truck.

## What does the factory get from that?

Stores and Procurement are alerted when a supplier dispatches. The lines move to "in transit", and on the Stores receiving screen they show "On the way" with the LR number, transporter and a tracking link where one exists. When the truck arrives, Stores receives against lines it already knows are coming. Once goods have been received from a dispatch, the supplier can no longer change it, so the record of what was sent matches what came in.

## Boundary

Live tracking of the truck isn't part of this: the system stores the carrier's details, not its location. Suppliers can't see other suppliers' rates, other POs or anything beyond their own link. The same manufacturer's own customers follow their orders through [a portal of their own](/notes/customer-portal-one-order-every-department).
