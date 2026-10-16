// Central place for brand facts used across pages.
export const INSTAGRAM_HANDLE = "@theirs.mine.yours";
export const INSTAGRAM_URL = "https://www.instagram.com/theirs.mine.yours/";
export const CONTACT_EMAIL = "hello@theirsmineyours.com";

// Formspree form ID (the short code from the endpoint
// https://formspree.io/f/<id>). Enquiry forms POST here; if it's ever
// blanked out they fall back to a "DM us on Instagram" prompt.
export const FORMSPREE_ID = "mnjezygz";

// Google Analytics 4 measurement ID (GA → Admin → Data streams). It only
// loads on the live site (Vercel production), never in local dev or preview
// deployments, and never in the Studio. Set NEXT_PUBLIC_GA_ID to override it.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-FHQLFXLQGP";

// The site's public address, used for link previews, the sitemap and
// structured data. On Vercel this is the production domain automatically;
// set NEXT_PUBLIC_SITE_URL to override it.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// When the shop opens. Until then every page shows the coming-soon page
// (proxy.ts), and at this moment it switches over by itself, no deploy
// needed. Melbourne time (AEDT, +11:00). Set LAUNCH_AT in Vercel to move it
// without a code change.
export const LAUNCH_AT = process.env.LAUNCH_AT ?? "2026-10-16T14:00:00+11:00";

export const isLaunched = (now = Date.now()) => now >= Date.parse(LAUNCH_AT);
