import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { asmeOgArt } from "@/lib/asme-images";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage({ title: "ASME questions, answered", description: "Short answers to what people ask about the ASME Boiler and Pressure Vessel Code.", art: await asmeOgArt("questions") });
}
