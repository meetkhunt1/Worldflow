import type { Metadata } from "next";
import BlogBoard from "@/components/BlogBoard";
import { SITE_NAME } from "@/lib/site";
import { getAllSummaries } from "./posts";

const TITLE = `Pipes & Plumbing Guides | ${SITE_NAME} Blog`;
const DESCRIPTION =
  "Practical guides on plumbing, drainage, and borewell systems from the WorldFlow team — UPVC vs CPVC, column pipes, SWR drainage and more.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function BlogPage() {
  return <BlogBoard posts={getAllSummaries()} />;
}
