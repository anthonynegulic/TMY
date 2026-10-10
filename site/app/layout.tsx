import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import { SITE_URL } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-sans",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const DESCRIPTION =
  "Solid-gold pieces, hand-picked from other lives and other decades. No reproductions, no two the same. Just the one that's about to be yours.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Theirs. Mine. Yours. · curated preloved fine jewellery",
    // pages set just their own name, e.g. "Shop" -> "Shop · Theirs. Mine. Yours."
    template: "%s · Theirs. Mine. Yours.",
  },
  description: DESCRIPTION,
  openGraph: {
    siteName: "Theirs. Mine. Yours.",
    locale: "en_AU",
    type: "website",
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${bricolage.variable} ${instrument.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
