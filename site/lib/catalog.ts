import { client } from "@/lib/sanity/client";
import { imageUrl } from "@/lib/sanity/image";
import { fallbackProducts, type Photo, type Product, type Rotation } from "@/lib/products";

// How long (seconds) the live site waits before picking up edits made in the Studio.
const REVALIDATE = 60;

const TILTS = [-1.5, 1.2, -1, 1.4, -1.3, 0, 1.1, -1.2];

const QUERY = `*[_type == "product" && defined(slug.current)]
  | order(coalesce(order, 9999) asc, _createdAt desc){
    _id,
    "slug": slug.current,
    name,
    price,
    karat,
    detail,
    description,
    sold,
    color,
    cardSize,
    "images": images[]{asset, crop, hotspot, alt, rotation}
  }`;

type SanityImage = { asset?: unknown; alt?: string; rotation?: number };

type SanityProduct = {
  _id: string;
  slug: string;
  name: string;
  price: number;
  karat: string;
  detail?: string;
  description?: string;
  sold?: boolean;
  color?: string;
  cardSize?: "normal" | "big" | "wide";
  images?: SanityImage[];
};

function formatPrice(n: number): string {
  return `$${n.toLocaleString("en-AU")}`;
}

// The first 8 pieces were loaded by scripts/import-products.mjs (ids
// "product-<slug>") before photos had a turn setting, and their photos need a
// quarter turn clockwise. Anything else with no setting is shown as uploaded.
function defaultRotation(id: string): Rotation {
  return id.startsWith("product-") ? 90 : 0;
}

function toRotation(value: number | undefined, fallback: Rotation): Rotation {
  return value === 0 || value === 90 || value === 180 || value === 270 ? value : fallback;
}

function toProduct(p: SanityProduct, i: number): Product {
  const fallbackTurn = defaultRotation(p._id);
  const photos: Photo[] = (p.images ?? [])
    .filter((im) => im.asset)
    .map((im) => ({
      src: imageUrl(im),
      alt: im.alt || undefined,
      rotation: toRotation(im.rotation, fallbackTurn),
    }));
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
    sold: p.sold ?? false,
    description: p.description ?? "",
  };
}

// The bundled pieces in lib/products.ts are only a stand-in for working
// offline. They're never shown on the live site, because they'd appear as
// available even if they've since sold. Set USE_BUNDLED_PRODUCTS=1 to allow
// them in a production build (e.g. building without network access).
function allowBundledProducts(): boolean {
  return process.env.NODE_ENV === "development" || process.env.USE_BUNDLED_PRODUCTS === "1";
}

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await client.fetch<SanityProduct[]>(QUERY, {}, { next: { revalidate: REVALIDATE } });
    return rows.map(toProduct);
  } catch (err) {
    if (allowBundledProducts()) {
      console.warn("Sanity fetch failed, using the bundled products", err);
      return fallbackProducts;
    }
    // Rethrow so a failed background refresh keeps serving the last good page
    // rather than replacing it with stale stock.
    throw err;
  }
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}
