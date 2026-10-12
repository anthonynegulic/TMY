// Captures what the stories need from the live site into ./assets:
// phone-size screenshots of the homepage, a product page (before and after
// tapping "I want this one"), the shop, where to draw the taps, and the ring
// photos. Also splits the TMY lettermark into its three letters.
//
//   node capture.mjs
//
// Nothing is submitted: the reserve form is opened, never sent.
import { chromium } from "playwright";
import fs from "fs";

const SITE = "https://theirsmineyours.com";
const PIECE = "stevie"; // the hero piece the demo taps into
const PHOTOS = ["stevie", "maria", "francine", "odette", "fern", "gwen", "celeste", "fleur", "cleo", "joanie"];
const OUT = new URL("./assets/", import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });

// The lettermark from the site header, one path per letter (T, M, Y)
const logoSrc = fs.readFileSync(new URL("../../site/components/Logo.tsx", import.meta.url), "utf8");
const d = logoSrc.match(/d="([^"]+)"/)[1];
const [first, ...rest] = d.split(" M ");
fs.writeFileSync(OUT + "logo.json", JSON.stringify([first, ...rest.map((x) => "M " + x)]));

const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
const browser = await chromium.launch({ proxy });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});

// Load a page and scroll through it so every lazy-loaded photo is in
async function load(path) {
  for (let i = 0; i < 4; i++) {
    const res = await page.goto(SITE + path, { waitUntil: "networkidle" });
    if (res.ok()) break;
    await page.waitForTimeout(3000);
  }
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 300) {
    await page.evaluate((y) => scrollTo(0, y), y);
    await page.waitForTimeout(120);
  }
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(800);
}
const shot = (name, height) =>
  page.screenshot({ path: OUT + name, fullPage: true, clip: { x: 0, y: 0, width: 390, height } });

const geo = {};
await load("/");
geo.homeStevie = await page.locator(`a.hero-tag[href="/shop/${PIECE}"]`).first().boundingBox();
await shot("home.png", 2400);

await load(`/shop/${PIECE}`);
const reserve = page.locator('button:has-text("I want this one")').first();
geo.reserve = await reserve.boundingBox();
await shot("prod.png", 1700);
await reserve.click();
await page.waitForTimeout(600);
await shot("prod-open.png", 1700);

await load("/shop");
await shot("shop.png", 4200);
const photos = await page.evaluate(() =>
  Object.fromEntries(
    [...document.querySelectorAll('a[href^="/shop/"]')]
      .map((a) => [a.getAttribute("href").split("/").pop(), a.querySelector("img")?.currentSrc])
      .filter(([, src]) => src),
  ),
);
fs.writeFileSync(OUT + "geo.json", JSON.stringify(geo, null, 1));
await browser.close();

for (const name of PHOTOS) {
  if (!photos[name]) {
    console.warn(`no photo for ${name} (sold or renamed?)`);
    continue;
  }
  const res = await fetch(photos[name].replace(/&w=\d+/, "&w=1200"));
  fs.writeFileSync(OUT + name + ".jpg", Buffer.from(await res.arrayBuffer()));
}
console.log("captured", Object.keys(geo).join(", "));
