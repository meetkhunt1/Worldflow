import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import type { BlogPost } from "@/lib/blog-types";

/**
 * Per-article <head> metadata: title, description, canonical, Open Graph
 * (article) and Twitter card. Relative URLs are resolved against
 * `metadataBase` set in app/layout.tsx.
 */
export function blogMetadata(post: BlogPost): Metadata {
  const url = `/blog/${post.slug}`;
  // Page heading (post.title) and the search-result title are independent.
  const title = post.seoTitle ?? `${post.title} | ${SITE_NAME} Blog`;
  const description = post.seoDescription ?? post.excerpt;

  return {
    title,
    description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title,
      description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      section: post.category,
      ...(post.image && {
        images: [{ url: post.image, alt: post.imageAlt ?? post.title }],
      }),
    },
    twitter: {
      card: post.image ? "summary_large_image" : "summary",
      title,
      description,
      ...(post.image && { images: [post.image] }),
    },
  };
}
