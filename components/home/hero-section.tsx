import { FlameIcon } from "@/components/layout/flame-mark";
import { NewsletterTrigger } from "@/components/newsletter/newsletter-provider";

export function HeroSection() {
  return (
    <section className="hero">
      <div className="planet-horizon" aria-hidden="true">
        <div className="planet-glow" />
        <div className="planet-surface" />
      </div>

      <div className="hero-content wrap">
        <div className="hero-brand">
          <div className="hero-logo">
            <FlameIcon />
          </div>
          <div className="hero-brand-name">
            PROMETHIX<span className="lab">LAB</span>
          </div>
        </div>

        <h1>
          <span className="hero-title-main">We build something new</span>
          <br />
          <em>every single day.</em>
        </h1>
        <p>
        We build, launch, and grow software products every single day. Some become businesses. Every one starts with solving a real problem.
        </p>
        <div className="hero-actions">
          <NewsletterTrigger>Join Newsletter</NewsletterTrigger>
        </div>
      </div>
    </section>
  );
}
