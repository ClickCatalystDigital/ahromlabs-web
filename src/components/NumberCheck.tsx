"use client";

import { useState, type ReactNode } from "react";
import { checkNumbers, type Found } from "@/lib/number-check";
import { track } from "@/lib/analytics";

// /ai-assistant/number-check: an assistant's answer and the data it should come from in, every number in the
// answer that isn't in the data marked. Everything happens in the browser.

// The sample answer is a finance-desk line in Atelier AI's style, with one figure the data doesn't hold
// (a share worked out by the writer), so the first click shows what a flag looks like.
const SAMPLE_ANSWER = "₹8,72,020 invoiced on the Mehta bungalow, ₹2,50,160 paid, so ₹6,21,860 is outstanding, about 72% of the bill. 3 of 5 milestones are done; furniture installation is next, due 28 Oct.";
const SAMPLE_DATA = `Invoiced (incl. GST)\t₹8,72,020
Paid\t₹2,50,160
Outstanding\t₹6,21,860
Milestones done\t3 / 5
Next milestone\tFurniture installation, 28 Oct`;

const box = "mt-2 w-full border border-line bg-background px-3 py-2 font-mono text-sm text-foreground focus-ring";

function Marked({ text, found }: { text: string; found: Found[] }) {
  const parts: ReactNode[] = [];
  let at = 0;
  for (const n of found) {
    parts.push(text.slice(at, n.start));
    parts.push(
      n.ok ? (
        <span key={n.start} className="underline decoration-line underline-offset-4">{n.text}</span>
      ) : (
        <mark key={n.start} className="bg-yellow-200 px-0.5 text-black">{n.text}</mark>
      ),
    );
    at = n.end;
  }
  parts.push(text.slice(at));
  return <p className="whitespace-pre-wrap leading-relaxed text-foreground">{parts}</p>;
}

export function NumberCheck() {
  const [answer, setAnswer] = useState(SAMPLE_ANSWER);
  const [data, setData] = useState(SAMPLE_DATA);
  const [result, setResult] = useState<Found[] | null>(null);
  const bad = result?.filter((n) => !n.ok) ?? [];

  function run() {
    const found = checkNumbers(answer, data);
    setResult(found);
    track("ai_number_check_run", { numbers: String(found.length), flagged: String(found.filter((n) => !n.ok).length) });
  }

  return (
    <div>
      <form
        className="grid grid-cols-1 gap-6 border border-line p-6 sm:grid-cols-2"
        onSubmit={(e) => { e.preventDefault(); run(); }}
      >
        <label className="block text-sm font-medium text-foreground-secondary">
          The assistant&apos;s answer
          <textarea rows={8} className={box} value={answer} onChange={(e) => { setAnswer(e.target.value); setResult(null); }} />
        </label>
        <label className="block text-sm font-medium text-foreground-secondary">
          The data it should come from (paste a report, a table or rows from Excel)
          <textarea rows={8} className={box} value={data} onChange={(e) => { setData(e.target.value); setResult(null); }} />
        </label>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-2">
          <button type="submit" className="subscribe-submit focus-ring cursor-pointer">Check the numbers</button>{" "}
          <button type="button" className="text-link focus-ring cursor-pointer" onClick={() => { setAnswer(""); setData(""); setResult(null); }}>
            Clear both
          </button>
        </div>
      </form>

      {result && (
        <section aria-live="polite" className="mt-8">
          <p className="text-lg text-foreground">
            {result.length === 0
              ? "No numbers in the answer."
              : bad.length === 0
                ? `All ${result.length} numbers in the answer are in the data.`
                : `${bad.length} of ${result.length} numbers in the answer ${bad.length === 1 ? "isn't" : "aren't"} in the data: ${bad.map((n) => n.text).join(", ")}.`}
          </p>
          <div className="mt-4 border-l-2 border-line pl-6">
            <Marked text={answer} found={result} />
          </div>
          <p className="mt-4 text-sm text-foreground-secondary">
            Highlighted: not in the data. Underlined: found. Single digits are skipped, as they are too common to check.
            A flagged number may be a sum, a share or a rounding the assistant worked out itself; that is exactly what
            to ask the vendor about.
          </p>
        </section>
      )}
    </div>
  );
}
