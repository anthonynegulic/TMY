import { isSanityConfigured } from "@/lib/sanity/config";
import StudioNotConfigured from "./StudioNotConfigured";
import Studio from "./Studio";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  // Without a project id the Studio throws on render; show what to do instead
  // so a site deployed before the CMS exists has no broken route.
  return isSanityConfigured ? <Studio /> : <StudioNotConfigured />;
}
