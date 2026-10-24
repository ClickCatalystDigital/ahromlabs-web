// The /erp/check logic: from a business's answers, the requirements that apply to it, in order.
// No network; tested in scripts/erp.check.ts.
import { requirements, departments, type Industry, type Role, type Requirement } from "./erp";

export type Answers = {
  industry: Industry;
  turnover: number; // aggregate annual turnover, crore (the checker offers bands: 2, 7, 15)
  company: boolean; // a company under the Companies Act (audit-trail rule)
  tally: "keep" | "replace";
  depts: string[]; // department slugs to include
  role?: Role; // optional view: only what this role signs off
};

export function applies(r: Requirement, a: Answers): boolean {
  if (!r.appliesTo.includes(a.industry)) return false;
  if (!a.depts.includes(r.dept)) return false;
  if (a.role && !r.roles.includes(a.role)) return false;
  const w = r.when;
  if (w?.turnoverAtLeast !== undefined && a.turnover < w.turnoverAtLeast) return false;
  if (w?.company && !a.company) return false;
  if (w?.tally && w.tally !== a.tally) return false;
  return true;
}

const RANK = { must: 0, should: 1, could: 2 } as const;

// Grouped by department in the library's order, must before should before could.
export function selectRequirements(a: Answers) {
  return departments
    .map((d) => ({
      dept: d,
      items: requirements.filter((r) => r.dept === d.slug && applies(r, a)).sort((x, y) => RANK[x.priority] - RANK[y.priority]),
    }))
    .filter((g) => g.items.length);
}

const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;

// CSV that opens straight in Excel (UTF-8 BOM so ₹ and quotes survive), with empty columns for the
// vendor's answer and evidence, so it can go out as the requirements part of an RFP.
export function toCsv(groups: ReturnType<typeof selectRequirements>) {
  const head = ["S.No", "Department", "Requirement", "Priority", "What the vendor must show", "Law", "Vendor answer (Yes / Partly / No)", "Vendor evidence", "Requirement id"];
  const rows: string[][] = [];
  let n = 0;
  for (const g of groups)
    for (const r of g.items)
      rows.push([String(++n), g.dept.name, r.text, r.priority, r.test, r.statutory?.law ?? "", "", "", r.id]);
  return "﻿" + [head, ...rows].map((row) => row.map(cell).join(",")).join("\r\n");
}

// The short message the "send to Ahrom Labs" button puts in the contact form.
export function contactMessage(a: Answers, count: number) {
  const band = a.turnover >= 10 ? "₹10 crore or more" : a.turnover >= 5 ? "₹5–10 crore" : "under ₹5 crore";
  return `From the ERP requirements checker: ${count} requirements for a ${a.industry} business, turnover ${band}, ${a.tally === "keep" ? "keeping Tally" : "replacing Tally"}. Departments: ${a.depts.map((d) => departments.find((x) => x.slug === d)?.name ?? d).join(", ")}. I'd like to talk about a system for this.`;
}
