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
    name: "Lattice dome ring",
    era: "18k",
    price: "$680",
    meta: "Pavé lattice · domed",
    color: "#E5A06B",
    size: "big",
    tilt: -1.5,
    image: "/products/lot-01.jpg",
    description:
      "A domed ring woven in a gold lattice and set with sparkling pavé stones. It catches the light from every angle and has the presence of a much bigger piece.",
  },
  {
    lot: "02",
    name: "Ruby wave ring",
    era: "14k",
    price: "$540",
    meta: "Serpentine · ruby",
    color: "#A9C6D6",
    tilt: 1.2,
    image: "/products/lot-02.jpg",
    description:
      "A flowing gold ring that curls around a single ruby. Sculptural and a little bit wild, it reads like jewellery from a story you want to hear.",
  },
  {
    lot: "03",
    name: "Triple-band gold ring",
    era: "15k",
    price: "$420",
    meta: "Sculpted bands · polished",
    color: "#EFD27E",
    tilt: -1,
    image: "/products/lot-03.jpg",
    description:
      "Three polished gold bands that twist and part around the finger. Simple in the best way, and made to be worn every day.",
  },
  {
    lot: "04",
    name: "Ruby gypsy ring",
    era: "18k",
    price: "$760",
    meta: "Bezel set · ruby",
    color: "#BBC471",
    tilt: 1.4,
    image: "/products/lot-04.jpg",
    description:
      "A rich ruby sunk into a smooth gold gypsy setting with tiny diamond accents. Warm, weighty and quietly confident.",
  },
  {
    lot: "05",
    name: "Pavé block ring",
    era: "18k",
    price: "$890",
    meta: "Pavé · bold",
    color: "#A9C6D6",
    tilt: -1.3,
    image: "/products/lot-05.jpg",
    description:
      "A bold, flat-topped ring with half of its face set in tiny pavé stones. Very 80s, very unlike anything you'd find in a mall.",
  },
  {
    lot: "06",
    name: "Panther head ring",
    era: "9k",
    price: "$1,480",
    meta: "Enamel spots · figural",
    color: "#E5A06B",
    size: "wide",
    tilt: 0,
    image: "/products/lot-06.jpg",
    description:
      "A figural panther ring with spotted enamel detail and a playful sense of mischief. A proper conversation starter in solid gold.",
  },
  {
    lot: "07",
    name: "Knot ring",
    era: "9k",
    price: "$1,120",
    meta: "Interlocked · polished",
    color: "#EFD27E",
    tilt: 1.1,
    image: "/products/lot-07.jpg",
    description:
      "Polished gold links tied into a knot. Light, sculptural and symbolic, the kind of piece that gets passed on for a reason.",
  },
  {
    lot: "08",
    name: "Sapphire halo ring",
    era: "18k",
    price: "$1,250",
    meta: "Halo · deep blue",
    color: "#BBC471",
    tilt: -1.2,
    image: "/products/lot-08.jpg",
    description:
      "A deep blue sapphire ringed with a halo of stones on a slim gold band. Classic, a little romantic, and ready for its next chapter.",
  },
];
