import Link from "next/link";
import ProductPhoto from "@/components/ProductPhoto";
import { getHeroPieces } from "@/lib/catalog";
import { productPath } from "@/lib/products";

// The pinned collage shows the pieces ticked "Show in the homepage hero" in
// the Studio (see getHeroPieces), so it only ever shows what's in the store.
const TAG_SIZES = ["250px", "184px", "168px"];

export default async function Hero() {
  const pinned = await getHeroPieces();
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
            <Link href="/shop" className="btn-dark">
              Shop the collection
            </Link>
            <Link href="/story#the-name" className="tmy-link text-link">
              Read the name&#39;s story
            </Link>
          </div>
        </div>

        {pinned.length > 0 && (
          <div className="hero-collage">
            {pinned.map((p, i) => (
              <Link
                key={p.slug}
                href={productPath(p)}
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
              </Link>
            ))}
            <div className="collage-caption">pinned from the archive ↑</div>
          </div>
        )}
      </div>
    </section>
  );
}
