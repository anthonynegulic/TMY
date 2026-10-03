import { client } from "@/lib/sanity/client";
import { imageUrl } from "@/lib/sanity/image";
import { fallbackProducts, type Product } from "@/lib/products";

// How long (seconds) the live site waits before picking up edits made in the Studio.
const REVALIDATE = 60;

const TILTS = [-1.5, 1.2, -1, 1.4, -1.3, 0, 1.1, -1.2];

const QUERY = `*[_type == "product" && defined(slug.current)]
  | order(coalesce(order, 9999) asc, _createdAt desc){
    "slug": slug.current,
    name,
    price,
    karat,
    detail,
    description,
    sold,
    color,
    cardSize,
    "images": images[]{asset, crop, hotspot}
  }`;

type SanityProduct = {
  slug: string;
  name: string;
  price: number;
  karat: string;
  detail?: string;
  description?: string;
  sold?: boolean;
  color?: string;
  cardSize?: "normal" | "big" | "wide";
  images?: { asset?: unknown }[];
};

function formatPrice(n: number): string {
  return `$${n.toLocaleString("en-AU")}`;
}

function toProduct(p: SanityProduct, i: number): Product {
  const photos = (p.images ?? []).filter((im) => im.asset).map((im) => imageUrl(im));
  return {
    slug: p.slug,
    name: p.name,
    era: p.karat,
    price: formatPrice(p.price),
    meta: p.detail ?? "",
    color: p.color ?? "#E5A06B",
    size: p.cardSize === "big" || p.cardSize === "wide" ? p.cardSize : undefined,
    tilt: TILTS[i % TILTS.length],
    image: photos[0],
    images: photos.slice(1),
    rotate: true,
    sold: p.sold ?? false,
    description: p.description ?? "",
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await client.fetch<SanityProduct[]>(QUERY, {}, { next: { revalidate: REVALIDATE } });
    if (rows.length > 0) return rows.map(toProduct);
  } catch (err) {
    console.error("Sanity fetch failed, using fallback products", err);
  }
  return fallbackProducts;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}
