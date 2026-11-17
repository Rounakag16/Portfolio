/** WhatsApp-style double tick that marks a bubble as Rounak's sent reply. Decorative. */
export function ReadTicks({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden focusable="false" viewBox="0 0 18 11" className={`inline-block h-[0.8em] w-auto shrink-0 ${className}`}>
      <path d="M1 6l3.2 3.2L11 2.4M7.2 9.2L14 2.4M7 6.6l2.6 2.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
