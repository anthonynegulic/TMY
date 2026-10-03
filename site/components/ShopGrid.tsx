"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductPhoto from "@/components/ProductPhoto";
import { productPath, priceNumber, type Product } from "@/lib/products";

const FILTERS = [
  { key: "all", label: "Everything" },
  { key: "under-500", label: "Under $500" },
  { key: "500-1000", label: "$500 – $1,000" },
  { key: "1000-plus", label: "$1,000+" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

function matches(filter: FilterKey, price: number): boolean {
  if (filter === "under-500") return price < 500;
  if (filter === "500-1000") return price >= 500 && price <= 1000;
  if (filter === "1000-plus") return price > 1000;
  return true;
}

export default function ShopGrid({ products }: { products: Product[] }) {
  const initial = useSearchParams().get("price") as FilterKey | null;
  const [filter, setFilter] = useState<FilterKey>(
    initial && FILTERS.some((f) => f.key === initial) ? initial : "all",
  );
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
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="archive-grid">
        {shown.map((p) => (
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

      {shown.length === 0 && (
        <p className="shop-empty">
          Nothing in that range right now. It moves fast; check back soon or
          send us a wish list.
        </p>
      )}
    </>
  );
}
