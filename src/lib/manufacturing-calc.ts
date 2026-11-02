// Maths for the /manufacturing tools, shared by the pages (ManufacturingTools.tsx) and the check
// (scripts/manufacturing.check.ts). Pure functions; nothing leaves the browser.

// ---- Job cost: estimated vs actual for one job ----
// Labor is paid per person-hour; the shop rate covers the machine and overhead per machine-hour. Setup and run
// time use both (one operator per machine). Scrap costs the material of the scrapped parts; rework costs hours.

export type JobSide = {
  materialPerPart: number; // $ per part, material only
  setupHours: number;
  runMinutesPerPart: number;
  outside: number; // $ total: plating, heat treat, anything bought in for the job
  scrapParts: number; // extra parts made because some were scrapped
  reworkHours: number;
};
export type JobRates = { qty: number; pricePerPart: number; laborRate: number; shopRate: number };
export type JobLine = { key: "material" | "setup" | "run" | "outside" | "scrap" | "rework"; label: string; cost: number };

export function jobCost(side: JobSide, r: JobRates) {
  const hourly = r.laborRate + r.shopRate;
  const runHours = (side.runMinutesPerPart * (r.qty + side.scrapParts)) / 60;
  const lines: JobLine[] = [
    { key: "material", label: "Material", cost: side.materialPerPart * r.qty },
    { key: "setup", label: "Setup (labor + shop rate)", cost: side.setupHours * hourly },
    { key: "run", label: "Run time (labor + shop rate)", cost: (side.runMinutesPerPart * r.qty * hourly) / 60 },
    { key: "outside", label: "Outside processing", cost: side.outside },
    { key: "scrap", label: "Scrapped parts (material + run time)", cost: side.scrapParts * (side.materialPerPart + (side.runMinutesPerPart * hourly) / 60) },
    { key: "rework", label: "Rework (labor + shop rate)", cost: side.reworkHours * hourly },
  ];
  const total = lines.reduce((s, l) => s + l.cost, 0);
  const revenue = r.qty * r.pricePerPart;
  return { lines, total, hours: side.setupHours + runHours + side.reworkHours, revenue, margin: revenue - total, marginPct: revenue ? (revenue - total) / revenue : NaN };
}

/** Both sides plus what the job says about the next quote: hours actually used per hour quoted. */
export function jobVariance(estimate: JobSide, actual: JobSide, r: JobRates) {
  const e = jobCost(estimate, r);
  const a = jobCost(actual, r);
  return { estimate: e, actual: a, variance: a.total - e.total, hoursFactor: e.hours ? a.hours / e.hours : NaN };
}

// ---- Finite-capacity schedule: earliest due date first, operations in routing order ----
// Time is counted in working hours from the start of day 1; a machine works `hoursPerDay` each day. An
// operation starts when both its machine and the job's previous operation are free. Simple on purpose: a
// dispatch rule, not an optimiser, so a planner can predict every result.

export type Op = { machine: string; hours: number };
export type Job = { id: string; due: number; ops: Op[] }; // due: end of that working day (1 = end of day 1)
export type Scheduled = { job: string; machine: string; start: number; end: number };

export function schedule(jobs: Job[], hoursPerDay: number) {
  const free: Record<string, number> = {};
  const ops: Scheduled[] = [];
  const results = [...jobs]
    .sort((a, b) => a.due - b.due || a.id.localeCompare(b.id))
    .map((job) => {
      let ready = 0;
      for (const op of job.ops) {
        const start = Math.max(free[op.machine] ?? 0, ready);
        const end = start + op.hours;
        free[op.machine] = end;
        ready = end;
        ops.push({ job: job.id, machine: op.machine, start, end });
      }
      const finishDay = Math.ceil(ready / hoursPerDay - 1e-9);
      return { id: job.id, due: job.due, finishHour: ready, finishDay, late: Math.max(0, finishDay - job.due) };
    });
  return { jobs: results, ops, horizonDays: Math.max(1, ...results.map((j) => j.finishDay)) };
}

// A small shop for the scheduling demo: three machines, five jobs, routings in order. Made-up data.
export const SCHEDULE_DEMO: { jobs: Job[]; rush: Job; machines: string[] } = {
  jobs: [
    { id: "J-101 brackets", due: 3, ops: [{ machine: "Laser", hours: 4 }, { machine: "Brake", hours: 6 }, { machine: "Weld", hours: 5 }] },
    { id: "J-102 covers", due: 2, ops: [{ machine: "Laser", hours: 3 }, { machine: "Brake", hours: 4 }] },
    { id: "J-103 frames", due: 4, ops: [{ machine: "Laser", hours: 5 }, { machine: "Weld", hours: 10 }] },
    { id: "J-104 guards", due: 3, ops: [{ machine: "Laser", hours: 2 }, { machine: "Brake", hours: 3 }, { machine: "Weld", hours: 3 }] },
    { id: "J-105 panels", due: 5, ops: [{ machine: "Laser", hours: 6 }, { machine: "Brake", hours: 5 }] },
  ],
  rush: { id: "J-106 rush order", due: 1, ops: [{ machine: "Laser", hours: 2 }, { machine: "Weld", hours: 4 }] },
  machines: ["Laser", "Brake", "Weld"],
};
