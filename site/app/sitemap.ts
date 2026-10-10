import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/catalog";
import { productPath } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/shop", "/story", "/about", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
  const pieces = (await getProducts()).map((p) => ({ url: `${SITE_URL}${productPath(p)}` }));
  return [...pages, ...pieces];
}
