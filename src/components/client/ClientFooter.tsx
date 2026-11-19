import Link from "next/link";
import { Logo } from "@/components/Logo";
import { site } from "@/content/site";

export function ClientFooter() {
  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div className="space-y-3">
          <Logo tone="light" />
          <p className="max-w-xs text-sm">Websites for Instagram businesses across India.</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li>
            <a href={site.instagramBusiness.url} target="_blank" rel="noopener noreferrer" data-track="contact_click" data-track-label="instagram" className="hover:text-orange">
              Instagram @{site.instagramBusiness.handle}
            </a>
          </li>
          <li><a href={`mailto:${site.email}`} data-track="contact_click" data-track-label="email" className="hover:text-orange">{site.email}</a></li>
          <li><Link href="/apply" data-track="apply_click" data-track-label="footer" className="hover:text-orange">Free build</Link></li>
          <li><Link href="/dev" className="hover:text-orange">For recruiters</Link></li>
        </ul>
      </div>
      <p className="border-t border-cream/10 py-5 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
