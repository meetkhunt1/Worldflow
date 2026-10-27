import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { LandingPage } from "@/lib/landing-types";

/* ------------------------------------------------------------------ *
 * LandingHero — the content area for a standalone SEO landing page
 * (see lib/landing-types.ts). Same visual as the product hero (image
 * card left, title + intro + CTA right), but with a single "Enquire
 * Now" button only — no brochure download, no tabs, no FAQ.
 * ------------------------------------------------------------------ */

export default function LandingHero({ page }: { page: LandingPage }) {
  return (
    <section className="bg-paper pb-20 pt-32 md:pb-24 md:pt-44">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="rounded-xl border border-knavy/10 bg-white p-8 md:p-12">
              <img
                src={page.image}
                alt={page.imageAlt}
                className="mx-auto aspect-square w-full max-w-[440px] object-contain"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h1 className="font-book text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold tracking-tight text-knavy">
                {page.title}
              </h1>
            </Reveal>
            {page.intro.map((paragraph, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="mt-5 font-book text-[15px] leading-relaxed text-muted">
                  {paragraph}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="btn-fill btn-fill-navy rounded-md bg-korange px-7 py-3.5 font-book text-[15px] font-semibold text-white"
                >
                  Enquire Now
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
