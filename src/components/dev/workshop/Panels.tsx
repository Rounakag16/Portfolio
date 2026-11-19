"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { site } from "@/content/site";
import { about, achievements, certifications, education, experience, projects, skills, type Project } from "@/content/dev";
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

/** Laptop: featured projects as an editor with one file tab per project. */
export function ProjectsPanel() {
  const featured = projects.filter((p) => p.featured);
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  const p = featured[active];

  function onKey(e: KeyboardEvent) {
    const last = featured.length - 1;
    const next = e.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : e.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="overflow-hidden rounded-xl bg-charcoal text-cream ring-1 ring-charcoal">
      <div role="tablist" aria-label="Featured projects" className="flex overflow-x-auto bg-[#0f0d0c] font-mono text-sm" onKeyDown={onKey}>
        {featured.map((f, i) => (
          <button
            key={f.slug}
            ref={(el) => { tabs.current[i] = el; }}
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${base}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`shrink-0 border-r border-white/10 px-4 py-2.5 transition-colors ${
              i === active ? "border-t-2 border-t-orange bg-charcoal text-cream" : "border-t-2 border-t-transparent text-cream/60 hover:text-cream"
            }`}
          >
            {f.slug}.md
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-tab-${active}`} tabIndex={0} className="grid gap-6 p-6 md:grid-cols-[1.15fr_1fr]">
        <div>
          <h3 className="text-2xl font-bold"><span aria-hidden className="mr-2 font-mono text-orange">#</span>{p.name}</h3>
          <p className="mt-3 text-lg text-cream/90">{p.summary}</p>
          {p.problem && (
            <>
              <h4 className="mt-5 font-mono text-sm text-teal">## the problem</h4>
              <p className="mt-1 text-cream/75">{p.problem}</p>
            </>
          )}
          <h4 className="mt-5 font-mono text-sm text-teal">## stack</h4>
          <ul className="mt-2 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="rounded bg-white/10 px-2 py-0.5 font-mono text-sm text-orange-200">{s}</li>
            ))}
          </ul>
          <div className="mt-5"><ProjectLinks project={p} dark /></div>
        </div>
        {p.image ? (
          <div className="relative aspect-[16/10] self-start overflow-hidden rounded-lg bg-cream-deep ring-1 ring-white/15">
            <Image src={p.image} alt={`${p.name} screenshot`} fill sizes="380px" className="object-cover object-top" />
          </div>
        ) : (
          <div className="grid aspect-[16/10] self-start place-items-center rounded-lg border border-dashed border-white/20 p-6 text-center font-mono text-sm text-cream/60">
            {/* DeedTracker is a private client build, so there is no public screenshot. */}
            private client build
          </div>
        )}
      </div>
      <p className="border-t border-white/10 px-6 py-3 text-sm text-cream/60">
        More projects are in the <a href="#projects" data-close className="text-teal underline underline-offset-4 hover:text-cream">full project list</a>.
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

/** Framed certificates: education, certifications, patents and competitive programming. */
export function EducationPanel() {
  return (
    <div className="space-y-8">
      <ul className="grid gap-4 sm:grid-cols-3">
        {education.map((e) => (
          <li key={e.school} className="rounded-lg border-[6px] border-charcoal bg-white p-4">
            <h3 className="font-semibold leading-snug">{e.school}</h3>
            <p className="mt-1 text-sm text-charcoal-soft">{e.period}</p>
            <p className="mt-1 text-sm">{e.detail}</p>
          </li>
        ))}
      </ul>
      <div>
        <h3 className="font-heading text-lg font-semibold">Certifications and patents</h3>
        <ul className="mt-3 space-y-2">
          {certifications.map((c) => (
            <li key={c.title}><a href={c.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{c.title}</a></li>
          ))}
          <li><Link href="/dev/patents" className={linkClass}>Patent applications (co-inventor)</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="font-heading text-lg font-semibold">Competitive programming</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {achievements.map((a) => (
            <li key={a.title} className="rounded-lg bg-cream p-3 ring-1 ring-charcoal/10">
              <p className="font-semibold">{a.title}</p>
              <p className="text-sm text-charcoal-soft">{a.detail}</p>
            </li>
          ))}
        </ul>
      </div>
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
