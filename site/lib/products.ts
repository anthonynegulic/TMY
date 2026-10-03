export type Product = {
  slug: string;
  name: string;
  era: string;
  price: string;
  meta: string;
  color: string;
  size?: "big" | "wide";
  tilt: number;
  // Path to a product photo, e.g. "/products/lattice-dome-ring.jpg". Drop the file in
  // site/public/products/ and set this; cards without one show the striped
  // placeholder. (Don't hotlink Instagram URLs — they're signed and expire.)
  image?: string;
  // Further photos (product page only).
  images?: string[];
  // Photos from the CMS are turned 90 degrees on the site (see ProductPhoto);
  // the bundled fallback photos below already have the turn baked in.
  rotate?: boolean;
  sold?: boolean;
  // Longer copy for the product page.
  description: string;
};

export function productPath(p: Product): string {
  return `/shop/${p.slug}`;
}

export function priceNumber(p: Product): number {
  return Number(p.price.replace(/[^0-9.]/g, ""));
}

// Used only until the Sanity catalogue is connected and filled (see lib/catalog.ts).
export const fallbackProducts: Product[] = [
  {
    slug: "lattice-dome-ring",
    name: "Lattice dome ring",
    era: "18k",
    price: "$680",
    meta: "Pavé lattice · domed",
    color: "#E5A06B",
    size: "big",
    tilt: -1.5,
    image: "/products/lattice-dome-ring.jpg",
    description:
      "A domed ring woven in a gold lattice and set with sparkling pavé stones. It catches the light from every angle and has the presence of a much bigger piece.",
  },
  {
    slug: "ruby-wave-ring",
    name: "Ruby wave ring",
    era: "14k",
    price: "$540",
    meta: "Serpentine · ruby",
    color: "#A9C6D6",
    tilt: 1.2,
    image: "/products/ruby-wave-ring.jpg",
    description:
      "A flowing gold ring that curls around a single ruby. Sculptural and a little bit wild, it reads like jewellery from a story you want to hear.",
  },
  {
    slug: "triple-band-gold-ring",
    name: "Triple-band gold ring",
    era: "15k",
    price: "$420",
    meta: "Sculpted bands · polished",
    color: "#EFD27E",
    tilt: -1,
    image: "/products/triple-band-gold-ring.jpg",
    description:
      "Three polished gold bands that twist and part around the finger. Simple in the best way, and made to be worn every day.",
  },
  {
    slug: "ruby-gypsy-ring",
    name: "Ruby gypsy ring",
    era: "18k",
    price: "$760",
    meta: "Bezel set · ruby",
    color: "#BBC471",
    tilt: 1.4,
    image: "/products/ruby-gypsy-ring.jpg",
    description:
      "A rich ruby sunk into a smooth gold gypsy setting with tiny diamond accents. Warm, weighty and quietly confident.",
  },
  {
    slug: "pave-block-ring",
    name: "Pavé block ring",
    era: "18k",
    price: "$890",
    meta: "Pavé · bold",
    color: "#A9C6D6",
    tilt: -1.3,
    image: "/products/pave-block-ring.jpg",
    description:
      "A bold, flat-topped ring with half of its face set in tiny pavé stones. Very 80s, very unlike anything you'd find in a mall.",
  },
  {
    slug: "panther-head-ring",
    name: "Panther head ring",
    era: "9k",
    price: "$1,480",
    meta: "Enamel spots · figural",
    color: "#E5A06B",
    size: "wide",
    tilt: 0,
    image: "/products/panther-head-ring.jpg",
    description:
      "A figural panther ring with spotted enamel detail and a playful sense of mischief. A proper conversation starter in solid gold.",
  },
  {
    slug: "knot-ring",
    name: "Knot ring",
    era: "9k",
    price: "$1,120",
    meta: "Interlocked · polished",
    color: "#EFD27E",
    tilt: 1.1,
    image: "/products/knot-ring.jpg",
    description:
      "Polished gold links tied into a knot. Light, sculptural and symbolic, the kind of piece that gets passed on for a reason.",
  },
  {
    slug: "sapphire-halo-ring",
    name: "Sapphire halo ring",
    era: "18k",
    price: "$1,250",
    meta: "Halo · deep blue",
    color: "#BBC471",
    tilt: -1.2,
    image: "/products/sapphire-halo-ring.jpg",
    description:
      "A deep blue sapphire ringed with a halo of stones on a slim gold band. Classic, a little romantic, and ready for its next chapter.",
  },
];
