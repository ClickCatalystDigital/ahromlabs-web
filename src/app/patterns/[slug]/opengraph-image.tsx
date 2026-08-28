import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { getContent } from "@/lib/content";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getContent("pattern").map((pattern) => ({ slug: pattern.slug }));
}

export default async function Image(props: PageProps<"/patterns/[slug]">) {
  const { slug } = await props.params;
  const pattern = getContent("pattern").find((p) => p.slug === slug)!;
  return renderOgImage({ title: pattern.title, description: pattern.answer });
}
