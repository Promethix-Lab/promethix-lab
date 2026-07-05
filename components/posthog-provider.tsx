"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Initialize PostHog client-side only
if (typeof window !== "undefined") {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
  
  if (key) {
    posthog.init(key, {
      api_host: host,
      person_profiles: "identified_only", // Or 'always' depending on your plan
      capture_pageview: false, // Disables automatic pageview capture (we handle it below dynamically)
      capture_page_state: true
    });
  }
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track pageviews automatically when routes change in Next.js App Router
  useEffect(() => {
    if (pathname && typeof window !== "undefined") {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url
      });
    }
  }, [pathname, searchParams]);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
