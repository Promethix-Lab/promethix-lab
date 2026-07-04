import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

function getStripe(): Stripe | null {
  if (stripeInstance) {
    return stripeInstance;
  }

  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    return null;
  }

  stripeInstance = new Stripe(apiKey);
  return stripeInstance;
}

/**
 * Fetches stargazers count from the GitHub REST API.
 * Uses Next.js data caching to revalidate every hour.
 */
export async function getLiveStars(repoUrl?: string | null): Promise<number | null> {
  if (!repoUrl) {
    return null;
  }

  try {
    // Parse owner and repo from URL (e.g. "https://github.com/promethixlab/devcard-generator")
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      return null;
    }

    const [, owner, repo] = match;
    const cleanRepo = repo.replace(/\.git$/, "");

    const res = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "promethix-lab-website"
      }
    });

    if (!res.ok) {
      return null;
    }

    const data = (await res.json()) as { stargazers_count: number };
    return data.stargazers_count;
  } catch (error) {
    console.error("Failed to fetch live GitHub stars:", error);
    return null;
  }
}

/**
 * Fetches monthly revenue from Stripe for a specific product name.
 * Falls back to static MDX revenue if the key is missing or calls fail.
 */
export async function getLiveStripeRevenue(
  productTitle: string,
  fallbackRevenue: string
): Promise<{ revenue: string; chart: number[] | null }> {
  const stripe = getStripe();
  if (!stripe) {
    return { revenue: fallbackRevenue, chart: null };
  }

  try {
    // 1. Fetch Stripe products to find the one matching our title
    const productsList = await stripe.products.list({ limit: 100 });
    const stripeProduct = productsList.data.find(
      (p) => p.name.toLowerCase() === productTitle.toLowerCase()
    );

    if (!stripeProduct) {
      return { revenue: fallbackRevenue, chart: null };
    }

    // 2. Retrieve charges or invoice items linked to this product in the last 12 months
    // For demonstration, we list payments and aggregate by product metadata/description
    const charges = await stripe.charges.list({
      limit: 100,
      expand: ["data.customer"]
    });

    // Filter charges for this product (often matching product metadata or description)
    const productCharges = charges.data.filter(
      (charge) =>
        charge.paid &&
        !charge.refunded &&
        (charge.description?.toLowerCase().includes(productTitle.toLowerCase()) ||
          (charge.metadata && charge.metadata.product_id === stripeProduct.id))
    );

    // If we have no live payments, use fallback
    if (productCharges.length === 0) {
      return { revenue: fallbackRevenue, chart: null };
    }

    // Calculate MRR (Monthly Recurring Revenue) or monthly total
    const totalCents = productCharges.reduce((sum, c) => sum + c.amount, 0);
    const totalDollars = totalCents / 100;
    const formattedRevenue = `$${(totalDollars / 1000).toFixed(1)}k/mo`;

    // 3. Build a 12-month monthly chart series from charge timestamps
    const chart = Array.from({ length: 12 }, () => 0);
    const now = new Date();

    for (const charge of productCharges) {
      const chargeDate = new Date(charge.created * 1000);
      const diffMonths =
        (now.getFullYear() - chargeDate.getFullYear()) * 12 +
        (now.getMonth() - chargeDate.getMonth());

      // If the charge is within the last 12 months, map it to the index (0 is 11 months ago, 11 is current month)
      if (diffMonths >= 0 && diffMonths < 12) {
        const index = 11 - diffMonths;
        chart[index] += charge.amount / 100 / 1000; // Value in thousands
      }
    }

    return {
      revenue: formattedRevenue,
      chart: chart.map((val) => Math.round(val * 10) / 10)
    };
  } catch (error) {
    console.error(`Failed to fetch Stripe metrics for ${productTitle}:`, error);
    return { revenue: fallbackRevenue, chart: null };
  }
}
