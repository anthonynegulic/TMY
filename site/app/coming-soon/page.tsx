import type { Metadata } from "next";
import Logo from "@/components/Logo";
import WaveDivider from "@/components/WaveDivider";
import ProductPhoto from "@/components/ProductPhoto";
import Countdown from "@/components/Countdown";
import Analytics from "@/components/Analytics";
import { getHeroPieces } from "@/lib/catalog";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, LAUNCH_AT } from "@/lib/site";
import "../globals.css";

// Shown on every page until launch (see proxy.ts). Lives outside the (site)
// group so it gets no nav: every link would only lead back here.
const TAG_SIZES = ["250px", "184px", "168px"];
const TZ = "Australia/Melbourne";

// "Friday 16 October" and "2pm", in Melbourne time
function launchWhen() {
  const at = new Date(LAUNCH_AT);
  const day = new Intl.DateTimeFormat("en-AU", {
    weekday: "long", day: "numeric", month: "long", timeZone: TZ,
  }).format(at);
  const [h, m] = new Intl.DateTimeFormat("en-AU", {
    hour: "numeric", minute: "2-digit", hour12: true, timeZone: TZ,
  }).format(at).replace(/\s/g, "").split(":");
  const time = m.startsWith("00") ? h + m.slice(2) : `${h}:${m}`;
  return { day, time: time.toLowerCase() };
}

export async function generateMetadata(): Promise<Metadata> {
  const { day, time } = launchWhen();
  return {
    title: `Opening ${day}`,
    description: `Solid-gold pieces, hand-picked from other lives and other decades. The shop opens ${day} at ${time}.`,
  };
}

export default async function ComingSoon() {
  const pinned = await getHeroPieces();
  const { day, time } = launchWhen();
  return (
    <div className="soon-page">
      <header className="masthead">
        <div className="container masthead-inner">
          <span className="brand">
            <Logo className="brand-logo" />
            <span className="brand-name">Theirs. Mine. Yours.</span>
          </span>
        </div>
      </header>

      <main className="container hero soon">
        <div className="hero-grid">
          <div>
            <div className="tag-chip soon-chip">
              <span className="tag-hole" />
              Opening {day} · {time}
            </div>
            <h1 className="hero-title">
              Something&#39;s <em className="accent">coming</em>.
            </h1>
            <p className="hero-lede">
              Solid-gold pieces, hand-picked from other lives and other
              decades. The shop opens {day} at {time}. Every piece is one of
              one, so when it&#39;s gone, it&#39;s gone.
            </p>
            <Countdown launchAt={LAUNCH_AT} />
            <div className="hero-ctas">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-dark">
                Follow {INSTAGRAM_HANDLE}
              </a>
              <span className="soon-note">for first dibs on launch day</span>
            </div>
          </div>

          {pinned.length > 0 && (
            <div className="hero-collage" aria-label="A sneak peek at three pieces">
              {pinned.map((p, i) => (
                <div
                  key={p.slug}
                  className={`hero-tag hero-tag-${i + 1}`}
                  style={{ background: p.color }}
                >
                  {p.image && (
                    <ProductPhoto photo={p.image} alt={p.name} sizes={TAG_SIZES[i]} eager />
                  )}
                  <div className={`tag-chip${i > 0 ? " tag-chip-sm" : ""}`}>
                    <span className="tag-hole" />
                    {p.era}
                  </div>
                  <div className="hero-tag-name">{p.name}</div>
                </div>
              ))}
              <div className="collage-caption">a sneak peek ↑</div>
            </div>
          )}
        </div>
      </main>

      <footer className="footer-wrap">
        <WaveDivider fill="#F7DCE6" bg="#7A2E2B" />
        <div className="footer">
          <div className="container">
            <div className="footer-cta">
              <div className="footer-cta-title">
                First dibs drop on Instagram. When it&#39;s gone, it&#39;s gone.
              </div>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-lime">
                Follow {INSTAGRAM_HANDLE}
              </a>
            </div>
            <div className="footer-legal">
              <span>© 2026 Theirs. Mine. Yours. · curated preloved fine jewellery</span>
              <a href={`mailto:${CONTACT_EMAIL}`} className="soon-email">{CONTACT_EMAIL}</a>
            </div>
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}
