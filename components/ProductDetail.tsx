"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import type { ProductPage } from "@/lib/products";

/* ------------------------------------------------------------------ *
 * ProductDetail — /products/[slug] template.
 * Hero (image card left, copy + CTAs right) → feature tabs with
 * orange benefit bars → dark story band on the angular backdrop →
 * FAQ accordion.
 * ------------------------------------------------------------------ */

const easeSc = [0.25, 0.1, 0.25, 1] as const;

// Small outline icons shown beside each tab label (index-matched to
// the four tabs every product defines in lib/products.ts).
const TAB_ICONS = [
  // High Performance — star
  <path key="star" d="M12 3.5l2.4 5 5.4.7-4 3.8 1 5.4-4.8-2.6-4.8 2.6 1-5.4-4-3.8 5.4-.7 2.4-5z" />,
  // Use of Products — flask
  <path key="flask" d="M9.5 3.5h5M10.5 3.5v5l-5 9a1.6 1.6 0 001.4 2.5h10.2a1.6 1.6 0 001.4-2.5l-5-9v-5M8 15.5h8" />,
  // Sizes & Range — ruler
  <path key="ruler" d="M3.5 16.5l13-13 4 4-13 13-4-4zM7.5 12.5l1.7 1.7M10.5 9.5l1.7 1.7M13.5 6.5l1.7 1.7" />,
  // Quality & Standards — document
  <path key="doc" d="M7 3.5h7l4 4v13H7v-17zM14 3.5v4h4M10 12.5h5M10 16h5" />,
  // Safety Tips — raised hand
  <path key="hand" d="M8 12V5.8a1.3 1.3 0 012.6 0V11M10.6 10.5V4.3a1.3 1.3 0 012.6 0v6.2M13.2 10.5V5.3a1.3 1.3 0 012.6 0V13M15.8 13l1.8-1.8a1.4 1.4 0 012 2l-3.7 4.6a5.5 5.5 0 01-4.3 2.2A5.6 5.6 0 016 14.4V8.3a1.3 1.3 0 012.6 0" />,
];

function FeatureTabs({ tabs }: { tabs: ProductPage["tabs"] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-16 md:mt-20">
      {/* Tab bar — bordered container, evenly spread icon + label tabs,
          active tab as a filled navy pill */}
      <div className="flex flex-wrap items-center justify-center gap-5 rounded-md border border-knavy/10 bg-white p-2.5">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2.5 rounded-md px-5 py-3.5 font-book text-[15px] font-semibold transition-colors duration-300 ease-sc md:px-7 ${
              i === active
                ? "bg-korange text-white"
                : "bg-soft text-knavy hover:bg-knavy/10"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {TAB_ICONS[i]}
            </svg>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active tab panel — each tab gets its own layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: easeSc }}
          className="mt-10"
        >
          {TAB_LAYOUTS[active](tabs[active].items)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---- Per-tab panel layouts (index-matched to the five tabs) ------- */

/** High Performance — bold orange statement bars. */
function BarsPanel(items: string[]) {
  return (
    <div className="grid gap-3.5 md:grid-cols-2 md:gap-x-5">
      {items.map((item) => (
        <p
          key={item}
          className="border-l-4 border-korangeDark bg-korange px-5 py-3.5 font-book text-[14px] font-semibold text-white md:text-[15px]"
        >
          {item}
        </p>
      ))}
    </div>
  );
}

/** Use of Products — light application tiles with an arrow icon. */
function TilesPanel(items: string[]) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-start gap-3 rounded-md border border-knavy/10 bg-white p-5"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 shrink-0 text-korange"
            aria-hidden
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M9 12h6M12.5 9.5L15 12l-2.5 2.5" />
          </svg>
          <p className="font-book text-[14px] font-medium leading-relaxed text-knavy md:text-[15px]">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Sizes & Range — spec-sheet rows in a bordered card. */
function SpecPanel(items: string[]) {
  return (
    <div className="divide-y divide-knavy/10 rounded-md border border-knavy/10 bg-white">
      {items.map((item) => (
        <p
          key={item}
          className="flex items-center gap-4 px-6 py-4 font-book text-[14px] font-medium text-knavy md:text-[15px]"
        >
          <span className="h-2 w-2 shrink-0 rotate-45 bg-korange" aria-hidden />
          {item}
        </p>
      ))}
    </div>
  );
}

/** Quality & Standards — dark assurance cards with a shield icon. */
function QualityPanel(items: string[]) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-start gap-3.5 rounded-md bg-knavy p-5"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 shrink-0 text-korange"
            aria-hidden
          >
            <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z" />
            <path d="M9 12l2 2 4-4.5" />
          </svg>
          <p className="font-book text-[14px] font-medium leading-relaxed text-white/90 md:text-[15px]">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Safety Tips — numbered checklist in two columns. */
function NumberedPanel(items: string[]) {
  return (
    <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
      {items.map((item, i) => (
        <div key={item} className="flex gap-4 border-t border-knavy/10 pt-4">
          <span className="font-book text-[17px] font-bold leading-snug text-korange">
            {String(i + 1).padStart(2, "0")}.
          </span>
          <p className="font-book text-[14px] font-medium leading-relaxed text-knavy md:text-[15px]">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}

const TAB_LAYOUTS = [BarsPanel, TilesPanel, SpecPanel, QualityPanel, NumberedPanel];

function FaqAccordion({ faqs }: { faqs: ProductPage["faqs"] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mx-auto mt-10 max-w-4xl divide-y divide-knavy/10 border-y border-knavy/10">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="font-book text-[15px] font-medium text-knavy md:text-[16px]">
                {faq.question}
              </span>
              {/* Plus that rotates into a cross when open */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className={`shrink-0 text-knavy transition-transform duration-300 ease-sc ${
                  isOpen ? "rotate-45 text-korange" : ""
                }`}
                aria-hidden
              >
                <path
                  d="M8 2v12M2 8h12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: easeSc }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-10 font-book text-[15px] leading-relaxed text-muted">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ---- Brochure request modal --------------------------------------- */

const modalInputClasses =
  "w-full rounded-t-md border-b border-knavy/30 bg-soft px-4 py-3 font-book text-[15px] text-knavy placeholder:text-muted/70 outline-none transition-colors focus:border-korange";

function BrochureModal({
  product,
  open,
  onClose,
}: {
  product: ProductPage;
  open: boolean;
  onClose: () => void;
}) {
  // Close on Escape and lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);

  // Placeholder download target — swap for the real brochure PDF
  // (e.g. `/brochures/${product.slug}.pdf`) once it exists.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(product.image, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: easeSc }}
          className="fixed inset-0 z-[70] grid place-items-center bg-knavy/60 p-4 backdrop-blur-[2px]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: easeSc }}
            className="w-full max-w-md rounded-xl bg-white p-7 md:p-8"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Download ${product.title} brochure`}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-book text-[20px] font-bold tracking-tight text-knavy">
                Download brochure
              </h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-knavy transition-colors hover:text-korange"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <path d="M4 4l12 12M16 4L4 16" />
                </svg>
              </button>
            </div>
            <p className="mt-2 font-book text-[14px] leading-relaxed text-muted">
              Share a few details and the {product.title} brochure will open
              right away.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <input
                name="name"
                required
                placeholder="Your name *"
                className={modalInputClasses}
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email address *"
                className={modalInputClasses}
              />
              <input
                name="mobile"
                type="tel"
                placeholder="Contact number"
                className={modalInputClasses}
              />
              <button
                type="submit"
                className="btn-fill btn-fill-navy w-full rounded-md bg-korange px-6 py-3.5 font-book text-[15px] font-semibold text-white"
              >
                Download Now
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ProductDetail({ product }: { product: ProductPage }) {
  const [brochureOpen, setBrochureOpen] = useState(false);

  return (
    <>
      {/* Hero + feature tabs */}
      <section className="bg-paper pb-20 pt-32 md:pb-24 md:pt-44">
        <div className="shell">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <div className="rounded-xl border border-knavy/10 bg-white p-8 md:p-12">
                <img
                  src={product.image}
                  alt={product.title}
                  className="mx-auto aspect-square w-full max-w-[440px] object-contain"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <h1 className="font-book text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold tracking-tight text-knavy">
                  {product.title}
                </h1>
              </Reveal>
              {product.intro.map((paragraph, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p className="mt-5 font-book text-[15px] leading-relaxed text-muted">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
              <Reveal delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="btn-fill btn-fill-navy rounded-md bg-korange px-7 py-3.5 font-book text-[15px] font-semibold text-white"
                  >
                    Enquire Now
                  </Link>
                  <button
                    onClick={() => setBrochureOpen(true)}
                    className="btn-fill btn-fill-orange rounded-md border border-korange px-7 py-3.5 font-book text-[15px] font-semibold text-korange transition-colors duration-300 ease-sc hover:text-white"
                  >
                    Download Brochure
                  </button>
                </div>
              </Reveal>
            </div>
          </div>

          <FeatureTabs tabs={product.tabs} />
        </div>
      </section>

      {/* Dark story band on the angular backdrop */}
      <section className="relative bg-knavy py-16 md:py-24">
        <div
          className="absolute inset-0 bg-[url('/trust-bg.webp')] bg-cover bg-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/45" aria-hidden />
        <div className="shell relative">
          <div className="max-w-3xl">
            <Reveal>
              <h2 className="font-book text-[clamp(1.6rem,3vw,2.3rem)] font-bold tracking-tight text-white">
                {product.story.title}
              </h2>
            </Reveal>
            {product.story.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="mt-4 font-book text-[15px] leading-relaxed text-white/70">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <h2 className="text-center font-book text-[clamp(1.6rem,3vw,2.3rem)] font-bold tracking-tight text-korange">
              Frequently Asked Questions
            </h2>
          </Reveal>
          <FaqAccordion faqs={product.faqs} />
        </div>
      </section>

      <BrochureModal
        product={product}
        open={brochureOpen}
        onClose={() => setBrochureOpen(false)}
      />
    </>
  );
}
