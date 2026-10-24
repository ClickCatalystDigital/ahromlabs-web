import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "ERP requirements checklist · Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "ERP requirements checklist", description: "Testable requirements by department for Indian manufacturers and traders, with the GST and company-law rules quoted." });
}
