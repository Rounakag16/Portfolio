import { whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Props = { label?: string; message?: string; className?: string };

/** Opens WhatsApp with a prefilled message. Until the business number is set, it points at the contact form. */
export function WhatsAppButton({ label = "Chat on WhatsApp", message, className = "" }: Props) {
  const href = whatsappLink(message) ?? "/#contact";
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 font-heading font-semibold text-charcoal shadow-[0_3px_0_var(--color-charcoal)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none ${className}`}
    >
      <WhatsAppIcon />
      {label}
    </a>
  );
}
