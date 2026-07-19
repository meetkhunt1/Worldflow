import type { Metadata } from "next";
import ProductsOverview from "@/components/ProductsOverview";

export const metadata: Metadata = {
  title: "Products | WorldFlow",
  description:
    "Explore the complete WorldFlow range — UPVC, CPVC, SWR drainage, and column pipe systems with matching fittings.",
};

export default function ProductsPage() {
  return <ProductsOverview />;
}
