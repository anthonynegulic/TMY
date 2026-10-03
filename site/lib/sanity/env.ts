// Sanity project settings. These are public identifiers (not secrets), so
// they're safe to default here; override with env vars if they ever change.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "wpulke7o";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2025-01-01";
