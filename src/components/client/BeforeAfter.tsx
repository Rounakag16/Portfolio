"use client";

import { useId, useState } from "react";
import { PhoneFrame } from "@/components/phone/PhoneFrame";
import { DmScreen } from "@/components/phone/DmScreen";
import { Screen } from "@/components/phone/Screen";
import type { CaseStudy } from "@/content/work";

/** Drag (or use arrow keys) to wipe from the DM inbox to the new site. */
export function BeforeAfter({ study }: { study: CaseStudy }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <div>
      <div className="relative">
        {/* Invisible range input over the screen makes dragging work with mouse, touch and keyboard. */}
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare before and after for ${study.title}`}
          aria-valuetext={`${100 - pos}% website showing`}
          className="peer absolute inset-0 z-20 mx-auto h-full w-full max-w-[290px] cursor-ew-resize opacity-0"
        />
        <PhoneFrame className="rounded-[2.6rem] peer-focus-visible:ring-4 peer-focus-visible:ring-teal-deep peer-focus-visible:ring-offset-4" label={`Before and after: customer DMs for ${study.title}, and the website that replaced them. Use the slider to compare.`}>
          <DmScreen dms={study.dms} />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            <Screen kind={study.screen} />
          </div>
          <div className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-orange" style={{ left: `${pos}%` }}>
            <span className="absolute top-1/2 left-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-orange text-[13px] font-bold text-charcoal shadow">
              ⇆
            </span>
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
