import Hero from "@/components/sections/Hero";
import ServicesIntro from "@/components/sections/ServicesIntro";
import WatchToEarn from "@/components/sections/WatchToEarn";
import ListenToEarn from "@/components/sections/ListenToEarn";
import PlayToEarn from "@/components/sections/PlayToEarn";
import Minting from "@/components/sections/Minting";
import ShopToEarn from "@/components/sections/ShopToEarn";
import TravelToEarn from "@/components/sections/TravelToEarn";
// import MediaSection from "@/components/sections/MediaSection"; // hidden
import GKTSection from "@/components/sections/GKTSection";
import AuditionSection from "@/components/sections/AuditionSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-dark selection:bg-primary-purple/30">
      <Hero />
      <ServicesIntro />
      <WatchToEarn />
      <ListenToEarn />
      <PlayToEarn />
      <Minting />
      <ShopToEarn />
      <TravelToEarn />
      {/* <MediaSection /> */}
      <GKTSection />
      <AuditionSection />
      <FinalCTA />
    </main>
  );
}
