# WorldFlow — Pipes & Fittings

Marketing site for **WorldFlow** (Hari Om Polyplast), a Rajkot-based manufacturer of
UPVC, CPVC, SWR drainage and borewell column pipes.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **GSAP**
(with ScrollTrigger), **Framer Motion**, and **Lenis** smooth scrolling.

## Run

```bash
npm install
npm run dev
# http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server (builds into `.next-dev`) |
| `npm run build` | Production build (builds into `.next`) |
| `npm start` | Serve the production build |
| `npm run lint` | Next.js lint |
| `npm run clean` | Delete both build directories |

> Dev and production use **separate build directories** on purpose — see the comment
> at the top of `next.config.js`. A `next build` can't clobber a running dev server.

## Routes

```
/                          Homepage
/about                     Company story, values, global presence
/products                  Product range overview
/products/[slug]           Product detail  (upvc-plumbing-pipes, cpvc-plumbing-pipes,
                                            swr-drainage-system, column-pipes)
/infrastructure            Plant, machinery, production zones
/quality-certifications    Certificates and testing
/contact                   Enquiry form, phones, address, map
/career                    Open roles
/career/[slug]             Role detail + application
/blog                      Articles
/blog/[slug]               Article detail
```

Product, blog and career pages are statically generated from the data files in `lib/`.

## Structure

```
app/
  layout.tsx        Root layout: fonts, metadata, Analytics, Preloader,
                    Header/Footer, StickyContact
  page.tsx          Homepage composition
  globals.css       Tokens, .shell container, button utilities
components/
  Header.tsx        Fixed header, product dropdown, mobile drawer
  Footer.tsx        Contact block, quick links, socials
  StickyContact.tsx Floating WhatsApp + email buttons (every page)
  Analytics.tsx     ALL third-party tracking scripts live here — see below
  Preloader.tsx     First-visit wordmark intro (once per session)
  SmoothScroll.tsx  Lenis provider
  Reveal.tsx        Fade-up wrapper (Framer Motion)
  SplitReveal.tsx   Per-character headline reveal (custom split, no SplitText)
  ButtonFx.tsx      Cursor-origin fill effect for .btn-fill buttons
  Hero.tsx, AboutUs.tsx, ScrollProductJourney.tsx, Applications.tsx,
  WhyChooseUs.tsx, ImpactStats.tsx            Homepage sections
  About*.tsx, Infrastructure*.tsx, Product*.tsx, Quality*.tsx,
  BlogBoard/BlogArticle, CareerBoard/JobApplication, ContactSection
lib/
  data.ts           Nav, footer, contact details, homepage copy
  products.ts       Product pages + per-product SEO
  blog.ts           Blog posts
  careers.ts        Job listings
  lenis.ts          Shared Lenis instance accessor
```

## Editing content

Most copy changes are data edits, not component edits:

| Change | File |
|---|---|
| Phone, WhatsApp, email, address, map, socials | `lib/data.ts` → `footerContact` |
| Footer links, product menu, nav | `lib/data.ts` |
| Product pages, specs, FAQs, per-page SEO | `lib/products.ts` |
| Blog posts | `lib/blog.ts` |
| Job openings | `lib/careers.ts` |
| Site title / description / OG tags | `app/layout.tsx` → `metadata` |

`footerContact` is the single source of truth for contact details — the footer,
contact page, career applications and the sticky WhatsApp/email buttons all read
from it, so updating the number or address there updates every one of them.

## Analytics & SEO

**All Google and other third-party scripts go in `components/Analytics.tsx`.**
It is already wired into the root layout, so anything added there loads on every
page. There is no `_document.js`, `_app.js` or `index.html` in an App Router
project — do not go looking for one.

- GA4 / GTM: set `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID` in the hosting
  environment, or paste the ID into the matching constant in `Analytics.tsx`.
  An empty ID skips that block entirely.
- Search Console verification is a **meta tag**, not a script — there is a marked
  placeholder for it in `app/layout.tsx` → `metadata.verification`.
- Tracking is deliberately disabled on local dev servers, so verify tags on the
  deployed site, not on localhost.

## Animation conventions

GSAP is the primary animation library. `CLAUDE.md` holds the full house rules; the
short version:

- Prefer a single timeline over several loose tweens.
- Animate `transform` and `opacity` only.
- Use `useGSAP()` with a `scope` ref, and revert `matchMedia` on cleanup.
- Wrap motion in `gsap.matchMedia()` and honour `prefers-reduced-motion`.
- Defaults: `duration: 0.8`, `ease: "power2.out"`. No bounce, no heavy scaling.
- `once: true` for reveals; `scrub` only for parallax.

## Assets

Images, videos, certificates, brochures and the logo live in `public/`.
`ASSETS-NEEDED.md` tracks anything still outstanding.

## Known leftovers

The project began from a template, and a few unused components are still in the
tree: `VideoReviews.tsx`, `FeaturedOn.tsx`, `E27Banner.tsx`, `ProductSlider.tsx`,
`HowItWorks.tsx`. Nothing imports them. The `images.remotePatterns` entries in
`next.config.js` (spoiledchild / ilmakiage / s3) belong to those components and can
go whenever the components do.
