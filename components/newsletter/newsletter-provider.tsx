"use client";

import { createContext, type FormEvent, type ReactNode, useContext, useMemo, useState } from "react";
import { CheckIcon, MailIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NewsletterContextValue = {
  open: () => void;
};

const NewsletterContext = createContext<NewsletterContextValue | null>(null);

export function useNewsletter() {
  const context = useContext(NewsletterContext);

  if (!context) {
    throw new Error("useNewsletter must be used inside NewsletterProvider");
  }

  return context;
}

export function NewsletterProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const value = useMemo(() => ({ open: () => setIsOpen(true) }), []);

  const close = () => {
    setIsOpen(false);
    window.setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 220);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubscribed(true);
  };

  return (
    <NewsletterContext.Provider value={value}>
      {children}
      {isOpen ? (
        <div className="newsletter-overlay" role="presentation">
          <div className="newsletter-dialog" role="dialog" aria-modal="true" aria-labelledby="newsletter-title">
            <button className="newsletter-close" type="button" aria-label="Close newsletter dialog" onClick={close}>
              <XIcon aria-hidden="true" />
            </button>
            {isSubscribed ? (
              <div className="newsletter-success">
                <div className="newsletter-icon newsletter-icon-success">
                  <CheckIcon aria-hidden="true" />
                </div>
                <h2 id="newsletter-title">You&apos;re subscribed.</h2>
                <p>
                  Thanks for joining Promethix Lab. Each week, you&apos;ll receive practical notes on spotting startup
                  ideas, how we scope and ship small products, and what we&apos;re learning from the daily catalogue.
                </p>
                <Button type="button" onClick={close}>
                  Done
                </Button>
              </div>
            ) : (
              <>
                <div className="newsletter-icon">
                  <MailIcon aria-hidden="true" />
                </div>
                <span className="eyebrow">Weekly field notes</span>
                <h2 id="newsletter-title">Get the Promethix Lab build letter.</h2>
                <p>
                  One concise email each week with startup idea prompts, build notes, shipping decisions, and the best
                  lessons from the products we launch.
                </p>
                <form className="newsletter-form" onSubmit={handleSubmit}>
                  <label htmlFor="newsletter-email">Email address</label>
                  <div className="newsletter-input-row">
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                    <Button type="submit">Subscribe</Button>
                  </div>
                </form>
                <p className="newsletter-note">No noise. No daily spam. Just the weekly operating notes worth keeping.</p>
              </>
            )}
          </div>
        </div>
      ) : null}
    </NewsletterContext.Provider>
  );
}

type NewsletterTriggerProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "onDark" | "onCoral" | "ghost";
  className?: string;
};

export function NewsletterTrigger({ children, variant = "primary", className }: NewsletterTriggerProps) {
  const { open } = useNewsletter();

  return (
    <Button type="button" variant={variant} className={cn(className)} onClick={open}>
      {children}
    </Button>
  );
}
