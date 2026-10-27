import BlogArticle from "@/components/BlogArticle";
import BlogJsonLd from "@/components/BlogJsonLd";
import { blogMetadata } from "@/lib/blog-seo";
import { getRelatedPosts } from "../posts";
import { post } from "./post";

export const metadata = blogMetadata(post);

export default function Page() {
  return (
    <>
      <BlogJsonLd post={post} />
      <BlogArticle post={post} related={getRelatedPosts(post.slug)} />
    </>
  );
}
