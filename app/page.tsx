import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import ScrollProductJourney from "@/components/ScrollProductJourney";
import Applications from "@/components/Applications";
import SpoiledSmart from "@/components/SpoiledSmart";
import WhyChooseUs from "@/components/WhyChooseUs";
import ImpactStats from "@/components/ImpactStats";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScrollProductJourney />
      <AboutUs />
      <Applications />
      <SpoiledSmart />
      <WhyChooseUs />
      <ImpactStats />
    </>
  );
}
