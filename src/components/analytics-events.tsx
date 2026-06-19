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

      // Prefer an explicit label. Fall back to the element's text, but collapse
      // whitespace and cap the length so icon/glyph-only or rich-content links
      // don't leak noisy multi-line strings into GA.
      const fallbackLabel = (target.textContent ?? "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 80);

      trackEvent(eventName, {
        label: target.dataset.analyticsLabel ?? fallbackLabel,
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
