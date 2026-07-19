import type { Metadata } from "next";
import QualityCertificates from "@/components/QualityCertificates";

export const metadata: Metadata = {
  title: "Quality & Certifications | WorldFlow",
  description:
    "WorldFlow's documented quality — ISO 9001:2015 registration, product conformity, GST registration, and registered trademark certificates.",
};

export default function QualityCertificationsPage() {
  return <QualityCertificates />;
}
