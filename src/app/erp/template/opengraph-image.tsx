import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "ERP requirements template in Excel · Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "ERP requirements template in Excel", description: "Free RFP and vendor scorecard: priorities, vendor answers and scores in one sheet." });
}
