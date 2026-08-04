import type Lenis from "@studio-freight/lenis";

/**
 * Single shared handle on the Lenis instance created by <SmoothScroll>.
 * Components that need to freeze the page (e.g. the mobile drawer) must stop
 * Lenis itself — an `overflow: hidden` on <html> does not stop it, because
 * Lenis scrolls the window programmatically.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}
