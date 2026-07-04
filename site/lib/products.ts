export type Product = {
  lot: string;
  name: string;
  era: string;
  price: string;
  meta: string;
  color: string;
  size?: "big" | "wide";
  tilt: number;
};

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
  },
  {
    lot: "02",
    name: "Bombé cocktail ring",
    era: "14k",
    price: "$540",
    meta: "Domed, unsigned · c.1960s",
    color: "#A9C6D6",
    tilt: 1.2,
  },
  {
    lot: "03",
    name: "Seed pearl drops",
    era: "15k",
    price: "$420",
    meta: "Victorian · tested gold",
    color: "#EFD27E",
    tilt: -1,
  },
  {
    lot: "04",
    name: "Sculptural knot studs",
    era: "18k",
    price: "$760",
    meta: "Modernist · c.1980s",
    color: "#BBC471",
    tilt: 1.4,
  },
  {
    lot: "05",
    name: "Florentine dome ring",
    era: "18k",
    price: "$890",
    meta: "Textured · c.1970s",
    color: "#A9C6D6",
    tilt: -1.3,
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
  },
  {
    lot: "07",
    name: "Charm gate bracelet",
    era: "9k",
    price: "$1,120",
    meta: "Five charms · padlock clasp",
    color: "#EFD27E",
    tilt: 1.1,
  },
  {
    lot: "08",
    name: "Byzantine chain bracelet",
    era: "18k",
    price: "$1,250",
    meta: "Hand-linked · Italy",
    color: "#BBC471",
    tilt: -1.2,
  },
];
