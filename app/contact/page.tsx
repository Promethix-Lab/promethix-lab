import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { MailIcon } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Promethix Lab or ask a question about the daily shipping catalogue."
};

export default function ContactPage() {
  return (
    <section className="contact-page">
      <div className="wrap">
        <div className="contact-shell">
          <div className="contact-copy">
            <div className="contact-mail-icon">
              <MailIcon aria-hidden="true" />
            </div>
            <h1>Contact us</h1>
            <p>
              Send us the problem, launch window, and the smallest version you think would be useful. We&apos;ll help
              turn it into a focused scope that can ship quickly.
            </p>
            <div className="contact-links" aria-label="Contact details">
              <a href="mailto:hello@promethixlab.com">hello@promethixlab.com</a>
              <span>•</span>
              <a href="tel:+91800123XXXX">+91 800 123 XXXX</a>
              <span>•</span>
              <a href="mailto:support@promethixlab.com">support@promethixlab.com</a>
            </div>
            <div className="contact-map" aria-hidden="true">
              <div className="contact-map-label">We ship from here</div>
              <div className="contact-map-beam" />
              <div className="contact-map-pulse" />
              {Array.from({ length: 86 }).map((_, index) => {
                const x = (index * 37) % 100;
                const y = (index * 19 + Math.floor(index / 7) * 11) % 100;

                return <span key={index} style={{ "--dot-x": `${x}%`, "--dot-y": `${y}%` } as CSSProperties} />;
              })}
            </div>
          </div>

          <div className="contact-panel">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
