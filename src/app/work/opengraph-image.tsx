import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Work | Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "The businesses we've built systems for.",
    description:
      "LS Technologies, Savistar & Saag, a boiler and pressure-vessel manufacturer — and what each system actually does.",
  });
}
