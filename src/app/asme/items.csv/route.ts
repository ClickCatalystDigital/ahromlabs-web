import { ITEMS_CSV_HEAD, itemsCsvRows } from "@/lib/asme-items";

// The materials list at /asme/items as CSV (CC BY 4.0; licence and citation on the page). UTF-8 BOM so Excel keeps ¼ and –.
export const dynamic = "force-static";

const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;

export function GET() {
  const csv = "﻿" + [ITEMS_CSV_HEAD, ...itemsCsvRows()].map((r) => r.map(cell).join(",")).join("\r\n") + "\r\n";
  return new Response(csv, {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="boiler-pressure-vessel-materials.csv"', "Cache-Control": "public, max-age=3600" },
  });
}
