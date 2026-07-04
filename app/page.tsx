import { ContactCta } from "@/components/home/contact-cta";
import { FeaturedWork } from "@/components/home/featured-work";
import { HeroSection } from "@/components/home/hero-section";
import { ProcessSection } from "@/components/home/process-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedWork />
      <ProcessSection />
      <ContactCta />
    </>
  );
}
