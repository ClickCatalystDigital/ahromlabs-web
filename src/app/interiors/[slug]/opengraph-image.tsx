import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { intGuide, intGuides } from "@/lib/interiors";
import { intOgArt } from "@/lib/interiors-images";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return intGuides().map((g) => ({ slug: g.slug }));
}

export default async function Image(props: PageProps<"/interiors/[slug]">) {
  const g = intGuide((await props.params).slug)!;
  return renderOgImage({ title: g.title, description: g.question ?? g.answer, art: await intOgArt(g.slug) });
}
