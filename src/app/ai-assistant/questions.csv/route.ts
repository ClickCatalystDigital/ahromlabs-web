import { questions, ASSISTANT, SYSTEM_OF, INDUSTRY_LABEL, ROLE_LABEL, KIND_LABEL, STATUS_LABEL } from "@/lib/ai-assistant";

// The AI assistant question library as CSV, one row per question, as /questions.json has them. Licence (CC BY 4.0)
// and citation are on /ai-assistant/questions and in the JSON.
// UTF-8 BOM so Excel keeps ₹ and quotes.
export const dynamic = "force-static";

const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;

export function GET() {
  const head = ["ID", "Industry", "Asked by", "Question", "Type", "What should answer it", "Check it against", "Also asked as", "Status at Ahrom Labs", "Assistant"];
  const rows = questions.map((q) => {
    const a = ASSISTANT[SYSTEM_OF[q.industry]];
    return [q.id, INDUSTRY_LABEL[q.industry], ROLE_LABEL[q.role], q.question, KIND_LABEL[q.kind], q.answer, q.check, (q.alsoAsked ?? []).join(" | "), STATUS_LABEL[q.status], q.status === "not-built" ? "" : a.name];
  });
  const csv = "\uFEFF" + [head, ...rows].map((r) => r.map(cell).join(",")).join("\r\n") + "\r\n";
  return new Response(csv, {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="ai-assistant-questions.csv"', "Cache-Control": "public, max-age=3600" },
  });
}
