"use client";

import { useEffect, useId, useRef, useState } from "react";
import { PhoneFrame } from "@/components/phone/PhoneFrame";
import { DmScreen } from "@/components/phone/DmScreen";
import { Screen } from "@/components/phone/Screen";
import type { CaseStudy } from "@/content/work";

const START = 50;
/** One "you can drag this" nudge: 50 → 38 → 62 → 50, played once when the slider is mostly in view. */
const NUDGE = [START, 38, 62, START];
const NUDGE_MS = 900;
const EASE_IN_OUT = "cubic-bezier(0.77, 0, 0.175, 1)"; // --ease-in-out (on-screen movement)

/** Drag (or use arrow keys) to wipe from the DM inbox to the new site. */
export function BeforeAfter({ study }: { study: CaseStudy }) {
  const [pos, setPos] = useState(START);
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const siteRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const running = useRef<Animation[]>([]);

  function stopNudge() {
    touched.current = true;
    running.current.forEach((a) => a.cancel());
    running.current = [];
  }

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (touched.current || !siteRef.current || !handleRef.current) return;
        const timing = { duration: NUDGE_MS, delay: 250 };
        running.current = [
          siteRef.current.animate(NUDGE.map((p) => ({ clipPath: `inset(0 0 0 ${p}%)`, easing: EASE_IN_OUT })), timing),
          handleRef.current.animate(NUDGE.map((p) => ({ transform: `translateX(${p}%)`, easing: EASE_IN_OUT })), timing),
        ];
      },
      { threshold: 0.6 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      running.current.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <div ref={rootRef}>
      <div className="relative">
        {/* Invisible range input over the screen makes dragging work with mouse, touch and keyboard. */}
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onPointerDown={stopNudge}
          onKeyDown={stopNudge}
          onChange={(e) => {
            stopNudge();
            setPos(Number(e.target.value));
          }}
          aria-label={`Compare before and after for ${study.title}`}
          aria-valuetext={`${100 - pos}% website showing`}
          className="peer absolute inset-0 z-20 mx-auto h-full w-full max-w-[290px] cursor-ew-resize opacity-0"
        />
        <PhoneFrame className="rounded-[2.6rem] peer-focus-visible:ring-4 peer-focus-visible:ring-teal-deep peer-focus-visible:ring-offset-4" label={`Before and after: customer DMs for ${study.title}, and the website that replaced them. Use the slider to compare.`}>
          <DmScreen dms={study.dms} />
          <div ref={siteRef} className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            <Screen kind={study.screen} />
          </div>
          {/* Full-width layer moved with translateX, so the handle tracks the wipe without animating `left`. */}
          <div ref={handleRef} className="pointer-events-none absolute inset-0 z-10" style={{ transform: `translateX(${pos}%)` }}>
            <div className="absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-orange">
              <span className="absolute top-1/2 left-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-orange text-[13px] font-bold text-charcoal shadow">
                ⇆
              </span>
            </div>
          </div>
        </PhoneFrame>
      </div>
      <div className="mx-auto mt-3 flex max-w-[290px] justify-between text-xs font-medium text-charcoal-soft">
        <span>DMs before</span>
        <span>Website after</span>
      </div>
    </div>
  );
}
