"use client";

import type { MouseEvent } from "react";
import { useMemo, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { categoryLabels, type CatalogueProduct, type ProductCategory } from "@/lib/product-types";

const tabs: Array<ProductCategory | "all"> = ["all", "apps", "sites", "oss"];

type ProductCatalogueProps = {
  products: CatalogueProduct[];
};

function ProductCard({ product }: { product: CatalogueProduct }) {
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    rectRef.current = event.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (!rectRef.current) {
      rectRef.current = event.currentTarget.getBoundingClientRect();
    }
    const rect = rectRef.current;
    event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.article
      layout
      className="card"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`glow-${product.glow}`} />
      <div className="card-top">
        <span className="card-kicker">{product.kicker}</span>
        <h3 className="card-title">
          <Link href={`/products/${product.slug}`}>{product.title}</Link>
        </h3>
        <p className="card-desc">{product.description}</p>
      </div>
      <div className="card-bottom">
        <div className="card-meta">
          <span>{product.meta}</span>
          <a href={product.website} className="card-link" target="_blank" rel="noreferrer">
            {product.linkLabel}
            <ArrowRightIcon aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductCatalogue({ products }: ProductCatalogueProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const visibleProducts = useMemo(() => {
    if (activeCategory === "all") {
      return products;
    }

    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <>
      <div className="filter-tabs" role="tablist" aria-label="Filter shipped products">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeCategory === tab ? "filter-btn active" : "filter-btn"}
            type="button"
            role="tab"
            aria-selected={activeCategory === tab}
            onClick={() => setActiveCategory(tab)}
          >
            {categoryLabels[tab]}
          </button>
        ))}
      </div>

      <motion.div className="grid-container" layout>
        <AnimatePresence mode="popLayout">
          {visibleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
