import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { getContent } from "@/lib/content";

export const alt = "AI assistant guide · Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getContent("ai-assistant").map((g) => ({ slug: g.slug }));
}

export default async function Image(props: PageProps<"/ai-assistant/[slug]">) {
  const slug = (await props.params).slug;
  const g = getContent("ai-assistant").find((e) => e.slug === slug)!;
  return renderOgImage({ title: g.title, description: g.description ?? g.answer });
}
