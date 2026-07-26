"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 * AboutGallery — "Inside WorldFlow".
 * Masonry gallery of the facility (CSS columns; tiles keep natural
 * flow). Tiles fade upward as they enter; on hover the photo zooms
 * under a dark wash and the location title rises into view.
 * ------------------------------------------------------------------ */

type GalleryTile = {
  title: string;
  image: string;
  imagePosition: string;
  /** Tile height — varied to create the masonry rhythm. */
  height: string;
};

// Real facility photography (/public/factory). Heights alternate tall →
// short → mid so each masonry column reads with a different rhythm.
const TILES: GalleryTile[] = [
  { title: "Pipe Extrusion Line", image: "/factory/extrusion-line.jpg", imagePosition: "object-center", height: "h-[420px]" },
  { title: "Injection Moulding", image: "/factory/injection-moulding.jpg", imagePosition: "object-center", height: "h-[300px]" },
  { title: "Moulding Hall", image: "/factory/moulding-hall.jpg", imagePosition: "object-center", height: "h-[340px]" },
  { title: "Raw Material Mixing", image: "/factory/mixing-plant.jpg", imagePosition: "object-center", height: "h-[380px]" },
  { title: "Mould Library", image: "/factory/mould-store.jpg", imagePosition: "object-center", height: "h-[300px]" },
  { title: "Finished Goods Store", image: "/factory/warehouse.jpg", imagePosition: "object-center", height: "h-[360px]" },
  { title: "Packing & Dispatch", image: "/factory/packaging.jpg", imagePosition: "object-center", height: "h-[320px]" },
  // The straight-on signage shot is the closing card in AboutShowcase on
  // this same page — only the angled one appears here, to avoid a repeat.
  { title: "Corporate Office", image: "/factory/reception-signage-angle.jpg", imagePosition: "object-center", height: "h-[400px]" },
];

export default function AboutGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Each tile reveals on its own trigger so the masonry cascades
        // naturally regardless of column order.
        // fromTo (not from) so end values stay correct across dev-mode
        // remounts.
        gsap.utils.toArray<HTMLElement>(".gallery-tile").forEach((tile, i) => {
          gsap.fromTo(
            tile,
            { autoAlpha: 0, y: 44 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: "power2.out",
              delay: (i % 3) * 0.08,
              clearProps: "all",
              scrollTrigger: { trigger: tile, start: "top 88%", once: true },
            }
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-paper py-20 md:py-28">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-korange">
              Factory Gallery
            </span>
          </Reveal>
          <SplitReveal className="mt-4 font-book text-[clamp(1.9rem,4.2vw,48px)] font-semibold leading-[1.1] tracking-tight text-knavy">
            Inside WorldFlow
          </SplitReveal>
          <Reveal delay={0.15}>
            <p className="mt-5 font-book text-[16px] leading-relaxed text-muted md:text-[17px]">
              Explore the facilities where every WorldFlow product is
              manufactured, tested, and prepared for reliable performance.
            </p>
          </Reveal>
        </div>

        {/* Masonry columns */}
        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {TILES.map((tile) => (
            <figure
              key={tile.title}
              className={`gallery-tile group relative mb-5 ${tile.height} overflow-hidden rounded-2xl bg-knavy [break-inside:avoid]`}
            >
              <img
                src={tile.image}
                alt={tile.title}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-sc group-hover:scale-105 ${tile.imagePosition}`}
              />

              {/* Dark wash deepens on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 transition-opacity duration-500 ease-sc group-hover:opacity-100"
                aria-hidden
              />

              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <span className="mb-2 block h-0.5 w-8 origin-left scale-x-0 bg-korange transition-transform duration-500 ease-sc group-hover:scale-x-100" />
                <span className="block translate-y-1 font-book text-[17px] font-semibold tracking-tight text-white transition-transform duration-500 ease-sc group-hover:translate-y-0 md:text-[19px]">
                  {tile.title}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
