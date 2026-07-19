import type { Metadata } from "next";
import CareerBoard from "@/components/CareerBoard";

export const metadata: Metadata = {
  title: "Career | WorldFlow",
  description:
    "Join the WorldFlow team — explore current openings across production, quality, maintenance, sales, and logistics.",
};

export default function CareerPage() {
  return <CareerBoard />;
}
