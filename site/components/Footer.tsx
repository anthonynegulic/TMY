import Link from "next/link";
import WaveDivider from "@/components/WaveDivider";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <WaveDivider fill="#F7DCE6" bg="#2B211A" />
      <div className="footer">
        <div className="container">
          <div className="footer-cta">
            <div className="footer-cta-title">
              First dibs drop on Instagram. When it&#39;s gone, it&#39;s gone.
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime"
            >
              Follow {INSTAGRAM_HANDLE}
            </a>
          </div>

          <div className="footer-grid">
            <div className="footer-wordmark">
              Theirs.
              <br />
              Mine.
              <br />
              Yours.
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Browse</div>
              <Link href="/shop" className="tmy-link">Shop all</Link>
              <br />
              <Link href="/#price" className="tmy-link">Shop by price</Link>
              <br />
              <Link href="/story" className="tmy-link">The story</Link>
              <br />
              <Link href="/about" className="tmy-link">About</Link>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Say hello</div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="tmy-link"
              >
                Instagram
              </a>
              <br />
              <Link href="/contact" className="tmy-link">Contact us</Link>
              <br />
              <a href={`mailto:${CONTACT_EMAIL}`} className="tmy-link">
                {CONTACT_EMAIL}
              </a>
              <br />
              <span className="footer-note">
                Enquiries on hard-to-find pieces welcome.
              </span>
            </div>
          </div>

          <div className="footer-legal">
            <span>© 2026 Theirs. Mine. Yours. · curated preloved fine jewellery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
