"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import type { ReactNode } from "react";
import "lenis/dist/lenis.css";

function ScrollManager() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // 1. Smoothly scroll to hash element on initial load/hydration if hash is present
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          lenis.scrollTo(element, { duration: 1.5, offset: -80 });
        }, 400); // Allow Next.js layout & hydration to stabilize
      }
    }

    // 2. Intercept local hash link clicks and scroll smoothly with an offset for sticky header
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a") as HTMLAnchorElement | null;
      if (!link) return;

      // Only handle links that have a hash
      if (!link.hash) return;

      const url = new URL(link.href, window.location.href);
      if (url.pathname === window.location.pathname) {
        const id = url.hash.slice(1);
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element, { duration: 1.5, offset: -80 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      <ScrollManager />
      {children}
    </ReactLenis>
  );
}
