"use client";

import { useEffect, useState, useSyncExternalStore, type ComponentType } from "react";
import { workshop } from "@/content/workshop";

/*
 * "The Workshop": an illustrated desk on large screens.
 * It is an enhancement only. The stacked sections below it stay the full experience for phones
 * and screen readers. The desk's code is fetched only once the viewport is at least 1024px wide,
 * so mobile visitors never download it.
 */

const QUERY = "(min-width: 1024px)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function Workshop() {
  const isLarge = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );

  // A plain import() rather than next/dynamic: next/dynamic adds the chunk to the server HTML
  // as a preload, which would make phones download the desk too.
  const [Desk, setDesk] = useState<ComponentType | null>(null);
  useEffect(() => {
    if (!isLarge || Desk) return;
    let cancelled = false;
    import("./WorkshopDesk").then((m) => {
      if (!cancelled) setDesk(() => m.default);
    });
    return () => { cancelled = true; };
  }, [isLarge, Desk]);

  return (
    <section aria-labelledby="workshop-title" className="hidden border-t border-charcoal/10 lg:block">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="mb-6 flex items-end justify-between gap-6">
          <h2 id="workshop-title" className="text-3xl font-bold">{workshop.title}</h2>
          <p className="max-w-[46ch] text-right text-charcoal-soft">{workshop.intro}</p>
        </div>
        {isLarge && Desk ? <Desk /> : <DeskPlaceholder />}
      </div>
    </section>
  );
}

/** Same footprint as the desk, so nothing jumps when it loads. */
function DeskPlaceholder() {
  return <div aria-hidden className="aspect-[16/9] w-full rounded-[28px] bg-cream-deep ring-[3px] ring-charcoal/15" />;
}
