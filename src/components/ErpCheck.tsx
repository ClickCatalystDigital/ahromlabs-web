"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { departments, INDUSTRY_LABEL, ROLE_LABEL, PRIORITY_LABEL, type Industry, type Role } from "@/lib/erp";
import { selectRequirements, toCsv, contactMessage, type Answers } from "@/lib/erp-check";
import { track } from "@/lib/analytics";

// /erp/check: five answers about the business in, the requirements that apply out, as a list to
// print, a CSV for Excel, or a message to Ahrom Labs. Everything happens in the browser.

const TURNOVER = [
  { value: 2, label: "Under ₹5 crore" },
  { value: 7, label: "₹5–10 crore" },
  { value: 15, label: "₹10 crore or more" },
];
const anchor = (id: string) => id.replace(/\./g, "-");
const choice = "flex items-center gap-2 text-sm text-foreground";

export function ErpCheck() {
  const [a, setA] = useState<Answers>({ industry: "manufacturing", turnover: 7, company: true, tally: "keep", depts: departments.map((d) => d.slug) });
  const groups = useMemo(() => selectRequirements(a), [a]);
  const count = groups.reduce((n, g) => n + g.items.length, 0);
  const set = (patch: Partial<Answers>) => setA((x) => ({ ...x, ...patch }));
  const toggleDept = (slug: string) => set({ depts: a.depts.includes(slug) ? a.depts.filter((d) => d !== slug) : [...a.depts, slug] });

  function download() {
    const blob = new Blob([toCsv(groups)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement("a"), { href: url, download: "erp-requirements.csv" });
    link.click();
    URL.revokeObjectURL(url);
    track("erp_check_export", { format: "csv", lines: String(count) });
  }
  function send() {
    try {
      sessionStorage.setItem("contact-prefill", contactMessage(a, count));
    } catch {}
    track("erp_check_contact", { lines: String(count) });
  }

  return (
    <div>
      <form className="grid grid-cols-1 gap-8 border border-line p-6 sm:grid-cols-2 print:hidden" onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend className="text-sm font-medium text-foreground-secondary">Your business</legend>
          <div className="mt-3 space-y-2">
            {(Object.keys(INDUSTRY_LABEL) as Industry[]).map((i) => (
              <label key={i} className={choice}>
                <input type="radio" name="industry" checked={a.industry === i} onChange={() => set({ industry: i })} />
                {INDUSTRY_LABEL[i]}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-medium text-foreground-secondary">Annual aggregate turnover</legend>
          <div className="mt-3 space-y-2">
            {TURNOVER.map((t) => (
              <label key={t.value} className={choice}>
                <input type="radio" name="turnover" checked={a.turnover === t.value} onChange={() => set({ turnover: t.value })} />
                {t.label}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-medium text-foreground-secondary">TallyPrime</legend>
          <div className="mt-3 space-y-2">
            <label className={choice}>
              <input type="radio" name="tally" checked={a.tally === "keep"} onChange={() => set({ tally: "keep" })} />
              Keep Tally as the books
            </label>
            <label className={choice}>
              <input type="radio" name="tally" checked={a.tally === "replace"} onChange={() => set({ tally: "replace" })} />
              The new system keeps the books
            </label>
          </div>
          <label className={`${choice} mt-4`}>
            <input type="checkbox" checked={a.company} onChange={(e) => set({ company: e.target.checked })} />
            We are a company (Pvt Ltd or Ltd)
          </label>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-medium text-foreground-secondary">Show what this role signs off</legend>
          <select
            className="mt-3 w-full border border-line bg-background px-3 py-2 text-sm text-foreground focus-ring"
            value={a.role ?? ""}
            onChange={(e) => set({ role: (e.target.value || undefined) as Role | undefined })}
          >
            <option value="">Everyone</option>
            {(Object.keys(ROLE_LABEL) as Role[]).map((r) => (
              <option key={r} value={r}>{ROLE_LABEL[r]}</option>
            ))}
          </select>
        </fieldset>
        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-medium text-foreground-secondary">Departments to cover</legend>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {departments.map((d) => (
              <label key={d.slug} className={choice}>
                <input type="checkbox" checked={a.depts.includes(d.slug)} onChange={() => toggleDept(d.slug)} />
                {d.name}
              </label>
            ))}
          </div>
        </fieldset>
      </form>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 print:hidden">
        <p className="text-lg text-foreground">
          {count} requirement{count === 1 ? "" : "s"} apply.
        </p>{" "}
        <button type="button" onClick={download} disabled={!count} className="subscribe-submit focus-ring cursor-pointer disabled:opacity-50">
          Download for Excel (CSV)
        </button>{" "}
        <button
          type="button"
          onClick={() => { track("erp_check_export", { format: "print", lines: String(count) }); window.print(); }}
          disabled={!count}
          className="text-link focus-ring cursor-pointer disabled:opacity-50"
        >
          Print or save as PDF
        </button>{" "}
        <Link href="/#contact" onClick={send} className="text-link focus-ring">
          Send this to Ahrom Labs
        </Link>
      </div>

      <section className="mt-10">
        {groups.map((g) => (
          <div key={g.dept.slug} className="mt-8 first:mt-0">
            <h3 className="text-lg font-medium text-foreground">{g.dept.name}</h3>
            <ol className="mt-3 space-y-4">
              {g.items.map((r) => (
                <li key={r.id} className="border-t border-line pt-3 text-sm leading-relaxed">
                  <p className="text-foreground">
                    <span className="mr-2 text-xs uppercase tracking-wide text-foreground-secondary">{PRIORITY_LABEL[r.priority]}</span>{" "}
                    {r.text}
                  </p>
                  <p className="mt-1 text-foreground-secondary">Test: {r.test}</p>
                  {r.statutory && <p className="mt-1 text-foreground-secondary">Law: {r.statutory.law}</p>}
                  <p className="mt-1 print:hidden">
                    <Link href={`/erp/requirements#${anchor(r.id)}`} className="text-link focus-ring">Why, and what good looks like</Link>
                  </p>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </div>
  );
}
