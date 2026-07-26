"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/* ------------------------------------------------------------------ *
 * Preloader — "logo draw + fill" load animation, shown once per
 * session. The Worldflow wordmark is sketched letter by letter as a
 * thin stroke outline, then floods with brand colour from the bottom
 * up like rising water, and the navy panel slides away to reveal the
 * site. Skipped for repeat in-session visits and reduced motion.
 * ------------------------------------------------------------------ */

const SESSION_KEY = "wf-preloader-shown";

// True once this page load has started the animation. Lets the flag be
// written at start (so any refresh/navigation never repeats the loader)
// while React's dev-mode double mount still replays the same run
// instead of skipping itself.
let startedThisLoad = false;
const DRAW_DURATION = 1.2; // s — letter outlines sketch in
const DRAW_STAGGER = 0.07; // s — delay between letters starting
const FILL_DURATION = 0.8; // s — colour floods bottom-up
const EXIT_DURATION = 0.9; // s — panel slide-up reveal

// Rendered per letter so the stroke draw can stagger left → right.
const LETTERS = ["W", "o", "r", "l", "d", "f", "l", "o", "w"] as const;
const ORANGE_COUNT = 5; // "World" is orange, "flow" is white

// Longer than any glyph outline at this size, so every letter starts
// fully hidden and finishes fully drawn.
const DASH = 520;

const WORDMARK_SVG = {
  viewBox: "0 0 720 170",
  x: "50%",
  y: "58%",
} as const;

const textClasses =
  "font-display text-[104px] font-extrabold tracking-[-0.02em]";

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const fillClipRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const mark = markRef.current;
      const fillClip = fillClipRef.current;
      const count = countRef.current;
      if (!root || !mark || !fillClip || !count) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Skip before paint if already shown this session (or reduced
      // motion) — flagged at start, so refresh/page changes never repeat.
      const alreadyShown =
        sessionStorage.getItem(SESSION_KEY) && !startedThisLoad;
      if (alreadyShown || reduceMotion) {
        gsap.set(root, { display: "none" });
        return;
      }
      startedThisLoad = true;
      sessionStorage.setItem(SESSION_KEY, "1");

      // Hold the page still while the overlay is up.
      document.documentElement.style.overflow = "hidden";
      const release = () => {
        document.documentElement.style.overflow = "";
      };

      const strokes = mark.querySelectorAll<SVGTSpanElement>("[data-stroke]");
      const progress = { value: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          gsap.set(root, { display: "none" });
          release();
        },
      });

      // Pen-sketch: each letter outline draws in, staggered across the word.
      tl.fromTo(
        strokes,
        { strokeDashoffset: DASH },
        {
          strokeDashoffset: 0,
          duration: DRAW_DURATION,
          ease: "power1.inOut",
          stagger: DRAW_STAGGER,
        }
      );

      // Colour floods the letters bottom-up like rising water.
      tl.fromTo(
        fillClip,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: FILL_DURATION,
          ease: "power2.inOut",
        },
        "-=0.25"
      );

      // Counter runs across the whole draw + fill.
      tl.to(
        progress,
        {
          value: 100,
          duration: tl.duration(),
          ease: "power2.inOut",
          onUpdate: () => {
            count.textContent = `${Math.round(progress.value)}%`;
          },
        },
        0
      );

      // Beat, then the finished mark lifts and the panel slides away.
      tl.to(mark, { y: -32, opacity: 0, duration: 0.45, delay: 0.25 });
      tl.to(count, { opacity: 0, duration: 0.3 }, "<");
      tl.to(
        root,
        { yPercent: -100, duration: EXIT_DURATION, ease: "power4.inOut" },
        "-=0.15"
      );

      // Safety net: never trap the page if the run is interrupted.
      return () => release();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[100] grid place-items-center bg-knavy will-change-transform"
    >
      <div ref={markRef} className="relative w-[min(84vw,720px)] select-none">
        {/* Sketch layer — stroked letter outlines, drawn via dashoffset */}
        <svg viewBox={WORDMARK_SVG.viewBox} className="block w-full">
          <text
            x={WORDMARK_SVG.x}
            y={WORDMARK_SVG.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className={textClasses}
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.5"
          >
            {LETTERS.map((letter, i) => (
              <tspan key={i} data-stroke strokeDasharray={DASH}>
                {letter}
              </tspan>
            ))}
          </text>
        </svg>

        {/* Fill layer — solid brand colours, revealed bottom-up */}
        <div
          ref={fillClipRef}
          className="absolute inset-0 [clip-path:inset(100%_0%_0%_0%)]"
        >
          <svg viewBox={WORDMARK_SVG.viewBox} className="block w-full">
            <text
              x={WORDMARK_SVG.x}
              y={WORDMARK_SVG.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={textClasses}
            >
              {LETTERS.map((letter, i) => (
                <tspan key={i} fill={i < ORANGE_COUNT ? "#F95B23" : "#ffffff"}>
                  {letter}
                </tspan>
              ))}
            </text>
          </svg>
        </div>
      </div>

      {/* Progress counter */}
      <span
        ref={countRef}
        className="absolute bottom-8 right-8 font-book text-[15px] font-semibold tabular-nums text-white/50 md:bottom-10 md:right-12"
      >
        0%
      </span>
    </div>
  );
}
