// The made-up number check behind /ai-assistant/number-check: every number written in an assistant's answer
// must appear in the data it was given. Ported from numbersOk in Savistar's lib/assistant-personas.js, the rule
// Atelier AI applies before it shows a written line, with two changes for a buyer's tool: numbers are compared
// whole (Savistar's substring match lets "25" pass inside "1250"), and "12.5 lakh" or "1.2 crore" is converted
// exactly, so an answer can say it in words. No rounding: ₹12.4 lakh against ₹12,43,500 is flagged, on purpose.
// Runs in the browser; tested in scripts/ai-assistant.check.ts.

export type Found = { text: string; value: number; start: number; end: number; ok: boolean };

const SCALE: Record<string, number> = { lakh: 1e5, lakhs: 1e5, lac: 1e5, lacs: 1e5, crore: 1e7, crores: 1e7, cr: 1e7, k: 1e3, thousand: 1e3 };
// A number with optional Indian or Western grouping and decimals, then an optional scale word. Grouping must
// start with 1–3 digits and continue in 2- or 3-digit groups, so a CSV row "Mehta,125000,300" stays two numbers.
const NUM = /(?:\d{1,3}(?:,\d{2,3})+(?!\d)|\d+)(?:\.\d+)?(?:\s*(lakhs?|lacs?|crores?|cr|thousand|k)\b)?/gi;

export function numbersIn(text: string): Omit<Found, "ok">[] {
  return [...text.matchAll(NUM)].map((m) => {
    const raw = m[0];
    const digits = raw.match(/[\d,]+(?:\.\d+)?/)![0].replace(/,/g, "");
    const scale = m[1] ? SCALE[m[1].toLowerCase()] : 1;
    return { text: raw, value: Math.round(Number(digits) * scale * 100) / 100, start: m.index!, end: m.index! + raw.length };
  });
}

// Single digits pass, as in Savistar: too common ("2 invoices", "on 3 Oct") to be worth flagging.
export function checkNumbers(answer: string, data: string): Found[] {
  const known = new Set(numbersIn(data).map((n) => n.value));
  return numbersIn(answer).map((n) => ({ ...n, ok: known.has(n.value) || (n.value < 10 && Number.isInteger(n.value) && n.text.length === 1) }));
}
