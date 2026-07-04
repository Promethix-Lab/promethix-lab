"use server";

import { getLiveStars, getLiveStripeRevenue } from "@/lib/metrics";

export async function getLiveProductMetrics(
  productTitle: string,
  fallbackRevenue: string,
  githubUrl?: string | null
) {
  const stripeData = await getLiveStripeRevenue(productTitle, fallbackRevenue);
  const stars = await getLiveStars(githubUrl);
  return {
    revenue: stripeData.revenue,
    chart: stripeData.chart,
    stars: stars
  };
}
