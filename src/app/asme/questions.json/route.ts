import { NextResponse } from "next/server";
import { asmeQuestionsJson } from "@/lib/asme";

// The ASME question library as data (CC BY 4.0), for agents and anyone building on it.
export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(asmeQuestionsJson(), { headers: { "Cache-Control": "public, max-age=3600" } });
}
