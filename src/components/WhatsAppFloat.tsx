import { whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFloat() {
  const href = whatsappLink();
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Rounak on WhatsApp"
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg ring-4 ring-cream transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
