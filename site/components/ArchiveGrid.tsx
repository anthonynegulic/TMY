import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/catalog";

export default async function ArchiveGrid() {
  const products = (await getProducts()).filter((p) => !p.sold).slice(0, 8);
  // nothing available right now: leave the section out rather than show an empty grid
  if (products.length === 0) return null;
  return (
    <section id="shop" className="container archive">
      <div className="archive-head">
        <div>
          <h2 className="archive-title">Recently unearthed</h2>
        </div>
        <Link href="/shop" className="tmy-link text-link">
          See the whole archive →
        </Link>
      </div>

      <div className="archive-grid">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
