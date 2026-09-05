import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { getContent, termHasPage } from "@/lib/content";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

// Dynamic-segment opengraph-image files need their own generateStaticParams in
// this pipeline — they do not inherit the sibling page's. See SYSTEM.md.
export function generateStaticParams() {
  return getContent("term").filter(termHasPage).map((term) => ({ slug: term.slug }));
}

export default async function Image(props: PageProps<"/systems/[slug]">) {
  const { slug } = await props.params;
  const term = getContent("term").find((t) => t.slug === slug)!;
  return renderOgImage({ title: term.title, description: term.answer });
}
