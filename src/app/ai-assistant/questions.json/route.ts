import { NextResponse } from "next/server";
import { aiQuestionsJson } from "@/lib/ai-assistant";

// The AI assistant question library as data (CC BY 4.0), for agents and anyone building on it.
export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(aiQuestionsJson(), { headers: { "Cache-Control": "public, max-age=3600" } });
}
