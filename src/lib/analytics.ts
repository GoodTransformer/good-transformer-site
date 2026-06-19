// Shared client-side analytics dispatch.
//
// The delegated click tracker (components/analytics-events.tsx) and any
// programmatic events (form successes, scheduling redirects) all go through
// this helper so they produce a consistent GA4 payload shape and aggregate
// cleanly in reporting.

declare global {
  interface Window {
    gtag?: (
      command: "event" | "consent" | "config" | "set",
      action: string,
      params?: Record<string, string>,
    ) => void;
  }
}

export type AnalyticsProps = {
  label?: string;
  section?: string;
  asset?: string;
  href?: string;
  mode?: string;
};

export function trackEvent(eventName: string, props: AnalyticsProps = {}) {
  if (typeof window === "undefined" || !eventName) return;

  // GA4: send native snake_case params, omitting empties so the GA4 UI doesn't
  // register noisy "(not set)" values. Each of these must be registered once as
  // an event-scoped custom dimension in GA4 Admin to appear in reports — see
  // docs/analytics-ga4-setup.md.
  const gaParams: Record<string, string> = { section: props.section || "engagement" };
  if (props.label) gaParams.label = props.label;
  if (props.href) gaParams.link_url = props.href;
  if (props.asset) gaParams.asset = props.asset;
  if (props.mode) gaParams.mode = props.mode;

  window.gtag?.("event", eventName, gaParams);
}
