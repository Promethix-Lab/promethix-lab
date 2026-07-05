"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { sendContactEmail } from "@/app/actions/contact";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const formData = new FormData(event.currentTarget);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const company = (formData.get("company") as string) || undefined;
    const message = formData.get("message") as string;

    const result = await sendContactEmail({
      fullName,
      email,
      company,
      message,
    });

    setIsLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(result.error || "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="contact-success" role="status">
        <div className="newsletter-icon newsletter-icon-success">
          <CheckIcon aria-hidden="true" />
        </div>
        <h2>Message received.</h2>
        <p>
          Thanks for reaching out. We&apos;ll review the problem, scope the
          smallest useful version, and get back to you with a practical next
          step.
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
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Your Name"
          disabled={isLoading}
          required
        />
      </div>
      <div className="contact-field">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="brand@company.com"
          disabled={isLoading}
          required
        />
      </div>
      <div className="contact-field">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Your Company Name"
          disabled={isLoading}
        />
      </div>
      <div className="contact-field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Type your message here"
          rows={6}
          disabled={isLoading}
          required
        />
      </div>
      {errorMsg && (
        <p
          className="contact-error-msg"
          style={{ color: "#f87171", fontSize: "13px", marginBottom: "16px" }}
        >
          {errorMsg}
        </p>
      )}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
