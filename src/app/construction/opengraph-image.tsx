import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { conOgArt } from "@/lib/construction-images";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage({ art: await conOgArt("construction-hub"), title: "Construction billing and job cost guides", description: "Pay applications, retainage, lien waivers and WIP in the US; RA bills, measurement book, TDS and GST on works contracts in India." });
}
