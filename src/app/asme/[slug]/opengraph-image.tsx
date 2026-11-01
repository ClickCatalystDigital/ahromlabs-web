import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { asmeGuide, asmeGuides } from "@/lib/asme";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return asmeGuides().map((g) => ({ slug: g.slug }));
}

export default async function Image(props: PageProps<"/asme/[slug]">) {
  const g = asmeGuide((await props.params).slug)!;
  return renderOgImage({ title: g.title, description: g.question ?? g.answer });
}
