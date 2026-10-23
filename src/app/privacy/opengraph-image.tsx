import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Privacy policy · Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "Privacy policy", description: "How Ahrom Labs collects and uses personal data: website forms, outreach, meetings, analytics and client systems." });
}
