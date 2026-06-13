"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

export function AnalyticsEvents() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-analytics-event]")
        : null;

      if (!target) return;

      const eventName = target.dataset.analyticsEvent;
      if (!eventName) return;

      trackEvent(eventName, {
        label: target.dataset.analyticsLabel ?? target.textContent?.trim() ?? "",
        section: target.dataset.analyticsSection ?? "",
        asset: target.dataset.analyticsAsset ?? "",
        href: target instanceof HTMLAnchorElement ? target.href : "",
      });
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
