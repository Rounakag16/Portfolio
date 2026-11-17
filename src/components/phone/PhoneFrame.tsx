/** A plain phone outline. Content inside is decorative, so the frame carries the description. */
export function PhoneFrame({ children, label, className = "" }: { children: React.ReactNode; label: string; className?: string }) {
  return (
    <div role="img" aria-label={label} className={`relative mx-auto w-full max-w-[290px] ${className}`}>
      <div className="relative aspect-[9/18.5] overflow-hidden rounded-[2.4rem] border-[9px] border-charcoal bg-white shadow-[0_24px_50px_-20px_rgba(28,25,23,0.45)]">
        <div aria-hidden className="absolute top-2 left-1/2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-charcoal" />
        <div aria-hidden className="absolute inset-0 text-[11px] leading-snug">{children}</div>
      </div>
    </div>
  );
}
