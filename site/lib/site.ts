// Central place for brand facts used across pages.
export const INSTAGRAM_HANDLE = "@theirs.mine.yours";
export const INSTAGRAM_URL = "https://www.instagram.com/theirs.mine.yours/";
export const CONTACT_EMAIL = "hello@theirsmineyours.com";

// Formspree form ID (the short code from the endpoint
// https://formspree.io/f/<id>). Enquiry forms POST here; if it's ever
// blanked out they fall back to a "DM us on Instagram" prompt.
export const FORMSPREE_ID = "mnjezygz";

// The site's public address, used for link previews, the sitemap and
// structured data. On Vercel this is the production domain automatically;
// set NEXT_PUBLIC_SITE_URL to override it.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
