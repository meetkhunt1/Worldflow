"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { splitIntoChars } from "@/components/SplitReveal";

gsap.registerPlugin(useGSAP);

/* ------------------------------------------------------------------ *
 * AboutHero — full-bleed video hero for the About page.
 * Left-aligned heading rises character-by-character from a word mask,
 * then the tagline and CTA fade up in one entrance timeline.
 * ------------------------------------------------------------------ */

export default function AboutHero() {
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
          {
            autoAlpha: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.12,
          },
          "-=0.45"
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
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />

      {/* Left-weighted overlay for text legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10"
        aria-hidden
      />

      <div className="shell relative z-10 w-full">
        <div className="max-w-3xl">
          <h1
            ref={headingRef}
            className="font-book text-[clamp(2rem,5vw,54px)] font-semibold leading-[1.08] tracking-tight text-white"
          >
            Engineering strength,
            <br />
            one pipe at a time
          </h1>

          <p
            data-hero-fade
            className="mt-6 text-[14px] font-semibold uppercase tracking-[0.22em] text-white/85"
          >
            Building the backbone of modern infrastructure
          </p>
        </div>
      </div>
    </section>
  );
}
