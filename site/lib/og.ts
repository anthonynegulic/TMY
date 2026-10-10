import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Photo } from "@/lib/products";
import { jpegUrl } from "@/lib/sanity/image";

// Shared bits for the link-preview images (app/opengraph-image.tsx and
// app/(site)/shop/[slug]/opengraph-image.tsx).

export const OG_SIZE = { width: 1200, height: 630 };

export const OG = {
  pink: "#F7DCE6",
  ink: "#2B211A",
  maroon: "#7A2E2B",
  body: "#4A3D31",
};

// The brand fonts as .woff (the image renderer can't read .woff2), bundled in
// assets/fonts under the SIL Open Font License.
export async function ogFonts() {
  const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));
  const [bricolage, serif, serifItalic] = await Promise.all([
    font("bricolage-grotesque-latin-800-normal.woff"),
    font("instrument-serif-latin-400-normal.woff"),
    font("instrument-serif-latin-400-italic.woff"),
  ]);
  return [
    { name: "Bricolage", data: bricolage, weight: 800 as const, style: "normal" as const },
    { name: "Instrument Serif", data: serif, weight: 400 as const, style: "normal" as const },
    { name: "Instrument Serif", data: serifItalic, weight: 400 as const, style: "italic" as const },
  ];
}

// A photo as a data URL the renderer can draw: bundled photos are read from
// public/, Studio photos are fetched from Sanity as JPEG. Returns null if the
// photo can't be loaded, so the preview still renders without it.
export async function ogPhoto(photo: Photo | undefined): Promise<string | null> {
  if (!photo) return null;
  try {
    let bytes: Buffer;
    if (photo.src.startsWith("/")) {
      bytes = await readFile(join(process.cwd(), "public", photo.src));
    } else {
      const res = await fetch(jpegUrl(photo.src, 800));
      if (!res.ok) return null;
      bytes = Buffer.from(await res.arrayBuffer());
    }
    return `data:image/jpeg;base64,${bytes.toString("base64")}`;
  } catch {
    return null;
  }
}
