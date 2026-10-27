import { SITE_LOGO, SITE_NAME, absoluteUrl } from "@/lib/site";
import type { BlogPost } from "@/lib/blog-types";

/* ------------------------------------------------------------------ *
 * BlogJsonLd — structured data for one article (server component).
 * BlogPosting + FAQPage + BreadcrumbList, emitted as a single @graph.
 * ------------------------------------------------------------------ */

export default function BlogJsonLd({ post }: { post: BlogPost }) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const publisher = {
    "@type": "Organization",
    name: SITE_NAME,
    logo: { "@type": "ImageObject", url: absoluteUrl(SITE_LOGO) },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        headline: post.title,
        description: post.seoDescription ?? post.excerpt,
        ...(post.image && { image: [absoluteUrl(post.image)] }),
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        author: { "@type": "Organization", name: SITE_NAME },
        publisher,
        articleSection: post.category,
        keywords: post.keywords.join(", "),
        inLanguage: "en-IN",
      },
      // FAQPage only for posts that actually have FAQs.
      ...(post.faqs && post.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: post.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // "<" is escaped so article text can never close the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
