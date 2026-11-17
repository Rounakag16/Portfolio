import Link from "next/link";

/** Wordmark set inside a sent-message bubble, the site's chat motif. */
export function Logo({ href = "/", tone = "dark" }: { href?: string; tone?: "dark" | "light" }) {
  const bubble = tone === "dark" ? "bg-charcoal text-cream" : "bg-cream text-charcoal";
  return (
    <Link href={href} className="group inline-flex items-center" aria-label="Rounak, home">
      <span className={`relative rounded-2xl rounded-br-sm px-3 py-1 font-heading text-lg font-bold tracking-tight ${bubble}`}>
        rounak<span className="text-orange">.</span>
      </span>
    </Link>
  );
}
