"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 * AboutValues — "Why WorldFlow".
 * The emotional beat of the page: six large keywords appear one by
 * one (fade + subtle scale), followed by the closing brand paragraph.
 * ------------------------------------------------------------------ */

const VALUES = [
  "Quality",
  "Precision",
  "Reliability",
  "Innovation",
  "Performance",
  "Trust",
];

export default function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: "[data-values-words]",
            start: "top 75%",
            once: true,
          },
        });

        // Words surface one at a time, then the paragraph follows. fromTo
        // (not from) so end values stay correct across dev-mode remounts.
        tl.fromTo(
          ".value-word",
          { autoAlpha: 0, scale: 0.94, y: 16 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.14,
            clearProps: "all",
          }
        );
        tl.fromTo(
          "[data-values-copy]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.8, clearProps: "all" },
          "-=0.25"
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-soft py-24 md:py-36">
      <div className="shell">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-korange">
              What Makes Us Different
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-book text-[clamp(1.9rem,4.2vw,48px)] font-semibold leading-[1.1] tracking-tight text-knavy">
              Why WorldFlow
            </h2>
          </Reveal>

          {/* Keyword wall */}
          <div
            data-values-words
            className="mt-12 flex flex-wrap items-baseline justify-center gap-x-5 gap-y-2 md:mt-16 md:gap-x-8"
          >
            {VALUES.map((word, i) => (
              <span key={word} className="value-word inline-flex items-baseline gap-x-5 md:gap-x-8">
                <span className="font-book text-[clamp(2.2rem,7vw,80px)] font-semibold leading-[1.15] tracking-tight text-knavy">
                  {word}
                </span>
                {i < VALUES.length - 1 && (
                  <span
                    className="inline-block h-2 w-2 rounded-full bg-korange md:h-2.5 md:w-2.5"
                    aria-hidden
                  />
                )}
              </span>
            ))}
          </div>

          <p
            data-values-copy
            className="mx-auto mt-12 max-w-3xl font-book text-[16px] leading-relaxed text-muted md:mt-16 md:text-[18px]"
          >
            At WorldFlow, we believe quality is more than a manufacturing
            process — it is a commitment that extends from raw materials to
            the final product delivered to every customer. Our focus on
            precision engineering, dependable performance, and long-term
            relationships drives everything we create.
          </p>
        </div>
      </div>
    </section>
  );
}
