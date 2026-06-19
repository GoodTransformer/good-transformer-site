"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "gt-analytics-consent";

type Decision = "granted" | "denied";

function persist(decision: Decision) {
  try {
    window.localStorage.setItem(STORAGE_KEY, decision);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); the banner
    // just reappears next visit, which is acceptable.
  }
}

function updateConsent(decision: Decision) {
  // Mirror the choice into Google Consent Mode v2. analytics_storage gates GA4
  // cookies; the ad_* signals keep Google's ad consent state coherent for any
  // future remarketing. The default (denied) is set in google-analytics.tsx.
  window.gtag?.("consent", "update", {
    analytics_storage: decision,
    ad_storage: decision,
    ad_user_data: decision,
    ad_personalization: decision,
  });
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    // Only prompt when no prior decision exists. A stored "granted" was already
    // applied by the inline default in google-analytics.tsx on this load.
    if (stored !== "granted" && stored !== "denied") {
      setVisible(true);
    }
  }, []);

  function decide(decision: Decision) {
    persist(decision);
    updateConsent(decision);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Analytics consent"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-[1.25rem] border border-line bg-paper/95 p-5 shadow-glow backdrop-blur md:inset-x-auto md:right-4 md:left-auto md:max-w-md"
    >
      <p className="text-sm leading-6 text-slate">
        We&rsquo;d like to use Google Analytics to understand how visitors use
        this site. It stays off until you agree. You can decline and the site
        works exactly the same.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => decide("granted")}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-[0.45rem] bg-ink px-5 text-sm font-medium text-paper transition hover:bg-ink/90"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => decide("denied")}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-[0.45rem] border border-line px-5 text-sm font-medium text-ink transition hover:bg-sand/80"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
