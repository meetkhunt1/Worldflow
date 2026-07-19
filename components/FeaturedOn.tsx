"use client";

/* The original renders empty branded press blocks (logos loaded via CSS sprites).
   Here they are neutral placeholder tiles inside an infinite marquee — swap in the
   real press logos (Vogue, Allure, etc.) as SVGs when available. */
const logos = ["VOGUE", "ALLURE", "ELLE", "BYRDIE", "REFINERY29", "POPSUGAR", "FORBES"];

export default function FeaturedOn() {
  const doubled = [...logos, ...logos];
  return (
    <section className="border-y border-black/10 bg-white py-16">
      <div className="shell">
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Featured On</span>
          <span className="h-px w-24 bg-black/20" />
        </div>

        <div className="relative mt-10 overflow-hidden">
          <div className="flex w-max animate-marquee gap-16">
            {doubled.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="shrink-0 font-display text-2xl uppercase tracking-widest text-black/25"
              >
                {name}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </section>
  );
}
