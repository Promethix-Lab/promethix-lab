import Link from "next/link";

import { Button } from "@/components/ui/button";

export function ContactCta() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="cta-coral">
          <h2>Got an idea? We could have it live by tomorrow.</h2>
          <p>
            Send us the problem, not the spec. We&apos;ll scope the smallest version worth shipping and get it in front
            of you fast.
          </p>
          <div className="cta-actions">
            <Button asChild variant="onCoral">
              <Link href="/contact">Start a project</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/products">View the full log</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
