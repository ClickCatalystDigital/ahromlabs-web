import { NextResponse } from "next/server";
import { erpRequirementsJson } from "@/lib/erp-json";

// The ERP requirements library as data (CC BY 4.0), for agents and anyone building on it.
export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(erpRequirementsJson(), { headers: { "Cache-Control": "public, max-age=3600" } });
}
