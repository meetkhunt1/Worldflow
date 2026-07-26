"use client";

import { useRef } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";

/* ------------------------------------------------------------------ *
 * ProductCertifications — horizontal card rail shown on every product
 * detail page. Heading + prev/next arrows on top, then a scroll-snap
 * row of certificate cards (icon + name + blurb) linking to the full
 * quality & certifications page.
 *
 * Every card carries its official badge artwork — CE, ISO, ISI, GST,
 * ® and MSME ZED. These are prescribed marks, so they render at their
 * own colours rather than being tinted to the brand palette.
 * ------------------------------------------------------------------ */

type CertCard = {
  title: string;
  blurb: string;
  /** Official badge artwork, rendered as-is (marks must not be recoloured). */
  image: string;
};

const CERTIFICATIONS: CertCard[] = [
  {
    title: "CE Certificate of Conformity",
    blurb: "EC conformity for pipes & fittings, certified by ICI UK.",
    image: "/certificates/ce-logo.png",
  },
  {
    title: "ISO 9001 Certified",
    blurb: "Registered quality management system across production.",
    image: "/certificates/iso-logo.png",
  },
  {
    title: "ISI Marked",
    blurb: "Manufactured to the applicable Indian Standards.",
    image: "/certificates/isi-logo.png",
  },
  {
    title: "GST Registered",
    blurb: "Registered under the Goods & Services Tax regime.",
    image: "/certificates/gst-logo.png",
  },
  {
    title: "Registered Trademark",
    blurb: "WorldFlow — a registered trademark brand.",
    image: "/certificates/trademark-logo.webp",
  },
  {
    title: "MSME ZED Certified",
    blurb: "Zero Defect, Zero Effect — MSME sustainable certification.",
    image: "/certificates/zed-logo.png",
  },
];

export default function ProductCertifications() {
  const railRef = useRef<HTMLDivElement>(null);

  // Scroll one card (incl. gap) per arrow click.
  const scrollByCard = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-cert-card]");
    const step = card ? card.offsetWidth + 20 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const arrowClasses =
    "grid h-11 w-11 place-items-center rounded-full border border-knavy/25 text-knavy transition-colors duration-300 ease-sc hover:border-korange hover:text-korange";

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="shell">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-book text-[clamp(1.6rem,3vw,2.3rem)] font-bold tracking-tight text-knavy">
              Certifications & Approvals
            </h2>
            <div className="hidden shrink-0 gap-3 sm:flex">
              <button onClick={() => scrollByCard(-1)} aria-label="Previous certificates" className={arrowClasses}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
              </button>
              <button onClick={() => scrollByCard(1)} aria-label="Next certificates" className={arrowClasses}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div
            ref={railRef}
            className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CERTIFICATIONS.map((cert) => (
              <Link
                key={cert.title}
                href="/quality-certifications"
                data-cert-card
                className="group flex w-[240px] shrink-0 snap-start flex-col rounded-lg bg-soft p-6 transition-colors duration-300 ease-sc hover:bg-knavy/5 sm:w-[270px]"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    className="h-10 w-10 object-contain"
                  />
                </span>
                <span className="mt-6 block font-book text-[16.5px] font-bold tracking-tight text-knavy">
                  {cert.title}
                </span>
                <span className="mt-2 block font-book text-[13.5px] leading-relaxed text-muted">
                  {cert.blurb}
                </span>
                <span className="mt-5 inline-flex items-center gap-2 font-book text-[13.5px] font-semibold text-korange">
                  View Certificate
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 ease-sc group-hover:translate-x-0.5" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
