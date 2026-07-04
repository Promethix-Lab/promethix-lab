export type ProductCategory = "apps" | "sites" | "oss";

export type ProductGlow = "teal" | "indigo" | "amber" | "coral";

export type ProductIcon = "code" | "bolt" | "wave" | "invoice" | "star" | "timer" | "package" | "card";

export type CatalogueProduct = {
  slug: string;
  title: string;
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
  github?: string;
  featured: boolean;
  revenue: string;
  chartMax: string;
  chartMid: string;
  chart: number[];
  description: string;
  meta: string;
  linkLabel: string;
};

export type ProductContent = CatalogueProduct & {
  body: string;
};

export const categoryLabels: Record<ProductCategory | "all", string> = {
  all: "All Ships",
  apps: "Web Apps",
  sites: "Websites",
  oss: "Open Source"
};
