"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { FlameMark } from "@/components/layout/flame-mark";
import { useNewsletter, NewsletterTrigger } from "@/components/newsletter/newsletter-provider";

const navItems = [
  { label: "Latest Launches", href: "/#work" },
  { label: "Products", href: "/products" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" }
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { open: openNewsletter } = useNewsletter();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

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
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay to dim the content */}
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in Sidebar Drawer */}
            <motion.div
              className="mobile-menu-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
            >
              <div className="drawer-header">
                <FlameMark />
                <button
                  className="drawer-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mobile-menu-nav">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`mobile-menu-link ${pathname === item.href ? "active" : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mobile-menu-footer">
                <div className="mobile-menu-cta">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setIsOpen(false);
                      openNewsletter();
                    }}
                  >
                    Get Updates
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

