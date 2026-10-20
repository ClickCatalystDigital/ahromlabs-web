---
kind: note
slug: customer-portal-one-order-every-department
title: "What a customer sees: one boiler order through every department"
description: How a manufacturer's customers follow their own order, approve drawings and download documents, from the same records the factory works in.
answer: >
  At a boiler manufacturer Ahrom Labs built for, each customer gets a login that
  shows their orders as nine plain-language stages, from Order Received to
  Commissioning, worked out from the same records each department already keeps.
  Customers approve drawings, upload their own, download QC certificates, packing
  lists and invoices, and request quotes, without phoning anyone to ask.
domain: [customer-experience, manufacturing, workflow]
patterns: [compute-blockers-on-read]
evidence:
  - metric: stages a customer sees
    value: 9 — Order Received, Design & Engineering, Material Procurement, Manufacturing, Quality Testing, Documentation, Packing, Site Installation, Commissioning
  - metric: where each stage's status comes from
    value: the department's own records (job card stages, QC sign-off, documents shared, packing lists dispatched), never a status someone types for the customer
  - metric: what a customer can do
    value: approve drawings, upload their own drawings, download QC certificates, packing lists and invoices, request a quote from the product range
  - metric: what a customer never sees
    value: other customers' orders, notes between departments, internal costs
  - metric: also running at
    value: LS Technologies — each line of a customer PO with its status and progress, no stock figures, suppliers or costs
published: 2026-10-20
updated: 2026-10-20
---

A customer who has ordered a boiler waits months for it, and in that time they ring the sales engineer to ask where it is. The sales engineer rings Production, Production checks with Stores, and the answer comes back a day later, already out of date. At one boiler and pressure-vessel manufacturer, the operations system Ahrom Labs built now answers that question directly, to the customer, from the same records the factory works in.

## What does the customer actually see?

Each customer company gets one login, and a My Orders page with every order they have placed. Opening an order shows nine stages in the customer's language, not the factory's: Order Received, Design & Engineering, Material Procurement, Manufacturing, Quality Testing, Documentation, Packing, Site Installation and Commissioning. Each stage shows whether it's done, in progress or not started, with the overall percentage and the expected dispatch date. An "About your order" button explains each stage in plain words.

Documents sit under the stage they belong to: drawings under Design & Engineering, test certificates under Quality Testing, packing lists under Packing. Invoices sit in their own Billing section, because an invoice can be raised at booking, midway or at dispatch, and pinning it to one stage would be made up.

## Where does the status come from?

Nobody types a status for the customer. Each stage reads the department's own work: Manufacturing is done when the job card stages are finished, Quality Testing when QC has signed the same stages off, Documentation when every statutory document is complete and shared, Packing when the packing lists have left. If Production is behind, the portal is behind too. That's the point: the customer sees the truth, and the factory doesn't keep a second, friendlier version of it.

When part of an order has shipped and the rest hasn't, the portal says so ("14 of 168 items sent") with a list the customer can download.

## What can the customer do, not just read?

Drawings are shared by the Design Head one at a time, and only when they're ready. The customer approves each one, and their name and the date appear on it. When every shared drawing is approved, the Design Approval milestone completes by itself. Customers can also upload their own drawings and site layouts, so they don't arrive by email and get lost.

Every document downloads as the same PDF the factory files. The nameplate on each finished unit carries a QR sticker that opens the order in the portal, so years later the documents are still one scan away. Signed-in customers can also browse the product range and request a quote, which reaches Sales as an enquiry, linked to the customer.

## What stays private?

A customer only ever sees their own orders. Every page and download checks that the order belongs to that login. Nothing internal is shown: no internal costs, no notes between departments, no stock figures. Logins are created by Sales for each customer; the customer sets their own password from a one-time link, so no password is ever emailed.

## Is this only for manufacturers?

The same idea runs at LS Technologies, an electronics component trader. Their customers see each line of a purchase order with its status (ordered, reserved, in procurement, dispatched) and a progress bar, without seeing stock figures, suppliers or costs. A partner store that holds LS stock buys through the same portal; [how LS tracks and reserves that stock](/notes/reels-boxes-and-two-stores) is its own note.

## Boundary

The portal is read-mostly. Customers approve, upload and request quotes; they don't edit orders, prices or dates. Status emails go out through the manufacturer's own mailbox, which they switch on per customer.
