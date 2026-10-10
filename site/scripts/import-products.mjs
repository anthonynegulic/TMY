// One-off: loads the original 8 pieces (and their photos) into Sanity.
// Safe to re-run: pieces are replaced by id, photos are re-uploaded.
//
//   SANITY_WRITE_TOKEN=<editor token> node scripts/import-products.mjs
//
// Create the token in manage.sanity.io > API > Tokens (role: Editor).
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";

// Product details live in products-seed.json (a copy of the original 8 pieces)
const fallbackProducts = JSON.parse(
  readFileSync(new URL("./products-seed.json", import.meta.url), "utf8"),
);

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN first (see the comment at the top of this file).");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "wpulke7o",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

let order = 1;
for (const p of fallbackProducts) {
  const asset = await client.assets.upload(
    "image",
    readFileSync(new URL(`../photos-cms/${p.slug}.jpg`, import.meta.url)),
    { filename: `${p.slug}.jpg` },
  );
  await client.createOrReplace({
    _id: `product-${p.slug}`,
    _type: "product",
    name: p.name,
    slug: { _type: "slug", current: p.slug },
    images: [
      { _type: "image", _key: "main", asset: { _type: "reference", _ref: asset._id }, alt: p.name, rotation: 90 },
    ],
    price: Number(p.price.replace(/[^0-9.]/g, "")),
    karat: p.era,
    detail: p.meta,
    description: p.description,
    sold: false,
    order: order++,
    color: p.color,
    cardSize: p.size === "big" || p.size === "wide" ? p.size : "normal",
  });
  console.log("imported", p.name);
}
console.log("Done.");
