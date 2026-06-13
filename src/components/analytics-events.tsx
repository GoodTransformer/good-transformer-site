"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
    gtag?: (command: "event", eventName: string, params?: Record<string, string>) => void;
  }
}

export function AnalyticsEvents() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-analytics-event]")
        : null;

      if (!target) return;

      const eventName = target.dataset.analyticsEvent;
      if (!eventName) return;

      const props = {
        label: target.dataset.analyticsLabel ?? target.textContent?.trim() ?? "",
        section: target.dataset.analyticsSection ?? "",
        asset: target.dataset.analyticsAsset ?? "",
        href: target instanceof HTMLAnchorElement ? target.href : "",
      };

      window.plausible?.(eventName, { props });
      window.gtag?.("event", eventName, {
        event_category: props.section || "engagement",
        event_label: props.label,
        link_url: props.href,
        asset: props.asset,
      });
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
