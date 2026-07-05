"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FlameMark } from "@/components/layout/flame-mark";
import { NewsletterTrigger } from "@/components/newsletter/newsletter-provider";

const navItems = [
  { label: "Today's Ship", href: "/#work" },
  { label: "Products", href: "/products" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" }
];

export function Header() {
  const pathname = usePathname();

  if (pathname === "/privacy") {
    return null;
  }

  return (
    <header className="site-header">
      <div className="wrap">
        <nav className="site-nav" aria-label="Main navigation">
          <FlameMark />
          <div className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? "active" : undefined}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="nav-right">
            <NewsletterTrigger>Get Updates</NewsletterTrigger>
          </div>
        </nav>
      </div>
    </header>
  );
}
