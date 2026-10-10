"use client";

import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { priceNumber, type Product } from "@/lib/products";

const FILTERS = [
  { key: "all", label: "Everything" },
  { key: "under-500", label: "Under $500" },
  { key: "500-1000", label: "$500 – $1,000" },
  { key: "1000-plus", label: "$1,000+" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

function matches(filter: FilterKey, price: number): boolean {
  if (filter === "under-500") return price < 500;
  if (filter === "500-1000") return price >= 500 && price < 1000;
  if (filter === "1000-plus") return price >= 1000;
  return true;
}

export default function ShopGrid({ products }: { products: Product[] }) {
  // The filter lives in the URL (?price=under-500) so it can be shared and the
  // back button undoes it.
  const searchParams = useSearchParams();
  const param = searchParams.get("price");
  const filter: FilterKey = FILTERS.some((f) => f.key === param)
    ? (param as FilterKey)
    : "all";

  function setFilter(key: FilterKey) {
    if (key === filter) return;
    const params = new URLSearchParams(searchParams.toString());
    if (key === "all") params.delete("price");
    else params.set("price", key);
    const query = params.toString();
    window.history.pushState(null, "", query ? `?${query}` : window.location.pathname);
  }
  // available pieces first, sold ones after
  const shown = products
    .filter((p) => matches(filter, priceNumber(p)))
    .sort((a, b) => Number(!!a.sold) - Number(!!b.sold));

  return (
    <>
      <div className="shop-filters">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`shop-filter${filter === f.key ? " shop-filter-active" : ""}`}
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="archive-grid">
        {shown.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {shown.length === 0 && (
        <p className="shop-empty">
          Nothing in that range right now. It moves fast; check back soon or
          send us a wish list.
        </p>
      )}
    </>
  );
}
