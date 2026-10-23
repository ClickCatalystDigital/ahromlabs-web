"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { checkSheet, quoteTotals, amountInWords, type Line } from "@/lib/boq-check";
import { UNIT_LABEL } from "@/lib/boq";
import { track } from "@/lib/analytics";

// /boq/check: paste a BOQ from Excel, see what each line leaves open, then
// price it and print it as a quotation. Everything happens here, in the
// browser: no request carries the rows anywhere.

// Made up, with the gaps real BOQs have.
const SAMPLE = [
  "S.No\tDescription\tUnit\tQty\tRate",
  "\tKITCHEN\t\t\t",
  "1\tKitchen base cabinets in 18 mm IS 303 BWP plywood, acrylic shutters, 2 mm PVC edge band, Hettich soft-close hinges and channels, measured by running length excluding countertop\trft\t14\t4800",
  "2\tWall cabinets in plywood with laminate\trft\t12\t3900",
  "3\tGranite countertop\trft\t14\t1600",
  "\tMASTER BEDROOM\t\t\t",
  "4\tWardrobe in ply with laminate finish and soft close hinges\tsqft\t64\t1450",
  "5\tLoft above wardrobe\tsqft\t24\t950",
  "6\tGypsum false ceiling on GI framing\tsqft\t180\t95",
  "7\tPainting\tsqft\t900\t28",
].join("\n");

const money = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const today = () => new Date().toISOString().slice(0, 10);

const field = "w-full border border-line bg-background px-3 py-2 text-sm text-foreground focus-ring";

export function BoqCheck() {
  const [text, setText] = useState("");
  const [lines, setLines] = useState<Line[] | null>(null);
  const [rates, setRates] = useState<Record<number, string>>({});
  const [descs, setDescs] = useState<Record<number, string>>({});
  const [gst, setGst] = useState("18");
  const [interState, setInterState] = useState(false);
  const [head, setHead] = useState({ firm: "", client: "", site: "", number: "", date: today() });

  function run(input = text) {
    const { lines } = checkSheet(input);
    setLines(lines);
    setRates(Object.fromEntries(lines.map((l) => [l.row, l.rate !== undefined ? String(l.rate) : ""])));
    setDescs({});
    track("boq_checked", { lines: String(lines.length), flagged: String(lines.filter((l) => l.flags.length).length) });
  }

  const priced = useMemo(
    () =>
      (lines ?? []).map((l) => {
        const rate = Number(rates[l.row]);
        const amount = l.qty !== undefined && rate > 0 ? Math.round(l.qty * rate * 100) / 100 : 0;
        return { ...l, description: descs[l.row] ?? l.description, rateNum: rate > 0 ? rate : undefined, amount };
      }),
    [lines, rates, descs],
  );
  const gstRate = Math.max(0, Number(gst) || 0);
  const totals = quoteTotals(priced.map((l) => l.amount), gstRate, interState);
  const flagged = priced.filter((l) => l.flags.length).length;

  return (
    <div>
      <div className="print:hidden">
        <label htmlFor="boq-paste" className="text-sm font-medium text-foreground">
          Paste rows from Excel (select the cells, copy, paste here). A header row with Description, Unit, Qty and Rate helps.
        </label>
        <textarea
          id="boq-paste"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPaste={() => track("boq_pasted")}
          rows={8}
          spellCheck={false}
          className={`${field} mt-3 font-mono`}
          placeholder={"S.No\tDescription\tUnit\tQty\tRate\n1\tWardrobe in 18 mm BWP plywood …\tsqft\t64\t1450"}
        />
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          <button type="button" onClick={() => run()} disabled={!text.trim()} className="subscribe-submit focus-ring disabled:opacity-50">
            Check the BOQ
          </button>
          <button
            type="button"
            onClick={() => { setText(SAMPLE); run(SAMPLE); }}
            className="text-link focus-ring text-sm"
          >
            Try a sample BOQ
          </button>
          <span className="text-sm text-foreground-secondary">Runs in your browser. Nothing is uploaded or saved.</span>
        </div>
      </div>

      {lines && (
        <div className="print:hidden">
          <h2 className="display mt-14 text-3xl text-foreground sm:text-4xl">What each line leaves open</h2>
          <p className="mt-4 leading-relaxed text-foreground-secondary" aria-live="polite">
            {lines.length === 0
              ? "No lines found. Copy the cells themselves from Excel, including the description and unit columns."
              : `${lines.length} lines checked; ${flagged} ${flagged === 1 ? "needs" : "need"} attention.`}
          </p>
          <ol className="mt-6 divide-y divide-line border-y border-line">
            {priced.map((l) => (
              <li key={l.row} className="py-5">
                <p className="text-sm text-foreground-secondary">
                  Row {l.row}
                  {l.item && (
                    <>
                      {" · "}
                      <Link href={`/boq/items/${l.item.trade}#${l.item.id.replace(/\./g, "-")}`} className="text-link focus-ring">{l.item.name}</Link>
                    </>
                  )}
                  {l.qty !== undefined && ` · ${l.qty} ${l.unit ? UNIT_LABEL[l.unit] : (l.unitRaw ?? "")}`}
                </p>
                <p className="mt-1 text-foreground">{l.description}</p>
                {l.flags.length === 0 ? (
                  <p className="mt-2 text-sm text-foreground-secondary">Nothing missing that the checker looks for.</p>
                ) : (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground-secondary">
                    {l.flags.map((f) => <li key={f.text}>{f.text}</li>)}
                  </ul>
                )}
                {l.item && l.flags.some((f) => f.kind !== "qty" && f.kind !== "no-unit") && (
                  <div className="mt-3 text-sm">
                    <p className="text-foreground-secondary">A line that names all of it (fill the [brackets]):</p>
                    <p className="mt-1 border-l-2 border-line pl-3 font-mono text-foreground">{l.item.description}</p>
                    <button
                      type="button"
                      className="text-link focus-ring mt-2"
                      onClick={() => setDescs((d) => ({ ...d, [l.row]: l.item!.description }))}
                    >
                      Use this line in the quotation
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ol>
          {priced.some((l) => l.item?.omits.length) && (
            <>
              <h3 className="mt-10 text-xl font-medium text-foreground">Often left out of quotes like this</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-foreground-secondary">
                {[...new Set(priced.flatMap((l) => l.item?.omits ?? []))].map((o) => <li key={o}>{o}</li>)}
              </ul>
            </>
          )}
        </div>
      )}

      {lines && lines.length > 0 && (
        <>
          <div className="print:hidden">
            <h2 className="display mt-14 text-3xl text-foreground sm:text-4xl">Turn it into a quotation</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(
                [
                  ["firm", "Your firm"],
                  ["client", "Client"],
                  ["site", "Site address"],
                  ["number", "Quotation no."],
                ] as const
              ).map(([k, label]) => (
                <label key={k} className="text-sm text-foreground-secondary">
                  {label}
                  <input className={`${field} mt-1`} value={head[k]} onChange={(e) => setHead({ ...head, [k]: e.target.value })} />
                </label>
              ))}
              <label className="text-sm text-foreground-secondary">
                Date
                <input type="date" className={`${field} mt-1`} value={head.date} onChange={(e) => setHead({ ...head, date: e.target.value })} />
              </label>
              <label className="text-sm text-foreground-secondary">
                GST rate (%)
                <input type="number" min="0" step="0.5" className={`${field} mt-1`} value={gst} onChange={(e) => setGst(e.target.value)} />
              </label>
            </div>
            <fieldset className="mt-4 text-sm text-foreground-secondary">
              <legend>Where is the site?</legend>
              <label className="mr-6 inline-flex items-center gap-2">
                <input type="radio" checked={!interState} onChange={() => setInterState(false)} /> Same state as our GST registration (CGST + SGST)
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" checked={interState} onChange={() => setInterState(true)} /> Another state (IGST)
              </label>
            </fieldset>
            <p className="mt-3 text-xs text-foreground-secondary">
              Confirm the rate and whether the work is a works contract or a supply of goods with your CA.
            </p>
          </div>

          <section id="boq-quote" className="mt-10 border border-line bg-white p-6 text-black print:mt-0 print:border-0 print:p-0">
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <p className="text-lg font-semibold">{head.firm || "Your firm"}</p>
                <p className="mt-1 text-sm">Quotation{head.number && ` ${head.number}`}</p>
              </div>
              <div className="text-right text-sm">
                <p>{head.date}</p>
                {head.client && <p className="mt-1 font-medium">{head.client}</p>}
                {head.site && <p>{head.site}</p>}
              </div>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-black/30">
                  <tr>
                    <th className="py-2 pr-2 font-medium">#</th>
                    <th className="py-2 pr-2 font-medium">Description</th>
                    <th className="py-2 pr-2 font-medium">Unit</th>
                    <th className="py-2 pr-2 text-right font-medium">Qty</th>
                    <th className="py-2 pr-2 text-right font-medium">Rate</th>
                    <th className="py-2 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {priced.map((l, i) => (
                    <tr key={l.row} className="align-top">
                      <td className="py-2 pr-2">{l.no || i + 1}</td>
                      <td className="py-2 pr-2">{l.description}</td>
                      <td className="py-2 pr-2">{l.unit ? UNIT_LABEL[l.unit] : l.unitRaw}</td>
                      <td className="py-2 pr-2 text-right">{l.qty ?? ""}</td>
                      <td className="py-2 pr-2 text-right">
                        <input
                          aria-label={`Rate for row ${l.row}`}
                          inputMode="decimal"
                          className="w-24 border border-black/20 px-1 py-0.5 text-right print:border-0"
                          value={rates[l.row] ?? ""}
                          onChange={(e) => setRates((r) => ({ ...r, [l.row]: e.target.value }))}
                        />
                      </td>
                      <td className="py-2 text-right">{l.amount ? money(l.amount) : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="ml-auto mt-4 w-full max-w-xs text-sm">
              <p className="flex justify-between py-1"><span>Subtotal</span><span>{money(totals.subtotal)}</span></p>
              {totals.taxes.map((t) => (
                <p key={t.label} className="flex justify-between py-1"><span>{t.label}</span><span>{money(t.amount)}</span></p>
              ))}
              <p className="mt-1 flex justify-between border-t border-black/30 py-2 font-semibold"><span>Total</span><span>₹ {money(totals.total)}</span></p>
            </div>
            {totals.total > 0 && <p className="mt-2 text-sm">{amountInWords(totals.total)}</p>}
          </section>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 print:hidden">
            <button
              type="button"
              className="subscribe-submit focus-ring"
              onClick={() => { track("boq_quote_printed", { lines: String(priced.length) }); window.print(); }}
            >
              Print or save as PDF
            </button>
            <span className="text-sm text-foreground-secondary">Your browser&apos;s print dialog has &ldquo;Save as PDF&rdquo;.</span>
          </div>
          <p className="mt-8 text-sm text-foreground-secondary print:hidden">
            Once the client says yes, Designer Ops carries the project on: orders, site visits, the workshop and
            invoices.{" "}
            <a
              href="https://interiors-erp.ahromlabs.com/demo"
              className="text-link focus-ring"
              onClick={() => track("boq_demo_click")}
            >
              Try the live demo
            </a>
          </p>
        </>
      )}
    </div>
  );
}
