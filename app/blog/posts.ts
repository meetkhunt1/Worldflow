import { toSummary, type BlogPost, type BlogSummary } from "@/lib/blog-types";
import { post as upvcVsCpvc } from "./upvc-vs-cpvc-pipes-which-one-does-your-project-need/post";
import { post as columnPipe } from "./how-to-choose-the-right-column-pipe-for-your-borewell/post";
import { post as giReplacement } from "./7-signs-its-time-to-replace-your-gi-pipelines/post";
import { post as swrDrainage } from "./swr-drainage-done-right-planning-a-quiet-leak-free-system/post";
import { post as upvcPrice } from "./upvc-pipes-and-fittings-price-in-india/post";
import { post as bestUpvcPipe } from "./best-upvc-pipe-manufacturer/post";
import { post as bestCpvcPipeFitting } from "./best-cpvc-pipes-and-fittings-brand-in-india/post";
import { post as topUpvcPipes } from "./top-upvc-pipes-and-fittings-manufacturer-in-india/post";
import { post as top10cpvc } from "./top-10-cpvc-pipes-and-fittings-manufacturers-in-india/post";
import { post as worldflowSolvent } from "./worldflow-solvent-cement-worldflow-solvent-tested-trusted-unmatched/post";
import { post as topBrassFittings } from "./top-brass-fittings-manufacturers-in-india-quality-solutions-by-world-flow-and-pipes/post";
import { post as buildingSustainable } from "./building-a-sustainable-future-with-worldflow-pvc-pipes-fittings/post";
import { post as top10swr } from "./top-10-swr-pipes-fitting-manufacturers-company-in-india/post";

/* ------------------------------------------------------------------ *
 * Blog registry — the ONLY place that lists every post.
 * It holds no article content; each post lives in its own folder
 * (app/blog/<slug>/post.ts + page.tsx).
 *
 * ADDING A NEW BLOG
 *   1. Copy an existing post folder to app/blog/<new-slug>/
 *   2. Edit its post.ts (slug, title, date, sections, faqs ...)
 *   3. Import it below and add it to POSTS.
 * Order doesn't matter — the list is sorted newest-first.
 * ------------------------------------------------------------------ */

const POSTS: BlogPost[] = [upvcVsCpvc, columnPipe, giReplacement, swrDrainage, upvcPrice, bestUpvcPipe, bestCpvcPipeFitting, topUpvcPipes, top10cpvc, worldflowSolvent, topBrassFittings, buildingSustainable, top10swr];

/** All posts, newest first. */
export const getAllPosts = (): BlogPost[] =>
  [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

/** Card data for the /blog grid. */
export const getAllSummaries = (): BlogSummary[] =>
  getAllPosts().map(toSummary);

/** Other posts to show under an article (newest first). */
export const getRelatedPosts = (slug: string, limit = 3): BlogSummary[] =>
  getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, limit)
    .map(toSummary);
