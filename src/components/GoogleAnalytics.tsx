"use client";

import Script from "next/script";
import { useEffect } from "react";
import { site } from "@/content/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Google Analytics 4. Loaded only in production builds, and only reports when the page is served from
 * rounak.tech, so local testing and Netlify preview links don't count as visits.
 *
 * Page views (including client-side navigation) come from GA's Enhanced measurement.
 * Click events: any link or button with `data-track="<event_name>"` (and optionally
 * `data-track-label="<which one>"`) sends that event. Events in use: contact_click, resume_click,
 * apply_click, project_click.
 */
export function GoogleAnalytics() {
  const id = site.gaMeasurementId;

  useEffect(() => {
    if (!id) return;
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el || !window.gtag) return;
      window.gtag("event", el.dataset.track, {
        label: el.dataset.trackLabel,
        link_url: el instanceof HTMLAnchorElement ? el.href : undefined,
        page_path: location.pathname,
      });
    };
    // Capture phase, so the event is queued before the browser follows the link.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [id]);

  if (!id || process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
if (location.hostname === "${new URL(site.url).hostname}") {
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', '${id}');
}`}
      </Script>
    </>
  );
}
