"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { CatalogueProduct, ProductCategory } from "@/lib/product-types";
import { categoryLabels } from "@/lib/product-types";
import { ProductCardInteractive } from "./product-card-interactive";

const tabs: Array<ProductCategory | "all"> = ["all", "apps", "sites", "oss"];

type ProductsDashboardProps = {
  products: CatalogueProduct[];
};

export function ProductsDashboard({ products }: ProductsDashboardProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");

  const visibleProducts = useMemo(() => {
    if (activeCategory === "all") {
      return products;
    }
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <motion.div
      className="products-dashboard"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
    >
      <div id="catalogue" className="section-head" style={{ marginBottom: 40 }}>
        <span className="eyebrow">Catalogue</span>
        <h2>Every ship index</h2>
        <p>
          A complete record of the web applications, storefronts, and open source utilities shipped by Promethix Lab.
        </p>
      </div>

      {/* Category Tabs Filter */}
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

      {/* Grid of Interactive Chart Cards */}
      <motion.div className="grid-container products-grid" layout>
        <AnimatePresence mode="popLayout">
          {visibleProducts.map((product) => (
            <motion.div
              key={product.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ProductCardInteractive product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
