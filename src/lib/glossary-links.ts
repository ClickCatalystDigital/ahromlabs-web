import { getContent, termHasPage } from "./content";

// Glossary links on first mention: the first time a page's text names a glossary term that has its own page, that
// mention links to /systems/<slug>. Once per term per page; never in a heading, an existing link or inline code, and
// not when the page already links that term itself. Names come from the term's title: "Heat number", and for
// "MAWP (maximum allowable working pressure)" both the short and the long form.

type Name = { re: RegExp; href: string };

// Parentheticals that describe rather than name the term.
const NOT_A_NAME = new Set(["stamp", "edit log"]);

let names: Name[] | undefined;
function termNames(): Name[] {
  if (names) return names;
  const out: Name[] = [];
  for (const t of getContent("term").filter(termHasPage)) {
    const [, main, paren] = t.title.match(/^(.+?)(?:\s*\((.+)\))?$/)!;
    for (const n of [main, paren]) {
      if (!n || NOT_A_NAME.has(n) || n.length < 3) continue;
      const escaped = n.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // An acronym matches only in capitals (MRP, not "mrp"); words match in any case.
      const acronym = /^[A-Z0-9-]+$/.test(n);
      out.push({ re: new RegExp(`(?<![\\w/-])${escaped}(?![\\w-])`, acronym ? "" : "i"), href: `/systems/${t.slug}` });
    }
  }
  // Longest names first, so "Material test certificate" wins over a shorter name inside it.
  return (names = out.sort((a, b) => b.re.source.length - a.re.source.length));
}

export function linkTerms(body: string, self?: string): string {
  const linked = new Set<string>(self ? [self] : []);
  for (const m of body.matchAll(/\]\((\/systems\/[^)#\s]+)/g)) linked.add(m[1]);
  // Mask what must not change (headings, links, inline code, HTML) with placeholders of the same length.
  const keep: string[] = [];
  const mask = (s: string) => {
    keep.push(s);
    return `\u0000${keep.length - 1}\u0001`.padEnd(s.length, "\u0002");
  };
  let text = body
    .replace(/^#{1,6} .*$/gm, mask)
    .replace(/!?\[[^\]]*\]\([^)]*\)/g, mask)
    .replace(/`[^`\n]*`/g, mask)
    .replace(/<[^>\n]+>/g, mask);
  for (const { re, href } of termNames()) {
    if (linked.has(href)) continue;
    const m = re.exec(text);
    if (!m) continue;
    linked.add(href);
    text = text.slice(0, m.index) + mask(`[${m[0]}](${href})`) + text.slice(m.index + m[0].length);
  }
  return text.replace(/\u0000(\d+)\u0001\u0002*/g, (_, i) => keep[Number(i)]);
}
