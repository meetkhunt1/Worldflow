"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 * AboutGlobalPresence — closing "Global Presence" section.
 * Dotted world map (/public/world-dots.png, transparent background)
 * with a giant knockout WORLDFLOW wordmark over it, flanked by
 * count-up stats, and the product range as pill badges overlapping
 * the map.
 * ------------------------------------------------------------------ */

type Stat = { value: number; suffix: string; label: string };

const STATS: { left: Stat; right: Stat } = {
  left: { value: 8, suffix: "+", label: "Years of Experience" },
  right: { value: 1000, suffix: "+", label: "Happy Clients" },
};

// Export / distribution markets shown as flag pills under the map.
// TODO: confirm the final country list with the client.
const COUNTRIES = [
  { name: "India", code: "in" },
  { name: "UAE", code: "ae" },
  { name: "Saudi Arabia", code: "sa" },
  { name: "Oman", code: "om" },
  { name: "Qatar", code: "qa" },
  { name: "Kuwait", code: "kw" },
  { name: "Nepal", code: "np" },
  { name: "Sri Lanka", code: "lk" },
];

export default function AboutGlobalPresence() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Map settles in from a gentle zoom; the wordmark follows.
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: "[data-gp-map]",
            start: "top 78%",
            once: true,
          },
        });

        tl.fromTo(
          "[data-gp-map]",
          { autoAlpha: 0, scale: 1.04 },
          { autoAlpha: 1, scale: 1, duration: 1.1, clearProps: "all" }
        );
        tl.fromTo(
          "[data-gp-word]",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.9, clearProps: "opacity,visibility,transform" },
          "-=0.6"
        );
        tl.fromTo(
          ".gp-stat",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12, clearProps: "all" },
          "-=0.5"
        );
        tl.fromTo(
          ".gp-pill",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, clearProps: "all" },
          "-=0.35"
        );

        // Stat numbers count up once the stats enter.
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const suffix = el.dataset.suffix ?? "";
          const state = { v: 0 };
          gsap.to(state, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate() {
              el.textContent = Math.round(state.v).toLocaleString("en-US") + suffix;
            },
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="overflow-hidden bg-paper py-20 md:py-28">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <SplitReveal className="font-book text-[clamp(1.9rem,4.2vw,48px)] font-semibold leading-[1.1] tracking-tight text-knavy">
            Global Presence
          </SplitReveal>
          <Reveal delay={0.15}>
            <p className="mt-5 font-book text-[16px] leading-relaxed text-muted md:text-[17px]">
              With manufacturing rooted in Gujarat, India and a growing dealer
              network across key markets, WorldFlow supports residential,
              agricultural, industrial, and infrastructure requirements.
            </p>
          </Reveal>
        </div>

        {/* Map + flanking stats */}
        <div className="relative mx-auto mt-12 max-w-6xl md:mt-16">
          {/* Stats: inline row on mobile, flanking the map from lg up */}
          <div className="mb-10 flex items-start justify-center gap-14 lg:mb-0 lg:contents">
            <div className="gp-stat lg:absolute lg:-left-6 lg:top-[38%] lg:z-10 xl:-left-10">
              <div
                data-count={STATS.left.value}
                data-suffix={STATS.left.suffix}
                className="font-book text-[clamp(2.4rem,5vw,64px)] font-bold leading-none tracking-tight text-knavy"
              >
                {STATS.left.value.toLocaleString("en-US")}
                {STATS.left.suffix}
              </div>
              <p className="mt-3 font-book text-[15px] font-medium text-knavy/80 md:text-[17px]">
                {STATS.left.label}
              </p>
            </div>

            <div className="gp-stat lg:absolute lg:-right-6 lg:top-[38%] lg:z-10 xl:-right-10 lg:text-right">
              <div
                data-count={STATS.right.value}
                data-suffix={STATS.right.suffix}
                className="font-book text-[clamp(2.4rem,5vw,64px)] font-bold leading-none tracking-tight text-knavy"
              >
                {STATS.right.value.toLocaleString("en-US")}
                {STATS.right.suffix}
              </div>
              <p className="mt-3 font-book text-[15px] font-medium text-knavy/80 md:text-[17px]">
                {STATS.right.label}
              </p>
            </div>
          </div>

          {/* Dotted world map with knockout wordmark */}
          <div data-gp-map className="relative mx-auto max-w-4xl">
            <img
              src="/world-dots.png"
              alt="WorldFlow distribution reach across the world"
              loading="lazy"
              className="w-full"
            />
            <span
              data-gp-word
              aria-hidden
              className="pointer-events-none absolute inset-0 grid select-none place-items-center font-display text-[clamp(2.6rem,10vw,120px)] font-bold uppercase leading-none tracking-tight text-white [text-shadow:0_2px_12px_rgba(27,36,49,0.3),0_10px_44px_rgba(27,36,49,0.45)]"
            >
              Worldflow
            </span>
          </div>

          {/* Product range pills overlapping the lower map */}
          <div className="relative z-10 mx-auto -mt-4 flex max-w-4xl flex-wrap items-center justify-center gap-3 md:-mt-10 md:gap-4">
            {COUNTRIES.map((country) => (
              <span
                key={country.name}
                className="gp-pill flex items-center gap-2.5 rounded-full border border-knavy/5 bg-white px-6 py-3 font-book text-[14px] font-semibold text-knavy shadow-[0_10px_28px_-16px_rgba(27,36,49,0.35)] transition-all duration-300 ease-sc hover:-translate-y-0.5 hover:border-korange hover:text-korange md:px-7 md:text-[16px]"
              >
                <img
                  src={`https://flagcdn.com/w40/${country.code}.png`}
                  srcSet={`https://flagcdn.com/w80/${country.code}.png 2x`}
                  alt={`${country.name} flag`}
                  loading="lazy"
                  className="h-[15px] w-5 rounded-[3px] object-cover"
                />
                {country.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
