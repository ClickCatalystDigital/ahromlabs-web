---
kind: ai-assistant
slug: actions-and-approvals
title: "AI assistant actions: what it can change, and what always needs a yes"
metaTitle: "AI assistant actions in an ERP: approvals, Auto and Undo"
related:
  - /ai-assistant/mcp-for-erp
  - /ai-assistant/security-checklist
  - /ai-assistant/how-it-works
  - /systems/human-in-the-loop
  - /systems/audit-trail
question: "Can an AI assistant make changes in my ERP safely?"
answer: >
  Yes, if every change goes through the same checks as the screen and a person approves it. Our assistants prepare a
  change as a card (a preview of exactly what will be saved) and save it only when the person presses Save. An owner
  can switch on Auto for chosen roles, so adds and edits with a clean reverse save at once with a 30-minute Undo;
  deletes, payments and approvals always show the card, and changes from ChatGPT or Claude always ask first.
description: "How an ERP assistant makes changes safely: a preview card, the screen's own checks, Manual or Auto per role, a 30-minute Undo, and what always asks."
domain: [ai, actions, controls]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
---

## What kinds of changes can the assistant make?

Everyday entries that a person would otherwise make on a screen: add an enquiry, log a conversation, add a task,
complete a task, record a site visit, start a project, add a client, raise a request. Each system has its own list,
written as an action registry in the app's code, and every action is one the person could do on screen with their
own login. Across the four systems the registries hold dozens of actions each, labelled by risk:

| Risk | Examples | How it saves |
|---|---|---|
| Create | Add a client, an enquiry, a task, a site visit | Card, or at once under Auto, with Undo |
| Change | Complete a task, update a status, edit a field | Card, or at once under Auto where a clean reverse exists, with Undo |
| Delete | Remove a draft entry | Always the card |
| Money and approvals | Payments, approvals, status moves that post money | Always the card |

## What is a card?

A preview of the change in plain words: which record, which fields, which values, with anything missing marked. The
person reads it and presses Save, edits it, or discards it. Nothing is written until Save. The card is how the
assistant handles "Met the customer today: they want the revised offer by Monday" (a conversation logged and a task
for Monday) without anyone filling two forms.

## What are Manual and Auto?

Two modes in the chat. **Manual** shows a card for every change. **Auto** saves an add or an edit at once, when the
action has a clean reverse, and returns an **Undo** that works for 30 minutes and only for the person who made the
change. The owner decides in Settings whether actions are on at all and which roles may use Auto; the server
decides each time, not the browser. Actions without a clean reverse stay card-only even in Auto.

## Do changes skip the usual checks?

No. Every change runs through the app's own route as the signed-in person, the same as pressing Save on the screen.
So role and department rules, required fields, validations and the [audit trail](/systems/audit-trail) all apply.
The assistant can't do what the person couldn't: a site engineer who can't post a payment on screen can't post one
through the assistant either. Fields are checked again at save time; a card edited in the browser or a request from
an AI app is never trusted on its own.

## What about changes from ChatGPT or Claude?

They always ask, whatever the Auto setting. Through the [MCP connector](/ai-assistant/mcp-for-erp) the AI app calls
`propose_action` and gets a preview and a confirm token; it must show the preview and get the person's yes before
calling `confirm_action`. The token expires in 10 minutes and works only for the person who proposed it.

## Why not let the assistant change anything it wants?

Because a wrong change is worse than a wrong answer. A wrong answer is visible and can be checked against a screen;
a wrong change can sit in the books until month end. Keeping a [person in the loop](/systems/human-in-the-loop) for
anything that moves money, deletes or approves costs a click and removes the risk that matters most.

## How should a buyer test an assistant's actions?

- Ask it to delete something and see whether it asks first.
- Ask as a junior role for something only a manager can do on screen.
- Make a change, then look for it in the audit trail under the person's name.
- Make a change under Auto and press Undo; check the record is back as it was.
- Ask it to post a payment from a vague sentence and see whether it asks for the missing fields.

The [vendor test](/ai-assistant/vendor-test) has these with pass and fail for each.

## Where is this live?

In all four systems we have built: Atelier AI in Designer Ops, Ohm AI in Inventory Ops, Ember AI in SB Ops and Datum
AI in SiteBook. At a client, actions are switched on once the owner approves them in Settings, and the owner picks
which roles may use Auto. The public demos are for questions on sample data; ask us for a walkthrough of the actions.
