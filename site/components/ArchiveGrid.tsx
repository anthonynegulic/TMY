import ProductPhoto from "@/components/ProductPhoto";
import { getProducts } from "@/lib/catalog";
import { productPath } from "@/lib/products";

export default async function ArchiveGrid() {
  const products = (await getProducts()).filter((p) => !p.sold).slice(0, 8);
  return (
    <section id="shop" className="container archive">
      <div className="archive-head">
        <div>
          <h2 className="archive-title">Recently unearthed</h2>
        </div>
        <a href="/shop" className="tmy-link text-link">
          See the whole archive →
        </a>
      </div>

      <div className="archive-grid">
        {products.map((p) => (
          <a
            key={p.slug}
            href={productPath(p)}
            className={`tmy-card product${p.size ? ` product-${p.size}` : ""}${p.sold ? " product-is-sold" : ""}`}
          >
            <div className="product-block" style={{ background: p.color }}>
              {p.image ? (
                <ProductPhoto src={p.image} alt={p.name} rotate={p.rotate} />
              ) : (
                <div className="hatch hatch-sm product-hatch">
                  <span>product shot</span>
                </div>
              )}
              <div
                className="tag-chip product-chip"
                style={{ "--chip-tilt": `${p.tilt}deg` } as React.CSSProperties}
              >
                <span className="tag-hole" />
                {p.era}
              </div>
              {p.sold ? (
                <span className="product-sold-chip">SOLD</span>
              ) : (
                <span className="product-dot" title="available" />
              )}
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
