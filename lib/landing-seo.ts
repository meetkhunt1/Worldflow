import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import type { LandingPage } from "@/lib/landing-types";

/** <head> metadata for a standalone landing page: title, description, canonical, OG, Twitter. */
export function landingMetadata(page: LandingPage): Metadata {
  const url = `/${page.slug}`;
  const title = page.seoTitle ?? `${page.title} | ${SITE_NAME}`;
  const description = page.seoDescription ?? page.intro[0];

  return {
    title,
    description,
    keywords: page.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: page.image, alt: page.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [page.image],
    },
  };
}
