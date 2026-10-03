import Hero from "@/components/Hero";
import WaveDivider from "@/components/WaveDivider";
import StoryBand from "@/components/StoryBand";
import ArchiveGrid from "@/components/ArchiveGrid";
import PriceBand from "@/components/PriceBand";
import About from "@/components/About";

const PINK = "#F7DCE6";
const LIME = "#BBC471";

export default function Home() {
  return (
    <div id="top">
      <Hero />
      <WaveDivider fill={PINK} bg={LIME} />
      <StoryBand />
      <WaveDivider fill={LIME} bg={PINK} />
      <ArchiveGrid />
      <PriceBand />
      <About />
    </div>
  );
}
