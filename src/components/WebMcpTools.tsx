"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { HYDRO_CASES, continuityLapse, shellMawp, shellThickness, testPressure, type HydroCase } from "@/lib/asme-calc";

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
      // The ASME hub's calculators (/asme), the same maths as the pages. Pure functions: nothing is sent anywhere.
      const num = (v: unknown) => Number(v);
      mc.registerTool(
        {
          name: "asme-hydrostatic-test-pressure",
          description:
            "Minimum ASME test pressure: Section VIII Div. 1 hydrostatic (UG-99(b), 1.3 x MAWP x stress ratio), pneumatic (UG-100, 1.1 x ...) or Section I (PG-99, 1.5 x MAWP). Any consistent pressure unit. Explained at https://ahromlabs.com/asme/hydrostatic-test",
          inputSchema: {
            type: "object",
            properties: {
              rule: { type: "string", enum: Object.keys(HYDRO_CASES) },
              mawp: { type: "number" },
              stressAtTest: { type: "number", description: "Allowable stress at test temperature (Section II Part D); not needed for i-hydro" },
              stressAtDesign: { type: "number", description: "Allowable stress at design temperature" },
            },
            required: ["rule", "mawp"],
          },
          annotations: { readOnlyHint: true },
          execute: async (a: { rule: HydroCase; mawp: number; stressAtTest?: number; stressAtDesign?: number }) => {
            track("webmcp_tool", { tool: "asme-hydrostatic-test-pressure" });
            const k = HYDRO_CASES[a.rule];
            if (!k) return text({ error: `rule must be one of ${Object.keys(HYDRO_CASES).join(", ")}` });
            const r = testPressure(a.rule, num(a.mawp), num(a.stressAtTest), num(a.stressAtDesign));
            return text({ paragraph: k.para, testPressure: r.pressure, stressRatio: r.ratio, note: "At the top of the vessel; add static head for a gauge lower down. Not engineering advice." });
          },
        },
        { signal: ac.signal },
      );
      mc.registerTool(
        {
          name: "asme-shell-thickness",
          description:
            "Required thickness of a cylindrical or spherical shell under internal pressure to ASME Section VIII Div. 1 UG-27, with corrosion allowance; optionally the MAWP of a given thickness. Use psi with inches or MPa with mm. Explained at https://ahromlabs.com/asme/shell-thickness",
          inputSchema: {
            type: "object",
            properties: {
              shape: { type: "string", enum: ["cylinder", "sphere"] },
              designPressure: { type: "number" },
              insideRadius: { type: "number", description: "New (uncorroded) inside radius" },
              allowableStress: { type: "number", description: "At design temperature, from Section II Part D" },
              jointEfficiency: { type: "number", description: "UW-12, e.g. 1.0, 0.85 or 0.70; for a cylinder, the longitudinal joints'" },
              circumferentialJointEfficiency: { type: "number", description: "Optional, cylinder: the circumferential joints' UW-12 efficiency for the longitudinal-stress check; defaults to jointEfficiency" },
              corrosionAllowance: { type: "number" },
              checkThickness: { type: "number", description: "Optional: nominal thickness to work the MAWP back from (cylinder)" },
            },
            required: ["shape", "designPressure", "insideRadius", "allowableStress", "jointEfficiency", "corrosionAllowance"],
          },
          annotations: { readOnlyHint: true },
          execute: async (a: { shape: "cylinder" | "sphere"; designPressure: number; insideRadius: number; allowableStress: number; jointEfficiency: number; circumferentialJointEfficiency?: number; corrosionAllowance: number; checkThickness?: number }) => {
            track("webmcp_tool", { tool: "asme-shell-thickness" });
            const p = { P: num(a.designPressure), R: num(a.insideRadius), S: num(a.allowableStress), E: num(a.jointEfficiency), Ec: a.circumferentialJointEfficiency == null ? undefined : num(a.circumferentialJointEfficiency), CA: num(a.corrosionAllowance) };
            const r = shellThickness({ ...p, shape: a.shape === "sphere" ? "sphere" : "cylinder" });
            const mawp = a.checkThickness ? shellMawp({ t: num(a.checkThickness), ...p }) : undefined;
            return text({ requiredThickness: r.required, pressureThickness: r.required - p.CA, governs: r.governs, withinThinShellLimits: r.inRange, mawpForCheckThickness: mawp, note: "Shells only: heads, openings, external pressure and other loads need their own checks. Not engineering advice." });
          },
        },
        { signal: ac.signal },
      );
      mc.registerTool(
        {
          name: "asme-welder-continuity",
          description:
            "When a welder's ASME Section IX qualification for a process lapses (QW-322: six months without welding with it), from the date they last welded with that process. Explained at https://ahromlabs.com/asme/welder-continuity",
          inputSchema: { type: "object", properties: { lastWeldDate: { type: "string", description: "YYYY-MM-DD" } }, required: ["lastWeldDate"] },
          annotations: { readOnlyHint: true },
          execute: async ({ lastWeldDate }: { lastWeldDate: string }) => {
            track("webmcp_tool", { tool: "asme-welder-continuity" });
            if (!/^\d{4}-\d{2}-\d{2}$/.test(String(lastWeldDate))) return text({ error: "lastWeldDate must be YYYY-MM-DD" });
            return text({ lapsesOn: continuityLapse(lastWeldDate), rule: "QW-322.1(a)" });
          },
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
