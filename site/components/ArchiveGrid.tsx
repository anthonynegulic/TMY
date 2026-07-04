import { products } from "@/lib/products";

export default function ArchiveGrid() {
  return (
    <section id="shop" className="container archive">
      <div className="archive-head">
        <div>
          <div className="kicker archive-kicker">
            ✦&nbsp;&nbsp;45 in the collection
          </div>
          <h2 className="archive-title">Recently unearthed</h2>
        </div>
        <a href="#shop" className="tmy-link text-link">
          See the whole archive →
        </a>
      </div>

      <div className="archive-grid">
        {products.map((p) => (
          <a
            key={p.lot}
            href="#shop"
            className={`tmy-card product${p.size ? ` product-${p.size}` : ""}`}
          >
            <div className="product-block" style={{ background: p.color }}>
              <div className="hatch hatch-sm product-hatch">
                <span>product shot</span>
              </div>
              <div
                className="lot-chip product-chip"
                style={p.tilt ? { transform: `rotate(${p.tilt}deg)` } : undefined}
              >
                <span className="lot-hole" />
                LOT {p.lot} · {p.era}
              </div>
              <span className="product-dot" title="available" />
            </div>
            <div className="product-row">
              <div className="product-name">{p.name}</div>
              <div className="product-price">{p.price}</div>
            </div>
            <div className="product-meta">{p.meta}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
