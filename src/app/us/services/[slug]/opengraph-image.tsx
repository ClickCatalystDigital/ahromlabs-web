import { ogImageSize } from "@/lib/og-image";
import { ADAPTIVE } from "@/lib/markets";
import Image from "../../../services/[slug]/opengraph-image";

// The same share card as /services/<slug>.
export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";
export default Image;

export function generateStaticParams() {
  return (ADAPTIVE.NA ?? []).filter((p) => p.startsWith("/services/")).map((p) => ({ slug: p.slice("/services/".length) }));
}
