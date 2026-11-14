---
kind: term
slug: model-context-protocol
title: "Model Context Protocol (MCP)"
answer: >
  An open standard for connecting AI apps such as ChatGPT and Claude to other software: the software runs an MCP server that lists a few tools, and the AI app calls them while it talks to a person.
domain: [truth]
order: 20
published: 2026-11-14
updated: 2026-11-14
---

For a business system, an MCP server is how ChatGPT or Claude can use the system as a particular person: ask questions and get the system's own answers, and prepare changes for that person to approve. A well-built server lists few tools, marks the ones that write, signs in each person separately and refuses requests from web pages on other sites.

Our systems each have one, with three tools: ask, prepare a change, make the approved change. See [MCP for ERP](/ai-assistant/mcp-for-erp) and the setup for [Claude](/ai-assistant/connect-claude-to-erp) and [ChatGPT](/ai-assistant/connect-chatgpt-to-erp).
