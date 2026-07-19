"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SplitReveal from "@/components/SplitReveal";

/* ------------------------------------------------------------------ *
 * QualityCertificates — /quality-certifications page.
 * Intro header, then a grid of certificate cards; clicking one opens
 * a fullscreen lightbox view of the document.
 * ------------------------------------------------------------------ */

const easeSc = [0.25, 0.1, 0.25, 1] as const;

type Certificate = { title: string; image: string; blurb: string };

const CERTIFICATES: Certificate[] = [
  {
    title: "Certificate of Conformity",
    image: "/certificates/certificate-of-conformity.jpg",
    blurb: "Product conformity to the applicable Indian standards.",
  },
  {
    title: "Certificate of Registration",
    image: "/certificates/certificate-of-registration.jpg",
    blurb: "ISO 9001:2015 registered quality management system.",
  },
  {
    title: "GST Certificate",
    image: "/certificates/gst-certificate.jpg",
    blurb: "Registered under the Goods & Services Tax regime.",
  },
  {
    title: "Trade Marks Registry",
    image: "/certificates/trade-marks-registry.jpg",
    blurb: "WorldFlow — a registered trademark brand.",
  },
  {
    title: "MSME ZED Pledge",
    image: "/certificates/zed-pledge.jpg",
    blurb: "Zero Defect, Zero Effect — MSME Sustainable (ZED) Certification Scheme.",
  },
];

export default function QualityCertificates() {
  const [viewing, setViewing] = useState<Certificate | null>(null);

  // Close the lightbox on Escape; lock scroll while open.
  useEffect(() => {
    if (!viewing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setViewing(null);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [viewing]);

  return (
    <section className="bg-soft pb-24 pt-32 md:pb-32 md:pt-44">
      <div className="shell">
        {/* Header */}
        <div className="max-w-3xl">
          <Reveal>
            <span className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-korange">
              <span className="h-2.5 w-2.5 rounded-full bg-korange" aria-hidden />
              Quality & Certifications
            </span>
          </Reveal>
          <SplitReveal className="mt-4 font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-bold uppercase leading-[1.08] tracking-tight text-knavy">
            Certified quality you can build on
          </SplitReveal>
          <Reveal delay={0.15}>
            <p className="mt-5 font-book text-[15px] leading-relaxed text-muted md:text-[16px]">
              Every WorldFlow product is backed by documented compliance —
              from ISO-registered manufacturing processes to product
              conformity and a registered trademark. Browse our certificates
              below; click any document to view it in full.
            </p>
          </Reveal>
        </div>

        {/* Certificate cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {CERTIFICATES.map((cert, i) => (
            <Reveal key={cert.title} delay={(i % 3) * 0.08} className="h-full">
              <button
                onClick={() => setViewing(cert)}
                className="group flex h-full w-full flex-col rounded-lg border border-knavy/10 bg-white p-5 text-left transition-colors duration-300 ease-sc hover:border-korange/40"
              >
                <span className="overflow-hidden rounded-md bg-soft">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover object-top transition-transform duration-500 ease-sc group-hover:scale-[1.03]"
                  />
                </span>
                <span className="mt-5 block font-book text-[17px] font-bold tracking-tight text-knavy">
                  {cert.title}
                </span>
                <span className="mt-1.5 block font-book text-[13.5px] leading-relaxed text-muted">
                  {cert.blurb}
                </span>
                <span className="mt-4 inline-flex items-center gap-2 font-book text-[14px] font-semibold text-korange">
                  View Certificate
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 ease-sc group-hover:translate-x-0.5" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {viewing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easeSc }}
            className="fixed inset-0 z-[70] grid place-items-center bg-knavy/80 p-4 backdrop-blur-sm md:p-10"
            onClick={() => setViewing(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: easeSc }}
              className="relative max-h-full"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={viewing.title}
            >
              <img
                src={viewing.image}
                alt={viewing.title}
                className="max-h-[85vh] w-auto rounded-lg bg-white"
              />
              <button
                onClick={() => setViewing(null)}
                aria-label="Close"
                className="absolute -right-3 -top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-knavy shadow-lg transition-colors hover:text-korange"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <path d="M4 4l12 12M16 4L4 16" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
