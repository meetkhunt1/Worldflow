"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import type { BlogPost } from "@/lib/blog";

/* ------------------------------------------------------------------ *
 * BlogCard — shared card for the /blog grid and "related posts".
 * Padded cover image, category chip, title, date • read time, and a
 * share button (native share sheet, clipboard fallback).
 * ------------------------------------------------------------------ */

export default function BlogCard({ post }: { post: BlogPost }) {
  const share = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/blog/${post.slug}`;
    if (navigator.share) {
      await navigator.share({ title: post.title, url }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(url).catch(() => {});
    }
  };

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-xl bg-white p-4 shadow-[0_4px_14px_-12px_rgba(27,36,49,0.3)] transition-shadow duration-300 ease-sc hover:shadow-[0_16px_40px_-20px_rgba(27,36,49,0.35)]"
    >
      <span className="block overflow-hidden rounded-lg">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-sc group-hover:scale-[1.04]"
        />
      </span>

      <span className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <span className="flex items-center justify-between gap-4">
          <span className="rounded-md bg-korange/10 px-3 py-1.5 font-book text-[13px] font-semibold text-korange">
            {post.category}
          </span>
          <button
            onClick={share}
            aria-label={`Share "${post.title}"`}
            className="text-knavy/50 transition-colors duration-300 hover:text-korange"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="6" cy="12" r="2.5" />
              <circle cx="17.5" cy="5.5" r="2.5" />
              <circle cx="17.5" cy="18.5" r="2.5" />
              <path d="M8.2 10.8l7-4M8.2 13.2l7 4" />
            </svg>
          </button>
        </span>

        <span className="mt-3.5 block font-book text-[19px] font-bold leading-snug tracking-tight text-knavy transition-colors duration-300 group-hover:text-korange">
          {post.title}
        </span>

        <span className="mt-auto flex items-center gap-2.5 pt-4 font-book text-[14px] text-muted">
          {post.date}
          <span className="h-1 w-1 rounded-full bg-korange" aria-hidden />
          {post.readTime}
        </span>
      </span>
    </Link>
  );
}
