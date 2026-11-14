// Inventory maths behind /manufacturing/reorder-point-safety-stock and /erp/import-landed-cost, shared by the
// WebMCP tools (src/components/WebMcpTools.tsx) and checked against the pages' worked examples in
// scripts/manufacturing.check.ts.

/** z for a cycle service level, the table on the reorder point page. */
export const SERVICE_Z: Record<string, number> = { "90": 1.28, "95": 1.65, "98": 2.05, "99": 2.33 };

export type ReorderInput = {
  avgDaily: number;
  leadDays: number;
  /** Max-minus-average method: both needed. */
  maxDaily?: number;
  maxLeadDays?: number;
  /** Service-level method: standard deviation of daily demand and a service level from SERVICE_Z. */
  sdDaily?: number;
  serviceLevel?: string;
};

export function reorderPoint(i: ReorderInput) {
  const usage = i.avgDaily * i.leadDays;
  const out: { leadTimeDemand: number; maxMinusAvg?: { safetyStock: number; reorderPoint: number }; serviceLevel?: { z: number; safetyStock: number; reorderPoint: number } } = { leadTimeDemand: usage };
  if (i.maxDaily != null && i.maxLeadDays != null) {
    const ss = Math.max(0, i.maxDaily * i.maxLeadDays - usage);
    out.maxMinusAvg = { safetyStock: ss, reorderPoint: usage + ss };
  }
  const z = i.serviceLevel ? SERVICE_Z[i.serviceLevel] : undefined;
  if (z != null && i.sdDaily != null) {
    const ss = Math.ceil(z * i.sdDaily * Math.sqrt(i.leadDays));
    out.serviceLevel = { z, safetyStock: ss, reorderPoint: usage + ss };
  }
  return out;
}

export type LandedInput = {
  /** CIF value in foreign currency and the CBIC import exchange rate on the bill of entry. */
  cif: number;
  rate: number;
  bcdPct: number;
  /** Social welfare surcharge, % of BCD; 10 for most goods. */
  swsPct?: number;
  igstPct: number;
  /** Clearing, port and transport to the warehouse, in rupees. */
  charges?: number;
  quantity?: number;
  /** Registered business using the goods for taxable supplies: IGST is credit, not cost. */
  igstCredit?: boolean;
};

const r2 = (n: number) => Math.round(n * 100) / 100;

export function landedCostIndia(i: LandedInput) {
  const assessable = i.cif * i.rate;
  const bcd = (assessable * i.bcdPct) / 100;
  const sws = (bcd * (i.swsPct ?? 10)) / 100;
  const igst = ((assessable + bcd + sws) * i.igstPct) / 100;
  const charges = i.charges ?? 0;
  const landed = assessable + bcd + sws + charges + (i.igstCredit === false ? igst : 0);
  return {
    assessable: r2(assessable),
    bcd: r2(bcd),
    sws: r2(sws),
    igst: r2(igst),
    paidToCustoms: r2(bcd + sws + igst),
    landedCost: r2(landed),
    perUnit: i.quantity ? r2(landed / i.quantity) : undefined,
  };
}
