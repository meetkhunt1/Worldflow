/* ------------------------------------------------------------------ *
 * Landing pages — standalone, keyword-targeted SEO pages that are NOT
 * part of the product range (/products) or the blog (/blog). Each one
 * lives at its own top-level route (e.g. /oem-pipe-manufacturers-from-
 * india) and is reached only by direct URL / search — it is NOT linked
 * from the header or footer navigation.
 *
 * Visually it reuses the product hero block (image card left, title +
 * intro + a single "Enquire Now" CTA right) — no brochure button, no
 * feature tabs, no story band, no FAQ.
 *
 * ADDING A NEW LANDING PAGE
 *   1. Copy an existing folder, e.g. app/oem-pipe-manufacturers-from-india/
 *      to app/<new-slug>/
 *   2. Edit its content.ts (slug, title, intro, image ...)
 *   3. Add the route to app/sitemap.ts so it stays crawlable without a
 *      nav link.
 * ------------------------------------------------------------------ */

export type LandingPage = {
  slug: string;
  /** Page heading (H1). Shown on the page itself. */
  title: string;
  /**
   * Optional — the <title> tag Google shows (include "| WorldFlow"
   * yourself). Keep it under ~60 characters. Falls back to
   * `${title} | WorldFlow`.
   */
  seoTitle?: string;
  /** Optional — meta description (~150-160 characters). Falls back to the first `intro` paragraph. */
  seoDescription?: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  /** Hero paragraphs, rendered in order. */
  intro: string[];
};
