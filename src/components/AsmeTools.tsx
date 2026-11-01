"use client";

import { useId, useState } from "react";
import { HYDRO_CASES, continuityLapse, shellMawp, shellThickness, testPressure, type HydroCase } from "@/lib/asme-calc";

// The three ASME tools, embedded in their guides (content/asme/*.md `tool:`). The maths is in src/lib/asme-calc.ts.
// Everything runs in the browser; nothing is sent anywhere.

const num = (v: string) => (v.trim() === "" ? NaN : Number(v));
const fmt = (n: number, d = 3) => (Number.isFinite(n) ? n.toLocaleString("en-US", { maximumFractionDigits: d }) : "–");

function Field({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  const id = useId();
  return (
    <div className="subscribe-field">
      <label htmlFor={id} className="subscribe-label">{label}</label>
      <input id={id} inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} className="subscribe-input" />
      {hint && <p className="mt-1 text-sm text-foreground-secondary">{hint}</p>}
    </div>
  );
}

const Box = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section aria-label={title} className="mt-10 border border-line p-5">
    <h2 className="text-lg font-medium text-foreground">{title}</h2>
    {children}
  </section>
);

export function HydrotestCalculator() {
  const [c, setC] = useState<HydroCase>("viii-1-hydro");
  const [mawp, setMawp] = useState("150");
  const [sTest, setSTest] = useState("20000");
  const [sDesign, setSDesign] = useState("20000");
  const k = HYDRO_CASES[c];
  const r = testPressure(c, num(mawp), num(sTest), num(sDesign));
  return (
    <Box title="Test pressure calculator">
      <div className="mt-4 subscribe-field">
        <label className="subscribe-label" htmlFor="hydro-case">Rule</label>
        <select id="hydro-case" value={c} onChange={(e) => setC(e.target.value as HydroCase)} className="subscribe-input">
          {Object.entries(HYDRO_CASES).map(([key, v]) => <option key={key} value={key}>{v.label} ({v.para})</option>)}
        </select>
      </div>
      <Field label="MAWP" value={mawp} onChange={setMawp} hint="Any unit: psi, bar or MPa. The answer comes out in the same one." />
      {k.ratio && (
        <>
          <Field label="Allowable stress at test temperature" value={sTest} onChange={setSTest} hint="From Section II Part D, for the material with the lowest ratio." />
          <Field label="Allowable stress at design temperature" value={sDesign} onChange={setSDesign} />
        </>
      )}
      <p className="mt-6 text-foreground" aria-live="polite">
        Minimum test pressure: <strong className="font-medium">{fmt(r.pressure, 2)}</strong>
        <span className="block text-sm text-foreground-secondary">
          {k.para}: {k.factor} × MAWP{k.ratio ? ` × stress ratio ${fmt(r.ratio)}` : ""}. Measured at the top of the vessel; add the
          static head for the gauge at the bottom.
        </span>
      </p>
    </Box>
  );
}

export function ShellCalculator() {
  const [shape, setShape] = useState<"cylinder" | "sphere">("cylinder");
  const [v, setV] = useState({ P: "150", R: "24", S: "20000", E: "0.85", CA: "0.125", t: "0.375" });
  const set = (k: keyof typeof v) => (x: string) => setV({ ...v, [k]: x });
  const p = { P: num(v.P), R: num(v.R), S: num(v.S), E: num(v.E), CA: num(v.CA) };
  const r = shellThickness({ ...p, shape });
  const mawp = shellMawp({ t: num(v.t), R: p.R, S: p.S, E: p.E, CA: p.CA });
  return (
    <Box title="Shell thickness and MAWP calculator">
      <div className="mt-4 subscribe-field">
        <label className="subscribe-label" htmlFor="shell-shape">Shape</label>
        <select id="shell-shape" value={shape} onChange={(e) => setShape(e.target.value as "cylinder" | "sphere")} className="subscribe-input">
          <option value="cylinder">Cylindrical shell, UG-27(c)</option>
          <option value="sphere">Spherical shell, UG-27(d)</option>
        </select>
      </div>
      <Field label="Design pressure P" value={v.P} onChange={set("P")} hint="psi with inches, or MPa with mm." />
      <Field label="Inside radius R (new)" value={v.R} onChange={set("R")} />
      <Field label="Allowable stress S at design temperature" value={v.S} onChange={set("S")} hint="From Section II Part D." />
      <Field label="Joint efficiency E" value={v.E} onChange={set("E")} hint="From UW-12: 1.0, 0.85 or 0.70 for a double-welded butt joint." />
      <Field label="Corrosion allowance" value={v.CA} onChange={set("CA")} />
      <div className="mt-6 space-y-1 text-foreground" aria-live="polite">
        <p>
          Required thickness: <strong className="font-medium">{fmt(r.required)}</strong>{" "}
          <span className="text-sm text-foreground-secondary">({fmt(r.circumferential > r.longitudinal ? r.circumferential : r.longitudinal)} for pressure + {fmt(p.CA)} corrosion, inside radius {fmt(r.R)} corroded)</span>
        </p>
        {shape === "cylinder" && (
          <p className="text-sm text-foreground-secondary">
            Circumferential stress (longitudinal joints): {fmt(r.circumferential)}; longitudinal stress (circumferential joints): {fmt(r.longitudinal)}. The {r.governs} case governs.
          </p>
        )}
        {!r.inRange && (
          <p className="text-sm text-danger">Outside the thin-shell range of these formulas: use the thick-shell formulas in Mandatory Appendix 1-2.</p>
        )}
      </div>
      {shape === "cylinder" && (
        <>
          <Field label="Check a thickness: nominal t" value={v.t} onChange={set("t")} hint="Less any mill undertolerance on plate or pipe." />
          <p className="mt-2 text-foreground">MAWP for that thickness: <strong className="font-medium">{fmt(mawp, 1)}</strong></p>
        </>
      )}
    </Box>
  );
}

const SAMPLE = "W-12, SMAW, 2026-05-02\nW-12, GTAW, 2026-01-15\nW-31, GMAW, 2026-03-28";

export function ContinuityChecker() {
  const [rows, setRows] = useState(SAMPLE);
  const [today, setToday] = useState(() => new Date().toISOString().slice(0, 10));
  const parsed = rows
    .split("\n")
    .map((l) => l.split(/[,\t]/).map((x) => x.trim()))
    .filter((c) => c.length >= 3 && /^\d{4}-\d{2}-\d{2}$/.test(c[2]))
    .map(([welder, process, last]) => {
      const lapse = continuityLapse(last);
      const days = Math.round((Date.parse(lapse) - Date.parse(today)) / 86400000);
      return { welder, process, last, lapse, days };
    })
    .sort((a, b) => a.days - b.days);
  return (
    <Box title="Welder continuity checker">
      <div className="mt-4 subscribe-field">
        <label className="subscribe-label" htmlFor="continuity-rows">One welder and process per line: stamp, process, last weld date (YYYY-MM-DD)</label>
        <textarea id="continuity-rows" rows={5} value={rows} onChange={(e) => setRows(e.target.value)} className="subscribe-input subscribe-textarea font-mono text-sm" />
        <p className="mt-1 text-sm text-foreground-secondary">Paste from Excel (tab-separated works too). Nothing leaves your browser.</p>
      </div>
      <div className="subscribe-field">
        <label className="subscribe-label" htmlFor="continuity-today">As of</label>
        <input id="continuity-today" type="date" value={today} onChange={(e) => setToday(e.target.value)} className="subscribe-input" />
      </div>
      {parsed.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>{["Welder", "Process", "Last weld", "Lapses on", "Status"].map((h) => <th key={h} className="border-b border-line py-2 pr-4 font-medium text-foreground">{h}</th>)}</tr>
            </thead>
            <tbody>
              {parsed.map((r) => (
                <tr key={`${r.welder}-${r.process}`}>
                  <td className="border-b border-line py-2 pr-4">{r.welder}</td>
                  <td className="border-b border-line py-2 pr-4">{r.process}</td>
                  <td className="border-b border-line py-2 pr-4">{r.last}</td>
                  <td className="border-b border-line py-2 pr-4">{r.lapse}</td>
                  <td className={`border-b border-line py-2 pr-4 ${r.days <= 0 ? "text-danger" : "text-foreground-secondary"}`}>
                    {r.days <= 0 ? "Lapsed: requalify" : r.days <= 30 ? `Weld within ${r.days} day${r.days === 1 ? "" : "s"}` : `${r.days} days left`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Box>
  );
}

