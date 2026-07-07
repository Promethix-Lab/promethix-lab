import type { Metadata } from "next";

import { ProductsDashboard } from "@/components/products/products-dashboard";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "A complete record of the web applications, storefronts, and open source utilities shipped by Promethix Lab."
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <section id="products" className="band-dark catalogue-section products-main-section">
      <div className="wrap">
        <ProductsDashboard products={products} />
      </div>
    </section>
  );
}
