/* ------------------------------------------------------------------ *
 * Blog types + tiny helpers. This file holds NO post data — every post
 * lives in its own folder: app/blog/<slug>/post.ts
 * ------------------------------------------------------------------ */

export type BlogSection = {
  heading: string;
  /**
   * Optional — set to false to show this heading WITHOUT a number.
   * Numbered sections keep counting 1, 2, 3... and skip it.
   */
  numbered?: boolean;
  /** Optional — omit for a heading-only section (e.g. a lead-in title). */
  paragraphs?: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  /** ISO date, e.g. "2026-07-10" — displayed formatted, used raw for SEO. */
  date: string;
  /** ISO date of the last meaningful edit (optional; defaults to `date`). */
  updated?: string;
  readTime: string;
  /** Short summary shown on the blog cards. */
  excerpt: string;
  /**
   * Optional — the <title> tag Google shows, written out in full
   * (include "| WorldFlow" yourself if you want it). Keep it under ~60
   * characters. Leave out to use `${title} | WorldFlow Blog`.
   */
  seoTitle?: string;
  /**
   * Optional — the meta description Google shows (~150-160 characters).
   * Leave out to reuse `excerpt`.
   */
  seoDescription?: string;
  /**
   * Optional cover image. Leave out (don't write `image` at all) for a
   * post without one — the article skips the hero and the blog card shows
   * a branded placeholder.
   */
  image?: string;
  /** Alt text for the cover image — describe it; needed only with `image`. */
  imageAlt?: string;
  /** Target search phrases for this article. */
  keywords: string[];
  /**
   * Optional opening paragraphs shown right after the title/image, BEFORE
   * the table of contents — for posts that start with plain text instead
   * of a heading. Leave out if the post starts with a heading.
   */
  intro?: string[];
  /** Every section needs a heading (it feeds the table of contents). */
  sections: BlogSection[];
  /** Optional — leave out entirely for posts without an FAQ. */
  faqs?: BlogFaq[];
};

export type BlogFaq = { question: string; answer: string };

/** The subset the listing grid and related-posts cards need. */
export type BlogSummary = Pick<
  BlogPost,
  "slug" | "title" | "category" | "date" | "readTime" | "excerpt" | "image" | "imageAlt"
>;

export const toSummary = (post: BlogPost): BlogSummary => ({
  slug: post.slug,
  title: post.title,
  category: post.category,
  date: post.date,
  readTime: post.readTime,
  excerpt: post.excerpt,
  image: post.image,
  imageAlt: post.imageAlt,
});

/** "2026-07-10" -> "10 July 2026" (UTC, so server and client always match). */
export const formatBlogDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
