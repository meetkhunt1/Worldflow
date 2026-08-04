"use client";

import type { FormEvent } from "react";
import Reveal from "@/components/Reveal";
import SplitReveal from "@/components/SplitReveal";
import { footerContact } from "@/lib/data";

/* ------------------------------------------------------------------ *
 * ContactSection — /contact page.
 * Top card: headline left; location / write us / call us + socials
 * right. Below: Google Map beside a "Write a message" form.
 * ------------------------------------------------------------------ */

const inputClasses =
  "w-full rounded-t-md border-b border-knavy/30 bg-soft px-4 py-3 font-book text-[15px] text-knavy placeholder:text-muted/70 outline-none transition-colors focus:border-korange";

const MAP_EMBED = footerContact.mapEmbed;

const SOCIALS = [
  {
    label: "Facebook",
    href: footerContact.facebook,
    icon: <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.5-1.5h1.4V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.6v3H11v7h2.5z" />,
  },
  {
    label: "Instagram",
    href: footerContact.instagram,
    icon: (
      <path d="M12 8.4a3.6 3.6 0 100 7.2 3.6 3.6 0 000-7.2zm0-2.4c1.9 0 2.2 0 3 .1 2.2.1 3 1 3.1 3.1 0 .8.1 1 .1 2.8s0 2-.1 2.8c-.1 2.1-.9 3-3.1 3.1-.8 0-1 .1-3 .1s-2.2 0-3-.1c-2.2-.1-3-1-3.1-3.1 0-.8-.1-1-.1-2.8s0-2 .1-2.8c.1-2.1.9-3 3.1-3.1.8-.1 1.1-.1 3-.1zm4.7 1.4a.9.9 0 100 1.8.9.9 0 000-1.8z" />
    ),
  },
  {
    label: "LinkedIn",
    href: footerContact.linkedin,
    icon: <path d="M6.5 8.7H3.6V20h2.9V8.7zM5 7.4a1.7 1.7 0 100-3.4 1.7 1.7 0 000 3.4zM20.4 20h-2.9v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20H10.7V8.7h2.8V10c.4-.7 1.3-1.5 2.8-1.5 3 0 3.5 2 3.5 4.5V20z" />,
  },
  {
    label: "YouTube",
    href: footerContact.youtube,
    icon: (
      <path d="M21.6 8.2s-.2-1.4-.8-2c-.7-.8-1.6-.8-2-.9C16 5 12 5 12 5s-4 0-6.8.3c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2.2 9.8 2.2 11.5v1.5c0 1.6.2 3.3.2 3.3s.2 1.4.8 2c.7.8 1.7.7 2.1.8 1.5.2 6.7.3 6.7.3s4 0 6.8-.3c.4-.1 1.3-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.3v-1.5c0-1.6-.2-3.2-.2-3.2zM10 14.8V9.9l5.2 2.5-5.2 2.4z" />
    ),
  },
];

export default function ContactSection() {
  // No backend — compose a pre-filled email in the visitor's mail client.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email") || "-"}`,
      `Contact No.: ${data.get("mobile")}`,
      "",
      `${data.get("message") || ""}`,
    ].join("\n");

    window.location.href = `mailto:${footerContact.email}?subject=${encodeURIComponent(
      String(data.get("subject") || "Website enquiry")
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="bg-soft pb-24 pt-32 md:pb-32 md:pt-44">
      <div className="shell">
        {/* Get-in-touch card */}
        <Reveal>
          <div className="grid gap-10 rounded-2xl bg-white p-8 shadow-[0_4px_14px_-12px_rgba(27,36,49,0.3)] md:grid-cols-2 md:gap-14 md:p-12">
            <SplitReveal className="font-display text-[clamp(1.7rem,3.2vw,2.5rem)] font-bold uppercase leading-[1.12] tracking-tight text-knavy">
              <span className="text-korange">Get in touch:</span> building
              strong partnerships through engineering excellence
            </SplitReveal>

            <div>
              <h2 className="font-book text-[15px] font-bold uppercase tracking-[0.14em] text-muted">
                Location
              </h2>
              <a
                href={footerContact.mapLink}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block max-w-sm font-book text-[16px] leading-relaxed text-knavy transition-colors hover:text-korange"
              >
                {footerContact.address}
              </a>

              <h2 className="mt-7 font-book text-[15px] font-bold uppercase tracking-[0.14em] text-muted">
                Write us
              </h2>
              <a
                href={`mailto:${footerContact.email}`}
                className="mt-2 inline-block font-book text-[16px] text-knavy transition-colors hover:text-korange"
              >
                {footerContact.email}
              </a>

              <h2 className="mt-7 font-book text-[15px] font-bold uppercase tracking-[0.14em] text-muted">
                Call us
              </h2>
              <div className="mt-2 flex flex-wrap gap-x-10 gap-y-3">
                {footerContact.phones.map((phone) => (
                  <div key={phone.number}>
                    <span className="block font-book text-[12px] font-bold uppercase tracking-[0.14em] text-muted">
                      {phone.label}
                    </span>
                    <a
                      href={`tel:${phone.number.replace(/\s/g, "")}`}
                      className="font-book text-[16px] text-knavy transition-colors hover:text-korange"
                    >
                      {phone.number}
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex gap-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid h-11 w-11 place-items-center rounded-full bg-knavy text-white transition-colors duration-300 ease-sc hover:bg-korange"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Map + message form */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full min-h-[380px] overflow-hidden rounded-2xl bg-white shadow-[0_4px_14px_-12px_rgba(27,36,49,0.3)]">
              <iframe
                src={MAP_EMBED}
                title="WorldFlow Pipes & Fittings location map"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-full w-full border-0"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl bg-white p-8 shadow-[0_4px_14px_-12px_rgba(27,36,49,0.3)] md:p-10"
            >
              <h2 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-bold uppercase tracking-tight text-knavy">
                Write a message.
              </h2>

              <div className="mt-7 space-y-5">
                <label className="block">
                  <span className="mb-2 block font-book text-[14px] font-semibold text-knavy">
                    Name : <span className="text-korange">*</span>
                  </span>
                  <input name="name" required placeholder="Your name" className={inputClasses} />
                </label>
                <label className="block">
                  <span className="mb-2 block font-book text-[14px] font-semibold text-knavy">
                    Email :
                  </span>
                  <input name="email" type="email" placeholder="Email address" className={inputClasses} />
                </label>
                <label className="block">
                  <span className="mb-2 block font-book text-[14px] font-semibold text-knavy">
                    Contact No. : <span className="text-korange">*</span>
                  </span>
                  <input name="mobile" type="tel" required placeholder="Enter contact number" className={inputClasses} />
                </label>
                <label className="block">
                  <span className="mb-2 block font-book text-[14px] font-semibold text-knavy">
                    Subject :
                  </span>
                  <input name="subject" placeholder="Write subject" className={inputClasses} />
                </label>
                <label className="block">
                  <span className="mb-2 block font-book text-[14px] font-semibold text-knavy">
                    Message :
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Write your message"
                    className={`${inputClasses} resize-y`}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="btn-fill btn-fill-navy mt-7 rounded-md bg-korange px-8 py-3.5 font-book text-[15px] font-semibold text-white"
              >
                Submit
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
