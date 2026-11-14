---
kind: ai-assistant
slug: connect-chatgpt-to-erp
title: "How to connect ChatGPT to your ERP with an MCP connector"
metaTitle: "Connect ChatGPT to your ERP: MCP connector setup"
related:
  - /ai-assistant/mcp-for-erp
  - /ai-assistant/connect-claude-to-erp
  - /ai-assistant/voice
  - /ai-assistant/chatgpt-vs-erp-assistant
  - /systems/model-context-protocol
question: "How do I connect ChatGPT to my ERP?"
answer: >
  In ChatGPT, create a custom connector (an app) with your ERP's MCP address, which for our systems is your app's
  address followed by /mcp, choose OAuth, and sign in to the ERP with your own login. On most plans this sits under
  developer mode in the connector settings, and business plans may need an admin to allow it. Then switch the
  connector on in a chat and ask about your business; changes need your approval each time.
description: "ChatGPT custom connector setup for your ERP: developer mode, the /mcp address, OAuth sign-in as yourself, first questions, approving changes."
domain: [ai, mcp, chatgpt]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
---

## What do I need before I start?

- **The connector address**: your ERP's address with `/mcp` at the end, for example `https://ops.yourcompany.com/mcp`.
- **Your own ERP login.** ChatGPT sees only what that login sees.
- **Connectors switched on for your company's system.** We switch them on once the client approves; they are off
  in the public demos.
- **A ChatGPT plan that allows custom connectors.** OpenAI places them under developer mode on paid plans, and on
  business plans an admin may need to allow them. OpenAI's help pages have the current list.

## How do I add the connector in ChatGPT?

OpenAI renames these menus from time to time; the order of steps stays the same:

1. Open ChatGPT's settings, go to the apps or connectors section, and open the advanced settings.
2. Turn on **developer mode** if your plan requires it for custom connectors.
3. Choose **Create** (or **Add custom connector**), give it a name and paste the address ending in `/mcp`.
4. Choose **OAuth** as the authentication. Our systems register ChatGPT automatically, so no client ID is needed.
5. Save. ChatGPT opens the ERP's sign-in page; log in with your own account and approve.
6. In a new chat, pick the connector from the tools menu.

ChatGPT marks custom connectors as unverified by OpenAI. That is expected for a company's own system; it means
OpenAI hasn't reviewed it, not that something is wrong.

## What can ChatGPT do once connected?

The same three things as any MCP client: ask the in-app assistant (Ember AI, Ohm AI, Atelier AI or Datum AI) and
get its answer as rows from your records, prepare a change and show you a preview, and make the change you approved.
See [MCP for ERP](/ai-assistant/mcp-for-erp) for what each tool does.

Good first questions are ones you can check on a screen:

- "Which items will run out in 30 days?"
- "Which quotations are still waiting for a reply?"
- "Which running-account bills are not yet certified?"
- "What approvals are waiting for me?"

## Why not just upload an export to ChatGPT?

An export is out of date the moment it is made, carries every column whether or not you should see it, and leaves
the arithmetic to the model. Through the connector, ChatGPT asks the live system, which answers with fixed look-ups
and your own permissions. See [ChatGPT vs an ERP assistant](/ai-assistant/chatgpt-vs-erp-assistant).

## How do changes work in ChatGPT?

ChatGPT shows the preview from `propose_action` and asks before calling `confirm_action`; tools that write are marked
as such, so ChatGPT asks for confirmation. The confirm token lasts 10 minutes and works only for the person who
proposed the change. Deletes, payments and approvals always ask. See
[actions and approvals](/ai-assistant/actions-and-approvals).

## Can I use it by voice?

ChatGPT's voice mode can use some connectors, depending on the app version and plan. Try one read-only question by
voice first and check the answer on screen. See [asking your business by voice](/ai-assistant/voice).

## What if it doesn't work?

| Symptom | Check |
|---|---|
| No option to add a connector | Your plan, developer mode, or your workspace admin's settings |
| Connector added but no tools | Sign in again; the ERP may have rejected the login or your role |
| "Not available" | Connectors are off for your company's system |
| Answers refused | Your login can't see that data on screen either |

## How do I remove access?

Delete the connector in ChatGPT, and revoke the connection in the ERP: your AI app connections are listed under
Settings with the date each was last used. Deactivating an ERP login stops every connection that person made, so
leavers are covered by the usual off-boarding. See the
[security checklist](/ai-assistant/security-checklist).
