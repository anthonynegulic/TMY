export default function Hero() {
  return (
    <section className="container hero">
      <div className="hero-grid">
        <div>
          <h1 className="hero-title">
            Gold that&#39;s already <em className="accent">lived</em> a little.
          </h1>
          <p className="hero-lede">
            Solid-gold pieces, hand-picked from other lives and other
            decades. No reproductions, no two the same. Just the one
            that&#39;s about to be yours.
          </p>
          <div className="hero-ctas">
            <a href="/shop" className="btn-dark">
              Shop the collection
            </a>
            <a href="/story" className="tmy-link text-link">
              Read the name&#39;s story
            </a>
          </div>
        </div>

        <div className="hero-collage">
          <div className="hero-tag hero-tag-1">
            <div className="hatch" />
            <div className="lot-chip">
              <span className="lot-hole" />
              LOT 14 · 18k
            </div>
            <div className="hero-tag-name">Byzantine bracelet</div>
            <div className="hero-tag-price">$1,250</div>
          </div>
          <div className="hero-tag hero-tag-2">
            <div className="hatch" />
            <div className="lot-chip lot-chip-sm">
              <span className="lot-hole" />
              LOT 07 · 14k
            </div>
            <div className="hero-tag-name">Bombé ring</div>
          </div>
          <div className="hero-tag hero-tag-3">
            <div className="hatch" />
            <div className="lot-chip lot-chip-sm">
              <span className="lot-hole" />
              LOT 22 · 9k
            </div>
            <div className="hero-tag-name">Curb chain</div>
          </div>
          <div className="collage-caption">pinned from the archive ↑</div>
        </div>
      </div>
    </section>
  );
}
