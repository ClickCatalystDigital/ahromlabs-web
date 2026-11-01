import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { asmeOgArt } from "@/lib/asme-images";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage({ art: await asmeOgArt("asme-hub"), title: "ASME Boiler and Pressure Vessel Code, in plain English", description: "Sections, stamps, welding qualifications, design rules and calculators, for shops in the US and India." });
}
