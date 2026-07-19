"use client";

import Reveal from "@/components/Reveal";
import SplitReveal from "@/components/SplitReveal";
import BlogCard from "@/components/BlogCard";
import { BLOG_POSTS } from "@/lib/blog";

/* ------------------------------------------------------------------ *
 * BlogBoard — /blog listing: header + card grid.
 * ------------------------------------------------------------------ */

export default function BlogBoard() {
  return (
    <section className="bg-soft pb-24 pt-32 md:pb-32 md:pt-44">
      <div className="shell">
        <div className="max-w-3xl">
          <Reveal>
            <span className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-korange">
              <span className="h-2.5 w-2.5 rounded-full bg-korange" aria-hidden />
              Blog
            </span>
          </Reveal>
          <SplitReveal className="mt-4 font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-bold uppercase leading-[1.08] tracking-tight text-knavy">
            Insights from the flow experts
          </SplitReveal>
          <Reveal delay={0.15}>
            <p className="mt-5 font-book text-[15px] leading-relaxed text-muted md:text-[16px]">
              Practical guides on plumbing, drainage, and borewell systems —
              written by the people who manufacture the pipes.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08} className="h-full">
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
