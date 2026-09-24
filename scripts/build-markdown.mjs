#!/usr/bin/env node
// Markdown twin of every prerendered page, for agents that send
// `Accept: text/markdown` (Cloudflare's Agent Readiness "Markdown
// Negotiation" check; Claude Code and other coding agents already send it).
// Cloudflare's own Markdown-for-Agents conversion needs a Pro plan, so this
// does the same job at build time instead: it reads the HTML `next build`
// just prerendered, keeps only <main>, converts it, and writes
// public/md/<route>.md. src/proxy.ts rewrites markdown-preferring requests to
// those files; browsers never see them. Same URL, two representations — not a
// second set of pages (public/_headers marks /md/* noindex).
//
// Runs after `next build` (see package.json "build") and before OpenNext
// bundles public/ into Workers assets. Build-time only; never bundled.
import fs from "node:fs";
import path from "node:path";
import { NodeHtmlMarkdown } from "node-html-markdown";

const SITE = "https://ahromlabs.com";
const APP_DIR = path.join(process.cwd(), ".next/server/app");
const OUT_DIR = path.join(process.cwd(), "public/md");
const SKIP = new Set(["_global-error.html", "_not-found.html"]);

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) return htmlFiles(p);
    return d.name.endsWith(".html") && !SKIP.has(d.name) ? [p] : [];
  });
}

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const meta = (html, re) => decode(html.match(re)?.[1] ?? "");

function mainContent(html) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  return (
    main
      // Scripts (JSON-LD lives in the page, and in /knowledge.json) and the
      // decorative diagram carry nothing an agent should read as prose.
      .replace(/<script[\s\S]*?<\/script>/g, "")
      .replace(/<svg[\s\S]*?<\/svg>/g, "")
      // The contact form is a client component; point at the mailbox instead.
      .replace(/<form[\s\S]*?<\/form>/g, "<p>Contact: hello@ahromlabs.com</p>")
      // Images here are decorative (alt="").
      .replace(/<img[^>]*>/g, "")
      // Card links wrap a heading and a paragraph in one <a>; flattened, that
      // becomes one run-on link. Move the link onto the heading instead.
      .replace(/<a([^>]*?)href="([^"]*)"([^>]*)>([\s\S]*?)<\/a>/g, (whole, _a, href, _b, inner) =>
        /<(h[1-6]|p)\b/.test(inner)
          ? inner.replace(/<(h[1-6])([^>]*)>([\s\S]*?)<\/\1>/, `<$1$2><a href="${href}">$3</a></$1>`)
          : whole,
      )
      // Evidence lists (<dl>) read best as "label: value" bullets.
      .replace(/<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/g, "<li><strong>$1:</strong> $2</li>")
      .replace(/<dl\b[^>]*>/g, "<ul>")
      .replace(/<\/dl>/g, "</ul>")
  );
}

const nhm = new NodeHtmlMarkdown({ bulletMarker: "-" });

let count = 0;
fs.rmSync(OUT_DIR, { recursive: true, force: true });

for (const file of htmlFiles(APP_DIR)) {
  const rel = path.relative(APP_DIR, file).replace(/\.html$/, "");
  const route = rel === "index" ? "/" : `/${rel}`;
  const html = fs.readFileSync(file, "utf-8");

  const title = meta(html, /<title>([\s\S]*?)<\/title>/);
  const description = meta(html, /<meta name="description" content="([^"]*)"/);

  const body = nhm
    .translate(mainContent(html))
    // Root-relative links become absolute: a markdown copy is read out of
    // context, often with no base URL.
    .replace(/\]\(\//g, `](${SITE}/`)
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const doc = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `url: ${SITE}${route === "/" ? "" : route}`,
    description ? `description: ${JSON.stringify(description)}` : null,
    "---",
    "",
    body,
    "",
    "---",
    "",
    `Machine-readable: [llms.txt](${SITE}/llms.txt) · [knowledge.json](${SITE}/knowledge.json) · Contact: hello@ahromlabs.com`,
    "",
  ]
    .filter((line) => line !== null)
    .join("\n");

  const out = path.join(OUT_DIR, route === "/" ? "index.md" : `${rel}.md`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, doc);
  count++;
}

console.log(`markdown: wrote ${count} pages to ${path.relative(process.cwd(), OUT_DIR)}`);
