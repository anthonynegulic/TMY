# Launch stories for Instagram

Four animated stories for the website launch, ready to post. Each is a
1080×1920 MP4 (H.264, 30fps) with a silent soundtrack, so add music in
Instagram.

| File | Length | What it is | When to post |
| --- | --- | --- | --- |
| `videos/1-teaser.mp4` | 8.5s | "Gold that's already lived a little", three hero pieces pinned in, then "Something's coming · Friday 16 Oct" | Early in launch week |
| `videos/2a-site-demo-launching-friday.mp4` | 16.5s | Logo intro, then the real site on a phone: homepage, tap into Stevie, "I want this one", the archive. Ends on "Launching Friday 16 Oct" | The day or two before launch |
| `videos/2b-site-demo-now-live.mp4` | 16.5s | Same demo, ends on "Now live. Come and have a look" | Launch day |
| `videos/3-were-open.mp4` | 8.5s | "We're open." with ten pieces dealt out like cards, then "When it's gone, it's gone. Shop now" | Launch day, first thing |

## Posting tips

- **Link sticker:** each end card leaves clear space under the
  theirsmineyours.com line. Drop the link sticker there.
- **Music:** add it in Instagram. The videos are silent on purpose so a
  trending track can go on top.
- **Stay clear of the edges:** Instagram covers the top and bottom of a story
  with its own bars. The words are kept out of those strips, so don't move the
  video around when posting.

## Changing them

The stories are drawn from the live site, so if a piece sells (Stevie is the
one the demo taps into), the date moves, or the site changes, re-make them:

```bash
cd marketing/instagram-stories
npm install
npx playwright install chromium        # first time only
NODE_USE_ENV_PROXY=1 npm run capture   # fresh screenshots + photos from theirsmineyours.com
npm run render                          # all four videos into videos/
```

- **Different launch date:** `DATE="Saturday 17 Oct" npm run render`
- **Different piece in the demo:** change `PIECE` in `capture.mjs` (it has to
  be one of the pieces pinned in the homepage hero)
- **Words, colours, timing:** all in `stories.html`. Check single frames
  without a full render: `node render.mjs demo-soon stills 4,9,15`

Needs Node 20+ and `ffmpeg`. Capturing opens the reserve form on the product
page to film it, but never submits it.
