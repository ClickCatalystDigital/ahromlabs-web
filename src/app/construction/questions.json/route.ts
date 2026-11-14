import { NextResponse } from "next/server";
import { constructionQuestions, libraryJson } from "@/lib/questions";

// The question library as data (CC BY 4.0), for agents and anyone building on it.
export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(libraryJson(constructionQuestions()), { headers: { "Cache-Control": "public, max-age=3600" } });
}
