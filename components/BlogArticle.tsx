"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import BlogCard from "@/components/BlogCard";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog";

/* ------------------------------------------------------------------ *
 * BlogArticle — /blog/[slug] template.
 * Chip + title + meta, hero image, table of contents, numbered
 * sections, FAQ accordion, share row, and related posts.
 * ------------------------------------------------------------------ */

const easeSc = [0.25, 0.1, 0.25, 1] as const;

function Faq({ faqs }: { faqs: BlogPost["faqs"] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-knavy/10 border-y border-knavy/10">
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className={`shrink-0 text-knavy transition-transform duration-300 ease-sc ${
                  isOpen ? "rotate-45 text-korange" : ""
                }`}
                aria-hidden
              >
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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

function ShareRow({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    if (navigator.share) {
      await navigator.share({ title: post.title, url }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(url).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={share}
      className="btn-fill btn-fill-orange inline-flex items-center gap-2.5 rounded-md border border-knavy/15 px-5 py-2.5 font-book text-[14px] font-semibold text-knavy transition-colors duration-300 ease-sc hover:border-korange hover:text-white"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="17.5" cy="5.5" r="2.5" />
        <circle cx="17.5" cy="18.5" r="2.5" />
        <path d="M8.2 10.8l7-4M8.2 13.2l7 4" />
      </svg>
      {copied ? "Link Copied!" : "Share This Article"}
    </button>
  );
}

export default function BlogArticle({ post }: { post: BlogPost }) {
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <section className="bg-paper pb-24 pt-32 md:pb-32 md:pt-44">
      <div className="shell">
        {/* Article header */}
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <span className="rounded-md bg-korange/10 px-3 py-1.5 font-book text-[13px] font-semibold text-korange">
              {post.category}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 font-book text-[clamp(1.8rem,3.6vw,2.7rem)] font-bold leading-[1.15] tracking-tight text-knavy">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-4 flex items-center gap-2.5 font-book text-[14.5px] text-muted">
              {post.date}
              <span className="h-1 w-1 rounded-full bg-korange" aria-hidden />
              {post.readTime}
            </p>
          </Reveal>
        </div>

        {/* Hero image */}
        <Reveal delay={0.15} className="mx-auto mt-10 max-w-4xl">
          <img
            src={post.image}
            alt={post.title}
            className="aspect-[16/8] w-full rounded-xl object-cover"
          />
        </Reveal>

        <div className="mx-auto max-w-3xl">
          {/* Table of contents */}
          <Reveal delay={0.1}>
            <nav
              aria-label="Table of contents"
              className="mt-12 rounded-xl bg-soft p-7 md:p-8"
            >
              <h2 className="font-book text-[17px] font-bold tracking-tight text-knavy">
                Table of Contents
              </h2>
              <ol className="mt-4 space-y-2.5">
                {post.sections.map((section, i) => (
                  <li key={section.heading}>
                    <a
                      href={`#section-${i + 1}`}
                      className="font-book text-[15px] text-muted transition-colors duration-300 hover:text-korange"
                    >
                      {i + 1}. {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>

          {/* Sections */}
          {post.sections.map((section, i) => (
            <div key={section.heading} id={`section-${i + 1}`} className="mt-12 scroll-mt-32">
              <h2 className="font-book text-[clamp(1.3rem,2.2vw,1.6rem)] font-bold tracking-tight text-knavy">
                {i + 1}. {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mt-4 font-book text-[16px] leading-[1.8] text-muted"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3.5">
                      <span className="mt-2.5 h-2 w-2 shrink-0 rotate-45 bg-korange" aria-hidden />
                      <span className="font-book text-[16px] leading-relaxed text-knavy">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="font-book text-[clamp(1.3rem,2.2vw,1.6rem)] font-bold tracking-tight text-knavy">
              FAQs
            </h2>
            <div className="mt-6">
              <Faq faqs={post.faqs} />
            </div>
          </div>

          {/* Share */}
          <div className="mt-12">
            <ShareRow post={post} />
          </div>
        </div>

        {/* Related posts */}
        <div className="mx-auto mt-20 max-w-6xl border-t border-knavy/10 pt-14 md:mt-24">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.1rem)] font-bold uppercase tracking-tight text-knavy">
              Relevant blogs
            </h2>
            <a
              href="/blog"
              className="whitespace-nowrap font-book text-[14px] font-semibold text-korange transition-colors hover:text-korangeDark"
            >
              View all →
            </a>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
