"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 * Applications — "Designed for Multiple Industries".
 * Pinned horizontal-scroll slider: on desktop the section pins while
 * the card track scrolls sideways 1:1 with vertical scroll; once the
 * track reaches the end, normal page scrolling resumes. On mobile it
 * falls back to a native swipe carousel (no pin) for performance.
 * ------------------------------------------------------------------ */

type AppCard = { title: string; blurb: string; image: string };

const CARDS: AppCard[] = [
  {
    title: "Residential Plumbing",
    blurb:
      "Reliable pipes for homes and residential buildings, ensuring long-lasting plumbing performance.",
    image: "/apps/01.png",
  },
  {
    title: "Commercial Buildings",
    blurb:
      "Durable, high-pressure piping for offices and commercial complexes, built to code.",
    image: "/apps/02.png",
  },
  {
    title: "Agricultural Irrigation",
    blurb:
      "Efficient piping solutions for irrigation systems, delivering consistent water supply across farms.",
    image: "/apps/03.png",
  },
  {
    title: "Borewell Installations",
    blurb:
      "High-strength pipes designed for borewell structures and submersible pump installations.",
    image: "/apps/04.png",
  },
  {
    title: "Drainage & Water Systems",
    blurb:
      "Reliable drainage pipes built for soil, waste, and rainwater — for consistent water management.",
    image: "/apps/05.png",
  },
  {
    title: "Industrial Fluid Transport",
    blurb:
      "Heavy-duty pipes suitable for industrial water and fluid transport systems.",
    image: "/apps/06.png",
  },
];

export default function Applications() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!section || !pin || !track) return;

      // Pin + horizontal scroll only on desktop; mobile uses native swipe.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: section,
          start: "center center",
          end: () => `+=${distance()}`,
          pin: pin,
          // Light scrub only — Lenis already smooths the scroll; stacking a
          // heavy scrub on top makes the pin feel frozen at its boundaries.
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: tween,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="applications relative bg-white py-16 md:py-24">
      <div ref={pinRef} className="flex flex-col gap-8 md:gap-10">
        <div className="shell">
          <SplitReveal className="max-w-3xl font-display text-[clamp(1.8rem,4vw,3rem)] font-bold uppercase leading-tight tracking-tight text-ink">
            Designed for <span className="text-korange">Multiple Industries</span>
          </SplitReveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-xl font-book text-[17px] text-muted">
              Our piping systems are built to adapt to diverse environmental and
              operational conditions.
            </p>
          </Reveal>
        </div>

        {/* Card track */}
        <div className="no-scrollbar overflow-x-auto md:overflow-visible">
          <div
            ref={trackRef}
            className="flex w-max gap-5 px-5 will-change-transform md:gap-6 md:px-10"
          >
            {CARDS.map((c) => (
              <article
                key={c.title}
                className="group relative aspect-[8/9] w-[78vw] shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.45)] sm:w-[52vw] md:w-[42vw] lg:w-[30vw]"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-sc group-hover:scale-105"
                />
                {/* Bottom gradient for caption legibility */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white md:text-[28px]">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 max-w-sm font-book text-[14px] leading-snug text-white/85">
                    {c.blurb}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
