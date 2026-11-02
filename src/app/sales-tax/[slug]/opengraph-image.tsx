import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { stGuide, stGuides } from "@/lib/sales-tax";
import { stOgArt } from "@/lib/sales-tax-images";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return stGuides().map((g) => ({ slug: g.slug }));
}

export default async function Image(props: PageProps<"/sales-tax/[slug]">) {
  const g = stGuide((await props.params).slug)!;
  return renderOgImage({ title: g.title, description: g.question ?? g.answer, art: await stOgArt(g.slug) });
}
