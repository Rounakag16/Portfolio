"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Avatar } from "@/components/Avatar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PhoneFrame } from "@/components/phone/PhoneFrame";
import { DmScreen } from "@/components/phone/DmScreen";
import { CafeScreen } from "@/components/phone/CafeScreen";

const heroDms = [
  { from: "priya.eats", text: "price kya hai?" },
  { from: "rahul_k", text: "menu send karo" },
  { from: "foodie.sgr", text: "open today??" },
  { from: "ankita.m", text: "order kaise karein?" },
  { from: "dev_22", text: "delivery hai kya?" },
  { from: "neha.b", text: "location bhejo pls" },
];

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * The hero's one big moment: as you scroll, the DMs clear and the phone becomes a website.
 * With reduced motion, scrolling does nothing and a button switches between the two states.
 */
export function DmHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      setProgress(travel > 0 ? clamp(-rect.top / travel) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const bubbleStyle = (i: number): CSSProperties => {
    const t = clamp((progress - (0.04 + i * 0.05)) / 0.1);
    return { opacity: 1 - t, transform: `translateX(${-40 * t}px) scale(${1 - 0.08 * t})` };
  };
  const unread = heroDms.filter((_, i) => progress < 0.04 + i * 0.05 + 0.05).length;
  const siteIn = clamp((progress - 0.3) / 0.35);
  const done = siteIn > 0.5;

  const text = (
    <div className="max-w-xl">
      <Avatar pose="waving" width={92} className="-mb-1" priority />
      <h1 className="text-[2.6rem] leading-[1.05] font-bold sm:text-6xl">Websites for Instagram businesses</h1>
      <p className="mt-5 max-w-[46ch] text-lg text-charcoal-soft">
        Your followers ask the same things every day: the menu, the price, the timings, how to order. I build a website that answers all of it, so you can stop replying and start selling.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <WhatsAppButton />
        <a href="#work" className="py-3 font-heading font-semibold underline decoration-orange decoration-[3px] underline-offset-[6px] hover:text-orange-deep">
          See my work
        </a>
      </div>
    </div>
  );

  const phone = (
    <figure className="w-full">
      <PhoneFrame className="max-w-[min(290px,calc((100svh-10rem)*0.48))]" label="An Instagram inbox full of customer questions turns into a clean café website with menu, prices and a WhatsApp order button.">
        <DmScreen dms={heroDms} itemStyle={reduced ? undefined : bubbleStyle} unread={reduced ? undefined : unread} />
        <div
          className={`absolute inset-0 ${reduced ? "transition-transform duration-500" : ""}`}
          style={{ transform: `translateY(${(1 - (reduced ? (progress > 0.5 ? 1 : 0) : siteIn)) * 102}%)` }}
        >
          <CafeScreen />
        </div>
      </PhoneFrame>
      <figcaption className="mt-5 text-center text-sm text-charcoal-soft" aria-live="polite">
        {reduced ? (
          <button
            type="button"
            onClick={() => setProgress((p) => (p > 0.5 ? 0 : 1))}
            className="rounded-full border-2 border-charcoal px-4 py-1.5 font-semibold text-charcoal"
          >
            {progress > 0.5 ? "Show the DMs" : "Show the website"}
          </button>
        ) : done ? (
          "After: one link answers all of it"
        ) : (
          "Before: the same questions, all day"
        )}
      </figcaption>
    </figure>
  );

  return (
    <section aria-label="Introduction" className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-[1.15fr_1fr] md:gap-12">
      <div className="pt-10 md:sticky md:top-16 md:flex md:h-[calc(100svh-4rem)] md:items-center md:pt-0">{text}</div>
      <div ref={trackRef} className={reduced ? "py-10" : "h-[165svh] md:h-[220svh]"}>
        <div className={reduced ? "" : "sticky top-16 flex h-[calc(100svh-4rem)] items-center"}>{phone}</div>
      </div>
    </section>
  );
}
