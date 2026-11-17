/**
 * Section headings set as chat messages: the site's motif from the brief.
 * "in" = a customer's message (white, left tail), "out" = Rounak's reply (orange, right tail).
 */
export function ChatHeading({
  id,
  children,
  side = "in",
  as: Tag = "h2",
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  side?: "in" | "out";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const shape =
    side === "in"
      ? "rounded-[1.6rem] rounded-bl-md bg-bubble ring-1 ring-charcoal/10"
      : "ml-auto rounded-[1.6rem] rounded-br-md bg-orange";
  return (
    <Tag id={id} className={`w-fit max-w-full px-5 py-3 text-[1.75rem] font-bold sm:px-7 sm:text-4xl ${shape} ${className}`}>
      {children}
    </Tag>
  );
}
