import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./config";

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Published content only, served from the CDN. Drafts stay invisible to
      // the site until someone hits Publish in the Studio.
      useCdn: true,
      perspective: "published",
    })
  : null;
