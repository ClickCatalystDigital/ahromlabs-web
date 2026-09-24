import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Industries | Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "Operational systems, built for real industries.",
    description:
      "Boiler manufacturing, electronics trading, interior design and furniture — each backed by a system in use.",
  });
}
