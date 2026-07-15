# SpoiledChild — Homepage Recreation

A high-fidelity recreation of the SpoiledChild homepage built with **Next.js 14 (App Router)**,
**TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lenis** smooth scrolling.

## Run

```bash
npm install
npm run dev
# http://localhost:3000
```

## Structure

```
app/
  layout.tsx        Root layout: metadata, Lenis, Header, Footer
  page.tsx          Homepage composition
  globals.css       Font-face, tokens, brand button/utility classes
components/
  SmoothScroll.tsx  Lenis provider
  Reveal.tsx        Scroll-in animation wrapper (Framer Motion)
  Header.tsx        Sticky header, mobile drawer, concern dropdowns, minicart
  E27Banner.tsx     "Magic Collagen" top banner
  Hero.tsx          "The future of wellness" hero + floating capsule
  ProductSlider.tsx Drag/arrow product carousel, per-capsule neon accent
  SpoiledSmart.tsx  "The Spoiled are smart" parallax + SB brain animation
  HowItWorks.tsx    "Welcome to capsule culture" video + steps
  VideoReviews.tsx  Two review video carousels (experts / loved)
  FeaturedOn.tsx    Infinite press-logo marquee
  Footer.tsx        Store switcher, nav, subscribe, social, disclaimers
lib/
  data.ts           Products, reviews, nav — lifted from the source HTML
```

## Assets you must replace

These are proprietary and cannot be bundled. Placeholders are clearly marked in code:

| Placeholder location | Original asset |
|---|---|
| `public/fonts/MaisonNeue-Book.woff2` | SpoiledChild body font |
| `public/fonts/MediaSansCondensed-Bold.woff2` | SpoiledChild display font |
| `components/Header.tsx` → `Wordmark` | `sc-new-logo.svg` |
| `components/E27Banner.tsx` gradient panels | E27 lifestyle + bottle images |
| `components/Hero.tsx` capsule motif | `c-green.png` bottle render |
| `components/SpoiledSmart.tsx` brain graphic | `SB_1.gif` |
| `components/FeaturedOn.tsx` logos | press logos (Vogue, Allure, …) |

Product renders and review videos load live from SpoiledChild / ilmakiage CDNs
via `next.config.js` `remotePatterns`. If a URL 403s, download and self-host it.

## Fidelity notes

- Smooth scroll (Lenis), scroll-reveal, parallax on the dark ML section, floating
  capsule, hover lifts, per-product neon glow, infinite marquee, and both video
  carousels (drag + arrow, snap) are implemented.
- Breakpoints follow the source: mobile ≤640, tablet 768, desktop ≥1024.
