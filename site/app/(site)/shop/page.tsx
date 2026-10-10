import type { Metadata } from "next";
import ShopGrid from "@/components/ShopGrid";
import { getProducts } from "@/lib/catalog";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop · Theirs. Mine. Yours.",
  description:
    "The archive of curated preloved solid-gold pieces. One of one; when it's gone, it's gone.",
};

// Reading searchParams renders the page per request, so the grid (and any
// ?price= filter) is in the HTML rather than appearing only after JavaScript
// loads. The Sanity fetch itself is still cached (lib/catalog.ts).
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ price?: string | string[] }>;
}) {
  await searchParams;
  const products = await getProducts();
  return (
    <div>
      <section className="container page-hero page-hero-tight">
        <h1 className="page-title">
          The <em className="accent">archive</em>.
        </h1>
        <p className="page-lede">
          Every piece is solid gold, one of one, cleaned and checked by the two
          of us. When it&#39;s gone, it&#39;s gone.
        </p>
      </section>

      <section className="container page-section page-section-last">
        <ShopGrid products={products} />
        <p className="shop-footnote">
          Can&#39;t see what you&#39;re after? Drops land first on{" "}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="tmy-link"
          >
            Instagram {INSTAGRAM_HANDLE}
          </a>
          , and we take wish lists via the{" "}
          <a href="/contact" className="tmy-link">
            contact page
          </a>
          .
        </p>
      </section>
    </div>
  );
}
