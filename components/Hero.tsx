"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { splitIntoChars } from "@/components/SplitReveal";

gsap.registerPlugin(useGSAP);

const SLIDE_DURATION = 4; // seconds each slide stays on screen
const FADE_DURATION = 1; // crossfade length between slides

const slides = [
  {
    video: "/hero.mp4",
    heading: ["Engineering flow.", "Building trust."],
    sub: "Premium UPVC, CPVC, SWR, HDPE, Column & Casing pipe systems manufactured for agriculture, residential, commercial, and industrial infrastructure.",
  },
  {
    video: "/08487bc5-c1b3-4b89-a112-350e3db7358c.mp4",
    heading: ["Precision in every pipe.", "Strength in every flow."],
    sub: "Complete piping systems engineered for plumbing, drainage, borewell, and irrigation applications.",
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Split every slide heading into word-masked characters (once, on mount,
  // before the crossfade effect below animates them).
  useGSAP(
    () => {
      gsap.utils
        .toArray<HTMLElement>("[data-slide-heading]")
        .forEach(splitIntoChars);
    },
    { scope: sectionRef }
  );

  // Progress line: fills over the slide duration, then advances the slide
  useGSAP(
    () => {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: SLIDE_DURATION,
          ease: "none",
          onComplete: () => setActive((i) => (i + 1) % slides.length),
        }
      );
    },
    { dependencies: [active], scope: sectionRef }
  );

  // Crossfade video + text whenever the active slide changes
  useGSAP(
    () => {
      const videos = gsap.utils.toArray<HTMLVideoElement>("[data-slide-video]");
      const texts = gsap.utils.toArray<HTMLElement>("[data-slide-text]");

      videos.forEach((video, i) => {
        if (i === active) {
          video.play().catch(() => {});
          gsap.to(video, {
            autoAlpha: 1,
            duration: FADE_DURATION,
            ease: "power2.inOut",
          });
        } else {
          gsap.to(video, {
            autoAlpha: 0,
            duration: FADE_DURATION,
            ease: "power2.inOut",
            onComplete: () => video.pause(),
          });
        }
      });

      texts.forEach((text, i) => {
        if (i === active) {
          // Block fades in (covers the subtitle); the heading characters
          // rise from below their word masks — split-reveal per slide.
          gsap.fromTo(
            text,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.6, ease: "power2.out", delay: 0.15 }
          );
          gsap.fromTo(
            text.querySelectorAll(".sr-c"),
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: 0.85,
              ease: "power4.out",
              stagger: 0.025,
              delay: 0.2,
            }
          );
        } else {
          gsap.to(text, {
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.in",
          });
        }
      });
    },
    { dependencies: [active], scope: sectionRef }
  );

  // One-time entrance for the CTA button
  useGSAP(
    () => {
      gsap.from("[data-hero-cta]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        delay: 0.3,
        ease: "power2.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-end justify-center overflow-hidden bg-knavy pb-24 md:pb-28"
    >
      {/* Stacked background videos, crossfaded by GSAP */}
      {slides.map((slide, i) => (
        <video
          key={slide.video}
          data-slide-video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
          src={slide.video}
          autoPlay={i === 0}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
      ))}

      {/* Subtle dark-to-light gradient (darker at bottom for text legibility) */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/15"
        aria-hidden
      />

      <div className="shell relative z-10 w-full">
        <div className="mx-auto max-w-4xl text-center">
          {/* Stacked slide texts, crossfaded by GSAP. The row is as tall
              as the tallest slide; items-end keeps the spare height above
              the heading instead of between the text and the CTAs. */}
          <div className="grid items-end">
            {slides.map((slide, i) => (
              <div
                key={slide.video}
                data-slide-text
                className="col-start-1 row-start-1"
                style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
              >
                <h1
                  data-slide-heading
                  className="font-display text-[clamp(1.9rem,5.5vw,54px)] font-bold uppercase leading-[1.08] tracking-tight text-white"
                >
                  {slide.heading[0]}
                  <br />
                  {slide.heading[1]}
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-[17px] font-medium text-white/85">
                  {slide.sub}
                </p>
              </div>
            ))}
          </div>

          <div data-hero-cta className="mt-5 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/products"
              className="btn-fill btn-fill-navy inline-block rounded-full bg-korange px-10 py-4 text-[16px] font-semibold text-white shadow-lg transition-transform duration-300 ease-sc hover:-translate-y-0.5"
            >
              Explore Products
            </a>
            <a
              href="/contact"
              className="btn-fill btn-fill-white inline-block rounded-full border border-white/70 px-10 py-4 text-[16px] font-semibold text-white transition-all duration-300 ease-sc hover:-translate-y-0.5 hover:text-knavy"
            >
              Become a Dealer
            </a>
          </div>
        </div>
      </div>

      {/* Slide progress indicator: line fills over the slide duration */}
      <div className="absolute bottom-8 right-6 z-10 md:bottom-10 md:right-10">
        <div className="h-[2px] w-20 overflow-hidden rounded-full bg-white/25 md:w-28">
          <div
            ref={progressRef}
            className="h-full w-full origin-left scale-x-0 rounded-full bg-white"
            style={{ willChange: "transform" }}
          />
        </div>
      </div>
    </section>
  );
}
