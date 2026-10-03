import { defineArrayMember, defineField, defineType } from "sanity";

export const PALETTE = [
  { title: "Orange", value: "#E5A06B" },
  { title: "Blue", value: "#A9C6D6" },
  { title: "Yellow", value: "#EFD27E" },
  { title: "Lime", value: "#BBC471" },
];

export const product = defineType({
  name: "product",
  title: "Piece",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "e.g. Sapphire halo ring",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      description: 'Click "Generate". This becomes the page address, so it can\'t be changed once the piece is live.',
      options: { source: "name", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      description:
        "The first photo is the main one. Upload straight from your camera or phone; the site turns them to match the rest.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Describe the photo (optional)",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (r) => r.min(1).warning("Add at least one photo"),
    }),
    defineField({
      name: "price",
      title: "Price (AUD)",
      type: "number",
      description: "Numbers only, e.g. 680",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "karat",
      title: "Gold",
      type: "string",
      options: {
        list: ["9k", "10k", "14k", "15k", "18k", "22k"],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "detail",
      title: "Short detail line",
      type: "string",
      description: "Shown under the name, e.g. Pavé lattice · domed",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "sold",
      title: "Sold",
      type: "boolean",
      description: "Switch on once it's gone. It stays on the site, marked as sold.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Position",
      type: "number",
      description:
        "Optional. Lower numbers show first (1 is the top). Leave blank and the newest piece shows first.",
    }),
    defineField({
      name: "color",
      title: "Card colour",
      type: "string",
      description: "The colour behind the photo on cards.",
      options: {
        list: PALETTE,
      },
      initialValue: "#E5A06B",
    }),
    defineField({
      name: "cardSize",
      title: "Card size on the homepage",
      type: "string",
      options: {
        list: [
          { title: "Normal", value: "normal" },
          { title: "Big", value: "big" },
          { title: "Wide", value: "wide" },
        ],
        layout: "radio",
      },
      initialValue: "normal",
    }),
  ],
  orderings: [
    {
      title: "Position, then newest",
      name: "positionNewest",
      by: [
        { field: "order", direction: "asc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: { title: "name", sold: "sold", karat: "karat", price: "price", media: "images.0" },
    prepare({ title, sold, karat, price, media }) {
      return {
        title: `${title ?? "Untitled"}${sold ? " (SOLD)" : ""}`,
        subtitle: [karat, price ? `$${price}` : ""].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
