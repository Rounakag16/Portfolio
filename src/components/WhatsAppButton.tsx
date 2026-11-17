import { whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Props = {
  label?: string;
  message?: string;
  className?: string;
  /** Label used while the business WhatsApp number isn't set and the button points at the contact form. */
  fallbackLabel?: string;
  /** Render nothing without a number (for buttons that already sit next to the contact form). */
  hideWithoutNumber?: boolean;
};

/**
 * Opens WhatsApp with a prefilled message. Until the business number is set in site.ts, it links to the
 * contact form instead and drops the WhatsApp icon and wording, so the button never promises a chat it can't open.
 */
export function WhatsAppButton({ label = "Chat on WhatsApp", message, className = "", fallbackLabel, hideWithoutNumber }: Props) {
  const href = whatsappLink(message);
  if (!href && hideWithoutNumber) return null;
  const text = href ? label : (fallbackLabel ?? (/whatsapp/i.test(label) ? "Send me a message" : label));
  return (
    <a
      href={href ?? "/#contact"}
      {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 font-heading font-semibold text-charcoal shadow-[0_3px_0_var(--color-charcoal)] press hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none ${className}`}
    >
      {href && <WhatsAppIcon />}
      {text}
    </a>
  );
}
