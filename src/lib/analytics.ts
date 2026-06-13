// Shared client-side analytics dispatch.
//
// The delegated click tracker (components/analytics-events.tsx) and any
// programmatic events (form successes, scheduling redirects) all go through
// this helper so they produce an identical Plausible + GA4 payload shape and
// aggregate cleanly in reporting.

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
    gtag?: (command: "event", eventName: string, params?: Record<string, string>) => void;
  }
}

export type AnalyticsProps = {
  label?: string;
  section?: string;
  asset?: string;
  href?: string;
};

export function trackEvent(eventName: string, props: AnalyticsProps = {}) {
  if (typeof window === "undefined" || !eventName) return;

  const payload = {
    label: props.label ?? "",
    section: props.section ?? "",
    asset: props.asset ?? "",
    href: props.href ?? "",
  };

  window.plausible?.(eventName, { props: payload });
  window.gtag?.("event", eventName, {
    event_category: payload.section || "engagement",
    event_label: payload.label,
    link_url: payload.href,
    asset: payload.asset,
  });
}
