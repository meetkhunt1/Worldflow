import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { PRODUCT_PAGES, getProductPage } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCT_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductPage(slug);
  return {
    title: product ? `${product.title} | WorldFlow` : "Products | WorldFlow",
    description: product?.intro[0],
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductPage(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
