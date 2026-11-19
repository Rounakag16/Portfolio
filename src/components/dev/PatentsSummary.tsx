import { patents } from "@/content/dev";

/** The headline for every patents view: how many filings, and the fields they cover. */
export function PatentsSummary() {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-charcoal p-6 text-cream sm:flex-row sm:items-center">
      <p className="flex shrink-0 items-baseline gap-2">
        <span className="font-heading text-5xl font-bold text-orange">{patents.filed}</span>
        <span className="font-heading text-lg leading-tight font-semibold">filed<br />applications</span>
      </p>
      <div className="sm:border-l sm:border-white/15 sm:pl-6">
        <p className="text-cream/85">{patents.intro}</p>
        <ul aria-label="Fields" className="mt-3 flex flex-wrap gap-2">
          {patents.areas.map((a) => (
            <li key={a} className="rounded-full bg-teal/20 px-3 py-0.5 text-sm font-medium text-teal">{a}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
