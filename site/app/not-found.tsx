import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFoundContent from "@/components/NotFoundContent";
import "./globals.css";

// Shown for URLs that don't match any page. It renders outside the site
// layout, so it brings its own header, footer and styles.
export const metadata: Metadata = {
  title: "Not found · Theirs. Mine. Yours.",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <NotFoundContent />
      <Footer />
    </>
  );
}
