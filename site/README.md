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
- One-off import of the first 8 pieces: `scripts/import-products.mjs`

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

