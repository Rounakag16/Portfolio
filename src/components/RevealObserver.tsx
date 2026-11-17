"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const SELECTOR = "[data-reveal]:not([data-shown]), .chat-reveal:not([data-shown])";

/**
 * Arms the one-time scroll reveals styled in globals.css.
 * Anything already on screen (or scrolled past, e.g. after a #hash jump) is marked "instant"
 * before reveals are armed, so it never flashes hidden. Everything else animates once on entry.
 * Runs again on client-side navigation so new pages get their reveals too.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    const fold = window.innerHeight * 0.92;
    const pending: HTMLElement[] = [];
    for (const el of els) {
      if (el.getBoundingClientRect().top < fold) el.dataset.shown = "instant";
      else pending.push(el);
    }
    document.documentElement.dataset.revealReady = "";

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
