"use client";

import { motion } from "framer-motion";
import { ProductCardInteractive } from "@/components/products/product-card-interactive";
import { ShippingSoonCard } from "@/components/shipping-soon-card";
import type { CatalogueProduct } from "@/lib/product-types";

type FeaturedWorkProps = {
  products: CatalogueProduct[];
};

export function FeaturedWork({ products }: FeaturedWorkProps) {
  return (
    <section id="work" className="band-dark">
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">From the catalogue</span>
          <h2>A few things we launched recently</h2>
          <p>Every release starts as an idea and ships as a real product. Here’s what we’ve launched recently.</p>
        </motion.div>

        <div className="grid-container" style={{ marginTop: 48 }}>
          {products.map((product, idx) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
            >
              <ProductCardInteractive product={product} />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: products.length * 0.1 }}
          >
            <ShippingSoonCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
