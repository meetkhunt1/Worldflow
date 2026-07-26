"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 * AboutQuality — "Every Pipe. Every Batch. Every Time."
 * Split layout: facility image on one side (settles from a gentle
 * zoom), the quality promise and four assurance badges on the other.
 * ------------------------------------------------------------------ */

type Badge = { label: string; icon: React.ReactNode };

const BADGES: Badge[] = [
  {
    label: "Pressure Tested",
    icon: <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 1 0-14 0H3a9 9 0 0 1 9-9zm0 6a3 3 0 0 1 3 3l-.1.6 2.2 2.2-1.4 1.4-2.2-2.2-.5.1a3 3 0 1 1-1-5.9V9z" />,
  },
  {
    label: "Precision Engineered",
    icon: <path d="M12 2a2 2 0 0 1 2 2v1.1a7 7 0 0 1 2.5 1.5l1-.6a2 2 0 0 1 2.7.7l1 1.8a2 2 0 0 1-.7 2.7l-1 .6a7 7 0 0 1 0 2.4l1 .6a2 2 0 0 1 .7 2.7l-1 1.8a2 2 0 0 1-2.7.7l-1-.6a7 7 0 0 1-2.5 1.5V22a2 2 0 0 1-4 0v-1.1a7 7 0 0 1-2.5-1.5l-1 .6a2 2 0 0 1-2.7-.7l-1-1.8a2 2 0 0 1 .7-2.7l1-.6a7 7 0 0 1 0-2.4l-1-.6a2 2 0 0 1-.7-2.7l1-1.8a2 2 0 0 1 2.7-.7l1 .6A7 7 0 0 1 10 5.1V4a2 2 0 0 1 2-2zm0 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />,
  },
  {
    label: "Leak Resistant",
    icon: <path d="M12 2s6 6.6 6 11a6 6 0 1 1-12 0c0-4.4 6-11 6-11zm0 3.1C10.2 7.4 8 10.6 8 13a4 4 0 1 0 8 0c0-2.4-2.2-5.6-4-7.9z" />,
  },
  {
    label: "Long Lasting",
    icon: <path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3zm0 4.5a1.5 1.5 0 0 1 1.5 1.5v2.6l2 1.2-.8 1.3-2.7-1.6V9A1.5 1.5 0 0 1 12 7.5z" />,
  },
];

export default function AboutQuality() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { duration: 0.9, ease: "power2.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        });

        // fromTo (not from) so end values stay correct across dev-mode
        // remounts.
        tl.fromTo(
          "[data-quality-media]",
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, clearProps: "all" }
        );
        tl.fromTo(
          "[data-quality-media] img",
          { scale: 1.12 },
          { scale: 1, duration: 1.3, clearProps: "scale,transform" },
          "<"
        );
        tl.fromTo(
          "[data-quality-copy] > *",
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, stagger: 0.08, clearProps: "all" },
          "-=0.7"
        );
        tl.fromTo(
          ".quality-badge",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, clearProps: "all" },
          "-=0.4"
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-soft py-20 md:py-28">
      <div className="shell">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Facility image */}
          <div data-quality-media className="overflow-hidden rounded-2xl">
            <img
              src="/factory/mixing-plant.jpg"
              alt="Raw material mixing and blending plant at the WorldFlow facility"
              loading="lazy"
              className="aspect-[4/3.4] w-full object-cover md:aspect-[4/4.2]"
            />
          </div>

          {/* Promise copy + badges */}
          <div data-quality-copy>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-korange">
              Quality Promise
            </span>
            <SplitReveal
              as="h2"
              className="mt-4 font-book text-[clamp(1.9rem,4.2vw,48px)] font-semibold leading-[1.15] tracking-tight text-knavy"
            >
              Every Pipe.
              <br />
              Every Batch.
              <br />
              Every Time.
            </SplitReveal>
            <p className="mt-5 max-w-xl font-book text-[16px] leading-relaxed text-muted md:text-[17px]">
              Our quality standards are designed to ensure every product
              leaving our facility delivers the performance customers expect.
              Through continuous inspection, testing, and process control, we
              maintain consistency across every production cycle.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-10">
              {BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="quality-badge flex items-center gap-4 rounded-xl bg-white p-4 shadow-[0_8px_22px_-18px_rgba(27,36,49,0.35)]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-korange/10 text-korange">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      {badge.icon}
                    </svg>
                  </span>
                  <span className="font-book text-[15px] font-semibold tracking-tight text-knavy">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
