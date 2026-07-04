export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-cta">
          <div className="footer-cta-title">
            First dibs drop on Instagram — when it&#39;s gone, it&#39;s gone.
          </div>
          <a href="#contact" className="btn-lime">
            Follow @theirs.mine.yours
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
            <a href="#shop" className="tmy-link">Shop all</a>
            <br />
            <a href="#shop" className="tmy-link">Shop by price</a>
            <br />
            <a href="#about" className="tmy-link">About</a>
            <br />
            <a href="#contact" className="tmy-link">Contact</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Say hello</div>
            <a href="#contact" className="tmy-link">Instagram</a>
            <br />
            <a href="#contact" className="tmy-link">Depop</a>
            <br />
            <a href="#contact" className="tmy-link">hello@theirsmineyours.com</a>
            <br />
            <span className="footer-note">
              Enquiries on hard-to-find pieces welcome.
            </span>
          </div>
        </div>

        <div className="footer-legal">
          <span>© 2026 Theirs. Mine. Yours. — curated preloved fine jewellery</span>
          <span>Solid gold only · One of one · Made with love (and on mat leave)</span>
        </div>
      </div>
    </footer>
  );
}
