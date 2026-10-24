import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "ERP requirements for Indian manufacturers and traders · Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "ERP requirements for Indian manufacturers and traders",
    description: "A free checklist, Excel template and builder, with a vendor test for every line and the GST and company-law rules quoted.",
  });
}
