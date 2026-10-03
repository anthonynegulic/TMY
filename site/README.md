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
- `components/` — Header, Hero, WaveDivider, StoryBand, ArchiveGrid, PriceBand, About, Footer
- `lib/products.ts` — placeholder product data for the archive grid (swap for real inventory / commerce API later)

Fonts (Bricolage Grotesque, Instrument Serif) are self-hosted via `next/font`.

## Editing products (Sanity CMS)

Pieces live in Sanity, not in code. The ladies add and edit them at
`/studio` (theirsmineyours.com/studio): photos, price, gold, description,
a Sold switch and ordering. The site picks up changes within about a minute.

- Project ID `wpulke7o`, dataset `production` (`lib/sanity/env.ts`)
- Schema: `sanity/schemaTypes/product.ts`; studio config: `sanity.config.ts`
- Data layer: `lib/catalog.ts` (falls back to the bundled pieces in
  `lib/products.ts` if Sanity is unreachable or empty)
- Photos uploaded in the Studio are turned 90 degrees clockwise on the site
  (`components/ProductPhoto.tsx`), matching the bundled photos
- One-off import of the first 8 pieces: `scripts/import-products.mjs`
