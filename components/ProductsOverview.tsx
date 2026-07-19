"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SplitReveal from "@/components/SplitReveal";
import { productMenu } from "@/lib/data";
import { PRODUCT_PAGES } from "@/lib/products";

/* ------------------------------------------------------------------ *
 * ProductsOverview — /products landing: header + one card per
 * product range, linking to its detail page. Images and gradient
 * tiles match the header mega menu.
 * ------------------------------------------------------------------ */

// Pair each mega-menu entry (image) with its page data (copy).
const RANGES = productMenu.flatMap((menuItem) => {
  const page = PRODUCT_PAGES.find((p) => `/products/${p.slug}` === menuItem.href);
  return page ? [{ ...menuItem, page }] : [];
});

export default function ProductsOverview() {
  return (
    <section className="bg-soft pb-24 pt-32 md:pb-32 md:pt-44">
      <div className="shell">
        <div className="max-w-3xl">
          <Reveal>
            <span className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-korange">
              <span className="h-2.5 w-2.5 rounded-full bg-korange" aria-hidden />
              Our Products
            </span>
          </Reveal>
          <SplitReveal className="mt-4 font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-bold uppercase leading-[1.08] tracking-tight text-knavy">
            Complete piping systems, one brand
          </SplitReveal>
          <Reveal delay={0.15}>
            <p className="mt-5 font-book text-[15px] leading-relaxed text-muted md:text-[16px]">
              From plumbing to drainage to borewell systems — every WorldFlow
              range is manufactured as a complete family of pipes and matching
              fittings, batch-tested to IS standards.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {RANGES.map((range, i) => (
            <Reveal key={range.href} delay={(i % 4) * 0.08} className="h-full">
              <Link
                href={range.href}
                className="group flex h-full flex-col rounded-lg bg-white p-4 shadow-[0_4px_14px_-12px_rgba(27,36,49,0.3)] transition-shadow duration-300 ease-sc hover:shadow-[0_16px_40px_-20px_rgba(27,36,49,0.35)]"
              >
                <span className="block h-56 overflow-hidden rounded-md">
                  <Image
                    src={range.image}
                    alt={range.page.title}
                    width={716}
                    height={460}
                    className="h-full w-full object-cover transition-transform duration-500 ease-sc group-hover:scale-105"
                  />
                </span>
                <span className="flex flex-1 flex-col px-2 pb-2 pt-5">
                  <span className="font-book text-[18px] font-bold tracking-tight text-knavy transition-colors duration-300 group-hover:text-korange">
                    {range.page.title}
                  </span>
                  <span className="mt-2 line-clamp-3 font-book text-[13.5px] leading-relaxed text-muted">
                    {range.page.intro[0]}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 font-book text-[14px] font-semibold text-korange">
                    View Product
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 ease-sc group-hover:translate-x-0.5" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
