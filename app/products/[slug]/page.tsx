import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { PRODUCT_PAGES, getProductPage } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCT_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProductPage(params.slug);
  return {
    title: product ? `${product.title} | WorldFlow` : "Products | WorldFlow",
    description: product?.intro[0],
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductPage(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
