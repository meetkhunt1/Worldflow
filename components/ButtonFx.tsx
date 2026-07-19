"use client";

import { useEffect } from "react";

/* ------------------------------------------------------------------ *
 * ButtonFx — global pointer delegation for .btn-fill buttons.
 * Stamps the cursor's entry/exit point as --x/--y so the circle-fill
 * hover (globals.css) grows from where the pointer actually crossed
 * the edge, instead of always from the centre.
 * ------------------------------------------------------------------ */

export default function ButtonFx() {
  useEffect(() => {
    const setOrigin = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(
        ".btn-fill"
      ) as HTMLElement | null;
      if (!el) return;
      // Only when actually crossing the button's boundary — ignore
      // pointer moves between the button's own children.
      if (el.contains(e.relatedTarget as Node)) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--y", `${e.clientY - rect.top}px`);
    };

    document.addEventListener("pointerover", setOrigin);
    document.addEventListener("pointerout", setOrigin);
    return () => {
      document.removeEventListener("pointerover", setOrigin);
      document.removeEventListener("pointerout", setOrigin);
    };
  }, []);

  return null;
}
