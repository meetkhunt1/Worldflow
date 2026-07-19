import Image from "next/image";
import {
  footerAbout,
  footerProducts,
  footerQuickLinks,
  footerContact,
  footerBottom,
} from "@/lib/data";

/** Uppercase column heading. */
function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60">
      {children}
    </h3>
  );
}

/** Vertical list of footer links. */
function FooterLinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="mt-7 space-y-5 text-[17px]">
      {links.map((l) => (
        <li key={l.label}>
          <a href={l.href} className="transition-opacity duration-300 ease-sc hover:opacity-70">
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

const socials = [
  {
    label: "Facebook",
    href: footerContact.facebook,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: footerContact.instagram,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.6" cy="6.4" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: footerContact.linkedin,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.25 8.25h4.5V24h-4.5V8.25Zm7.5 0h4.31v2.15h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V24h-4.5V8.25Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: footerContact.youtube,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 0 0 .5 6.5 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.1C4.5 20 12 20 12 20s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.5ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-korange text-white">
      {/* Decorative crossing wave curves along the bottom */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[320px] w-full md:h-[440px]"
        viewBox="0 0 1440 440"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        <path
          d="M0 440 V250 C 420 110 900 400 1440 140 V440 Z"
          fill="#DE4913"
          fillOpacity="0.45"
        />
        <path
          d="M0 440 V360 C 480 430 980 150 1440 310 V440 Z"
          fill="#DE4913"
          fillOpacity="0.55"
        />
      </svg>

      <div className="shell relative">
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 md:py-24 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <a href="/" aria-label="WorldFlow home" className="inline-block">
              <Image
                src="/worldflow-logo.webp"
                alt="WorldFlow Pipes & Fittings"
                width={401}
                height={120}
                className="h-12 w-auto brightness-0 invert"
              />
            </a>
            <p className="mt-8 text-[17px] leading-relaxed">{footerAbout.description}</p>
            <p className="mt-6 text-[17px] font-semibold">{footerAbout.tagline}</p>

            <div className="mt-8 flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white text-korange transition-opacity duration-300 ease-sc hover:opacity-80"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <FooterHeading>Products</FooterHeading>
            <FooterLinkList links={footerProducts} />
          </div>

          {/* Quick links */}
          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <FooterLinkList links={footerQuickLinks} />
          </div>

          {/* Contact */}
          <div>
            <FooterHeading>Contact Us</FooterHeading>

            <div className="mt-7 flex items-start gap-4 text-[17px]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mt-1 shrink-0"
                aria-hidden
              >
                <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.5.6 3.7.1.3 0 .7-.3 1l-2.2 2.1Z" />
              </svg>
              <div className="space-y-1">
                {footerContact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="block transition-opacity duration-300 ease-sc hover:opacity-70"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>

            <a
              href={`mailto:${footerContact.email}`}
              className="mt-6 flex items-center gap-4 text-[17px] transition-opacity duration-300 ease-sc hover:opacity-70"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="shrink-0"
                aria-hidden
              >
                <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {footerContact.email}
            </a>

            <div className="mt-6 flex items-start gap-4 text-[17px] leading-relaxed">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mt-1 shrink-0"
                aria-hidden
              >
                <path d="M12 2a7.5 7.5 0 0 0-7.5 7.5c0 5.3 6.6 11.7 6.9 12a.9.9 0 0 0 1.2 0c.3-.3 6.9-6.7 6.9-12A7.5 7.5 0 0 0 12 2Zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z" />
              </svg>
              <p className="max-w-xs">{footerContact.address}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-white/25 py-7 text-[15px] text-white/80 md:flex-row md:items-center md:justify-between">
          <p>{footerBottom.copyright}</p>
          <p>{footerBottom.seoText}</p>
        </div>
      </div>
    </footer>
  );
}
