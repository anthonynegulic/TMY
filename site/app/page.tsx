import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WaveDivider from "@/components/WaveDivider";
import StoryBand from "@/components/StoryBand";
import ArchiveGrid from "@/components/ArchiveGrid";
import PriceBand from "@/components/PriceBand";
import About from "@/components/About";
import Footer from "@/components/Footer";

const PINK = "#F7DCE6";
const LIME = "#BBC471";
const INK = "#2B211A";

export default function Home() {
  return (
    <div id="top">
      <Header />
      <Hero />
      <WaveDivider fill={PINK} bg={LIME} />
      <StoryBand />
      <WaveDivider fill={LIME} bg={PINK} />
      <ArchiveGrid />
      <PriceBand />
      <About />
      <WaveDivider fill={PINK} bg={INK} />
      <Footer />
    </div>
  );
}
