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
    <div className="products-dashboard">
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
    </div>
  );
}
