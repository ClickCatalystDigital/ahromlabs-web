import type { ReactNode } from "react";

// Anchor id for an <h2>, so a contents list, a search result or an AI answer can
// link straight to the section. The contents list and the rendered heading both
// derive it from the same text, so they can't disagree.
export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return "";
}

export const markdownHeadings = (body: string) => [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());

// Question headings with the paragraph that answers them (the house rule: its first sentence answers the heading),
// as plain text for structured data. A section that opens with a table or a list is skipped.
export function markdownQuestions(body: string) {
  const plain = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*`]/g, "").replace(/\s+/g, " ").trim();
  return [...body.matchAll(/^## (.+\?)[ \t]*\n+([\s\S]*?)(?=\n[ \t]*\n|\n## |$(?![\s\S]))/gm)]
    .map((m) => ({ q: m[1].trim(), first: m[2].trim() }))
    .filter(({ first }) => first && !/^(\||-|\d+\.)/.test(first))
    .map(({ q, first }) => ({ q, a: plain(first) }));
}
