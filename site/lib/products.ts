export type Product = {
  lot: string;
  name: string;
  era: string;
  price: string;
  meta: string;
  color: string;
  size?: "big" | "wide";
  tilt: number;
  // Path to a product photo, e.g. "/products/lot-01.jpg". Drop the file in
  // site/public/products/ and set this; cards without one show the striped
  // placeholder. (Don't hotlink Instagram URLs — they're signed and expire.)
  image?: string;
  // Longer copy for the product page.
  description: string;
};

export function productPath(p: Product): string {
  return `/shop/lot-${p.lot}`;
}

export function priceNumber(p: Product): number {
  return Number(p.price.replace(/[^0-9.]/g, ""));
}

export const products: Product[] = [
  {
    lot: "01",
    name: "Etruscan revival signet",
    era: "18k",
    price: "$680",
    meta: "Heavy oval face · c.1970s",
    color: "#E5A06B",
    size: "big",
    tilt: -1.5,
    description:
      "A heavy oval-faced signet in the Etruscan revival style, with the kind of presence you can feel across a room. Unsigned, beautifully worn in, and ready for its next initials (or none at all).",
  },
  {
    lot: "02",
    name: "Bombé cocktail ring",
    era: "14k",
    price: "$540",
    meta: "Domed, unsigned · c.1960s",
    color: "#A9C6D6",
    tilt: 1.2,
    description:
      "A domed bombé cocktail ring from the 1960s. Smooth, sculptural and surprisingly comfortable, it sits on the hand like it was always meant to be there.",
  },
  {
    lot: "03",
    name: "Seed pearl drops",
    era: "15k",
    price: "$420",
    meta: "Victorian · tested gold",
    color: "#EFD27E",
    tilt: -1,
    description:
      "Victorian seed pearl drop earrings in tested gold. Delicate without being fussy, with over a century of evenings already behind them.",
  },
  {
    lot: "04",
    name: "Sculptural knot studs",
    era: "18k",
    price: "$760",
    meta: "Modernist · c.1980s",
    color: "#BBC471",
    tilt: 1.4,
    description:
      "Modernist knot studs from the 1980s. Small, sculptural and quietly odd in the best way. They read as contemporary until you learn their age.",
  },
  {
    lot: "05",
    name: "Florentine dome ring",
    era: "18k",
    price: "$890",
    meta: "Textured · c.1970s",
    color: "#A9C6D6",
    tilt: -1.3,
    description:
      "A textured Florentine dome ring from the 1970s. The brushed finish softens the shine to a glow, which is exactly the point.",
  },
  {
    lot: "06",
    name: "Flat curb tank chain",
    era: "9k",
    price: "$1,480",
    meta: "24 inch · solid links",
    color: "#E5A06B",
    size: "wide",
    tilt: 0,
    description:
      "A flat curb tank chain in solid 9k, 24 inches of it. Substantial links, satisfying weight, and it layers with everything.",
  },
  {
    lot: "07",
    name: "Charm gate bracelet",
    era: "9k",
    price: "$1,120",
    meta: "Five charms · padlock clasp",
    color: "#EFD27E",
    tilt: 1.1,
    description:
      "A 9k gate bracelet carrying five charms and closed with its original padlock clasp. Somebody collected these charms one by one; now the collection continues.",
  },
  {
    lot: "08",
    name: "Byzantine chain bracelet",
    era: "18k",
    price: "$1,250",
    meta: "Hand-linked · Italy",
    color: "#BBC471",
    tilt: -1.2,
    description:
      "A hand-linked Byzantine chain bracelet made in Italy. Dense, liquid and precise, this is craftsmanship you can no longer order off a shelf.",
  },
];
