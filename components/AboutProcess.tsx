"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 * AboutProcess — "Streamlined Process, Continuous Supply".
 * Four numbered step cards in a row (light theme): number + title on
 * top, description anchored at the card base. Below, a pill bar with
 * overlapping avatar chips and a contact CTA. Cards stagger-fade
 * upward on reveal.
 * ------------------------------------------------------------------ */

type Step = {
  number: string;
  title: string;
  blurb: string;
};

const STEPS: Step[] = [
  {
    number: "01.",
    title: "Raw Material Selection",
    blurb: "Certified compounds are verified against strict specifications before entering production.",
  },
  {
    number: "02.",
    title: "Precision Extrusion",
    blurb: "Modern extrusion lines form every pipe to exact dimensional tolerances.",
  },
  {
    number: "03.",
    title: "Testing & Inspection",
    blurb: "Each batch is dimension-checked and pressure-tested before it leaves the line.",
  },
  {
    number: "04.",
    title: "Packaging & Dispatch",
    blurb: "Finished pipes are bundled, stocked, and delivered on time, every time.",
  },
];

export default function AboutProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // fromTo (not from) so end values stay correct across dev-mode
        // remounts.
        gsap.fromTo(
          ".process-card",
          { autoAlpha: 0, y: 40, transition: "none" },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            clearProps: "all",
            scrollTrigger: {
              trigger: "[data-process-grid]",
              start: "top 80%",
              once: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-soft py-20 md:py-28">
      <div className="shell">
        {/* Header: eyebrow with dot, heading with trailing rule */}
        <Reveal>
          <span className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-korange">
            <span className="h-2.5 w-2.5 rounded-full bg-korange" aria-hidden />
            4 Stage Process
          </span>
        </Reveal>
        <div className="mt-4 flex items-end gap-10">
          <SplitReveal className="font-book text-[clamp(1.9rem,4.2vw,48px)] font-semibold leading-[1.15] tracking-tight text-knavy">
            Streamlined Process,
            <br />
            Continuous Supply
          </SplitReveal>
          <Reveal className="mb-4 hidden flex-1 md:block" delay={0.2}>
            <span className="block h-px w-full bg-knavy/15" aria-hidden />
          </Reveal>
        </div>

        {/* Step cards */}
        <div
          data-process-grid
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4"
        >
          {STEPS.map((step) => (
            <article
              key={step.number}
              className="process-card group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-lg bg-white p-7 shadow-[0_4px_14px_-12px_rgba(27,36,49,0.3)] md:min-h-[300px]"
            >
              {/* Inner orange glow that fades in from the card base on hover */}
              <span
                className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(rgba(255,82,0,0)_54.21%,rgba(255,82,0,0.2)_100%)] opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100"
                aria-hidden
              />
              <span className="font-book text-[17px] font-semibold text-korange">
                {step.number}
              </span>
              <div className="mt-10">
                <h3 className="max-w-[12ch] font-book text-[21px] font-semibold leading-snug tracking-tight text-knavy md:text-[23px]">
                  {step.title}
                </h3>
                <p className="mt-3 font-book text-[14px] leading-relaxed text-muted">
                  {step.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
