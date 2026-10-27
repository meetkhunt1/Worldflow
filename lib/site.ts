/* ------------------------------------------------------------------ *
 * Site-wide constants used for canonical URLs, Open Graph and JSON-LD.
 *
 * Set NEXT_PUBLIC_SITE_URL in the hosting environment to the live
 * domain (no trailing slash). The fallback below is only a default —
 * confirm it matches the real production domain before launch.
 * ------------------------------------------------------------------ */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.worldflow.in"
).replace(/\/$/, "");

export const SITE_NAME = "WorldFlow";
export const SITE_LOGO = "/worldflow-logo.webp";

/** Turn a site-relative path into an absolute URL. */
export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
