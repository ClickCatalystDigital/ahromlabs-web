"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

// WebMCP (docs/knowledge-layer-plan.md Phase 6): read-only tools for browser agents.
// The contact form declares itself with toolname/tooldescription attributes instead
// (ContactForm.tsx), so a send always needs the person to press Send.
// ponytail: plain word-overlap search over /knowledge.json; the AI Search MCP server
// (llms.txt) is the better search, this only exists for agents inside the browser.

type Entry = { kind: string; title: string; answer?: string; url?: string; demo?: { url: string; label: string } };
type ModelContext = { registerTool: (tool: object, opts?: { signal?: AbortSignal }) => unknown };

let corpus: Promise<Entry[]> | null = null;
const load = (): Promise<Entry[]> => (corpus ??= fetch("/knowledge.json").then((r) => r.json()).then((d) => (Array.isArray(d) ? d : d.nodes ?? [])));
const text = (value: unknown) => ({ content: [{ type: "text", text: JSON.stringify(value) }] });

export function search(entries: Entry[], query: string) {
  const words = query.toLowerCase().split(/\W+/).filter((w) => w.length > 2);
  return entries
    .filter((e) => e.title && e.url)
    .map((e) => {
      const hay = `${e.title} ${e.answer ?? ""}`.toLowerCase();
      return { e, score: words.reduce((n, w) => n + (e.title.toLowerCase().includes(w) ? 3 : hay.includes(w) ? 1 : 0), 0) };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ e }) => ({ kind: e.kind, title: e.title, url: e.url, answer: e.answer?.replace(/\s+/g, " ").trim() }));
}

export function WebMcpTools() {
  useEffect(() => {
    // The spec moved from navigator to document on 21 July 2026; check both.
    const mc = ((document as unknown as { modelContext?: ModelContext }).modelContext ??
      (navigator as unknown as { modelContext?: ModelContext }).modelContext);
    if (!mc?.registerTool) return;
    const ac = new AbortController();
    try {
      mc.registerTool(
        {
          name: "search-ahrom-knowledge",
          description:
            "Search Ahrom Labs' published engineering notes, patterns, industry pages (custom ERP for boiler makers, PCB traders, interior firms) and pricing answers. Returns titles, URLs and short answers.",
          inputSchema: { type: "object", properties: { query: { type: "string", description: "What to look for, e.g. 'IBR forms' or 'Tally integration'" } }, required: ["query"] },
          annotations: { readOnlyHint: true },
          execute: async ({ query }: { query: string }) => (track("webmcp_tool", { tool: "search-ahrom-knowledge" }), text(search(await load(), String(query ?? "")))),
        },
        { signal: ac.signal },
      );
      mc.registerTool(
        {
          name: "list-live-demos",
          description: "List the hands-on live demos of systems Ahrom Labs has built (sample data, free, resets nightly).",
          inputSchema: { type: "object", properties: {} },
          annotations: { readOnlyHint: true },
          execute: async () =>
            (track("webmcp_tool", { tool: "list-live-demos" }), text((await load()).filter((e) => e.demo).map((e) => ({ system: e.title, demo: e.demo!.url, about: e.url })))),
        },
        { signal: ac.signal },
      );
    } catch {
      // An older/newer draft of the API with a different shape: no tools, nothing else breaks.
    }
    return () => ac.abort();
  }, []);
  return null;
}
