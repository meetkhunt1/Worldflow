"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ *
 * SplitReveal — headline reveal: each word is wrapped in a clipping
 * span (.sr-w) and each character in a sliding span (.sr-c); the
 * characters rise from below the word mask with a small stagger.
 * Preserves nested markup (accent <span>s, <br/>), so headings keep
 * their existing structure. Fires once when scrolled into view.
 * ------------------------------------------------------------------ */

/** Wrap every word of the element's text in .sr-w > .sr-c spans (in place). */
export function splitIntoChars(root: HTMLElement) {
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? "";
      if (!text.trim()) return;
      const frag = document.createDocumentFragment();
      text.split(/(\s+)/).forEach((token) => {
        if (!token) return;
        if (/^\s+$/.test(token)) {
          frag.appendChild(document.createTextNode(" "));
          return;
        }
        const word = document.createElement("span");
        word.className = "sr-w";
        for (const ch of token) {
          const c = document.createElement("span");
          c.className = "sr-c";
          c.textContent = ch;
          word.appendChild(c);
        }
        frag.appendChild(word);
      });
      node.parentNode?.replaceChild(frag, node);
    } else if (node instanceof HTMLElement && node.tagName !== "BR") {
      Array.from(node.childNodes).forEach(walk);
    }
  };
  Array.from(root.childNodes).forEach(walk);
}

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** ScrollTrigger start position. */
  start?: string;
};

export default function SplitReveal({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.025,
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      splitIntoChars(el);
      const chars = el.querySelectorAll(".sr-c");
      if (!chars.length) return;

      // Respect reduced-motion: text simply renders in place.
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(chars, {
          yPercent: 115,
          duration: 0.85,
          ease: "power4.out",
          stagger,
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
