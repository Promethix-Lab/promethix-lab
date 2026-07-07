import Link from "next/link";

import { Button } from "@/components/ui/button";

export function ContactCta() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="cta-coral">
          <h2>Let’s build something worth shipping.</h2>
          <p>
            The same team behind our products is available for custom projects.
          </p>
          <div className="cta-actions">
            <Button asChild variant="onCoral">
              <Link href="/contact">Start a project</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/products">Browse Our Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
