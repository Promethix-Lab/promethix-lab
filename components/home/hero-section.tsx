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
          A small studio that ships real apps and websites on a daily cadence — for our own catalogue, and for founders
          who can&apos;t wait a quarter to see something live.
        </p>
        <div className="hero-actions">
          <NewsletterTrigger>Join Newsletter</NewsletterTrigger>
        </div>
      </div>
    </section>
  );
}
