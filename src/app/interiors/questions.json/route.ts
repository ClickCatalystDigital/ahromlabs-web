import { NextResponse } from "next/server";
import { interiorsQuestions, libraryJson } from "@/lib/questions";

// The question library as data (CC BY 4.0), for agents and anyone building on it.
export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(libraryJson(interiorsQuestions()), { headers: { "Cache-Control": "public, max-age=3600" } });
}
