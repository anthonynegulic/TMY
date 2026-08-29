import Hero from "@/components/Hero";
import WaveDivider from "@/components/WaveDivider";
import StoryBand from "@/components/StoryBand";
import ArchiveGrid from "@/components/ArchiveGrid";
import PriceBand from "@/components/PriceBand";
import About from "@/components/About";
import { getProducts } from "@/lib/getProducts";

const PINK = "#F7DCE6";
const LIME = "#BBC471";
const INK = "#2B211A";

// Re-check Sanity at most once a minute so Studio edits appear without a deploy.
export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();
  return (
    <div id="top">
      <Hero />
      <WaveDivider fill={PINK} bg={LIME} />
      <StoryBand />
      <WaveDivider fill={LIME} bg={PINK} />
      <ArchiveGrid products={products} />
      <PriceBand />
      <About />
      <WaveDivider fill={PINK} bg={INK} />
    </div>
  );
}
