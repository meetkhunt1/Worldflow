"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { productMenu } from "@/lib/data";
import { getLenis } from "@/lib/lenis";
import FlagIcon from "@/components/FlagIcon";

const easeSc = [0.25, 0.1, 0.25, 1] as const;

function Wordmark() {
  return (
    <a href="/" aria-label="WorldFlow home" className="flex items-center">
      <Image
        src="/worldflow-logo.webp"
        alt="WorldFlow"
        width={401}
        height={120}
        priority
        className="h-9 w-auto md:h-10"
      />
    </a>
  );
}

type NavItem = { label: string; href: string; mega?: boolean };

/* ------------------------------------------------------------------ *
 * Language selector — dropdown backed by Google website translate.
 * Picking a language sets the `googtrans` cookie and reloads; the
 * Google script (loaded once, hidden) then translates the page.
 * ------------------------------------------------------------------ */

const LANGS = [
  { code: "en", short: "EN", label: "English" },
  { code: "ar", short: "AR", label: "العربية" },
  { code: "es", short: "ES", label: "Español" },
  { code: "fr", short: "FR", label: "Français" },
  { code: "ru", short: "RU", label: "Русский" },
];

function getCurrentLang() {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  const code = m ? decodeURIComponent(m[1]).split("/")[2] : "en";
  return LANGS.find((l) => l.code === code) ?? LANGS[0];
}

function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(LANGS[0]);
  const boxRef = useRef<HTMLDivElement>(null);

  // Reflect the persisted choice + load the translate script once.
  useEffect(() => {
    setLang(getCurrentLang());

    if (document.getElementById("gt-script")) return;
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: LANGS.map((l) => l.code).join(","),
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
    const s = document.createElement("script");
    s.id = "gt-script";
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(s);
  }, []);

  // Close when clicking anywhere outside the dropdown.
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const choose = (l: (typeof LANGS)[number]) => {
    setOpen(false);
    if (l.code === lang.code) return;
    const host = location.hostname;
    if (l.code === "en") {
      // Back to the original language: clear the cookie on every scope.
      const expire = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = `googtrans=; path=/; ${expire}`;
      document.cookie = `googtrans=; path=/; domain=${host}; ${expire}`;
      document.cookie = `googtrans=; path=/; domain=.${host}; ${expire}`;
    } else {
      document.cookie = `googtrans=/en/${l.code}; path=/`;
      document.cookie = `googtrans=/en/${l.code}; path=/; domain=.${host}`;
    }
    location.reload();
  };

  return (
    <div ref={boxRef} className="relative hidden lg:block">
      {/* Hidden mount point required by the Google script */}
      <div id="google_translate_element" className="hidden" aria-hidden />

      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 text-[15px] font-medium text-knavy transition-colors hover:text-korange"
      >
        <FlagIcon code={lang.code} className="h-3.5 w-5" />
        <span className="notranslate" translate="no">
          {lang.short}
        </span>
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          className={`mt-0.5 transition-transform duration-300 ease-sc ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 3.5 6 8.5 11 3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute right-0 top-full z-50 mt-3 min-w-[11rem] rounded-2xl bg-white p-2 shadow-[0_18px_45px_-14px_rgba(0,0,0,0.35)]"
          >
            {LANGS.map((l) => (
              <li key={l.code}>
                <button
                  role="option"
                  aria-selected={l.code === lang.code}
                  onClick={() => choose(l)}
                  className={`notranslate flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-[15px] font-medium transition-colors ${
                    l.code === lang.code
                      ? "bg-korange/10 text-korange"
                      : "text-knavy hover:bg-soft"
                  }`}
                  translate="no"
                >
                  <span className="flex items-center gap-2.5">
                    <FlagIcon code={l.code} className="h-3.5 w-5" />
                    {l.label}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide opacity-60">
                    {l.short}
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Product", href: "/products", mega: true },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Career", href: "/career" },
  { label: "Dealer Inquiry", href: "/contact" },
  { label: "Quality & Certifications", href: "/quality-certifications" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = usePathname();

  // Active when the route matches exactly, or lives under the item's
  // path (e.g. /products/upvc keeps "Product" highlighted).
  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  // Freeze the page behind the drawer. Lenis scrolls the window itself, so it
  // has to be stopped explicitly; the overflow lock covers the no-Lenis case.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      getLenis()?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Close the drawer on navigation so it never survives a route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Smart sticky: slide the header up when scrolling down, back down when
  // scrolling up. Uses transform (no fade), and always shows near the top.
  useEffect(() => {
    let last = window.scrollY;
    const THRESHOLD = 90; // px scrolled before hiding kicks in
    const DELTA = 6; // ignore tiny jitters
    const onScroll = () => {
      const y = window.scrollY;
      if (y < THRESHOLD) {
        setHidden(false);
      } else if (y > last + DELTA) {
        setHidden(true); // scrolling down
      } else if (y < last - DELTA) {
        setHidden(false); // scrolling up
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Never hide while the mobile drawer is open.
  const isHidden = hidden && !open;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-5 md:px-8">
      {/* Wrapper is the hover zone for the mega menu (pill + panel), and it
          carries the smart-sticky slide. The transform must NOT sit on
          <header>: a transformed ancestor becomes the containing block for
          the fixed mobile drawer below, collapsing it to the header's box. */}
      <div
        className={`pointer-events-auto relative z-50 mx-auto w-full max-w-shell transition-transform duration-500 ease-sc ${
          isHidden ? "-translate-y-[130%]" : "translate-y-0"
        }`}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="flex w-full items-center justify-between gap-4 rounded-full bg-white px-5 py-3 shadow-[0_6px_24px_-14px_rgba(0,0,0,0.18)] md:px-7">
          <Wordmark />

          {/* Center nav (desktop) */}
          <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onMouseEnter={() => setMegaOpen(!!item.mega)}
                className={`group flex items-center gap-1.5 whitespace-nowrap text-[15px] font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-korange"
                    : "text-knavy hover:text-korange"
                }`}
              >
                {item.label}
                {item.mega && (
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 12 12"
                    className={`mt-0.5 transition-transform duration-300 ease-sc ${
                      megaOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M1 3.5 6 8.5 11 3.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </a>
            ))}
          </nav>

          {/* Right cluster */}
          <div
            className="flex items-center gap-4 md:gap-6"
            onMouseEnter={() => setMegaOpen(false)}
          >
            <LanguageSwitcher />

            <a
              href="/contact"
              className="btn-fill btn-fill-navy hidden rounded-full bg-korange px-7 py-3 text-[15px] font-semibold text-white shadow-sm transition-transform duration-300 ease-sc hover:-translate-y-0.5 lg:inline-block"
            >
              Contact Us
            </a>

            {/* Mobile toggle */}
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="flex flex-col gap-[5px] lg:hidden"
            >
              <span className={`h-[2px] w-6 bg-knavy transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`h-[2px] w-6 bg-knavy transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`h-[2px] w-6 bg-knavy transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {/* Products mega menu (desktop) */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: easeSc }}
              className="absolute inset-x-0 top-full hidden pt-4 lg:block"
            >
              <div className="rounded-[32px] bg-white p-6 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.35)] md:p-8">
                <div className="grid grid-cols-4 gap-6">
                  {productMenu.map((p) => (
                    <a key={p.href} href={p.href} className="group">
                      <div className="h-56 overflow-hidden rounded-2xl">
                        <Image
                          src={p.image}
                          alt={p.label}
                          width={716}
                          height={460}
                          className="h-full w-full object-cover transition-transform duration-500 ease-sc group-hover:scale-105"
                        />
                      </div>
                      <h3 className="mt-4 text-[15px] font-bold uppercase tracking-wide text-knavy transition-colors group-hover:text-korange">
                        {p.label}
                      </h3>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            /* 100dvh, not the inset-0 default: on mobile browsers 100vh
               includes the area behind the address bar, which hid the last
               item. inset-0 stays as the fallback for older engines. */
            className="pointer-events-auto fixed inset-0 z-40 flex h-[100dvh] flex-col bg-white pt-28 lg:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: easeSc }}
          >
            {/* min-h-0 lets this pane shrink inside the flex column so it
                scrolls, instead of the links being squeezed to fit.
                data-lenis-prevent hands touch scrolling back to the panel;
                without it Lenis swallows the gesture. */}
            <div
              data-lenis-prevent
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
            >
              {/* Block, not flex: a flex scroll container clips its last
                  child's bottom padding, which cut the CTA in half. The
                  safe-area inset clears the iOS home indicator. */}
              <div className="px-6 pb-[calc(4rem_+_env(safe-area-inset-bottom))] pt-4 text-lg">
                {NAV.map((item) => (
                  <div key={item.href} className="border-b border-black/10">
                    <a
                      onClick={() => setOpen(false)}
                      className={`block py-4 font-semibold ${
                        isActive(item.href) ? "text-korange" : "text-knavy"
                      }`}
                      href={item.href}
                    >
                      {item.label}
                    </a>
                    {/* Product sub-links */}
                    {item.mega && (
                      <div className="flex flex-col gap-1 pb-4 pl-4">
                        {productMenu.map((p) => (
                          <a
                            key={p.href}
                            onClick={() => setOpen(false)}
                            href={p.href}
                            className="py-1.5 text-[16px] text-knavy/80"
                          >
                            {p.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <a
                  onClick={() => setOpen(false)}
                  href="/contact"
                  className="btn-fill btn-fill-navy mt-6 inline-block rounded-full bg-korange px-8 py-3 text-[16px] font-semibold text-white"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
