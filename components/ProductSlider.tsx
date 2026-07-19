"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { products, SPOILED_BRAIN_URL } from "@/lib/data";

export default function ProductSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="shell">
        <h2 className="mx-auto max-w-3xl text-center font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-tight">
          A complete spectrum of best in class products for personalized age-control.
        </h2>

        <div className="relative mt-12">
          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
          >
            {products.map((p) => (
              <a
                key={p.name}
                data-card
                href={p.url}
                className="group relative flex w-[74%] shrink-0 snap-start flex-col rounded-3xl bg-soft p-6 transition-transform duration-500 ease-sc hover:-translate-y-1 sm:w-[46%] md:w-[30%] lg:w-[19%]"
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at 50% 30%, ${p.color}22, transparent 70%)` }}
                  aria-hidden
                />
                <div className="relative flex h-56 items-center justify-center">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={200}
                    height={220}
                    className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                </div>
                <div className="relative mt-6 flex flex-1 flex-col">
                  <span
                    className="mb-3 h-1 w-10 rounded-full"
                    style={{ background: p.color }}
                    aria-hidden
                  />
                  <strong className="font-book text-[15px] font-semibold leading-snug text-ink">
                    {p.name}
                  </strong>
                  {p.label && (
                    <span className="mt-2 inline-block w-fit rounded-full border border-black/15 px-2 py-[2px] text-[10px] uppercase tracking-wider text-muted">
                      {p.label}
                    </span>
                  )}
                  <span className="mt-auto pt-4 font-display text-xl">${p.price}</span>
                </div>
              </a>
            ))}
          </div>

          <NavBtn dir={-1} onClick={() => scrollBy(-1)} disabled={!canPrev} side="left" />
          <NavBtn dir={1} onClick={() => scrollBy(1)} disabled={!canNext} side="right" />
        </div>

        <div className="mt-12 flex justify-center">
          <a href={SPOILED_BRAIN_URL} className="btn-brain">
            Find Your Capsule
          </a>
        </div>
      </div>
    </section>
  );
}

function NavBtn({
  onClick,
  disabled,
  side,
  dir,
}: {
  onClick: () => void;
  disabled: boolean;
  side: "left" | "right";
  dir: 1 | -1;
}) {
  return (
    <button
      aria-label={dir === 1 ? "Next" : "Previous"}
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-black/15 bg-white shadow-md transition-all duration-300 hover:bg-ink hover:text-white disabled:cursor-default disabled:opacity-0 md:grid ${
        side === "left" ? "-left-4" : "-right-4"
      }`}
    >
      {dir === 1 ? "→" : "←"}
    </button>
  );
}
