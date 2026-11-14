import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { getContent } from "@/lib/content";
import { ADAPTIVE } from "@/lib/markets";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return (ADAPTIVE.NA ?? []).filter((p) => p.startsWith("/industries/")).map((p) => ({ slug: p.slice("/industries/".length) }));
}

export default async function Image(props: PageProps<"/us/industries/[slug]">) {
  const { slug } = await props.params;
  const na = getContent("industry").find((i) => i.slug === slug)!.na!;
  return renderOgImage({ title: na.title, description: na.answer });
}
