export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2024-10-01";

/**
 * The site runs without Sanity: until a project id is set, the shop reads the
 * checked-in fallback list in lib/products.ts. This lets the repo build and
 * deploy before the CMS exists, and keeps it working if Sanity is ever removed.
 */
export const isSanityConfigured = projectId.length > 0;
