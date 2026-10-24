import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { getContent } from "@/lib/content";

export const alt = "ERP requirements guide · Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getContent("erp").map((g) => ({ slug: g.slug }));
}

export default async function Image(props: PageProps<"/erp/[slug]">) {
  const slug = (await props.params).slug;
  const g = getContent("erp").find((e) => e.slug === slug)!;
  return renderOgImage({ title: g.title, description: g.description ?? g.answer });
}
