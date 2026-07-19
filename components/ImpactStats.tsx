"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 * ImpactStats — pinned "By The Numbers" section.
 * Desktop: the section pins with the heading fixed in the center.
 * Four stat cards travel along two vertical paths (2 left, 2 right):
 * they enter from below the viewport, ride up past the heading and
 * exit out of the top — scrubbed 1:1 with scroll, pair after pair.
 * When the last card leaves, the section unpins and normal scroll
 * resumes. Mobile: a simple staggered reveal grid (no pin).
 * ------------------------------------------------------------------ */

type Stat = { value: string; label: string; side: "left" | "right" };

const STATS: Stat[] = [
  { value: "8+", label: "Years Of Experience", side: "left" },
  { value: "200+", label: "Projects", side: "right" },
  { value: "10,000+", label: "Ton of Stocks", side: "left" },
  { value: "1,000+", label: "Happy Client", side: "right" },
];

// Motion constants — travel is linear so cards glide through the frame.
const TRAVEL_DURATION = 1; // timeline units for one full bottom→top pass
const PAIR_STAGGER = 0.12; // offset between the two cards of a pair
const PAIR_GAP = 0.55; // when the second pair starts (after the first)
const SCROLL_VIEWPORTS = 2.6; // total pinned scroll distance, in viewports

function StatCardInner({ value, label }: { value: string; label: string }) {
  return (
    <>
      <div className="font-book text-[clamp(2.4rem,4.5vw,3.4rem)] font-bold leading-none tracking-tight text-korange">
        {value}
      </div>
      <span className="mx-auto mt-4 block h-0.5 w-10 bg-korange/40" />
      <p className="mt-4 font-book text-[15px] leading-relaxed text-knavy">{label}</p>
    </>
  );
}

export default function ImpactStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) return;

      const mm = gsap.matchMedia();

      // Desktop — pin; cards fly bottom → top along their path, pair by pair.
      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".stat-card");

        // Start times: pair 1 (cards 0+1), then pair 2 (cards 2+3).
        const startAt = (i: number) =>
          Math.floor(i / 2) * PAIR_GAP + (i % 2) * PAIR_STAGGER;

        // Cards start with their top touching the bottom edge and end just
        // past the top edge. No hidden travel outside the viewport: the very
        // first pixel of pinned scroll produces visible motion, so the smooth
        // scroll's momentum tail never lands in a dead zone (no "freeze").
        const EDGE_PAD = 24; // shadow clearance beyond the viewport edge
        const enterY = (card: HTMLElement) =>
          window.innerHeight / 2 + card.offsetHeight / 2 + EDGE_PAD;

        const tl = gsap.timeline({ defaults: { ease: "none" } });
        cards.forEach((card, i) => {
          tl.fromTo(
            card,
            { yPercent: -50, y: () => enterY(card) },
            {
              yPercent: -50,
              y: () => -enterY(card),
              duration: TRAVEL_DURATION,
            },
            startAt(i)
          );
        });
        // Small tail so the last pair is fully off screen shortly BEFORE the
        // unpin — the section never releases with a card still mid-frame.
        tl.to({}, { duration: 0.15 });

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * SCROLL_VIEWPORTS}`,
          pin: pin,
          // Lenis already smooths the scroll itself; a light scrub keeps the
          // cards tightly coupled to it. A heavy scrub (1s+) would stack a
          // second smoothing pass on top and make the pin feel frozen/laggy.
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: tl,
        });
      });

      // Mobile — no pin; a simple staggered reveal keeps it performant.
      mm.add("(max-width: 767px)", () => {
        gsap.from(".stat-card-m", {
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
          y: 40,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative bg-soft">
      <div
        ref={pinRef}
        className="relative flex min-h-screen flex-col justify-center overflow-hidden py-16 md:py-0"
      >
        {/* Faint dotted world map behind the pinned content */}
        <img
          src="/world-dots.png"
          alt=""
          aria-hidden
          loading="lazy"
          className="pointer-events-none absolute left-1/2 top-1/2 w-[min(1080px,92%)] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.1]"
        />

        {/* Pinned centered heading */}
        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-korange">
                Trusted Performance
              </span>
            </Reveal>
            <SplitReveal className="mt-4 font-display text-[clamp(1.8rem,4.2vw,3.25rem)] font-bold uppercase leading-[1.08] tracking-tight text-knavy">
              Engineering reliable piping solutions for every industry.
            </SplitReveal>
          </div>

          {/* Mobile fallback — static grid, staggered reveal */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:hidden">
            {STATS.map((s) => (
              <article
                key={s.label}
                className="stat-card-m rounded-2xl bg-white p-8 text-center shadow-[0_24px_50px_-28px_rgba(27,36,49,0.4)]"
              >
                <StatCardInner value={s.value} label={s.label} />
              </article>
            ))}
          </div>
        </div>

        {/* Desktop travelling cards — 2 per side, riding bottom → top */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {STATS.map((s) => (
            <article
              key={s.label}
              className={`stat-card absolute top-1/2 w-[clamp(240px,21vw,330px)] rounded-2xl bg-white p-8 text-center shadow-[0_24px_50px_-28px_rgba(27,36,49,0.4)] will-change-transform ${
                s.side === "left" ? "left-[7%]" : "right-[7%]"
              }`}
            >
              <StatCardInner value={s.value} label={s.label} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
