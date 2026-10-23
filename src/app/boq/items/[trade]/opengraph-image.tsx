import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { trades, tradeBySlug, tradeItems } from "@/lib/boq";

export const alt = "Interior BOQ items · Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return trades.map((t) => ({ trade: t.slug }));
}

export default async function Image(props: PageProps<"/boq/items/[trade]">) {
  const t = tradeBySlug((await props.params).trade)!;
  return renderOgImage({
    title: `${t.name} BOQ items`,
    description: `${tradeItems(t.slug).map((i) => i.name).join(", ")}: unit, measurement and what each line must name.`,
  });
}
