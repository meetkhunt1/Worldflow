"use client";

import Reveal from "@/components/Reveal";
import SplitReveal from "@/components/SplitReveal";

/* ------------------------------------------------------------------ *
 * WhyChooseUs — "Our Advantages" feature grid.
 * Eyebrow + two-line heading, then a responsive grid of advantage
 * cards (icon, title, blurb). WorldFlow theme: korange accents on a
 * soft neutral background with a faint geometric watermark.
 * ------------------------------------------------------------------ */

type Advantage = {
  title: string;
  blurb: string;
  icon: React.ReactNode;
};

// Standalone outline icons — orange stroke, no background tile.
const icons = {
  quality: (
    <>
      <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4.5" />
    </>
  ),
  durable: (
    <>
      <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" />
      <path d="M4 12l8 4.5 8-4.5" />
      <path d="M4 16.5L12 21l8-4.5" />
    </>
  ),
  fit: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <path d="M16.5 13.5v6M13.5 16.5h6" />
    </>
  ),
  certified: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M9.8 9l1.6 1.6 2.8-3.2" />
      <path d="M8.8 13.8L7.5 21l4.5-2.3L16.5 21l-1.3-7.2" />
    </>
  ),
  sustainable: (
    <>
      <path d="M19.5 4.5c.5 7.5-2.5 13-9 13-2.8 0-4.5-1.8-4.5-4C6 8.5 12 4.5 19.5 4.5z" />
      <path d="M4.5 19.5C7 14.5 10.5 10.5 15 8.5" />
    </>
  ),
  support: (
    <>
      <path d="M4.5 13.5v-2.5a7.5 7.5 0 0115 0v2.5" />
      <rect x="3" y="12.5" width="4" height="6.5" rx="2" />
      <rect x="17" y="12.5" width="4" height="6.5" rx="2" />
      <path d="M19.5 19a3 3 0 01-3 2.5h-2.5" />
    </>
  ),
};

const ADVANTAGES: Advantage[] = [
  {
    title: "Uncompromising Quality",
    blurb:
      "Every pipe is manufactured to strict tolerances and tested at each stage to deliver consistent, reliable performance.",
    icon: icons.quality,
  },
  {
    title: "Built to Last",
    blurb:
      "High-grade materials and rigorous engineering give our piping systems a longer service life, even under pressure.",
    icon: icons.durable,
  },
  {
    title: "Perfect-Fit Engineering",
    blurb:
      "A complete, modular range means every component slots together seamlessly — no leaks, no guesswork.",
    icon: icons.fit,
  },
  {
    title: "Certified & Compliant",
    blurb:
      "Our products meet national and international standards, backed by full quality certifications.",
    icon: icons.certified,
  },
  {
    title: "Sustainable by Design",
    blurb:
      "Recyclable materials and efficient processes reduce environmental impact without compromising strength.",
    icon: icons.sustainable,
  },
  {
    title: "Dependable Support",
    blurb:
      "From specification to delivery, our team backs you with expert guidance and a reliable nationwide supply.",
    icon: icons.support,
  },
];

// Faint diagonal geometric watermark — subtle, on-brand.
const PATTERN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%231b2431' stroke-width='1'%3E%3Cpath d='M0 60L60 0M60 120L120 60M0 120L120 0'/%3E%3C/g%3E%3C/svg%3E\")";

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-soft py-20 md:py-28">
      {/* Faint geometric watermark */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: PATTERN_BG, backgroundSize: "120px 120px" }}
        aria-hidden
      />

      <div className="shell relative z-10">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-korange">
            Our Advantages
          </span>
        </Reveal>
        <SplitReveal className="mt-4 max-w-4xl font-display text-[clamp(2rem,4.8vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-tight text-knavy">
          Why choose WorldFlow for
          <br className="hidden sm:block" /> your flow systems
        </SplitReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-xl bg-white p-8 shadow-[0_6px_18px_-12px_rgba(27,36,49,0.18)] transition-all duration-300 ease-sc hover:-translate-y-1">
                {/* Hover wash — orange gradient rising from the card base */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,82,0,0)_54.21%,rgba(255,82,0,0.2)_100%)] opacity-0 transition-opacity duration-300 ease-sc group-hover:opacity-100"
                />
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-korange"
                  aria-hidden
                >
                  {a.icon}
                </svg>
                <h3 className="mt-8 font-display text-2xl font-bold uppercase tracking-tight text-knavy">
                  {a.title}
                </h3>
                <p className="mt-3 font-book text-[15px] leading-relaxed text-muted">
                  {a.blurb}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
