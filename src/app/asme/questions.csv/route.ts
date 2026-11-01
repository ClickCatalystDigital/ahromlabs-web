import { asmeQuestions } from "@/lib/asme";

// The ASME question library as CSV, one row per question (CC BY 4.0; licence and citation on /asme/questions and in
// the JSON). UTF-8 BOM so Excel keeps °, × and –.
export const dynamic = "force-static";

const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;

export function GET() {
  const rows = asmeQuestions().map((q) => [q.question, q.answer, q.topic, q.guide, q.updated]);
  const csv = "﻿" + [["Question", "Answer", "Topic", "Guide", "Updated"], ...rows].map((r) => r.map(cell).join(",")).join("\r\n") + "\r\n";
  return new Response(csv, {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="asme-questions.csv"', "Cache-Control": "public, max-age=3600" },
  });
}
