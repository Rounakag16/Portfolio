import { Logo } from "@/components/Logo";
import { site } from "@/content/site";

const links = [
  { href: "/dev#projects", label: "Projects" },
  { href: "/dev#experience", label: "Experience" },
  { href: "/dev#skills", label: "Skills" },
  { href: "/dev#patents", label: "Patents" },
  { href: "/dev#contact", label: "Contact" },
];

export function DevNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-charcoal/10 bg-cream/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-5xl items-center gap-6 px-4 sm:px-6">
        <Logo href="/dev" />
        <ul className="hidden items-center gap-6 text-[0.95rem] font-medium md:flex">
          {links.map((l) => (
            <li key={l.href}><a href={l.href} className="hover:text-teal-deep">{l.label}</a></li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-3">
          <a href={site.github} target="_blank" rel="noopener noreferrer" data-track="contact_click" data-track-label="github" className="hidden text-sm font-medium hover:text-teal-deep sm:inline">
            GitHub
          </a>
          <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" data-track="resume_click" data-track-label="nav" className="press rounded-full bg-charcoal px-4 py-2 text-sm font-semibold text-cream hover:bg-charcoal-soft">
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
