// Search-result text that fits. Google shows roughly 60 characters of a title and 155–160 of a
// description; past that it cuts mid-word. Every page's metadata goes through these two.

const SUFFIX = " | Ahrom Labs"; // the layout's title template

// A title that would run past 60 characters with the suffix drops the suffix instead: the page's own
// words matter more in a cut-off result than the brand, which the URL already shows.
export function seoTitle(title: string): string | { absolute: string } {
  return title.length + SUFFIX.length > 60 ? { absolute: title } : title;
}

// Whole sentences up to 158 characters. If that would leave under 110 (a short first sentence and a long
// second), the text is filled to the limit and cut at a word with "…".
export function metaDescription(text: string, max = 158): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const sentences = flat.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [flat];
  let out = "";
  for (const s of sentences) {
    if ((out + s).trim().length > max) break;
    out += s;
  }
  out = out.trim();
  // Whole sentences, unless they leave a short line (under 110): then fill to the limit and cut at a word.
  if (out.length >= 110) return out;
  const cut = flat.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—–-]$/, "")}…`;
}
