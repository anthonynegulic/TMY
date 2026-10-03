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
            <img src="/products/ruby-gypsy-ring.jpg" alt="Gold gypsy ring set with a ruby" className="hero-tag-img" />
            <div className="tag-chip">
              <span className="tag-hole" />
              18K
            </div>
            <div className="hero-tag-name">Ruby gypsy ring</div>
          </div>
          <div className="hero-tag hero-tag-2">
            <img src="/products/lattice-dome-ring.jpg" alt="Gold and diamond lattice dome ring" className="hero-tag-img" />
            <div className="tag-chip tag-chip-sm">
              <span className="tag-hole" />
              18K
            </div>
            <div className="hero-tag-name">Lattice dome ring</div>
          </div>
          <div className="hero-tag hero-tag-3">
            <img src="/products/sapphire-halo-ring.jpg" alt="Sapphire halo ring in gold" className="hero-tag-img" />
            <div className="tag-chip tag-chip-sm">
              <span className="tag-hole" />
              18K
            </div>
            <div className="hero-tag-name">Sapphire halo</div>
          </div>
          <div className="collage-caption">pinned from the archive ↑</div>
        </div>
      </div>
    </section>
  );
}
