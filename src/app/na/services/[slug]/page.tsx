import type { Metadata } from "next";
import ServiceOrFamilyPage, { generateMetadata as metadataFor } from "../../../services/[slug]/page";
import { ADAPTIVE } from "@/lib/markets";

// North America's version of the service pages listed in ADAPTIVE.NA (src/lib/markets.ts), served at
// /services/<slug> by src/proxy.ts. Same page, US words, US prices before the closing call to action.
export const dynamicParams = false;

export function generateStaticParams() {
  return (ADAPTIVE.NA ?? []).filter((p) => p.startsWith("/services/")).map((p) => ({ slug: p.slice("/services/".length) }));
}

// Same params shape as /services/[slug], whose metadata (canonical included) this reuses.
type Props = PageProps<"/services/[slug]">;
export const generateMetadata = (props: Props): Promise<Metadata> => metadataFor(props);

export default function Page(props: Props) {
  return <ServiceOrFamilyPage {...props} market="NA" />;
}
