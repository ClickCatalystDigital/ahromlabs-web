import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { mfgOgArt } from "@/lib/manufacturing-images";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage({ art: await mfgOgArt("manufacturing-hub"), title: "Production management software for job shops", description: "Choosing a system, QuickBooks for manufacturing, job costing and scheduling, for US job shops and small manufacturers." });
}
