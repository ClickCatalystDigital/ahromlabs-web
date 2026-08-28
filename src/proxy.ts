import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cross-checked against the ai-robots-txt project's live list, not guessed.
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "Bytespider",
  "CCBot",
  "Diffbot",
];

export function proxy(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  const bot = AI_CRAWLERS.find((name) => ua.includes(name));

  if (bot) {
    console.log(JSON.stringify({ event: "ai_crawler_hit", bot, path: request.nextUrl.pathname, ua }));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)",
};
