import type { Metadata } from "next";
import AboutStatement from "@/components/AboutStatement";
import AboutShowcase from "@/components/AboutShowcase";
import AboutTrust from "@/components/AboutTrust";
import AboutProcess from "@/components/AboutProcess";
import AboutGlobalPresence from "@/components/AboutGlobalPresence";

export const metadata: Metadata = {
  title: "About Us | WorldFlow",
  description:
    "WorldFlow engineers premium UPVC, CPVC, SWR, HDPE, Column & Casing pipe systems — building the backbone of modern infrastructure.",
};

export default function AboutPage() {
  return (
    <>
      <AboutStatement />
      <AboutShowcase />
      <AboutTrust />
      <AboutProcess />
      <AboutGlobalPresence />
    </>
  );
}
