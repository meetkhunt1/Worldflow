"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 * AboutTrust — "Built on Quality. Trusted Through Performance."
 * Compact dark band: header row (heading left, supporting copy
 * right), then one facility image beside a 2×2 grid of trust cards.
 * Image and cards reveal together on scroll.
 * ------------------------------------------------------------------ */

type TrustCard = {
  title: string;
  blurb: string;
  icon: JSX.Element;
};

const ICON_PROPS = {
  width: 36,
  height: 36,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const CARDS: TrustCard[] = [
  {
    title: "Certified raw materials",
    blurb:
      "Every batch starts with certified compounds, verified against strict specifications before entering production.",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4.5" />
      </svg>
    ),
  },
  {
    title: "Precision extrusion",
    blurb:
      "Modern extrusion lines with in-line dimensional monitoring keep every run within exact tolerance.",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3.5V7M12 17v3.5M3.5 12H7M17 12h3.5" />
      </svg>
    ),
  },
  {
    title: "Hydrostatic testing",
    blurb:
      "Pipes are pressure-tested under load to guarantee leak-proof, long-lasting performance in the field.",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M12 3.5c3.2 3.8 6 7 6 10a6 6 0 11-12 0c0-3 2.8-6.2 6-10z" />
        <path d="M9.5 14.5a2.6 2.6 0 002.5 2" />
      </svg>
    ),
  },
  {
    title: "Final batch inspection",
    blurb:
      "No batch ships without dimensional checks and a final quality sign-off at the facility.",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <rect x="5" y="4" width="14" height="17" rx="2.5" />
        <path d="M9 4.5V3h6v1.5" />
        <path d="M9 13l2 2 4-4.5" />
      </svg>
    ),
  },
];

export default function AboutTrust() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // fromTo (not from) so end values stay correct across dev-mode
        // remounts. One timeline: image settles from a slight zoom
        // while the cards stagger-fade upward beside it.
        const tl = gsap.timeline({
          defaults: { duration: 0.9, ease: "power2.out" },
          scrollTrigger: {
            trigger: "[data-trust-grid]",
            start: "top 78%",
            once: true,
          },
        });

        tl.fromTo(
          "[data-trust-media]",
          { autoAlpha: 0, y: 32 },
          { autoAlpha: 1, y: 0, clearProps: "all" }
        );
        tl.fromTo(
          "[data-trust-media] img",
          { scale: 1.1 },
          { scale: 1, duration: 1.3, clearProps: "scale,transform" },
          "<"
        );
        tl.fromTo(
          ".trust-card",
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, stagger: 0.08, clearProps: "all" },
          "-=0.65"
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative bg-knavy py-16 md:py-24">
      {/* Angular dark backdrop graphic (navy fallback behind it),
          dimmed by a dark overlay for stronger contrast */}
      <div
        className="absolute inset-0 bg-[url('/trust-bg.webp')] bg-cover bg-center"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden />
      <div className="shell relative">
        {/* Header row: heading left, supporting copy right */}
        <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-korange">
                <span className="h-2.5 w-2.5 rounded-full bg-korange" aria-hidden />
                Why Trust WorldFlow
              </span>
            </Reveal>
            <SplitReveal className="mt-4 font-book text-[clamp(1.9rem,4.2vw,48px)] font-semibold leading-[1.12] tracking-tight text-white">
              Built on Quality.
              <br />
              Trusted Through Performance.
            </SplitReveal>
          </div>
          <Reveal className="lg:col-span-5" delay={0.15}>
            <p className="font-book text-[15px] leading-relaxed text-white/65 md:text-[16px] lg:mb-2">
              Every WorldFlow product is manufactured using carefully selected
              raw materials, advanced production technology, and rigorous
              quality control — so it performs exactly as engineered, in every
              application.
            </p>
          </Reveal>
        </div>

        {/* Image + trust cards */}
        <div
          data-trust-grid
          className="mt-10 grid gap-5 md:mt-14 lg:grid-cols-12"
        >
          <div
            data-trust-media
            className="relative min-h-[300px] overflow-hidden rounded-2xl sm:min-h-[360px] lg:col-span-5 lg:min-h-0"
          >
            <img
              src="/factory/extrusion-line.jpg"
              alt="WorldFlow pipe extrusion line in production"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Legibility scrim behind the badge */}
            <span
              className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-knavy/70 to-transparent"
              aria-hidden
            />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-book text-[13px] font-semibold text-knavy">
              <span className="h-2 w-2 rounded-full bg-korange" aria-hidden />
              Every batch pressure-tested
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {CARDS.map((card) => (
              <article
                key={card.title}
                className="trust-card rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 ease-sc hover:border-white/20 hover:bg-white/[0.07] md:p-7"
              >
                <span className="block text-korange">{card.icon}</span>
                <h3 className="mt-5 font-book text-[18px] font-semibold tracking-tight text-white md:text-[19px]">
                  {card.title}
                </h3>
                <p className="mt-2.5 font-book text-[14px] leading-relaxed text-white/60">
                  {card.blurb}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
