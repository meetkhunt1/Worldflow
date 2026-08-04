"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { splitIntoChars } from "@/components/SplitReveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 * InfrastructureHero — header for the /infrastructure page.
 * A real photograph of the plant exterior sits behind the heading and
 * drifts slowly upward as the page scrolls. Photo (not video) so the
 * page opens on the facility itself.
 * ------------------------------------------------------------------ */

export default function InfrastructureHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (headingRef.current) splitIntoChars(headingRef.current);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.from(".sr-c", {
          yPercent: 115,
          duration: 0.85,
          ease: "power4.out",
          stagger: 0.02,
          delay: 0.2,
        });

        tl.from(
          "[data-hero-fade]",
          { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.12 },
          "-=0.45"
        );

        // Background drifts slower than the page for gentle depth.
        gsap.fromTo(
          "[data-hero-bg]",
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
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
      className="relative flex min-h-[420px] items-center overflow-hidden bg-knavy pb-24 pt-36 md:h-[65vh] md:min-h-[480px] md:pb-0 md:pt-28"
    >
      {/* Oversized so the parallax drift never reveals an edge */}
      <div data-hero-bg className="absolute -inset-y-[10%] inset-x-0" aria-hidden>
        <img
          src="/factory/plant-exterior.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Left-weighted overlay for text legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25"
        aria-hidden
      />

      <div className="shell relative z-10 w-full">
        <div className="max-w-3xl">
          <p
            data-hero-fade
            className="mb-5 text-[13px] font-semibold uppercase tracking-[0.22em] text-korange"
          >
            Infrastructure
          </p>

          <h1
            ref={headingRef}
            className="font-book text-[clamp(2rem,5vw,54px)] font-semibold leading-[1.08] tracking-tight text-white"
          >
            Inside the plant
            <br />
            that makes your pipe
          </h1>

          <p
            data-hero-fade
            className="mt-6 max-w-xl font-book text-[16px] leading-relaxed text-white/80 md:text-[17px]"
          >
            Raw material blending, extrusion, moulding, warehousing and
            dispatch — photographed at our own facility in Rajkot, Gujarat.
          </p>
        </div>
      </div>
    </section>
  );
}
