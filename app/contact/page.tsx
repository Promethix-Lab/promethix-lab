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
              We are always looking for ways to improve our products and services. Contact us and let us know how we can help you.
            </p>
            <div className="contact-links" aria-label="Contact details">
              <a href="mailto:contact@yoursaas.ai">contact@yoursaas.ai</a>
              <span>•</span>
              <a href="tel:+1800123XX21">+1 (800) 123 XX21</a>
              <span>•</span>
              <a href="mailto:support@yoursaas.ai">support@yoursaas.ai</a>
            </div>
            <div className="contact-map" aria-hidden="true">
              <div className="contact-map-label">We are here</div>
              <div className="contact-map-beam" />
              <div className="contact-map-pulse" />
              {[
                { name: "San Francisco", x: "16%", y: "41%" },
                { name: "New York", x: "28%", y: "38%" },
                { name: "London", x: "45%", y: "32%" },
                { name: "Tokyo", x: "86%", y: "42%" },
                { name: "Sydney", x: "90%", y: "76%" },
              ].map((hub, index) => (
                <span
                  key={index}
                  className="contact-map-dot"
                  style={{ "--dot-x": hub.x, "--dot-y": hub.y } as CSSProperties}
                  title={hub.name}
                />
              ))}
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
