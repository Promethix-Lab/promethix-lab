import type { MetadataRoute } from "next";

import { getAllProducts } from "@/lib/products";

const baseUrl = "https://promethixlab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-07-03"),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date("2026-07-03"),
      changeFrequency: "daily",
      priority: 0.8
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-07-04"),
      changeFrequency: "monthly",
      priority: 0.7
    },
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date("2026-07-03"),
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  ];
}
