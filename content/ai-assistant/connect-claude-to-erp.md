---
kind: ai-assistant
slug: connect-claude-to-erp
title: "How to connect Claude to your ERP with a custom connector"
metaTitle: "Connect Claude to your ERP: custom MCP connector setup"
related:
  - /ai-assistant/mcp-for-erp
  - /ai-assistant/connect-chatgpt-to-erp
  - /ai-assistant/voice
  - /ai-assistant/security-checklist
  - /systems/model-context-protocol
question: "How do I connect Claude to my ERP?"
answer: >
  In Claude, add a custom connector with your ERP's MCP address (for our systems, your app's address followed by
  /mcp), then press Connect and sign in to the ERP with your own login. On Team and Enterprise plans an owner adds
  the connector once for the organization and each person connects their own account. After that, ask Claude about
  your business in any chat where the connector is switched on; changes need your approval each time.
description: "Step by step: add your ERP to Claude as a custom MCP connector, sign in as yourself, ask business questions and approve changes. Plans, limits and checks."
domain: [ai, mcp, claude]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
sources:
  - title: "Custom connectors using remote MCP"
    publisher: Anthropic
    url: https://claude.com/docs/connectors/custom
    date: 2026-11-14
image:
  src: /ai/ai-connect-claude.webp
  alt: "A laptop beside a brass key on a ring resting on a closed ledger: signing an AI app in to the ERP as yourself."
  width: 1086
  height: 362
---

## What do I need before I start?

- **The connector address.** For a system we built, it is your app's own address with `/mcp` at the end, for example
  `https://ops.yourcompany.com/mcp`. Your administrator or we give it to you.
- **A login on the ERP** with the access you want Claude to have. Claude can see only what that login sees.
- **Connectors switched on in your company's ERP.** We switch the connector on for a client's system once the client
  approves it; it is off in the public demos.
- **A Claude plan that allows custom connectors.** Anthropic's help pages list which plans can add them and how many;
  check there, as the limits change.

## How do I add the connector in Claude?

Menu names move between versions, so follow Anthropic's current
[custom connector guide](https://claude.com/docs/connectors/custom) if a label differs. The steps are:

1. In Claude, open the connectors settings and choose **Add custom connector**.
2. Give it a name (for example "SB Ops") and paste the connector address ending in `/mcp`.
3. Leave the advanced OAuth fields empty: our systems register Claude automatically.
4. Press **Add**, then **Connect**. Claude opens the ERP's sign-in page.
5. Sign in with your own ERP login and approve the connection.
6. In a chat, switch the connector on from the tools menu.

On Team and Enterprise plans, an owner adds the connector for the organization in the organization settings; each
member then connects with their own ERP login, so everyone gets their own permissions.

Claude connects to the server from Anthropic's cloud, not from your computer, so the ERP must be reachable on the
internet at that address (our hosted systems are).

## What should I ask first?

Start with questions you can check on a screen, so you learn to trust the answers:

- "What happened today?" or "What's on this week?"
- "Which purchase orders haven't been received?"
- "Who owes us money, and how late is it?"
- "Is a site using more material than the BOQ allows?"

Claude calls the `ask` tool, which returns the rows from your system's fixed look-up. Each answer names the look-up
it used; compare it with that screen once or twice. The [question library](/ai-assistant/questions) lists every
question each assistant answers and the screen to check it against.

## How do I make a change through Claude?

Ask in plain words: "Add an enquiry from Northwind for a 2 TPH boiler" or "Remind me to call the site engineer on
Friday". Claude calls `propose_action`, shows you a preview of exactly what will be saved, and asks you to confirm.
Only after you say yes does it call `confirm_action`, which saves the change through the same route the screen
uses. The preview expires after 10 minutes. See [actions and approvals](/ai-assistant/actions-and-approvals).

## Can Claude combine ERP answers with other work?

Yes, and that is where a connector is most useful. Ask for the overdue milestones and a draft update to each client;
for the receivables by age and a short note for the weekly meeting; for the stock below minimum and a purchase
request in your usual wording. The figures come from the ERP; Claude writes the words around them. Read what it
writes before you send it.

## What if Claude says it can't connect?

| Message | Likely cause |
|---|---|
| Sign-in page doesn't open | The address is wrong, or doesn't end in `/mcp` |
| "Not available" after sign-in | Connectors are switched off for your company, or your role can't use them (in SB Ops, managers and admins) |
| Tools listed but answers refused | Your login can't see that data on screen either |
| "Token expired" when confirming | More than 10 minutes passed since the preview; ask again |

## How do I disconnect?

Remove or disconnect the connector in Claude's settings, and revoke the connection in the ERP: each person's AI app
connections are listed under Settings with the date each was last used, and can be revoked there. When someone leaves
the company, deactivating their ERP login stops every connection they made. The [security checklist](/ai-assistant/security-checklist)
lists what else to review.
