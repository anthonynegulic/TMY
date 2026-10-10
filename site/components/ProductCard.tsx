import Link from "next/link";
import ProductPhoto from "@/components/ProductPhoto";
import { productPath, type Product } from "@/lib/products";

// One piece in a grid (homepage, shop, "More from the archive"). `plain`
// ignores the piece's big/wide card size, for rows of equal cards.
export default function ProductCard({
  product: p,
  plain = false,
}: {
  product: Product;
  plain?: boolean;
}) {
  const size = plain ? undefined : p.size;
  const sizes = size
    ? "(max-width: 760px) 100vw, (max-width: 1024px) 66vw, 600px"
    : "(max-width: 760px) 50vw, (max-width: 1024px) 33vw, 300px";
  return (
    <Link
      href={productPath(p)}
      className={`tmy-card product${size ? ` product-${size}` : ""}${p.sold ? " product-is-sold" : ""}`}
    >
      <div className="product-block" style={{ background: p.color }}>
        {p.image ? (
          <ProductPhoto photo={p.image} alt={p.name} sizes={sizes} />
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
        {p.sold && <span className="product-sold-chip">SOLD</span>}
      </div>
      <div className="product-row">
        <div className="product-name">{p.name}</div>
        <div className="product-price">{p.price}</div>
      </div>
      {p.meta && <div className="product-meta">{p.meta}</div>}
    </Link>
  );
}
