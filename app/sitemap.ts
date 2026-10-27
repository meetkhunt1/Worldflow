import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { PRODUCT_PAGES } from "@/lib/products";
import { JOBS } from "@/lib/careers";
import { LANDING_PAGES } from "@/lib/landing-pages";
import { getAllPosts } from "./blog/posts";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/products",
  "/infrastructure",
  "/quality-certifications",
  "/blog",
  "/career",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = STATIC_ROUTES.map((path) => ({ url: absoluteUrl(path) }));
  const products = PRODUCT_PAGES.map((p) => ({
    url: absoluteUrl(`/products/${p.slug}`),
  }));
  const jobs = JOBS.map((j) => ({ url: absoluteUrl(`/career/${j.slug}`) }));
  const posts = getAllPosts().map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: p.updated ?? p.date,
  }));
  const landingPages = LANDING_PAGES.map((p) => ({
    url: absoluteUrl(`/${p.slug}`),
  }));

  return [...pages, ...products, ...posts, ...jobs, ...landingPages];
}
