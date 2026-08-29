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

## Linking the domain (Cloudflare → Vercel)

`scripts/link-domain.mjs` adds the apex and `www` hosts to the Vercel project,
creates the matching DNS records in Cloudflare unproxied, sets the redirect
between them, and polls until Vercel reports the domain configured.

You need two scoped tokens:

- **Cloudflare** — My Profile → API Tokens → Create Token → Custom, with
  `Zone:Read` and `Zone:DNS:Edit` limited to the one zone.
- **Vercel** — Account Settings → Tokens, scoped to the team that owns the project.

Enter the tokens with `read -s` so they stay out of your shell history:

```bash
cd site
read -rsp "Cloudflare token: " CLOUDFLARE_API_TOKEN && echo
read -rsp "Vercel token: " VERCEL_TOKEN && echo
export CLOUDFLARE_API_TOKEN VERCEL_TOKEN
```

Then it is a dry run unless you pass `--apply`:

```bash
DOMAIN=example.com VERCEL_PROJECT=your-project-name npm run link-domain
DOMAIN=example.com VERCEL_PROJECT=your-project-name npm run link-domain -- --apply
```

Close the terminal tab when you are done and the exported tokens are gone.

Options, all via environment variables:

| Variable | Default | Purpose |
|---|---|---|
| `DOMAIN` | — | The apex domain, e.g. `example.com` (not `www.`, no scheme) |
| `VERCEL_PROJECT` | `.vercel/project.json` | Project name or id |
| `VERCEL_TEAM_ID` | from `.vercel/project.json` | Needed for team-owned projects |
| `PRIMARY` | `apex` | `apex` or `www` — the other one 308s to it |
| `VERCEL_A_RECORD` | `216.198.79.1` | Override with whatever Vercel's dashboard shows |
| `VERCEL_CNAME_TARGET` | `cname.vercel-dns.com` | Same — Vercel issues per-project targets |

Flags: `--apply` to make changes, `--replace` to overwrite conflicting existing
A/AAAA/CNAME records on `@` or `www` (without it the script reports them and
stops), and `--reissue` to drop and re-add any host that is not serving a
certificate covering it.

`--reissue` exists because Vercel stops retrying certificate issuance for a
domain that was added while its DNS did not resolve, and nothing restarts it —
the host stays `misconfigured: false` while browsers reject it with
`ERR_CERT_COMMON_NAME_INVALID`. Removing and re-adding the domain is what kicks
issuance off again. Verification checks the served certificate for both hosts,
not just Vercel's DNS view, so this state cannot be reported as success.

Records are created **unproxied (grey cloud)** deliberately: with Cloudflare's
proxy on, Vercel can't complete its certificate challenge, and Cloudflare's
`Flexible` SSL mode causes a redirect loop against Vercel's HTTPS redirect. The
script warns if the zone is set to `Flexible`.
