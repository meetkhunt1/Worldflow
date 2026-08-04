"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 * ScrollProductJourney
 * Section 2 (feature)  ->  Product-family lineup
 * A single hero pipe is tied to the scroll position. It starts large
 * and tilted in the feature section, then travels down into a gap in a
 * bottom-aligned row of the full WorldFlow range (varying heights, like
 * a family shot), un-rotating and shrinking so it lands and "fits"
 * perfectly into the empty slot — completing the lineup.
 * All custom classes are prefixed `spj-` to avoid collisions.
 * ------------------------------------------------------------------ */

type LineupItem = {
  src: string; // trimmed artwork in /public/line
  name: string; // product name shown in the hover pill
  ratio: number; // native width / height of the trimmed image
  mult: number; // display height as a fraction of the base unit --u
  slot?: boolean; // the empty gap the traveller lands in
  sm?: boolean; // when false, hidden on mobile so the row never overflows
};

// The CPVC range shares one piece of product artwork (mitred-top pipe with
// the anti-microbial print). All three CPVC positions reuse it at different
// heights, so the ratio is declared once and stays in sync with the file.
const CPVC_ARTWORK = "/line/cpvc.png";
const CPVC_RATIO = 0.178; // 146 x 819 px trimmed cutout

// Left -> right, grouped like the reference: white bottles, white pipes,
// tan pipes, grey socket pipes. Heights follow each product's real
// proportions; the tall white pipe (index 5) is the landing slot.
const LINEUP: LineupItem[] = [
  { src: "/line/01.png", name: "Column Pipe", ratio: 0.252, mult: 0.42, sm: false },
  { src: "/line/02.png", name: "Column Pipe", ratio: 0.251, mult: 0.48, sm: false },
  { src: "/line/03.png", name: "Column Pipe", ratio: 0.247, mult: 0.75 },
  { src: "/line/04.png", name: "Column Pipe", ratio: 0.253, mult: 0.62, sm: false },
  { src: CPVC_ARTWORK, name: "CPVC Plumbing Pipe", ratio: CPVC_RATIO, mult: 0.68 },
  { src: CPVC_ARTWORK, name: "CPVC Plumbing Pipe", ratio: CPVC_RATIO, mult: 0.95, slot: true }, // tan CPVC pipe — traveller
  { src: CPVC_ARTWORK, name: "CPVC Plumbing Pipe", ratio: CPVC_RATIO, mult: 0.53, sm: false },
  { src: "/line/05.png", name: "UPVC Plumbing Pipe", ratio: 0.324, mult: 0.62 },
  { src: "/line/06.png", name: "UPVC Plumbing Pipe", ratio: 0.273, mult: 1.0 }, // tall white pipe
  { src: "/line/07.png", name: "UPVC Plumbing Pipe", ratio: 0.467, mult: 0.49, sm: false },
  { src: "/line/11.png", name: "SWR Drainage Pipe", ratio: 0.33, mult: 0.73, sm: false },
  { src: "/line/12.png", name: "SWR Drainage Pipe", ratio: 0.267, mult: 0.75 },
  { src: "/line/13.png", name: "SWR Drainage Pipe", ratio: 0.256, mult: 0.61, sm: false },
  { src: "/line/14.png", name: "SWR Drainage Pipe", ratio: 0.429, mult: 0.63 },
];

// The traveller reuses the slot artwork so the landed pipe is identical
// to its neighbours — that is what makes the "fit" read as seamless.
const TRAVELLER = LINEUP.find((i) => i.slot)!;

// Soft elliptical contact shadow that grounds a pipe at its base.
// Sits behind the artwork and peeks out around the base for realism.
function PipeShadow() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -inset-x-[12%] bottom-0 h-[4%] translate-y-1/2 rounded-[100%] bg-black/20 blur-[10px]"
    />
  );
}

// Motion constants (no magic numbers scattered through the timeline).
const FEATURE_START_ROTATION = 14; // deg — subtle tilt in the feature section
const FEATURE_START_SCALE_DESKTOP = 1.6;
const FEATURE_START_SCALE_MOBILE = 2.4;

// Hover pill motion constants.
const PIPE_LIFT = 14; // px the pipe rises on hover
const PILL_FOLLOW = 0.4; // s — cursor-follow lag ("magnetic" feel)

export default function ScrollProductJourney() {
  const rootRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const travelRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const pillLabelRef = useRef<HTMLSpanElement>(null);
  const pillTo = useRef<{ x?: (v: number) => void; y?: (v: number) => void }>({});
  const activePipe = useRef<HTMLElement | null>(null);
  const pillVisible = useRef(false);
  const lastMouse = useRef({ x: -1, y: -1 });

  useGSAP(
    () => {
      const root = rootRef.current;
      const home = homeRef.current;
      const slot = slotRef.current;
      const travel = travelRef.current;
      if (!root || !home || !slot || !travel) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };
          const startScale = isDesktop
            ? FEATURE_START_SCALE_DESKTOP
            : FEATURE_START_SCALE_MOBILE;

          // Delta between the feature "home" position and the lineup "slot".
          // Recomputed on every ScrollTrigger refresh so it stays responsive.
          const delta = { x: 0, y: 0 };

          const measure = () => {
            const rootRect = root.getBoundingClientRect();
            const homeRect = home.getBoundingClientRect();
            const slotRect = slot.getBoundingClientRect();

            // The traveller's box matches the slot so scale:1 lands exactly in
            // place and the pipe renders at the same size as its neighbours.
            // autoAlpha reveals it only once measured — no mispositioned flash.
            gsap.set(travel, {
              width: slotRect.width,
              height: slotRect.height,
              autoAlpha: 1,
            });

            // Center points (scroll-independent as a delta) drive the journey.
            const homeCx = homeRect.left + homeRect.width / 2;
            const homeCy = homeRect.top + homeRect.height / 2;
            const slotCx = slotRect.left + slotRect.width / 2;
            const slotCy = slotRect.top + slotRect.height / 2;

            // Base (untransformed) position: traveller centered on home anchor.
            travel.style.left = `${homeCx - slotRect.width / 2 - rootRect.left}px`;
            travel.style.top = `${homeCy - slotRect.height / 2 - rootRect.top}px`;

            delta.x = slotCx - homeCx;
            delta.y = slotCy - homeCy;
          };

          // refreshInit fires before ScrollTrigger measures start/end.
          ScrollTrigger.addEventListener("refreshInit", measure);
          measure();

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: home,
              start: "center center",
              endTrigger: slot,
              end: "center center",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          // Function-based end values are re-evaluated on refresh (responsive).
          tl.fromTo(
            travel,
            {
              x: 0,
              y: 0,
              scale: startScale,
              rotation: FEATURE_START_ROTATION,
            },
            {
              x: () => delta.x,
              y: () => delta.y,
              scale: 1,
              rotation: 0,
            }
          );

          ScrollTrigger.refresh();

          return () => {
            ScrollTrigger.removeEventListener("refreshInit", measure);
          };
        }
      );
    },
    { scope: rootRef }
  );

  // Cursor-follow tweens for the hover pill — quickTo gives the soft
  // trailing ("magnetic") motion without creating a tween per mousemove.
  useGSAP(
    () => {
      const pill = pillRef.current;
      if (!pill) return;
      pillTo.current.x = gsap.quickTo(pill, "x", { duration: PILL_FOLLOW, ease: "power3.out" });
      pillTo.current.y = gsap.quickTo(pill, "y", { duration: PILL_FOLLOW, ease: "power3.out" });
    },
    { scope: rootRef }
  );

  // Hover is pointless on touch devices — bail there.
  const canHover = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  // Hide the pill and settle the lifted pipe. Single exit path so the pill
  // can never be left stranded, whichever way the hover ends. overwrite:
  // "auto" kills any in-flight pop tween — otherwise a longer show tween
  // could outlive this hide and leave the pill visible.
  const hidePill = () => {
    if (!pillVisible.current) return;
    pillVisible.current = false;
    gsap.to(pillRef.current, {
      scale: 0.5,
      autoAlpha: 0,
      duration: 0.25,
      ease: "power2.in",
      overwrite: "auto",
    });
    if (activePipe.current) {
      gsap.to(activePipe.current, { y: 0, duration: 0.45, ease: "power2.out", overwrite: "auto" });
      activePipe.current = null;
    }
  };

  // Lift a pipe and show/move the pill for it. Used by both mouseenter and
  // the scroll hit-test below.
  const showPill = (pipe: HTMLElement, x: number, y: number) => {
    const pill = pillRef.current;
    if (!pill) return;
    // Settle any previously lifted pipe (fast pipe-to-pipe moves).
    if (activePipe.current && activePipe.current !== pipe) {
      gsap.to(activePipe.current, { y: 0, duration: 0.45, ease: "power2.out", overwrite: "auto" });
    }
    activePipe.current = pipe;
    gsap.to(pipe, { y: -PIPE_LIFT, duration: 0.4, ease: "power2.out", overwrite: "auto" });

    if (pillLabelRef.current) {
      pillLabelRef.current.textContent = pipe.dataset.pipeName ?? "";
    }
    const wasVisible = pillVisible.current;
    pillVisible.current = true;
    if (!wasVisible) {
      // Jump to the cursor, then pop in.
      gsap.set(pill, { x, y });
      gsap.fromTo(
        pill,
        { scale: 0.5, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(2.2)", overwrite: "auto" }
      );
    }
    pillTo.current.x?.(x);
    pillTo.current.y?.(y);
  };

  const pipeEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover()) return;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    showPill(e.currentTarget, e.clientX, e.clientY);
  };

  const pipeMove = (e: React.MouseEvent<HTMLDivElement>) => {
    lastMouse.current = { x: e.clientX, y: e.clientY };
    pillTo.current.x?.(e.clientX);
    pillTo.current.y?.(e.clientY);
  };

  const pipeLeave = () => {
    if (!canHover()) return;
    hidePill();
  };

  // Scrolling moves the pipes under a stationary cursor without firing any
  // mouse events. On every scroll, hit-test the last known cursor position:
  // not over a pipe -> remove the pill; over a different pipe -> re-target it.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onScroll = () => {
      if (!canHover()) return;
      const { x, y } = lastMouse.current;
      if (x < 0) return; // mouse position unknown yet
      const pipe = document
        .elementFromPoint(x, y)
        ?.closest<HTMLElement>(".spj-pipe");
      if (!pipe) {
        hidePill();
      } else if (pipe !== activePipe.current || !pillVisible.current) {
        showPill(pipe, x, y);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className="spj-root relative bg-white">
      {/* ---------------- Section 2 — Feature ---------------- */}
      <section className="spj-feature shell grid grid-cols-1 items-center gap-8 pb-40 pt-24 md:grid-cols-2 md:pb-[16rem] md:pt-32">
        <div className="spj-feature-copy max-w-xl">
          <SplitReveal className="spj-feature-title font-display text-[clamp(2rem,4.5vw,54px)] uppercase leading-[0.95] tracking-tight text-ink">
            Built to perform.
            <br />
            Designed to last.
          </SplitReveal>
          <Reveal delay={0.15}>
            <p className="spj-feature-sub mt-6 max-w-md font-book text-lg text-muted">
              Every WorldFlow piping system is engineered with precision to
              deliver dependable performance across plumbing, agriculture,
              drainage, and infrastructure projects. Manufactured using
              high-quality raw materials and advanced production technology,
              our products ensure long-lasting strength, leak-proof
              reliability, and seamless installation.
            </p>
            <p className="spj-feature-sub-strong mt-4 font-display text-2xl uppercase tracking-tight text-ink">
              Find the right pipe for every application.
            </p>
          </Reveal>
        </div>

        {/* Home anchor — invisible, card-sized; the traveller rests here. */}
        <div className="spj-feature-stage flex items-center justify-center">
          <div
            ref={homeRef}
            className="spj-home-anchor h-44 w-1/2 md:h-72 md:w-[60%]"
            aria-hidden
          />
        </div>
      </section>

      {/* ---------------- Product-family lineup ---------------- */}
      <section className="spj-lineup-section shell relative overflow-hidden pb-0 pt-16 md:pt-24">
        <div className="spj-lineup relative z-10 flex items-end justify-center gap-1 [--u:min(52vw,24rem)] md:gap-1.5 md:[--u:clamp(13rem,28vw,28rem)]">
          {LINEUP.map((item, i) => {
            const style = {
              height: `calc(var(--u) * ${item.mult})`,
              aspectRatio: `${item.ratio}`,
            } as const;
            const hideOnMobile = item.sm === false ? "hidden md:block" : "";

            // The empty gap — reserves the exact space the traveller fills.
            if (item.slot) {
              return (
                <div
                  key="slot"
                  ref={slotRef}
                  className="spj-slot shrink-0"
                  style={style}
                  aria-hidden
                />
              );
            }

            return (
              <div
                key={i}
                className={`spj-pipe relative shrink-0 ${hideOnMobile}`}
                style={style}
                data-pipe-name={item.name}
                onMouseEnter={pipeEnter}
                onMouseMove={pipeMove}
                onMouseLeave={pipeLeave}
              >
                <PipeShadow />
                <Image
                  src={item.src}
                  alt="WorldFlow pipe"
                  fill
                  sizes="(max-width: 768px) 20vw, 12vw"
                  className="object-contain object-bottom"
                  unoptimized
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- Travelling pipe (scroll-tied) ---------------- */}
      <div
        ref={travelRef}
        className="spj-travel invisible pointer-events-none absolute left-0 top-0 z-30 will-change-transform"
        aria-hidden
      >
        <div className="relative h-full w-full">
          <Image
            src={TRAVELLER.src}
            alt="WorldFlow pipe"
            fill
            sizes="(max-width: 768px) 60vw, 30vw"
            className="object-contain object-bottom"
            priority
            unoptimized
          />
        </div>
      </div>

      {/* Hover pill — pops in and trails the cursor over lineup pipes.
          Outer div carries the GSAP x/y/scale; inner div owns the static
          "sit above the cursor" offset so the two transforms never fight. */}
      <div
        ref={pillRef}
        className="invisible pointer-events-none fixed left-0 top-0 z-50 opacity-0"
        aria-hidden
      >
        <div className="flex -translate-x-1/2 -translate-y-[150%] items-center gap-2 rounded-full bg-knavy px-4 py-2 shadow-[0_12px_30px_-10px_rgba(27,36,49,0.55)]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-korange" />
          <span
            ref={pillLabelRef}
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.12em] text-white"
          />
        </div>
      </div>
    </div>
  );
}
