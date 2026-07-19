"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { splitIntoChars } from "@/components/SplitReveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 * AboutStatement — centered "About us" pill followed by a large
 * mission statement. The statement is split into characters that sit
 * at low opacity and "fill in" one by one, scrubbed to the scroll
 * position, so the text colors itself in as you read down the page.
 * ------------------------------------------------------------------ */

export default function AboutStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // Pill: simple one-time fade up when the section enters. fromTo (not
      // from) so end values stay correct across dev-mode remounts.
      gsap.fromTo(
        "[data-statement-pill]",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      // Statement: characters fill from faint to full, tied to scroll
      const el = statementRef.current;
      if (!el) return;
      splitIntoChars(el);
      const chars = el.querySelectorAll(".sr-c");
      if (!chars.length) return;

      gsap.fromTo(
        chars,
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom 65%",
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-paper pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="shell">
        <div className="mx-auto max-w-5xl text-center">
          <span
            data-statement-pill
            className="inline-block rounded-full bg-korange px-6 py-2 text-[14px] font-semibold text-white"
          >
            About us
          </span>

          <h2
            ref={statementRef}
            className="mt-8 font-book text-[clamp(1.6rem,4vw,44px)] font-semibold leading-[1.3] tracking-tight text-knavy"
          >
            WorldFlow is dedicated to engineering advanced piping systems for
            agriculture, residential, commercial, and industrial
            infrastructure — with a focus on durability, performance, and
            trust, we strive to set the standard for how the world moves
            water.
          </h2>
        </div>
      </div>
    </section>
  );
}
