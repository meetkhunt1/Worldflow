import type { Metadata } from "next";
import InfrastructureHero from "@/components/InfrastructureHero";
import InfrastructureZones from "@/components/InfrastructureZones";

export const metadata: Metadata = {
  title: "Infrastructure | WorldFlow",
  description:
    "Inside the WorldFlow facility in Rajkot — raw material blending, pipe extrusion, injection moulding, warehousing, dispatch and office. Photographed at our own plant.",
};

export default function InfrastructurePage() {
  return (
    <>
      <InfrastructureHero />
      <InfrastructureZones />
    </>
  );
}
