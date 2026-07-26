"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 * AboutCTA — closing dark call-to-action.
 * Factory photograph under a deep navy wash, drifting slowly upward
 * (subtle parallax, scrubbed to scroll) behind large centred type and
 * the two primary actions.
 * ------------------------------------------------------------------ */

export default function AboutCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Background drifts slower than the page for gentle depth.
        gsap.fromTo(
          "[data-cta-bg]",
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );

        // fromTo (not from) so end values stay correct across dev-mode
        // remounts.
        gsap.fromTo(
          "[data-cta-fade]",
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.12,
            clearProps: "all",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-knavy py-28 md:py-40"
    >
      {/* Parallax background — oversized so the drift never shows edges */}
      <div data-cta-bg className="absolute -inset-y-[12%] inset-x-0" aria-hidden>
        <img
          src="/factory/warehouse.jpg"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-knavy/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-knavy via-transparent to-knavy/60" />
      </div>

      <div className="shell relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <SplitReveal
            as="h2"
            className="font-book text-[clamp(2.1rem,5vw,58px)] font-semibold leading-[1.12] tracking-tight text-white"
          >
            Let&apos;s Build Reliable
            <br />
            Infrastructure Together
          </SplitReveal>

          <p
            data-cta-fade
            className="mx-auto mt-6 max-w-2xl font-book text-[16px] leading-relaxed text-white/75 md:text-[18px]"
          >
            Partner with WorldFlow for dependable piping solutions engineered
            for lasting performance.
          </p>

          <div
            data-cta-fade
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-12"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-korange px-9 py-4 font-book text-[15px] font-semibold text-white transition-all duration-300 ease-sc hover:-translate-y-0.5 hover:bg-korangeDark"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-9 py-4 font-book text-[15px] font-semibold text-white transition-all duration-300 ease-sc hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
            >
              Become a Dealer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
