import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Interior BOQ format in Excel · Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "Interior BOQ format in Excel",
    description: "41 ready lines in 9 trades, each with its unit and how it is measured. Free template.",
  });
}
