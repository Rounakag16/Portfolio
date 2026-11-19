import Link from "next/link";
import { Logo } from "@/components/Logo";
import { whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
];

export function ClientNav() {
  const wa = whatsappLink();
  return (
    <header className="sticky top-0 z-30 border-b border-charcoal/10 bg-cream/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Logo />
        <ul className="hidden items-center gap-6 text-[0.95rem] font-medium md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-orange-deep">{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/dev" className="text-sm text-charcoal-soft underline-offset-4 hover:underline">
            For recruiters
          </Link>
          <a
            href={wa ?? "/#contact"}
            data-track="contact_click"
            data-track-label={wa ? "nav-whatsapp" : "nav-contact"}
            {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="press inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-2 text-sm font-semibold text-cream hover:bg-charcoal-soft"
          >
            {wa && <WhatsAppIcon className="size-4" />}
            <span>{wa ? "Chat" : "Contact"}</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
