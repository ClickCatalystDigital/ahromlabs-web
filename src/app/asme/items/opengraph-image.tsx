import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { asmeOgArt } from "@/lib/asme-images";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage({ title: "Boiler and pressure vessel materials list", description: "ASME specifications with P-numbers, IBR 2026 status and a pipe size chart.", art: await asmeOgArt("p-numbers") });
}
