"use client";

import { useState } from "react";
import { NEXUS_CHECKED, NEXUS_STATES, nexusStatus, type NexusStatus } from "@/lib/sales-tax-calc";

// The economic nexus checker on /sales-tax/economic-nexus-thresholds (content/sales-tax/*.md `tool: nexus`).
// Thresholds and maths: src/lib/sales-tax-calc.ts. Runs in the browser; nothing is sent anywhere.

const num = (v: string) => (v.trim() === "" ? 0 : Number(v.replace(/[$,\s]/g, "")) || 0);
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const SAYS: Record<NexusStatus, string> = {
  over: "At or over the threshold: check the state's rule below and register",
  near: "Within 20% of the threshold: watch it monthly",
  under: "Under the threshold",
  none: "No statewide sales tax listed",
};
// A made-up seller's year, for the first view: one state over, one near, one under.
const START = [
  { code: "TX", sales: "540000", orders: "310" },
  { code: "OH", sales: "85000", orders: "180" },
  { code: "NY", sales: "620000", orders: "60" },
];

export function NexusCheck() {
  const [rows, setRows] = useState(START);
  const set = (i: number, k: keyof (typeof START)[number], v: string) => setRows(rows.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  const used = new Set(rows.map((r) => r.code));
  return (
    <section aria-label="Economic nexus checker" className="mt-10 border border-line p-5">
      <h2 className="text-lg font-medium text-foreground">Economic nexus checker</h2>
      <p className="mt-2 text-sm text-foreground-secondary">
        Enter one year&apos;s sales and number of orders into each state you ship to. Filled in with a made-up
        seller; change any figure. Thresholds as the Streamlined Sales Tax Governing Board lists them on{" "}
        {new Date(NEXUS_CHECKED).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}.
      </p>
      <div className="mt-4 space-y-6">
        {rows.map((r, i) => {
          const { status, state } = nexusStatus(r.code, num(r.sales), num(r.orders));
          return (
            <div key={i} className="border-t border-line pt-4">
              <div className="grid gap-x-4 sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:items-end">
                <label className="subscribe-field">
                  <span className="subscribe-label">State</span>
                  <select value={r.code} onChange={(e) => set(i, "code", e.target.value)} className="subscribe-input">
                    {NEXUS_STATES.filter((s) => s.code === r.code || !used.has(s.code)).map((s) => (
                      <option key={s.code} value={s.code}>{s.name}</option>
                    ))}
                  </select>
                </label>
                <label className="subscribe-field">
                  <span className="subscribe-label">Sales into it ($)</span>
                  <input inputMode="decimal" value={r.sales} onChange={(e) => set(i, "sales", e.target.value)} className="subscribe-input" />
                </label>
                <label className="subscribe-field">
                  <span className="subscribe-label">Orders</span>
                  <input inputMode="numeric" value={r.orders} onChange={(e) => set(i, "orders", e.target.value)} className="subscribe-input" />
                </label>
                <button type="button" onClick={() => setRows(rows.filter((_, j) => j !== i))} className="text-link focus-ring mb-3 text-sm">
                  Remove
                </button>
              </div>
              <p className={`mt-2 font-medium ${status === "over" ? "text-danger" : "text-foreground"}`}>{SAYS[status]}</p>
              {state.sales !== null && (
                <p className="mt-1 text-sm text-foreground-secondary">
                  Threshold {usd(state.sales)}
                  {state.orders ? ` ${state.join} ${state.orders} transactions` : ""}. {state.source ? `${state.source.label}:` : <>The Board&apos;s chart:</>}{" "}
                  &ldquo;{state.rule}&rdquo;
                </p>
              )}
            </div>
          );
        })}
      </div>
      {used.size < NEXUS_STATES.length && (
        <button
          type="button"
          onClick={() => setRows([...rows, { code: NEXUS_STATES.find((s) => !used.has(s.code))!.code, sales: "", orders: "" }])}
          className="text-link focus-ring mt-6 text-sm font-medium"
        >
          Add a state
        </button>
      )}
      <p className="mt-6 text-sm text-foreground-secondary">
        Which sales count differs by state (gross, retail or taxable sales) and so does the period (previous or
        current calendar year, or the last 12 months): the quoted rule says which. Physical presence in a state, such
        as a warehouse, staff or inventory, means registering there whatever the sales. Not tax advice.
      </p>
    </section>
  );
}
