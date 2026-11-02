"use client";

import { useId, useState } from "react";
import { SCHEDULE_DEMO, jobVariance, schedule, type JobSide } from "@/lib/manufacturing-calc";

// The tools embedded in manufacturing guides (content/manufacturing/*.md `tool:`). Maths: src/lib/manufacturing-calc.ts.
// Everything runs in the browser; nothing is sent anywhere.

const num = (v: string) => (v.trim() === "" ? 0 : Number(v) || 0);
const usd = (n: number) => (Number.isFinite(n) ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : "–");
const pct = (n: number) => (Number.isFinite(n) ? `${(n * 100).toFixed(1)}%` : "–");

const Box = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section aria-label={title} className="mt-10 border border-line p-5">
    <h2 className="text-lg font-medium text-foreground">{title}</h2>
    {children}
  </section>
);

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <div className="subscribe-field">
      <label htmlFor={id} className="subscribe-label">{label}</label>
      <input id={id} inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} className="subscribe-input" />
    </div>
  );
}

// A worked example: 200 brackets quoted at $18.50. Every figure is made up for the example.
const SIDE_FIELDS: { key: keyof JobSide; label: string }[] = [
  { key: "materialPerPart", label: "Material per part ($)" },
  { key: "setupHours", label: "Setup (hours)" },
  { key: "runMinutesPerPart", label: "Run time per part (minutes)" },
  { key: "outside", label: "Outside processing, total ($)" },
  { key: "scrapParts", label: "Scrapped parts (made again)" },
  { key: "reworkHours", label: "Rework (hours)" },
];
const EST = { materialPerPart: "4.20", setupHours: "2", runMinutesPerPart: "6", outside: "300", scrapParts: "0", reworkHours: "0" };
const ACT = { materialPerPart: "4.55", setupHours: "3.5", runMinutesPerPart: "7.5", outside: "300", scrapParts: "8", reworkHours: "1.5" };

export function JobCostCalculator() {
  const [rates, setRates] = useState({ qty: "200", pricePerPart: "18.50", laborRate: "32", shopRate: "65" });
  const [est, setEst] = useState(EST);
  const [act, setAct] = useState(ACT);
  const toSide = (s: typeof EST) => Object.fromEntries(Object.entries(s).map(([k, v]) => [k, num(v)])) as JobSide;
  const r = { qty: num(rates.qty), pricePerPart: num(rates.pricePerPart), laborRate: num(rates.laborRate), shopRate: num(rates.shopRate) };
  const v = jobVariance(toSide(est), toSide(act), r);
  const setR = (k: keyof typeof rates) => (x: string) => setRates({ ...rates, [k]: x });
  return (
    <Box title="Job cost: estimated vs actual">
      <p className="mt-2 text-sm text-foreground-secondary">
        Filled in with a made-up job: 200 steel brackets quoted at $18.50 each. Change any figure. Labor is paid per
        hour; the shop rate covers the machine and overhead per machine hour.
      </p>
      <div className="mt-4 grid gap-x-6 sm:grid-cols-2">
        <Input label="Quantity ordered" value={rates.qty} onChange={setR("qty")} />
        <Input label="Price per part ($)" value={rates.pricePerPart} onChange={setR("pricePerPart")} />
        <Input label="Labor rate ($ per hour)" value={rates.laborRate} onChange={setR("laborRate")} />
        <Input label="Shop rate ($ per machine hour)" value={rates.shopRate} onChange={setR("shopRate")} />
      </div>
      <div className="mt-6 grid gap-x-6 sm:grid-cols-2">
        <fieldset>
          <legend className="text-sm font-medium text-foreground">Estimated (the quote)</legend>
          {SIDE_FIELDS.map((f) => <Input key={f.key} label={f.label} value={est[f.key]} onChange={(x) => setEst({ ...est, [f.key]: x })} />)}
        </fieldset>
        <fieldset className="mt-6 sm:mt-0">
          <legend className="text-sm font-medium text-foreground">Actual (from the shop floor)</legend>
          {SIDE_FIELDS.map((f) => <Input key={f.key} label={f.label} value={act[f.key]} onChange={(x) => setAct({ ...act, [f.key]: x })} />)}
        </fieldset>
      </div>
      <div className="mt-6 overflow-x-auto" aria-live="polite">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="border-b border-line py-2 pr-4 font-medium text-foreground">Cost</th>
              <th className="border-b border-line py-2 pr-4 text-right font-medium text-foreground">Estimated</th>
              <th className="border-b border-line py-2 pr-4 text-right font-medium text-foreground">Actual</th>
              <th className="border-b border-line py-2 text-right font-medium text-foreground">Difference</th>
            </tr>
          </thead>
          <tbody>
            {v.estimate.lines.map((l, i) => (
              <tr key={l.key}>
                <td className="border-b border-line py-2 pr-4 text-foreground-secondary">{l.label}</td>
                <td className="border-b border-line py-2 pr-4 text-right">{usd(l.cost)}</td>
                <td className="border-b border-line py-2 pr-4 text-right">{usd(v.actual.lines[i].cost)}</td>
                <td className="border-b border-line py-2 text-right">{usd(v.actual.lines[i].cost - l.cost)}</td>
              </tr>
            ))}
            <tr className="font-medium text-foreground">
              <td className="py-2 pr-4">Total cost</td>
              <td className="py-2 pr-4 text-right">{usd(v.estimate.total)}</td>
              <td className="py-2 pr-4 text-right">{usd(v.actual.total)}</td>
              <td className="py-2 text-right">{usd(v.variance)}</td>
            </tr>
            <tr className="text-foreground">
              <td className="py-2 pr-4">Margin</td>
              <td className="py-2 pr-4 text-right">{usd(v.estimate.margin)} ({pct(v.estimate.marginPct)})</td>
              <td className="py-2 pr-4 text-right">{usd(v.actual.margin)} ({pct(v.actual.marginPct)})</td>
              <td className="py-2 text-right" />
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-foreground">
        Hours used per hour quoted: <strong className="font-medium">{Number.isFinite(v.hoursFactor) ? v.hoursFactor.toFixed(2) : "–"}</strong>
        <span className="block text-sm text-foreground-secondary">
          If this stays above 1 across several similar jobs, the quoting standard for this kind of part is too low.
        </span>
      </p>
    </Box>
  );
}

const { jobs: BASE_JOBS, rush: RUSH, machines: MACHINES } = SCHEDULE_DEMO;

export function ScheduleDemo() {
  const [shifts, setShifts] = useState(1);
  const [rush, setRush] = useState(false);
  const hoursPerDay = 8 * shifts;
  const s = schedule(rush ? [...BASE_JOBS, RUSH] : BASE_JOBS, hoursPerDay);
  const total = s.horizonDays * hoursPerDay;
  const late = s.jobs.filter((j) => j.late > 0).length;
  return (
    <Box title="Try it: a finite schedule for three machines">
      <p className="mt-2 text-sm text-foreground-secondary">
        Five made-up jobs on a laser, a press brake and a welding cell, each with its routing. Jobs are taken
        earliest due date first; each operation waits for its machine and for the job&apos;s previous operation.
      </p>
      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
        <div className="subscribe-field">
          <label htmlFor="sched-shifts" className="subscribe-label">Shifts per day</label>
          <select id="sched-shifts" value={shifts} onChange={(e) => setShifts(Number(e.target.value))} className="subscribe-input">
            <option value={1}>One shift (8 hours)</option>
            <option value={2}>Two shifts (16 hours)</option>
          </select>
        </div>
        <label className="mt-6 flex items-center gap-2 text-foreground">
          <input type="checkbox" checked={rush} onChange={(e) => setRush(e.target.checked)} />
          Add a rush order due tomorrow
        </label>
      </div>
      <div className="mt-6 space-y-3" aria-hidden="true">
        {MACHINES.map((m) => (
          <div key={m} className="flex items-center gap-3">
            <span className="w-14 shrink-0 text-sm text-foreground-secondary">{m}</span>
            <div className="relative h-7 flex-1 border border-line">
              {s.ops.filter((o) => o.machine === m).map((o) => (
                <span
                  key={o.job}
                  title={`${o.job}: hours ${o.start}–${o.end}`}
                  className={`absolute top-0 h-full border-r border-background text-[10px] leading-7 text-background ${o.job === RUSH.id ? "bg-danger" : "bg-accent"}`}
                  style={{ left: `${(o.start / total) * 100}%`, width: `${((o.end - o.start) / total) * 100}%` }}
                >
                  <span className="block overflow-hidden whitespace-nowrap px-1">{o.job.split(" ")[0]}</span>
                </span>
              ))}
              {Array.from({ length: s.horizonDays - 1 }, (_, i) => (
                <span key={i} className="absolute top-0 h-full border-l border-dashed border-line" style={{ left: `${((i + 1) / s.horizonDays) * 100}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 overflow-x-auto" aria-live="polite">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="border-b border-line py-2 pr-4 font-medium text-foreground">Job</th>
              <th className="border-b border-line py-2 pr-4 text-right font-medium text-foreground">Due (end of day)</th>
              <th className="border-b border-line py-2 pr-4 text-right font-medium text-foreground">Finishes (day)</th>
              <th className="border-b border-line py-2 font-medium text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {s.jobs.map((j) => (
              <tr key={j.id}>
                <td className="border-b border-line py-2 pr-4 text-foreground-secondary">{j.id}</td>
                <td className="border-b border-line py-2 pr-4 text-right">{j.due}</td>
                <td className="border-b border-line py-2 pr-4 text-right">{j.finishDay}</td>
                <td className={`border-b border-line py-2 ${j.late ? "font-medium text-foreground" : "text-foreground-secondary"}`}>{j.late ? `Late by ${j.late} day${j.late > 1 ? "s" : ""}` : "On time"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-foreground-secondary">
        {late === 0 ? "Every job ships on time." : `${late} of ${s.jobs.length} jobs late.`} A real schedule also
        checks material on hand and who can run each machine; the rule stays the same.
      </p>
    </Box>
  );
}
