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
