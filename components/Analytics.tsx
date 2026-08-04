import Script from "next/script";

/* ------------------------------------------------------------------ *
 * Analytics — the single place for third-party <head> scripts.
 *
 * FOR THE SEO / MARKETING TEAM
 * ============================
 * All Google (and other third-party) tracking code goes in THIS FILE.
 * Nothing needs to be added to app/layout.tsx — this component is
 * already wired into it, so anything added here loads on every page.
 *
 * This site is built on the Next.js App Router. There is no
 * _document.js, no _app.js and no index.html to paste into — those
 * files do not exist in this kind of project. Scripts are injected
 * through Next's <Script> component instead, which is what the
 * examples below do.
 *
 * TO SWITCH ON GOOGLE ANALYTICS OR TAG MANAGER
 * --------------------------------------------
 * Just paste the ID into the matching constant below. The script
 * blocks are already written — an empty ID means that block is
 * skipped entirely, so there is no need to comment code in or out.
 *
 * ONE THING THAT DOES *NOT* BELONG HERE
 * -------------------------------------
 * A Search Console verification tag
 * (<meta name="google-site-verification" ... />) is a meta tag, not a
 * script, and must be registered through Next's metadata system.
 * There is a clearly marked placeholder for it in app/layout.tsx.
 *
 * NOTE ON TESTING
 * ---------------
 * Tracking is deliberately DISABLED on local development servers so
 * developer activity never reaches the analytics reports. Tags will
 * only appear on the live deployed site — verify them there, not on
 * localhost.
 * ------------------------------------------------------------------ */

/**
 * GA4 measurement ID — looks like "G-XXXXXXXXXX".
 * Paste it between the quotes, or set NEXT_PUBLIC_GA_ID in the hosting
 * environment if the ID should stay out of the repository.
 */
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

/**
 * Google Tag Manager container ID — looks like "GTM-XXXXXXX".
 * Only needed if the team manages tags through GTM rather than adding
 * them here directly. Using GTM *and* GA4 above will double-count
 * pageviews — pick one.
 */
const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

/**
 * `afterInteractive` loads tracking once the page is interactive.
 * This is intentional: the site's opening animations (GSAP + Lenis)
 * run on first paint, and loading analytics before them measurably
 * hurts the Largest Contentful Paint score that Google ranks on.
 * Do not change this to `beforeInteractive`.
 */
const SCRIPT_STRATEGY = "afterInteractive" as const;

export default function Analytics() {
  // Keep developer traffic out of the reports.
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      {/* ---------- Google Analytics 4 ---------- */}
      {GA_MEASUREMENT_ID && (
        <>
          <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-9529L6JMLC"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-9529L6JMLC');
</script>
        </>
      )}

      {/* ---------- Google Tag Manager ---------- */}
      {GTM_CONTAINER_ID && (
        <>
          <Script id="gtm-init" strategy={SCRIPT_STRATEGY}>
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`}
          </Script>
          {/* Fallback for visitors with JavaScript disabled. GTM requires
              this to sit as early in <body> as possible, which is why this
              component is rendered first inside the body tag. */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}

      {/* ================================================================
          ADD ANY OTHER TRACKING SCRIPT BELOW THIS LINE
          ----------------------------------------------------------------
          Paste the vendor's snippet as a <Script> block. Take the URL
          from the vendor's <script src="..."> tag:

            <Script src="https://example.com/tag.js" strategy={SCRIPT_STRATEGY} />

          For an inline snippet (code between <script> and </script>),
          wrap it in backticks and give the block a unique id:

            <Script id="my-tag" strategy={SCRIPT_STRATEGY}>
              {`  ...the snippet's code...  `}
            </Script>

          Every <Script> needs either a `src` or an `id` — an inline
          block without an id will not load.
          ================================================================ */}
    </>
  );
}
