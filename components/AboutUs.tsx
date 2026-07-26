"use client";

import Reveal from "@/components/Reveal";
import SplitReveal from "@/components/SplitReveal";

/* ------------------------------------------------------------------ *
 * AboutUs — "Infrastructure Excellence" split section.
 * Left: heading (first word in brand colour) + supporting copy.
 * Right: large rounded media card (/public/factory/injection-moulding.jpg).
 * ------------------------------------------------------------------ */

// Faint technical-drawing watermark behind the section (subtle, on-brand).
const BLUEPRINT_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='180' viewBox='0 0 220 180'%3E%3Cg fill='none' stroke='%23000' stroke-width='1' opacity='0.5'%3E%3Crect x='30' y='40' width='90' height='60' rx='6'/%3E%3Ccircle cx='75' cy='70' r='16'/%3E%3Ccircle cx='75' cy='70' r='7'/%3E%3Ccircle cx='45' cy='52' r='3'/%3E%3Ccircle cx='105' cy='52' r='3'/%3E%3Ccircle cx='45' cy='88' r='3'/%3E%3Ccircle cx='105' cy='88' r='3'/%3E%3Crect x='150' y='90' width='50' height='70' rx='5'/%3E%3Ccircle cx='175' cy='125' r='12'/%3E%3C/g%3E%3C/svg%3E\")";

export default function AboutUs() {
  return (
    <section id="about-us" className="about-us relative overflow-hidden bg-soft py-[70px]">
      {/* Faint blueprint watermark */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: BLUEPRINT_BG, backgroundSize: "220px 180px" }}
        aria-hidden
      />

      <div className="shell relative z-10 grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Left — copy */}
        <div className="max-w-xl">
          <SplitReveal className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold uppercase leading-[1.05] tracking-tight text-ink">
            <span className="text-korange">Engineering</span> Excellence
          </SplitReveal>
          <Reveal delay={0.15}>
            <p className="mt-6 font-book text-[17px] font-semibold leading-relaxed text-ink">
              High performance UPVC, CPVC &amp; SWR pipes for agriculture,
              industrial &amp; infrastructure solutions.
            </p>
            <p className="mt-4 font-book text-[17px] leading-relaxed text-muted">
              WorldFlow is committed to delivering high-performance piping
              solutions with a focus on quality, durability, and precision
              engineering. As a trusted manufacturer of UPVC, CPVC, HDPE, SWR,
              column, and casing pipes, we serve agriculture, industrial, and
              infrastructure sectors with reliable products designed for
              long-term performance.
            </p>
            <p className="mt-4 font-book text-[17px] leading-relaxed text-muted">
              Our advanced manufacturing processes and strict quality standards
              ensure consistent flow, strength, and efficiency in every
              application.
            </p>
          </Reveal>
        </div>

        {/* Right — media card */}
        <Reveal delay={0.1}>
          <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#3a2417] via-[#1c130d] to-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]">
            <img
              src="/factory/injection-moulding.jpg"
              alt="CPVC injection moulding machine at the WorldFlow manufacturing facility"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
