import { defineField, defineType } from "sanity";

// The palette the cards use behind a photo (and while it loads).
const CARD_COLORS = [
  { title: "Apricot", value: "#E5A06B" },
  { title: "Sky", value: "#A9C6D6" },
  { title: "Butter", value: "#EFD27E" },
  { title: "Olive", value: "#BBC471" },
];

export const product = defineType({
  name: "product",
  title: "Piece",
  type: "document",
  fields: [
    defineField({
      name: "lot",
      title: "Lot number",
      type: "string",
      description: "Two digits, e.g. 04. This becomes the web address: /shop/lot-04",
      validation: (rule) =>
        rule
          .required()
          .regex(/^\d{2}$/, { name: "two digits" })
          .custom(async (lot, context) => {
            if (!lot) return true;
            const { document, getClient } = context;
            const id = document?._id.replace(/^drafts\./, "");
            const dupe = await getClient({ apiVersion: "2024-10-01" }).fetch(
              `count(*[_type == "product" && lot == $lot && !(_id in [$id, "drafts." + $id])])`,
              { lot, id },
            );
            return dupe > 0 ? "Another piece already uses this lot number" : true;
          }),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "era",
      title: "Gold",
      type: "string",
      options: {
        list: ["9k", "14k", "15k", "18k", "22k"].map((v) => ({ title: v, value: v })),
        layout: "radio",
        direction: "horizontal",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (AUD)",
      type: "number",
      description: "Just the number — the site adds the $ and the comma.",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "meta",
      title: "Notes line",
      type: "string",
      description:
        'The small line under the name on the card, e.g. "Domed, unsigned · c.1960s"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "The longer copy on the piece's own page.",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description:
        "Drag the hotspot to whatever must stay in frame — cards crop square, the piece's own page crops taller.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describes the photo for screen readers. Defaults to the name.",
        }),
      ],
    }),
    defineField({
      name: "hidden",
      title: "Hide from the site",
      type: "boolean",
      initialValue: false,
      description: "Keeps the piece here but takes it off the shop and homepage.",
    }),
    defineField({
      name: "color",
      title: "Card colour",
      type: "string",
      options: { list: CARD_COLORS, layout: "radio", direction: "horizontal" },
      initialValue: CARD_COLORS[0].value,
      description: "Shows behind the photo while it loads, and if there is no photo yet.",
      group: "layout",
    }),
    defineField({
      name: "size",
      title: "Card size",
      type: "string",
      options: {
        list: [
          { title: "Normal", value: "normal" },
          { title: "Big (2x2)", value: "big" },
          { title: "Wide (2x1)", value: "wide" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "normal",
      description: "A couple of big or wide cards give the grid its rhythm. Most stay normal.",
      group: "layout",
    }),
    defineField({
      name: "tilt",
      title: "Lot tag tilt",
      type: "number",
      initialValue: 0,
      description: "Degrees the little LOT tag leans, roughly -2 to 2.",
      validation: (rule) => rule.min(-5).max(5),
      group: "layout",
    }),
  ],
  groups: [{ name: "layout", title: "Layout" }],
  orderings: [
    {
      name: "lotAsc",
      title: "Lot number",
      by: [{ field: "lot", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", lot: "lot", era: "era", media: "photo", hidden: "hidden" },
    prepare({ title, lot, era, media, hidden }) {
      return {
        title: `Lot ${lot} · ${title ?? "Untitled"}`,
        subtitle: hidden ? `${era} · hidden` : era,
        media,
      };
    },
  },
});
