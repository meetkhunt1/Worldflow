"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { footerContact } from "@/lib/data";

gsap.registerPlugin(useGSAP);

/* ------------------------------------------------------------------ *
 * StickyContact — persistent WhatsApp + email actions, bottom right.
 * Sits under the header (z-50) and the mobile drawer (z-40) so it
 * never competes with open navigation. Entrance is a single staggered
 * timeline; hover/label motion is pure CSS transform + opacity.
 * ------------------------------------------------------------------ */

/** Delay before the stack arrives — lets the page settle first. */
const ENTRANCE_DELAY = 0.9;
/** Distance each button travels on entrance (px). */
const ENTRANCE_Y = 20;

/** wa.me expects a bare country-code + number, no spaces or symbols. */
const whatsappDigits = footerContact.whatsapp.replace(/\D/g, "");

const WHATSAPP_MESSAGE =
  "Hello WorldFlow, I'd like to know more about your pipes & fittings.";

const actions = [
  {
    label: "WhatsApp",
    href: `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    external: true,
    // WhatsApp brand green — kept off the Tailwind palette since it is
    // a third-party mark, not part of the WorldFlow system.
    className: "bg-[#25D366] hover:bg-[#1FBE58]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z" />
        <path d="M12.04 2C6.6 2 2.17 6.43 2.17 11.87c0 1.74.46 3.44 1.32 4.94L2 22.5l5.82-1.52a9.82 9.82 0 0 0 4.22.95h.01c5.44 0 9.87-4.43 9.87-9.87A9.8 9.8 0 0 0 19 4.88 9.8 9.8 0 0 0 12.04 2Zm0 17.98h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.15 8.15 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.2-8.2a8.15 8.15 0 0 1 5.8 2.41 8.14 8.14 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.2 8.2Z" />
      </svg>
    ),
  },
  {
    label: "Email us",
    href: `mailto:${footerContact.email}`,
    external: false,
    className: "bg-korange hover:bg-korangeDark",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
        <path d="m3.5 6.8 7.3 5.2a2 2 0 0 0 2.4 0l7.3-5.2" />
      </svg>
    ),
  },
];

export default function StickyContact() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-sticky-action]");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { duration: 0.8, ease: "power2.out" },
          delay: ENTRANCE_DELAY,
        });

        // Bottom button leads, top follows — reads as a stack settling in.
        tl.from(items, {
          opacity: 0,
          y: ENTRANCE_Y,
          stagger: { each: 0.1, from: "end" },
        });
      });

      // Reduced motion: present, with no travel.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(items, { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed bottom-5 right-4 z-30 flex flex-col items-end gap-3 md:bottom-8 md:right-8"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      {actions.map((action) => (
        <a
          key={action.label}
          data-sticky-action
          href={action.href}
          aria-label={action.label}
          {...(action.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className={`group relative pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition-[transform,background-color] duration-300 ease-sc will-change-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 md:h-14 md:w-14 ${action.className}`}
        >
          {action.icon}

          {/* Desktop-only label: slides out of the button on hover. */}
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-knavy px-4 py-2 text-[13px] font-semibold text-white opacity-0 shadow-lg transition-[opacity,transform] duration-300 ease-sc translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 lg:block">
            {action.label}
          </span>
        </a>
      ))}
    </div>
  );
}
