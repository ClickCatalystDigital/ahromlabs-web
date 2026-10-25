import { vendorTests, questions, KIND_LABEL, INDUSTRY_LABEL } from "@/lib/ai-assistant";

// The vendor test sheet: the twelve tests, then the question library, with a pass/fail column per vendor.
// UTF-8 BOM so Excel keeps ₹ and quotes.
export const dynamic = "force-static";

const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;
const VENDORS = ["Vendor A", "Vendor B", "Vendor C"];

export function GET() {
  const head = ["Section", "Test or question", "What to do", "Pass", "Fail", ...VENDORS, "Notes"];
  const rows = [
    ...vendorTests.map((t) => ["Vendor test", t.title, t.ask, t.pass, t.fail]),
    ...questions.map((q) => [
      `Question: ${INDUSTRY_LABEL[q.industry]}`,
      q.question,
      `${KIND_LABEL[q.kind]}. Compare with: ${q.check}`,
      q.kind === "refuse" ? "Refused, with what it can answer instead" : q.kind === "data" ? "The same figures as the check" : "Works as described",
      q.kind === "refuse" ? "Answers anyway" : "A figure or step that doesn't match",
    ]),
  ].map((r) => [...r, ...VENDORS.map(() => ""), ""]);
  const csv = "﻿" + [head, ...rows].map((r) => r.map(cell).join(",")).join("\r\n") + "\r\n";
  return new Response(csv, {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="ai-assistant-vendor-test.csv"', "Cache-Control": "public, max-age=3600" },
  });
}
