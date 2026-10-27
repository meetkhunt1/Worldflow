import LandingHero from "@/components/LandingHero";
import { landingMetadata } from "@/lib/landing-seo";
import { page } from "./content";

export const metadata = landingMetadata(page);

export default function Page() {
  return <LandingHero page={page} />;
}
