import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

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

const description =
  "Forty-five solid-gold pieces, hand-picked from other lives and other decades. No reproductions, no two the same. Just the one that's about to be yours.";

export const metadata: Metadata = {
  metadataBase: new URL("https://theirsmineyours.com"),
  title: "Theirs. Mine. Yours. · curated preloved fine jewellery",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Theirs. Mine. Yours. · curated preloved fine jewellery",
    description,
    url: "/",
    siteName: "Theirs. Mine. Yours.",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Theirs. Mine. Yours. · curated preloved fine jewellery",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
