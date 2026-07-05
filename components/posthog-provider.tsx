"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, ReactNode, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Initialize PostHog client-side only
if (typeof window !== "undefined") {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host =
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

  if (key) {
    posthog.init(key, {
      api_host: host,
      person_profiles: "identified_only",
      capture_pageview: false, // Disables automatic pageview capture (we handle it below dynamically)
      capture_pageleave: true,
    });
  }
}

// 1. Separate component for pageview tracking to wrap in <Suspense>
function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && typeof window !== "undefined") {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

// 2. Wrap the pageview tracker in Suspense
export function PostHogProvider({ children }: { children: ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
