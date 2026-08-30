import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "./config";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Cap the master we hand to next/image. The Studio accepts whatever comes off
 * a phone; without a cap, next/image would download the full original to
 * resize it. 1600px is well above the largest size any card renders.
 */
export function productImageUrl(source: Image): string {
  return builder.image(source).width(1600).fit("max").auto("format").url();
}
