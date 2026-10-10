import type { Metadata } from "next";
import NotFoundContent from "@/components/NotFoundContent";

// Shown when a page inside the site calls notFound(), e.g. a product that's
// been removed from the Studio. The site layout adds the header and footer.
export const metadata: Metadata = {
  title: "Not found · Theirs. Mine. Yours.",
};

export default function NotFound() {
  return <NotFoundContent />;
}
