import "server-only";
import type { Image } from "sanity";
import { sanityClient } from "./sanity/client";
import { productImageUrl } from "./sanity/image";
import { fallbackProducts, type Product } from "./products";

type SanityProduct = {
  lot: string;
  name: string;
  era: string;
  price: number;
  meta?: string;
  description?: string;
  photo?: Image & { alt?: string };
  color?: string;
  size?: "normal" | "big" | "wide";
  tilt?: number;
};

// Hidden pieces never leave the Studio. Sorted by lot so the grid order is
// predictable and the big/wide cards land where the layout expects them.
const PRODUCTS_QUERY = `*[_type == "product" && hidden != true] | order(lot asc) {
  lot, name, era, price, meta, description, photo, color, size, tilt
}`;

function formatPrice(price: number): string {
  return `$${price.toLocaleString("en-AU")}`;
}

function toProduct(p: SanityProduct): Product {
  return {
    lot: p.lot,
    name: p.name,
    era: p.era,
    price: formatPrice(p.price),
    meta: p.meta ?? "",
    description: p.description ?? "",
    color: p.color ?? "#E5A06B",
    size: p.size && p.size !== "normal" ? p.size : undefined,
    tilt: p.tilt ?? 0,
    image: p.photo?.asset ? productImageUrl(p.photo) : undefined,
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!sanityClient) return fallbackProducts;
  const found = await sanityClient.fetch<SanityProduct[]>(PRODUCTS_QUERY);
  // An empty dataset would blank the shop; keep the fallback until real
  // pieces exist so a fresh Sanity project never ships an empty site.
  return found.length > 0 ? found.map(toProduct) : fallbackProducts;
}

export async function getProduct(lot: string): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => p.lot === lot);
}
