import type { Metadata } from "next";
import BlogBoard from "@/components/BlogBoard";

export const metadata: Metadata = {
  title: "Blog | WorldFlow",
  description:
    "Practical guides on plumbing, drainage, and borewell systems from the WorldFlow team.",
};

export default function BlogPage() {
  return <BlogBoard />;
}
