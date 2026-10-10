import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

// Widths offered to the browser in srcset; it picks the smallest that's sharp
// for the space the photo fills (up to 1600px for the main product photo on
// high-res screens).
const WIDTHS = [400, 800, 1200, 1600];

// Sanity image field -> optimised URL. Any crop set in the Studio is applied
// by the builder; quarter turns are done in CSS (ProductPhoto).
export function imageUrl(source: unknown, width = 1200): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return builder.image(source as any).width(width).auto("format").quality(82).url();
}

export function imageSrcSet(source: unknown): string {
  return WIDTHS.map((w) => `${imageUrl(source, w)} ${w}w`).join(", ");
}

// The same photo as a plain JPEG at a given width, for places that can't take
// WebP/AVIF (the link-preview images).
export function jpegUrl(src: string, width: number): string {
  const url = new URL(src);
  url.searchParams.delete("auto");
  url.searchParams.set("fm", "jpg");
  url.searchParams.set("w", String(width));
  return url.toString();
}
