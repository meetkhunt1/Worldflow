"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 * AboutShowcase — pinned horizontal scroll slider.
 * Directly after the About statement: the section pins while a track
 * of full-height cards (brand text panels, factory imagery, video)
 * scrolls sideways 1:1 with vertical scroll, then releases. Mobile
 * falls back to a native swipe carousel (no pin) for performance.
 * ------------------------------------------------------------------ */

export default function AboutShowcase() {
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
          // Light scrub only — Lenis already smooths the scroll.
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: tween,
        });
      });
    },
    { scope: sectionRef }
  );

  const cardBase =
    "relative h-[62vh] w-[86vw] shrink-0 overflow-hidden rounded-2xl sm:w-[60vw] md:h-[72vh] lg:w-[46vw]";

  return (
    <section ref={sectionRef} className="bg-paper py-10 md:py-16">
      <div ref={pinRef}>
        <div className="no-scrollbar overflow-x-auto md:overflow-visible">
          <div
            ref={trackRef}
            className="flex w-max gap-5 px-5 will-change-transform md:gap-6 md:px-10"
          >
            {/* 01 — brand statement on orange */}
            <article className={`${cardBase} bg-korange`}>
              <div className="flex h-full flex-col justify-between p-8 md:p-12">
                <p className="max-w-xl font-book text-[clamp(1.4rem,2.6vw,38px)] font-semibold leading-[1.3] tracking-tight text-white">
                  At WorldFlow, we understand that every project has unique
                  requirements — and we work closely with our partners to
                  deliver piping solutions tailored to their specific needs.
                </p>
                <img
                  src="/worldflow-logo.webp"
                  alt="WorldFlow"
                  loading="lazy"
                  className="ml-auto h-7 w-auto opacity-90"
                />
              </div>
            </article>

            {/* 02 — factory image with overlay line */}
            <article className={`${cardBase} bg-knavy`}>
              <img
                src="/about-facility.jpg"
                alt="WorldFlow production facility"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/45" aria-hidden />
              <div className="relative flex h-full items-center justify-center p-8 md:p-12">
                <p className="max-w-lg text-center font-book text-[clamp(1.4rem,2.4vw,36px)] font-semibold leading-[1.3] tracking-tight text-white">
                  We are confident our systems will carry your business to the
                  next level.
                </p>
              </div>
            </article>

            {/* 03 — goal statement on navy */}
            <article className={`${cardBase} bg-knavy`}>
              <div className="flex h-full flex-col justify-between p-8 md:p-12">
                <p className="max-w-xl font-book text-[clamp(1.4rem,2.6vw,38px)] font-semibold leading-[1.3] tracking-tight text-white">
                  Our goal is to help our clients achieve their objectives by
                  combining dependable products, precision engineering, and
                  the expertise today&apos;s demanding projects require.
                </p>
                <img
                  src="/worldflow-logo.webp"
                  alt="WorldFlow"
                  loading="lazy"
                  className="ml-auto h-7 w-auto opacity-90"
                />
              </div>
            </article>

            {/* 04 — video card */}
            <article className={`${cardBase} bg-knavy`}>
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/hero.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
              />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
