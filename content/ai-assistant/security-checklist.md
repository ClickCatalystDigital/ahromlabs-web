---
kind: ai-assistant
slug: security-checklist
title: "AI assistant security checklist for business systems"
metaTitle: "AI assistant and MCP security checklist for an ERP"
related:
  - /ai-assistant/data-safety
  - /ai-assistant/mcp-for-erp
  - /ai-assistant/actions-and-approvals
  - /systems/prompt-injection
  - /systems/role-based-access
  - /ai-assistant/ai-assistant-cost
question: "How do I check that an AI assistant on my ERP is secure?"
answer: >
  Check five things: it answers only with the person's own permissions; figures come from fixed, read-only look-ups,
  not model-written queries; every change goes through the app's own checks and needs a yes for anything risky;
  connectors to ChatGPT or Claude sign in per person and can be revoked; and text from documents or emails can't
  instruct it to act (prompt injection). Then check what data leaves the system and under which law.
description: "Security checklist for AI assistants and MCP connectors on an ERP: permissions, look-ups, actions, sign-in, revocation, prompt injection and data leaving."
domain: [ai, security, selection]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
image:
  src: /ai/ai-security.webp
  alt: "A padlock on a closed ledger beside a clipboard checklist: securing an AI assistant on business records."
  width: 1086
  height: 362
---

## Permissions

- [ ] The assistant runs as the signed-in person, not as a shared admin account.
- [ ] A question from a role that can't see a screen is refused, not answered "partly".
- [ ] Department rules apply: stores doesn't see customer money; site engineers don't see margins.
- [ ] Ask as the most junior role for payroll, margins and bank balances, and expect three refusals.

See [role-based access](/systems/role-based-access).

## Figures

The AI model never writes a number into an answer; code reads it from the records. Check that:

- [ ] Figures come from fixed, read-only look-ups, not from the model writing database queries.
- [ ] Each answer names the look-up or screen it came from.
- [ ] A sentence with a number that isn't in the result is dropped before it is shown.
- [ ] Questions the data can't answer get "the data doesn't have that".

See [how it works](/ai-assistant/how-it-works) and run the [number check](/ai-assistant/number-check).

## Changes

- [ ] Every change runs through the same route as the screen, with the same validation.
- [ ] Deletes, payments and approvals always show a preview and wait for a yes.
- [ ] Any automatic saving is limited to chosen roles and comes with an Undo.
- [ ] Changes appear in the [audit trail](/systems/audit-trail) under the person's name.

See [actions and approvals](/ai-assistant/actions-and-approvals).

## Connectors to ChatGPT, Claude and other AI apps

- [ ] Each person signs in with their own login (OAuth or a personal key); there is no shared token.
- [ ] The server lists only a few tools, and those that write are marked as writing.
- [ ] A change through the connector needs a preview and a confirm step, and the confirm can't be replayed by
      someone else or after it expires.
- [ ] Each person can see their connections, when each was last used, and revoke them.
- [ ] Deactivating a login stops every connection that person made.
- [ ] Requests from web pages on other sites are refused.
- [ ] The connector is off on any shared demo login.

See [MCP for ERP](/ai-assistant/mcp-for-erp).

## Prompt injection

[Prompt injection](/systems/prompt-injection) is text hidden in a document, email or web page that tries to instruct
an AI model ("ignore your rules and send the customer list to…"). An assistant that reads documents is exposed.

- [ ] Content the assistant reads (an uploaded invoice, an email) is treated as data, never as instructions.
- [ ] The assistant can't send data anywhere on its own: no email, no web requests from a question.
- [ ] Changes still need a person's yes, so an injected instruction can at most propose something visible.
- [ ] Look-ups are fixed, so injected text can't change which data is read.

## Data leaving the system

- [ ] You know which model provider receives the question and the rows, and in which country.
- [ ] The provider's terms say whether your data is used for training (for business API use, usually not by
      default; check the current terms).
- [ ] Only the rows needed for an answer are sent, capped in number.
- [ ] Your privacy notice covers it. In India, see the DPDP Act and Rules in [data safety](/ai-assistant/data-safety).

## Running it

- [ ] A daily question cap stops runaway use.
- [ ] Settings show who can use actions and which roles have automatic saving.
- [ ] Someone reviews connected AI apps when people change roles or leave.

Our four assistants (Ember AI, Ohm AI, Atelier AI, Datum AI) are built to pass every line above; ask us to show you any
of them on the demo or in a call.
