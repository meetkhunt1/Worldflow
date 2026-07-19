"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { reviewVid, type Review } from "@/lib/data";

type Item = Review & { id: string };

function ReviewCarousel({ items }: { items: Item[] }) {
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
    const card = el.querySelector<HTMLElement>("[data-rcard]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div ref={trackRef} className="no-scrollbar flex snap-x gap-5 overflow-x-auto pb-4">
        {items.map((r) => (
          <figure key={r.id} data-rcard className="w-[70%] shrink-0 snap-start sm:w-[44%] md:w-[30%] lg:w-[23%]">
            <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-black">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                playsInline
                loop
                poster={r.poster}
              >
                <source src={reviewVid(r.id)} type="video/mp4" />
              </video>
              <figcaption className="absolute bottom-3 left-3 flex items-center gap-2">
                <Image src={r.avatar} alt={r.name} width={34} height={34} className="rounded-full ring-2 ring-white" unoptimized />
                <span className="max-w-[140px] text-[12px] font-semibold leading-tight text-white drop-shadow">
                  {r.name}
                </span>
              </figcaption>
            </div>
            <a href={r.productUrl} className="mt-3 flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-soft">
                <Image src={r.productImg} alt={r.productName} width={40} height={44} className="object-contain" unoptimized />
              </span>
              <span className="text-[13px] font-semibold leading-tight hover:text-brainpink">{r.productName}</span>
            </a>
          </figure>
        ))}
      </div>

      <NavBtn dir={-1} disabled={!canPrev} onClick={() => scrollBy(-1)} side="left" />
      <NavBtn dir={1} disabled={!canNext} onClick={() => scrollBy(1)} side="right" />
    </div>
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
      className={`absolute top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-black/15 bg-white shadow-md transition-all hover:bg-ink hover:text-white disabled:opacity-0 md:grid ${
        side === "left" ? "-left-4" : "-right-4"
      }`}
    >
      {dir === 1 ? "→" : "←"}
    </button>
  );
}

export default function VideoReviews({
  expert,
  loved,
}: {
  expert: Item[];
  loved: Item[];
}) {
  return (
    <>
      <section className="bg-white py-20 md:py-28">
        <div className="shell text-center">
          <h2 className="display-title text-[clamp(2rem,5vw,3.6rem)]">
            Powered by AI, formulated by data
          </h2>
          <h4 className="mt-4 font-book text-lg text-muted">
            Approved by dermatologists &amp; experts<sup>*</sup>
          </h4>
        </div>
        <div className="shell mt-12">
          <ReviewCarousel items={expert} />
        </div>
      </section>

      <section className="bg-[#f7f2ef] py-20 md:py-28">
        <div className="shell text-center">
          <h4 className="display-title text-[clamp(1.6rem,4vw,2.8rem)]">
            Loved by the spoiled<sup>*</sup>
          </h4>
        </div>
        <div className="shell mt-12">
          <ReviewCarousel items={loved} />
        </div>
        <p className="shell mt-8 text-center text-xs text-muted">
          <sup>*</sup>Compensated to evaluate our products.
        </p>
      </section>
    </>
  );
}
