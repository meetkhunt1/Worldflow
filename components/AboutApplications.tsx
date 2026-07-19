"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 * AboutApplications — "Engineered for Every Environment".
 * Large image cards for each application sector. Cards reveal with a
 * stagger; on hover the photo zooms, an orange wash rises and the
 * sector description slides into view.
 * ------------------------------------------------------------------ */

type Application = {
  title: string;
  blurb: string;
  image: string;
};

const APPLICATIONS: Application[] = [
  {
    title: "Residential",
    blurb: "Dependable plumbing systems for homes, apartments, and housing developments.",
    image: "/apps/01.png",
  },
  {
    title: "Commercial",
    blurb: "High-capacity piping for offices, retail, and commercial complexes, built to code.",
    image: "/apps/02.png",
  },
  {
    title: "Agriculture",
    blurb: "Irrigation networks that deliver consistent water supply across every field.",
    image: "/apps/03.png",
  },
  {
    title: "Industrial",
    blurb: "Heavy-duty systems for process water and industrial fluid transport.",
    image: "/apps/06.png",
  },
  {
    title: "Infrastructure",
    blurb: "Engineered pipe systems for borewells, utilities, and public works projects.",
    image: "/apps/04.png",
  },
  {
    title: "Water Supply",
    blurb: "Reliable distribution and drainage networks for consistent water management.",
    image: "/apps/05.png",
  },
];

export default function AboutApplications() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // fromTo (not from) so end values stay correct across dev-mode
        // remounts.
        gsap.fromTo(
          ".app-card",
          { autoAlpha: 0, y: 48 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            stagger: 0.09,
            clearProps: "all",
            scrollTrigger: {
              trigger: "[data-apps-grid]",
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
    <section ref={sectionRef} className="bg-paper py-20 md:py-28">
      <div className="shell">
        <div className="max-w-3xl">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-korange">
              Where Our Products Are Used
            </span>
          </Reveal>
          <SplitReveal className="mt-4 font-book text-[clamp(1.9rem,4.2vw,48px)] font-semibold leading-[1.1] tracking-tight text-knavy">
            Engineered for Every Environment
          </SplitReveal>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-2xl font-book text-[16px] leading-relaxed text-muted md:text-[17px]">
              WorldFlow piping systems are trusted across a wide range of
              applications where durability, efficiency, and consistent
              performance matter most.
            </p>
          </Reveal>
        </div>

        <div
          data-apps-grid
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {APPLICATIONS.map((app) => (
            <article
              key={app.title}
              className="app-card group relative aspect-[4/5] overflow-hidden rounded-2xl bg-knavy sm:aspect-[4/4.6]"
            >
              <img
                src={app.image}
                alt={app.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-sc group-hover:scale-105"
              />

              {/* Base gradient for title legibility */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
                aria-hidden
              />
              {/* Orange wash on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-korangeDark/85 via-korange/35 to-transparent opacity-0 transition-opacity duration-500 ease-sc group-hover:opacity-100"
                aria-hidden
              />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <h3 className="font-book text-[22px] font-semibold tracking-tight text-white md:text-[24px]">
                  {app.title}
                </h3>
                {/* Description reveals on hover (always visible on touch layouts without hover) */}
                <p className="mt-2 max-w-sm font-book text-[14px] leading-snug text-white/90 transition-all duration-500 ease-sc md:max-h-0 md:translate-y-3 md:opacity-0 md:group-hover:max-h-24 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  {app.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
