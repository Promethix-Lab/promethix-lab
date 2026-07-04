import type { Metadata } from "next";

import { ProductCatalogue } from "@/components/product-catalogue";
import { ProductGraph } from "@/components/products/product-graph";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "A complete record of the web applications, storefronts, and open source utilities shipped by Promethix Lab."
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <>
      <ProductGraph products={products} />
      <section id="products" className="band-dark catalogue-section">
        <div className="wrap">
          <div id="catalogue" className="section-head" style={{ marginBottom: 40 }}>
            <span className="eyebrow">Catalogue</span>
            <h2>Every ship index</h2>
            <p>
              A complete record of the web applications, storefronts, and open source utilities shipped by Promethix Lab.
            </p>
          </div>

          <ProductCatalogue products={products} />
        </div>
      </section>
    </>
  );
}
