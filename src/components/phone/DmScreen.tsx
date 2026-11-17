import type { CSSProperties } from "react";

type Props = {
  dms: { from: string; text: string }[];
  /** Lets the hero animate each message out on scroll. */
  itemStyle?: (index: number) => CSSProperties;
  /** Unread badge; defaults to a busy-looking count. */
  unread?: number;
};

/** An Instagram-style inbox of unanswered customer questions. */
export function DmScreen({ dms, itemStyle, unread = dms.length + 18 }: Props) {
  return (
    <div className="flex h-full flex-col bg-white pt-9 text-charcoal">
      <div className="flex items-center justify-between border-b border-stone-200 px-4 pb-2">
        <span className="font-heading text-[13px] font-semibold">Messages</span>
        {unread > 0 && <span className="rounded-full bg-[#e1306c] px-1.5 text-[10px] font-semibold text-white">{unread}</span>}
      </div>
      <ul className="flex-1 space-y-2.5 overflow-hidden px-3 py-3">
        {dms.map((dm, i) => (
          <li key={dm.from} style={itemStyle?.(i)} className="will-change-transform">
            <p className="mb-0.5 pl-2 text-[9.5px] text-stone-500">{dm.from}</p>
            <p className="inline-block rounded-2xl rounded-bl-sm bg-stone-100 px-3 py-2 text-[12px]">{dm.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
