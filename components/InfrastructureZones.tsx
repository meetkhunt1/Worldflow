"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 * InfrastructureZones — /infrastructure page body.
 * Photo-led walkthrough of the plant, broadly in the order material
 * moves through it: raw material -> manufacturing -> R&D -> warehouse ->
 * dispatch -> office. Every zone alternates the text and photo columns
 * so the page keeps a rhythm while scrolling.
 *
 * All photography is the company's own (/public/factory) — nothing here
 * is stock or generated, which is the point of the page.
 *
 * TODO: the per-zone bullet copy below is written from what is visible
 * in the photographs; have the client confirm the wording before this
 * is treated as final spec. The R&D bullets name specific tests read off
 * the lab photographs — confirm the equipment list before publishing.
 * ------------------------------------------------------------------ */

type Zone = {
  number: string;
  /** Anchor id, also used for the in-page jump links. */
  id: string;
  label: string;
  heading: string;
  body: string[];
  points: string[];
  images: string[];
  /** "overlap" pairs two photos as an offset stack instead of a grid. */
  layout?: "overlap";
};

const ZONES: Zone[] = [
  {
    number: "01.",
    id: "raw-material",
    label: "Raw Material Process",
    heading: "It starts with the compound",
    body: [
      "Every pipe is only as good as the compound behind it, so blending happens in-house rather than being bought in ready-mixed. Resin, stabilisers and additives are weighed for each batch and mixed on our own plant.",
      "The finished compound is conveyed straight from the mixer to the extrusion hoppers, which keeps the material sealed and consistent between mixing and forming.",
    ],
    points: [
      "Each batch weighed before mixing",
      "Resin, stabilisers and additives stocked on site",
      "Blended compound fed directly to the lines",
    ],
    images: ["/factory/mixing-plant.jpg"],
  },
  {
    number: "02.",
    id: "manufacturing",
    label: "Manufacturing Facility",
    heading: "Pipes extruded, fittings moulded",
    body: [
      "Pipe is formed on extrusion lines running through vacuum sizing and cooling, which is what holds a length to its dimensional tolerance end to end.",
      "Fittings are produced on Milacron CPVC Line Servo injection moulding machines. The moulds for every size and pattern we sell are held in-house, so a size can be scheduled without waiting on outside tooling.",
    ],
    points: [
      "Extrusion lines with vacuum sizing and cooling",
      "Milacron servo injection moulding for fittings",
      "Mould inventory held on site for every size",
      "Pipe and fittings produced under one roof",
    ],
    images: [
      "/factory/extrusion-line.jpg",
      "/factory/injection-moulding.jpg",
      "/factory/mould-store.jpg",
    ],
  },
  {
    number: "03.",
    id: "research-development",
    label: "Research & Development",
    heading: "Proven in our own lab",
    body: [
      "Development is backed by a testing laboratory on the premises rather than an outside test house. New compounds, new sizes and first-off samples are trialled here, and nothing goes onto a production schedule until the results come back clean.",
      "The bench is built around what the standards actually ask for — hydrostatic pressure rigs fed by their own pump, temperature-controlled water baths for reversion and cycling, an oven and impact testing — so a batch can be checked the same day it is made.",
    ],
    points: [
      "Testing laboratory on the premises",
      "Hydrostatic pressure testing on site",
      "Water baths for reversion and heat cycling",
      "Samples signed off before a batch is released",
    ],
    images: ["/factory/testing-lab.jpg", "/factory/testing-equipment.jpg"],
  },
  {
    number: "04.",
    id: "warehouse",
    label: "Warehouse",
    heading: "Stock you can actually draw on",
    body: [
      "Finished goods are boxed, labelled and racked by product and size. Keeping depth on the shelf is what lets an order ship on the day it lands instead of waiting on a production slot.",
      "SWR, UPVC and CPVC fittings are stocked separately so pickers work from a known location rather than hunting through mixed pallets.",
    ],
    points: [
      "Cartons labelled by product and size",
      "SWR, UPVC and CPVC stocked separately",
      "Depth held on the shelf for same-day picking",
    ],
    // Racked cartons carry the zone; the bagged compound store overlaps it.
    images: ["/factory/warehouse.jpg", "/factory/warehouse-bagged-stock.jpg"],
    layout: "overlap",
  },
  {
    number: "05.",
    id: "dispatch",
    label: "Dispatch Area",
    heading: "Bundled, staged, loaded",
    body: [
      "Pipe is bundled and wrapped before it moves, which protects the ends and the surface through handling and transit.",
      "Bundles are staged by order on the floor next to the loading shutter, so a vehicle is loaded against a checked list rather than assembled from stock at the last minute.",
    ],
    points: [
      "Bundled and wrapped before handling",
      "Staged by order before loading",
      "Loaded direct from the plant floor",
    ],
    images: ["/factory/packaging.jpg"],
  },
  {
    number: "06.",
    id: "office",
    label: "Office Environment",
    heading: "The people behind the order",
    body: [
      "Enquiries, quotations and dealer coordination are handled from our office on the same premises as the plant — the commercial side and the production floor are not in different cities.",
      "That proximity is deliberate: when a dealer asks what is on the line this week, the answer comes from the same building.",
    ],
    points: [
      "Enquiries, quotations and dealer coordination",
      "Office on the same premises as the plant",
      "Factory visits arranged on request",
    ],
    images: [
      // The wide office view carries the zone; the sales desk and the
      // angled signage shot sit under it as the working detail.
      "/factory/office-reception.jpg",
      "/factory/office-sales-desk.jpg",
      "/factory/reception-signage-angle.jpg",
    ],
  },
];

/** Two photos as an offset stack: a lead frame with the second sitting over
 *  its lower-right corner. The wrapper reserves the overflow with padding so
 *  the inset never escapes the column or collides with the copy. */
function OverlapPhotos({ zone }: { zone: Zone }) {
  const [lead, inset] = zone.images;

  return (
    <div className="relative pb-14 pr-8 sm:pb-20 sm:pr-14">
      <figure
        data-zone-photo
        className="aspect-[16/10] overflow-hidden rounded-2xl bg-knavy"
      >
        <img
          src={lead}
          alt={`${zone.label} at the WorldFlow facility`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </figure>

      {/* The white ring separates the two frames wherever they overlap. */}
      <figure
        data-zone-photo
        className="absolute bottom-0 right-0 aspect-[4/3] w-[46%] overflow-hidden rounded-2xl border-4 border-white bg-knavy shadow-[0_22px_50px_-18px_rgba(0,0,0,0.5)] sm:w-[42%]"
      >
        <img
          src={inset}
          alt={`${zone.label} stock at the WorldFlow facility`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </figure>
    </div>
  );
}

/** Photo cluster for a zone — one large frame, an even 2-column grid, or
 *  (with 3 photos) one wide frame over a 2-up row. */
function ZonePhotos({ zone }: { zone: Zone }) {
  const single = zone.images.length === 1;
  const triple = zone.images.length === 3;

  if (zone.layout === "overlap") return <OverlapPhotos zone={zone} />;

  return (
    <div className={single ? "grid gap-4" : "grid grid-cols-2 gap-4"}>
      {zone.images.map((src, i) => (
        <figure
          key={src}
          data-zone-photo
          className={`overflow-hidden rounded-2xl bg-knavy ${
            single
              ? "aspect-[16/11]"
              : triple && i === 0
                ? "col-span-2 aspect-[16/8]"
                : "aspect-[4/3]"
          }`}
        >
          {/* Every zone photo is below the fold — the hero is the only
              eagerly loaded image on this page. */}
          <img
            src={src}
            alt={`${zone.label} at the WorldFlow facility`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </figure>
      ))}
    </div>
  );
}

export default function InfrastructureZones() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Each photo settles out of a slight scale-up as it enters. Per
        // element (not per zone) so a 4-up grid cascades rather than
        // popping in as one block.
        // fromTo (not from) so end values stay correct across dev-mode
        // remounts.
        gsap.utils
          .toArray<HTMLElement>("[data-zone-photo] img")
          .forEach((img) => {
            gsap.fromTo(
              img,
              { scale: 1.1 },
              {
                scale: 1,
                duration: 1.2,
                ease: "power2.out",
                clearProps: "scale,transform",
                scrollTrigger: { trigger: img, start: "top 88%", once: true },
              }
            );
          });
      });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef}>
      {/* Intro + in-page jump links */}
      <section className="bg-paper py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-korange">
                  <span className="h-2.5 w-2.5 rounded-full bg-korange" aria-hidden />
                  Our Infrastructure
                </span>
              </Reveal>
              <SplitReveal
                as="h2"
                className="mt-4 font-book text-[clamp(1.9rem,4.2vw,48px)] font-semibold leading-[1.15] tracking-tight text-knavy"
              >
                See the plant,
                <br />
                not a brochure
              </SplitReveal>
            </div>

            <Reveal className="lg:col-span-5" delay={0.15}>
              <p className="font-book text-[16px] leading-relaxed text-muted md:text-[17px]">
                Most pipe brands show you a rendering. These are photographs of
                our own facility in Rajkot — the mixing plant, the extrusion and
                moulding floor, the testing lab, the racks, the dispatch bay and
                the office. Nothing on this page is stock imagery.
              </p>

              {/* Jump links double as a summary of what the page covers */}
              <nav className="mt-7 flex flex-wrap gap-2.5" aria-label="Facility areas">
                {ZONES.map((zone) => (
                  <a
                    key={zone.id}
                    href={`#${zone.id}`}
                    className="rounded-full border border-knavy/15 px-4 py-2 font-book text-[13.5px] font-semibold text-knavy transition-colors duration-300 ease-sc hover:border-korange hover:text-korange"
                  >
                    {zone.label}
                  </a>
                ))}
              </nav>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Zones — alternating text / photo columns */}
      {ZONES.map((zone, i) => {
        const photosFirst = i % 2 === 1;

        return (
          <section
            key={zone.id}
            id={zone.id}
            className={`scroll-mt-28 py-16 md:py-24 ${
              i % 2 === 0 ? "bg-white" : "bg-soft"
            }`}
          >
            <div className="shell">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                {/* Copy */}
                <div className={photosFirst ? "lg:order-2" : undefined}>
                  <Reveal>
                    <div className="flex items-center gap-4">
                      <span className="font-book text-[17px] font-semibold text-korange">
                        {zone.number}
                      </span>
                      <span className="h-px flex-1 bg-knavy/15" aria-hidden />
                      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-korange">
                        {zone.label}
                      </span>
                    </div>
                  </Reveal>

                  <SplitReveal
                    as="h3"
                    className="mt-6 font-book text-[clamp(1.6rem,3.4vw,38px)] font-semibold leading-[1.18] tracking-tight text-knavy"
                  >
                    {zone.heading}
                  </SplitReveal>

                  <Reveal delay={0.12}>
                    {zone.body.map((para) => (
                      <p
                        key={para}
                        className="mt-4 font-book text-[15.5px] leading-relaxed text-muted md:text-[16.5px]"
                      >
                        {para}
                      </p>
                    ))}
                  </Reveal>

                  <Reveal delay={0.2}>
                    <ul className="mt-7 space-y-3">
                      {zone.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 font-book text-[14.5px] font-medium text-knavy md:text-[15px]"
                        >
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mt-0.5 shrink-0 text-korange"
                            aria-hidden
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>

                {/* Photos */}
                <div className={photosFirst ? "lg:order-1" : undefined}>
                  <ZonePhotos zone={zone} />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Closing invitation — the transparency point, made actionable */}
      <section className="bg-knavy py-20 md:py-28">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <SplitReveal
              as="h2"
              className="font-book text-[clamp(1.9rem,4.4vw,50px)] font-semibold leading-[1.14] tracking-tight text-white"
            >
              Come and see it yourself
            </SplitReveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-6 max-w-2xl font-book text-[16px] leading-relaxed text-white/75 md:text-[17px]">
                Photographs only go so far. Dealers and project buyers are
                welcome to visit the plant at Khodal Industrial Area, Rajkot —
                get in touch and we will arrange a walkthrough.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-korange px-9 py-4 font-book text-[15px] font-semibold text-white transition-all duration-300 ease-sc hover:-translate-y-0.5 hover:bg-korangeDark"
                >
                  Arrange a Visit
                </Link>
                <Link
                  href="/quality-certifications"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-9 py-4 font-book text-[15px] font-semibold text-white transition-all duration-300 ease-sc hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
                >
                  View Certificates
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
