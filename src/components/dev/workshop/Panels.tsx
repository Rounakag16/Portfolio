"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { PatentsSummary } from "@/components/dev/PatentsSummary";
import { site } from "@/content/site";
import { about, achievements, certifications, education, experience, patents, projects, skills, type Project } from "@/content/dev";
import { workshop } from "@/content/workshop";

const linkClass = "font-semibold text-teal-deep underline underline-offset-4 hover:text-charcoal";

function ProjectLinks({ project, dark }: { project: Project; dark?: boolean }) {
  const cls = dark ? "font-semibold text-teal underline underline-offset-4 hover:text-cream" : linkClass;
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      {project.live && (
        <a href={project.live} target="_blank" rel="noopener noreferrer" data-track="project_click" data-track-label={`${project.slug}-live`} className={cls}>
          Live site<span className="sr-only">: {project.name}</span>
        </a>
      )}
      {project.code && (
        <a href={project.code} target="_blank" rel="noopener noreferrer" data-track="project_click" data-track-label={`${project.slug}-code`} className={cls}>
          Code<span className="sr-only">: {project.name}</span>
        </a>
      )}
    </div>
  );
}

function StackChips({ stack, max }: { stack: string[]; max?: number }) {
  const shown = max ? stack.slice(0, max) : stack;
  const rest = stack.length - shown.length;
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {shown.map((s) => (
        <li key={s} className="rounded bg-white/10 px-2 py-0.5 font-mono text-xs text-orange-200">{s}</li>
      ))}
      {rest > 0 && <li className="px-1 py-0.5 font-mono text-xs text-cream/60">+{rest} more</li>}
    </ul>
  );
}

function ProjectThumb({ project, sizes, className }: { project: Project; sizes: string; className: string }) {
  return project.image ? (
    <div className={`relative overflow-hidden bg-cream-deep ${className}`}>
      <Image src={project.image} alt={`${project.name} screenshot`} fill sizes={sizes} className="object-cover object-top" />
    </div>
  ) : (
    <div className={`grid place-items-center bg-white/5 p-4 text-center font-mono text-sm text-cream/60 ${className}`}>
      {/* DeedTracker is a private client build, so there is no public screenshot. */}
      private client build
    </div>
  );
}

/** Laptop: featured projects as compact cards; "Details" opens one project's full write-up in place. */
export function ProjectsPanel() {
  const featured = projects.filter((p) => p.featured);
  const [selected, setSelected] = useState<number | null>(null);
  const detailsButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const detailHeading = useRef<HTMLHeadingElement>(null);
  const returnTo = useRef<number | null>(null);
  const base = useId();

  // Move focus with the view: into the write-up when it opens, back to its Details button when it closes.
  useEffect(() => {
    if (selected !== null) detailHeading.current?.focus();
    else if (returnTo.current !== null) detailsButtons.current[returnTo.current]?.focus();
  }, [selected]);

  if (selected !== null) {
    const p = featured[selected];
    return (
      <div className="overflow-hidden rounded-xl bg-charcoal text-cream ring-1 ring-charcoal">
        <div className="flex items-center justify-between gap-4 bg-[#0f0d0c] px-4 py-2 font-mono text-sm">
          <span className="text-cream/70">{p.slug}.md</span>
          <button
            type="button"
            onClick={() => { returnTo.current = selected; setSelected(null); }}
            className="press rounded-md px-2 py-1 text-teal hover:bg-white/10 hover:text-cream"
          >
            Back to all projects
          </button>
        </div>
        <div className="grid gap-6 p-6 md:grid-cols-[1.25fr_1fr]">
          <div>
            <h3 ref={detailHeading} tabIndex={-1} className="text-2xl font-bold focus:outline-none">
              <span aria-hidden className="mr-2 font-mono text-orange">#</span>{p.name}
            </h3>
            <p className="mt-3 text-lg text-cream/90">{p.summary}</p>
            {p.problem && (
              <>
                <h4 className="mt-5 font-mono text-sm text-teal">## the problem</h4>
                <p className="mt-1 text-cream/75">{p.problem}</p>
              </>
            )}
            {p.highlights && (
              <>
                <h4 className="mt-5 font-mono text-sm text-teal">## what I built</h4>
                <ul className="mt-2 space-y-2 text-cream/80">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="space-y-5 self-start">
            <ProjectThumb project={p} sizes="360px" className="aspect-[16/10] rounded-lg ring-1 ring-white/15" />
            <div>
              <h4 className="font-mono text-sm text-teal">## stack</h4>
              <StackChips stack={p.stack} />
            </div>
            <ProjectLinks project={p} dark />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-charcoal-soft">{workshop.projectsIntro}</p>
      <ul className="mt-5 grid gap-5 sm:grid-cols-2">
        {featured.map((p, i) => (
          <li key={p.slug} className="flex flex-col overflow-hidden rounded-xl bg-charcoal text-cream ring-1 ring-charcoal">
            <p aria-hidden className="bg-[#0f0d0c] px-4 py-1.5 font-mono text-xs text-cream/60">{p.slug}.md</p>
            <ProjectThumb project={p} sizes="420px" className="h-32" />
            <div className="flex flex-1 flex-col p-4">
              <h3 id={`${base}-${p.slug}`} className="text-lg font-bold">{p.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-cream/80">{p.summary}</p>
              <StackChips stack={p.stack} max={4} />
              <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                <ProjectLinks project={p} dark />
                <button
                  type="button"
                  ref={(el) => { detailsButtons.current[i] = el; }}
                  onClick={() => setSelected(i)}
                  aria-describedby={`${base}-${p.slug}`}
                  className="press shrink-0 rounded-full bg-orange px-3.5 py-1.5 font-heading text-sm font-semibold text-charcoal hover:bg-orange-200"
                >
                  Details
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-charcoal-soft">
        More projects are in the <a href="#projects" data-close className={linkClass}>full project list</a>.
      </p>
    </div>
  );
}

/** Sketchbook: the design decisions behind each featured build. */
export function SketchbookPanel() {
  const featured = projects.filter((p) => p.featured && p.highlights?.length);
  return (
    <div className="rounded-xl bg-white p-6 ring-1 ring-charcoal/10 [background-image:linear-gradient(#0f766e14_1px,transparent_1px),linear-gradient(90deg,#0f766e14_1px,transparent_1px)] [background-size:22px_22px]">
      <p className="text-charcoal-soft">{workshop.sketchbookIntro}</p>
      <div className="mt-5 space-y-6">
        {featured.map((p) => (
          <section key={p.slug} aria-labelledby={`sk-${p.slug}`}>
            <h3 id={`sk-${p.slug}`} className="inline-block -rotate-1 bg-orange-200 px-2 text-lg font-bold">{p.name}</h3>
            <ul className="mt-3 space-y-2">
              {p.highlights!.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rotate-45 bg-teal" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

/** Toolbox: skills, one tray per group. */
export function SkillsPanel() {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {skills.map((s) => (
        <div key={s.group} className="rounded-xl bg-orange-deep/10 p-4 ring-1 ring-orange-deep/20">
          <dt className="font-heading font-semibold">{s.group}</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {s.items.map((i) => (
              <span key={i} className="rounded-md bg-white px-2.5 py-1 text-sm shadow-[0_2px_0_var(--color-charcoal)] ring-1 ring-charcoal">{i}</span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Graduation cap: education as a short timeline, most recent first. */
export function EducationPanel() {
  return (
    <ol className="relative space-y-5 before:absolute before:top-4 before:bottom-4 before:left-[11px] before:w-0.5 before:bg-charcoal/15">
      {education.map((e, i) => (
        <li key={e.school} className="relative pl-10">
          <span aria-hidden className={`absolute top-5 left-0 h-6 w-6 rounded-full ring-2 ring-charcoal ${i === 0 ? "bg-orange" : "bg-cream-deep"}`} />
          <div className={`rounded-2xl p-5 ring-2 ${i === 0 ? "bg-white shadow-[4px_5px_0_var(--color-charcoal)] ring-charcoal" : "bg-white/60 ring-charcoal/10"}`}>
            <p className="font-mono text-sm text-teal-deep">{e.period}</p>
            <h3 className="mt-1 text-lg font-semibold leading-snug">{e.school}</h3>
            <p className="mt-1 text-charcoal-soft">{e.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Framed certificates: certifications, then competitive programming. */
export function CertificationsPanel() {
  return (
    <div className="space-y-8">
      <ul className="grid gap-4 sm:grid-cols-3">
        {certifications.map((c) => (
          <li key={c.title} className="flex flex-col rounded-xl border-[5px] border-charcoal bg-white p-4">
            <p className="text-xs font-semibold tracking-wide text-teal-deep uppercase">{c.issuer}{c.year && ` · ${c.year}`}</p>
            <h3 className="mt-1.5 font-semibold leading-snug">{c.title}</h3>
            <a href={c.href} target="_blank" rel="noopener noreferrer" className={`mt-auto pt-3 text-sm ${linkClass}`}>
              View credential<span className="sr-only">: {c.title}</span>
            </a>
          </li>
        ))}
      </ul>
      <div>
        <h3 className="font-heading text-lg font-semibold">Competitive programming</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {achievements.map((a) => (
            <li key={a.title} className="rounded-lg bg-white p-3 ring-1 ring-charcoal/10">
              <p className="font-semibold">{a.title}</p>
              <p className="text-sm text-charcoal-soft">{a.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Patent folder: the filings, led by the count and the fields they cover. */
export function PatentsPanel() {
  return (
    <div className="space-y-6">
      <PatentsSummary />
      <ul className="space-y-4">
        {patents.items.map((p) => (
          <li key={p.number} className="rounded-2xl bg-white p-5 ring-2 ring-charcoal/10">
            <p className="font-mono text-sm text-teal-deep">{p.number}</p>
            <h3 className="mt-1 text-lg font-semibold leading-snug">{p.title}</h3>
            <p className="mt-2 text-charcoal-soft">{p.detail}</p>
          </li>
        ))}
      </ul>
      <p className="text-sm text-charcoal-soft">
        <Link href="/dev/patents" className={linkClass}>Patent details</Link>
      </p>
    </div>
  );
}

/** Phone: contact. The form itself stays in the page's Contact section. */
export function ContactPanel() {
  const items = [
    { label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
    { label: "LinkedIn", value: "agarwalrounak16", href: site.linkedin, external: true },
    { label: "GitHub", value: "Rounakag16", href: site.github, external: true },
  ];
  return (
    <div className="space-y-5">
      <p>Email is the quickest way to reach me.</p>
      <ul className="space-y-3">
        {items.map((i) => (
          <li key={i.label}>
            <a
              href={i.href}
              data-track="contact_click"
              data-track-label={i.label.toLowerCase()}
              {...(i.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-center justify-between gap-4 rounded-2xl rounded-bl-sm bg-white px-4 py-3 ring-1 ring-charcoal/15 hover:ring-charcoal"
            >
              <span className="font-heading font-semibold">{i.label}</span>
              <span className="truncate text-charcoal-soft">{i.value}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="text-sm text-charcoal-soft">
        Or <a href="#contact" data-close className={linkClass}>send a message with the form</a>.
      </p>
    </div>
  );
}

/** Coffee mug: about, availability and experience. */
export function AboutPanel() {
  return (
    <div className="space-y-6">
      <p className="inline-flex items-center gap-2 rounded-full bg-teal/15 px-3 py-1 font-medium text-teal-deep">
        <span aria-hidden className="h-2 w-2 rounded-full bg-teal" />
        {workshop.availability}
      </p>
      <div className="space-y-4 text-charcoal-soft">
        {about.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
      </div>
      <div>
        <h3 className="font-heading text-lg font-semibold">Experience</h3>
        <ol className="mt-3 space-y-4">
          {experience.map((e) => (
            <li key={e.org} className="border-l-4 border-teal pl-4">
              <p className="font-semibold">{e.role}, {e.org}</p>
              <p className="text-sm text-charcoal-soft">{e.period}</p>
            </li>
          ))}
        </ol>
        <a href="#experience" data-close className={`mt-3 inline-block text-sm ${linkClass}`}>Full experience details</a>
      </div>
    </div>
  );
}
