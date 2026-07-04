import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Button } from "@/components/ui/button";
import { getAllProducts, getProductBySlug } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllProducts().map((product) => ({
    slug: product.slug
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product"
    };
  }

  return {
    title: product.title,
    description: product.description
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="product-detail band-dark">
      <div className="wrap">
        <div className="product-detail-shell">
          <div className={`glow-${product.glow}`} />
          <span className="card-kicker">{product.kicker}</span>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <dl className="product-facts">
            <div>
              <dt>Status</dt>
              <dd>Live</dd>
            </div>
            <div>
              <dt>Ship</dt>
              <dd>{product.meta}</dd>
            </div>
            <div>
              <dt>Workflow</dt>
              <dd>Static catalogue entry</dd>
            </div>
          </dl>
          <div className="product-actions">
            <Button asChild>
              <a href={product.website} target="_blank" rel="noreferrer">
                {product.linkLabel}
              </a>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/products">Back to catalogue</Link>
            </Button>
          </div>
        </div>
        <article className="product-mdx">
          <MDXRemote source={product.body} />
        </article>
      </div>
    </section>
  );
}
