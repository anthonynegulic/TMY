# Theirs. Mine. Yours. — website

Next.js implementation of the homepage designed in Claude Design
(see `../project/Homepage.dc.html` for the original prototype and
`../chats/` for the design intent).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Structure

- `app/page.tsx` — homepage composition
- `app/globals.css` — the design system (palette, type, all section styles, responsive breakpoints)
- `components/` — Header, Hero, WaveDivider, StoryBand, ArchiveGrid, PriceBand, About, Footer,
  plus ProductCard (one piece in any grid) and ProductGallery (product photos and zoom)
- `lib/products.ts` — placeholder product data for the archive grid (swap for real inventory / commerce API later)

Fonts (Bricolage Grotesque, Instrument Serif) are self-hosted via `next/font`.

The logo lives in `assets/brand/tmy-logo.png`. The header uses a traced
vector of its lettering (`components/Logo.tsx`), and the browser-tab and
home-screen icons (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`)
are made from the full logo.

## Editing products (Sanity CMS)

Pieces live in Sanity, not in code. The ladies add and edit them at
`/studio` (theirsmineyours.com/studio): photos, price, gold, description,
a Sold switch and ordering. The site picks up changes within about a minute.

- Project ID `wpulke7o`, dataset `production` (`lib/sanity/env.ts`)
- Schema: `sanity/schemaTypes/product.ts`; studio config: `sanity.config.ts`
- Data layer: `lib/catalog.ts`. If Sanity can't be reached, the live site
  keeps serving the last good version of each page. The bundled pieces in
  `lib/products.ts` are only used in `npm run dev`, or in a production build
  when `USE_BUNDLED_PRODUCTS=1` is set (e.g. building without network access)
- Each photo has a "Turn photo" setting in the Studio for sideways or
  upside-down shots (`components/ProductPhoto.tsx`). The first 8 imported
  pieces default to a quarter turn right; everything else defaults to as
  uploaded
- "Show in the homepage hero" picks the pieces pinned in the hero (and the
  site's share image): first three ticked by Position, sold ones left out.
  If nothing is ticked, the first three available pieces show
- Card borders take turns in blue, lime and maroon by each card's place in
  the grid (`globals.css`), so there's nothing to set. The old "Card colour"
  setting is hidden in the Studio
- Ring size: end the "Short detail line" with "Size R" (or "Size N.5") and the
  product page shows it on its own Ring size row
- "I want this one" on a product page sends a reservation request through the
  same Formspree form as enquiries (subject "TMY reservation — <piece>")
- One-off import of the first 8 pieces: `scripts/import-products.mjs`

## Coming soon (until launch)

Until `LAUNCH_AT` in `lib/site.ts` (Friday 16 October 2026, 2pm Melbourne
time), every page shows `app/coming-soon/page.tsx` at its own address: a
countdown, three pinned pieces and a follow button. `proxy.ts` does the
switching, so at launch the real shop appears by itself with no deploy, and
anyone sitting on the countdown is reloaded into it. The Studio, photos and
link previews are never blocked.

- **Preview the real shop before launch:** set `PREVIEW_KEY` in Vercel
  (Settings → Environment Variables, Production) to any password, redeploy,
  then visit `theirsmineyours.com/?preview=<that password>` once per browser.
  Without `PREVIEW_KEY` there's no way in until launch
- **Move the launch:** set `LAUNCH_AT` in Vercel (e.g.
  `2026-10-17T10:00:00+11:00`) and redeploy. The page is built ahead of time,
  so the countdown only picks up a new time after a redeploy
- **After launch** `proxy.ts`, `app/coming-soon/`, `components/Countdown.tsx`
  and the "coming soon" styles in `globals.css` can be deleted

## Analytics (Google Analytics 4)

- Measurement ID `G-FHQLFXLQGP` is set as `GA_ID` in `lib/site.ts`
  (override with `NEXT_PUBLIC_GA_ID`). The tag (`components/Analytics.tsx`)
  loads only on the live site, never in `npm run dev`, preview deployments or
  the Studio
- Page views, scrolls and outbound clicks come from GA's Enhanced measurement
- Our own events (`lib/analytics.ts`): `reserve_click` when "I want this one"
  is opened, and `generate_lead` when an enquiry or reservation actually sends
  (`form_type` is `enquiry` or `reservation`, `piece` is the piece's name)

## Link previews and search

- Sharing any page shows `app/opengraph-image.tsx`; sharing a piece shows its
  own card from `app/(site)/shop/[slug]/share.png/route.tsx` (main photo,
  turned as set in the Studio, with the name and price)
- Both are drawn with the brand fonts in `assets/fonts` (SIL Open Font
  License, `.woff` because the image renderer can't read `.woff2`)
- `app/sitemap.ts`, `app/robots.ts` (keeps `/studio` out of search), and
  product structured data on each piece's page
- The site address comes from `SITE_URL` in `lib/site.ts`: on Vercel it's the
  production domain automatically; set `NEXT_PUBLIC_SITE_URL` to override

