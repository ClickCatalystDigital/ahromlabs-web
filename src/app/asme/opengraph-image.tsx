import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "ASME Boiler and Pressure Vessel Code, in plain English", description: "Sections, stamps, welding qualifications, design rules and calculators, for shops in the US and India." });
}
