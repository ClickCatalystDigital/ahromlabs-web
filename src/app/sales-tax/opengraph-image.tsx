import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { stOgArt } from "@/lib/sales-tax-images";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage({ art: await stOgArt("sales-tax-hub"), title: "US sales tax for manufacturers and distributors", description: "Economic nexus by state, resale and exemption certificates, the manufacturing exemption and use tax, with a nexus checker." });
}
