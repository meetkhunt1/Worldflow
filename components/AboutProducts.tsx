"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 * AboutProducts — "What We Make".
 * The complete product ecosystem as a clean responsive grid of
 * product cards. Cards fade upward with a stagger on first reveal;
 * on hover they lift, gain an orange border and the product image
 * zooms gently.
 * ------------------------------------------------------------------ */

type ProductCard = {
  name: string;
  use: string;
  image: string;
};

const PRODUCTS: ProductCard[] = [
  { name: "UPVC Pipes", use: "Plumbing & water supply", image: "/9%201.png" },
  { name: "CPVC Pipes", use: "Hot & cold water systems", image: "/11%201.png" },
  { name: "SWR Pipes", use: "Soil, waste & rainwater", image: "/4%202.png" },
  { name: "HDPE Pipes", use: "High-pressure transport", image: "/7%201.png" },
  { name: "Column Pipes", use: "Borewell & submersible", image: "/2%201.png" },
  { name: "Casing Pipes", use: "Borewell protection", image: "/line/01.png" },
  { name: "Agriculture Pipes", use: "Irrigation networks", image: "/5%201.png" },
  { name: "Garden Pipes", use: "Landscape & utility", image: "/12%201.png" },
];

export default function AboutProducts() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // fromTo (not from) so end values stay correct across dev-mode
        // remounts; transition:none stops the card's CSS hover transition
        // from fighting the tween, and clearProps restores it after.
        gsap.fromTo(
          ".product-card",
          { autoAlpha: 0, y: 40, transition: "none" },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.08,
            clearProps: "all",
            scrollTrigger: {
              trigger: "[data-products-grid]",
              start: "top 82%",
              once: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-soft py-20 md:py-28">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-korange">
              Our Products
            </span>
          </Reveal>
          <SplitReveal className="mt-4 font-book text-[clamp(1.9rem,4.2vw,48px)] font-semibold leading-[1.1] tracking-tight text-knavy">
            What We Make
          </SplitReveal>
          <Reveal delay={0.15}>
            <p className="mt-5 font-book text-[16px] leading-relaxed text-muted md:text-[17px]">
              WorldFlow manufactures a complete range of high-performance
              piping systems engineered for residential, commercial,
              agricultural, industrial, and infrastructure applications. Every
              product is designed to deliver durability, precision, and
              long-lasting performance.
            </p>
          </Reveal>
        </div>

        <div
          data-products-grid
          className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4"
        >
          {PRODUCTS.map((p) => (
            <article
              key={p.name}
              className="product-card group flex h-full flex-col overflow-hidden rounded-2xl border border-transparent bg-white shadow-[0_6px_18px_-14px_rgba(27,36,49,0.25)] transition-all duration-500 ease-sc hover:-translate-y-1.5 hover:border-korange hover:shadow-[0_24px_45px_-22px_rgba(27,36,49,0.35)]"
            >
              <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-soft to-white p-6">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-700 ease-sc group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between border-t border-soft px-5 py-4 md:px-6 md:py-5">
                <h3 className="font-book text-[16px] font-semibold tracking-tight text-knavy md:text-[18px]">
                  {p.name}
                </h3>
                <p className="mt-1 font-book text-[13px] text-muted md:text-[14px]">
                  {p.use}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
