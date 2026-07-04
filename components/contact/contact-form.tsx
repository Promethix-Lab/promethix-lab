"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="contact-success" role="status">
        <div className="newsletter-icon newsletter-icon-success">
          <CheckIcon aria-hidden="true" />
        </div>
        <h2>Message received.</h2>
        <p>
          Thanks for reaching out. We&apos;ll review the problem, scope the smallest useful version, and get back to you
          with a practical next step.
        </p>
        <Button type="button" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-field">
        <label htmlFor="fullName">Full name</label>
        <input id="fullName" name="fullName" type="text" placeholder="Manu Arora" required />
      </div>
      <div className="contact-field">
        <label htmlFor="email">Email Address</label>
        <input id="email" name="email" type="email" placeholder="support@aceternity.com" required />
      </div>
      <div className="contact-field">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" placeholder="Aceternity Labs LLC" />
      </div>
      <div className="contact-field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Type your message here" rows={6} required />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
