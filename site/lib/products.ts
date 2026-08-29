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

// The archive grid is 4 columns, dropping to 3 at 1024px and 2 at 760px;
// "big" and "wide" cards span two of them. Keep in sync with .archive-grid.
export function cardImageSizes(p: Product): string {
  return p.size
    ? "(max-width: 760px) 100vw, (max-width: 1024px) 66vw, 50vw"
    : "(max-width: 760px) 50vw, (max-width: 1024px) 33vw, 25vw";
}

// Placeholder copy: names, notes and descriptions are lorem ipsum until the
// real pieces are photographed and written up. Lot numbers, gold, prices and
// card layout are real — the price filters on /shop key off `price`.
export const products: Product[] = [
  {
    lot: "01",
    image: "/products/lot-01.jpg",
    name: "Lorem ipsum dolor",
    era: "18k",
    price: "$680",
    meta: "Sit amet consectetur · adipiscing elit",
    color: "#E5A06B",
    size: "big",
    tilt: -1.5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    lot: "02",
    image: "/products/lot-02.jpg",
    name: "Consectetur adipiscing",
    era: "14k",
    price: "$540",
    meta: "Sed do eiusmod · tempor incididunt",
    color: "#A9C6D6",
    tilt: 1.2,
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    lot: "03",
    image: "/products/lot-03.jpg",
    name: "Tempor incididunt",
    era: "15k",
    price: "$420",
    meta: "Ut labore et dolore · magna aliqua",
    color: "#EFD27E",
    tilt: -1.0,
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    lot: "04",
    image: "/products/lot-04.jpg",
    name: "Ut enim ad minim",
    era: "18k",
    price: "$760",
    meta: "Quis nostrud · exercitation ullamco",
    color: "#BBC471",
    tilt: 1.4,
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.",
  },
  {
    lot: "05",
    image: "/products/lot-05.jpg",
    name: "Nisi ut aliquip",
    era: "18k",
    price: "$890",
    meta: "Ex ea commodo · consequat duis",
    color: "#A9C6D6",
    tilt: -1.3,
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti. Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
  },
  {
    lot: "06",
    image: "/products/lot-06.jpg",
    name: "Voluptate velit esse",
    era: "9k",
    price: "$1,480",
    meta: "Cillum dolore · eu fugiat nulla",
    color: "#E5A06B",
    size: "wide",
    tilt: 0.0,
    description:
      "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio, nam libero tempore cum soluta nobis est eligendi optio.",
  },
  {
    lot: "07",
    image: "/products/lot-07.jpg",
    name: "Excepteur sint occaecat",
    era: "9k",
    price: "$1,120",
    meta: "Cupidatat non proident · sunt in culpa",
    color: "#EFD27E",
    tilt: 1.1,
    description:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
  },
  {
    lot: "08",
    image: "/products/lot-08.jpg",
    name: "Officia deserunt mollit",
    era: "18k",
    price: "$1,250",
    meta: "Anim id est · laborum sed ut",
    color: "#BBC471",
    tilt: -1.2,
    description:
      "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
  },
  {
    lot: "09",
    image: "/products/lot-09.jpg",
    name: "Sed ut perspiciatis",
    era: "18k",
    price: "$940",
    meta: "Unde omnis iste · natus error",
    color: "#EFD27E",
    size: "big",
    tilt: 1.3,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    lot: "10",
    image: "/products/lot-10.jpg",
    name: "Unde omnis iste",
    era: "14k",
    price: "$460",
    meta: "Voluptatem accusantium · doloremque",
    color: "#BBC471",
    tilt: -1.4,
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    lot: "11",
    image: "/products/lot-11.jpg",
    name: "Natus error sit",
    era: "9k",
    price: "$1,320",
    meta: "Laudantium totam · rem aperiam",
    color: "#E5A06B",
    tilt: 1.5,
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    lot: "12",
    image: "/products/lot-12.jpg",
    name: "Accusantium doloremque",
    era: "15k",
    price: "$580",
    meta: "Eaque ipsa · quae ab illo",
    color: "#A9C6D6",
    tilt: -1.1,
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.",
  },
  {
    lot: "13",
    image: "/products/lot-13.jpg",
    name: "Totam rem aperiam",
    era: "18k",
    price: "$1,640",
    meta: "Inventore veritatis · et quasi",
    color: "#BBC471",
    size: "wide",
    tilt: 0.0,
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti. Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
  },
  {
    lot: "14",
    image: "/products/lot-14.jpg",
    name: "Eaque ipsa quae",
    era: "14k",
    price: "$380",
    meta: "Architecto beatae · vitae dicta",
    color: "#E5A06B",
    tilt: 1.0,
    description:
      "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio, nam libero tempore cum soluta nobis est eligendi optio.",
  },
  {
    lot: "15",
    image: "/products/lot-15.jpg",
    name: "Architecto beatae vitae",
    era: "18k",
    price: "$820",
    meta: "Sunt explicabo · nemo enim",
    color: "#A9C6D6",
    tilt: -1.6,
    description:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
  },
  {
    lot: "16",
    image: "/products/lot-16.jpg",
    name: "Dicta sunt explicabo",
    era: "9k",
    price: "$1,050",
    meta: "Ipsam voluptatem · quia voluptas",
    color: "#EFD27E",
    tilt: 1.6,
    description:
      "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
  },
];
