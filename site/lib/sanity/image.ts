import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

// Sanity image field -> optimised URL. Any crop set in the Studio is applied
// by the builder; the site-wide 90 degree turn is done in CSS (ProductPhoto).
export function imageUrl(source: unknown, width = 900): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return builder.image(source as any).width(width).auto("format").quality(82).url();
}
