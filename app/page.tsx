import { ContactCta } from "@/components/home/contact-cta";
import { FeaturedWork } from "@/components/home/featured-work";
import { HeroSection } from "@/components/home/hero-section";
import { ProcessSection } from "@/components/home/process-section";
import { getAllProducts } from "@/lib/products";

export default function HomePage() {
  const allProducts = getAllProducts();
  const featuredProducts = allProducts.filter((p) => p.featured);

  return (
    <>
      <HeroSection />
      <FeaturedWork products={featuredProducts} />
      <ProcessSection />
      <ContactCta />
    </>
  );
}
