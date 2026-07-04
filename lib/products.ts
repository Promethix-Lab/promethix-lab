import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type { CatalogueProduct, ProductCategory, ProductContent, ProductGlow, ProductIcon } from "@/lib/product-types";

const productsDirectory = path.join(process.cwd(), "content/products");

type ProductFrontmatter = {
  title: string;
  slug: string;
  category: ProductCategory;
  kicker: string;
  status: string;
  date: string;
  day: number;
  buildHours: number;
  order: number;
  glow: ProductGlow;
  icon: ProductIcon;
  website: string;
  github?: string | null;
  featured: boolean;
  revenue: string;
  chartMax: string;
  chartMid: string;
  chart: number[];
  description: string;
};

function readProductFile(fileName: string): ProductContent {
  const fullPath = path.join(productsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as ProductFrontmatter;

  return {
    ...frontmatter,
    github: frontmatter.github || undefined,
    body: content,
    meta:
      frontmatter.category === "oss"
        ? `Day ${frontmatter.day} · ${frontmatter.revenue}`
        : `Day ${frontmatter.day} · ${frontmatter.buildHours}h build`,
    linkLabel: frontmatter.category === "oss" ? "GitHub" : "Live View"
  };
}

export function getAllProducts(): CatalogueProduct[] {
  const products = fs
    .readdirSync(productsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(readProductFile)
    .sort((a, b) => a.order - b.order);

  return products.map((product) => {
    const { body, ...catalogueProduct } = product;
    void body;
    return catalogueProduct;
  });
}

export function getProductBySlug(slug: string): ProductContent | undefined {
  const fileName = `${slug}.mdx`;
  const fullPath = path.join(productsDirectory, fileName);

  if (!fs.existsSync(fullPath)) {
    return undefined;
  }

  return readProductFile(fileName);
}
