// Renders a story from stories.html, frame by frame, into a 1080x1920 MP4.
//
//   node render.mjs teaser|demo-soon|demo-live|open videos/out.mp4
//   node render.mjs demo-soon stills 1.5,6,14     (PNG frames for checking)
//
// Every frame is drawn from its timestamp, so renders are smooth and repeatable.
import { chromium } from "playwright";
import fs from "fs";
import { spawn } from "child_process";

const DIR = new URL(".", import.meta.url).pathname;
const [story, mode, arg] = process.argv.slice(2);
const output = mode; // anything but "stills" is the MP4 path
const html = fs
  .readFileSync(DIR + "stories.html", "utf8")
  .replace("__LOGO__", fs.readFileSync(DIR + "assets/logo.json", "utf8"))
  .replace("__GEO__", fs.readFileSync(DIR + "assets/geo.json", "utf8"));
fs.writeFileSync(DIR + "stories.built.html", html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
page.on("pageerror", (e) => console.error("page error:", e.message));
const date = process.env.DATE ? `&date=${encodeURIComponent(process.env.DATE)}` : "";
await page.goto(`file://${DIR}stories.built.html?s=${story}${date}`);
await page.evaluate(() => window.ready);
const duration = await page.evaluate(() => window.DURATION);

if (mode === "stills") {
  fs.mkdirSync(DIR + "stills", { recursive: true });
  for (const t of arg.split(",").map(Number)) {
    await page.evaluate((t) => window.seek(t), t);
    await page.screenshot({ path: `${DIR}stills/${story}-${t.toFixed(2)}.png` });
  }
} else {
  const FPS = 30;
  const frames = Math.round(duration * FPS);
  // H.264 + a silent AAC track: what Instagram expects, and they add music in the app
  const ff = spawn(
    "ffmpeg",
    ["-loglevel", "error", "-y", "-f", "image2pipe", "-framerate", String(FPS), "-i", "-",
      "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo", "-shortest",
      "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p", "-profile:v", "high",
      "-r", String(FPS), "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", output],
    { stdio: ["pipe", "inherit", "inherit"] },
  );
  for (let i = 0; i < frames; i++) {
    await page.evaluate((t) => window.seek(t), i / FPS);
    const buf = await page.screenshot({ type: "png" });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
  }
  ff.stdin.end();
  await new Promise((r) => ff.on("close", r));
  console.log("wrote", output, `(${frames} frames)`);
}
await browser.close();
