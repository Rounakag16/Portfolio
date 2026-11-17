import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { Workshop } from "@/components/dev/Workshop";
import { JsonLd, personSchema } from "@/components/JsonLd";
import { site } from "@/content/site";
import { about, achievements, certifications, education, experience, projects, skills, type Project } from "@/content/dev";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Rounak Agarwal | Full-Stack Developer (MERN + AI), VIT Vellore",
  absoluteTitle: true,
  description:
    "Rounak Agarwal is a full-stack MERN developer from VIT Vellore building multi-tenant apps, graph data tools and LLM-powered features. Projects, resume, experience and contact.",
  path: "/dev",
  type: "profile",
});

/*
 * This stacked layout is the accessible version of "The Workshop".
 * The illustrated desk (<Workshop />, large screens only, lazy-loaded) sits above it as an
 * enhancement; this stays the mobile and screen-reader experience, so every section must stand on its own.
 */
export default function DevPage() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <>
      <JsonLd data={personSchema} />

      <section className="mx-auto grid max-w-5xl gap-10 px-4 pt-14 pb-16 sm:px-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-medium text-teal-deep">Open to full-time roles and internships</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{site.name}</h1>
          <p className="mt-3 text-xl text-charcoal-soft">Full-stack developer, MERN and AI. IT undergraduate at VIT Vellore.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.resumePath} download className="rounded-full bg-orange px-5 py-3 font-heading font-semibold text-charcoal shadow-[0_3px_0_var(--color-charcoal)] hover:-translate-y-0.5">
              Download resume
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-charcoal px-5 py-2.5 font-heading font-semibold hover:bg-charcoal hover:text-cream">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-charcoal px-5 py-2.5 font-heading font-semibold hover:bg-charcoal hover:text-cream">
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`} className="rounded-full border-2 border-charcoal px-5 py-2.5 font-heading font-semibold hover:bg-charcoal hover:text-cream">
              Email
            </a>
          </div>
        </div>
        <Avatar pose="laptop" width={180} className="mx-auto hidden md:block" />
      </section>

      <Workshop />

      <Section id="about" title="About">
        <div className="max-w-[68ch] space-y-4 text-charcoal-soft">
          {about.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
      </Section>

      <Section id="projects" title="Featured projects">
        <div className="space-y-8">
          {featured.map((p) => <FeaturedProject key={p.slug} project={p} />)}
        </div>
        <h3 className="mt-14 text-xl font-semibold">More projects</h3>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2">
          {more.map((p) => <SmallProject key={p.slug} project={p} />)}
        </ul>
      </Section>

      <Section id="experience" title="Experience">
        <ol className="space-y-8">
          {experience.map((e) => (
            <li key={e.org} className="border-l-4 border-teal pl-5">
              <h3 className="text-lg font-semibold">{e.role}, {e.org}</h3>
              <p className="text-sm text-charcoal-soft">{e.period}</p>
              <p className="mt-2 max-w-[68ch]">{e.detail}</p>
              {e.link && (
                <a href={e.link.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-medium text-teal-deep underline underline-offset-4">
                  {e.link.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section id="skills" title="Skills">
        <dl className="grid gap-6 sm:grid-cols-2">
          {skills.map((s) => (
            <div key={s.group}>
              <dt className="font-heading font-semibold">{s.group}</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <span key={i} className="rounded-md bg-white px-2.5 py-1 text-sm ring-1 ring-charcoal/10">{i}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="education" title="Education and certifications">
        <div className="grid gap-10 md:grid-cols-2">
          <ul className="space-y-5">
            {education.map((e) => (
              <li key={e.school}>
                <h3 className="font-semibold">{e.school}</h3>
                <p className="text-sm text-charcoal-soft">{e.period}. {e.detail}</p>
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            {certifications.map((c) => (
              <li key={c.title}>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="font-medium underline decoration-teal decoration-2 underline-offset-4 hover:text-teal-deep">
                  {c.title}
                </a>
              </li>
            ))}
            <li>
              <Link href="/dev/patents" className="font-medium underline decoration-teal decoration-2 underline-offset-4 hover:text-teal-deep">
                Patent applications (co-inventor)
              </Link>
            </li>
          </ul>
        </div>
      </Section>

      <Section id="achievements" title="Competitive programming">
        <ul className="grid gap-4 sm:grid-cols-2">
          {achievements.map((a) => (
            <li key={a.title} className="rounded-xl bg-white p-4 ring-1 ring-charcoal/10">
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-sm text-charcoal-soft">{a.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="contact" title="Contact">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-3">
            <p className="max-w-[48ch]">Email is the quickest way to reach me.</p>
            <ul className="space-y-2 font-medium">
              <li><a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-teal-deep">{site.email}</a></li>
              <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-teal-deep">LinkedIn</a></li>
              <li><a href={site.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-teal-deep">GitHub</a></li>
            </ul>
          </div>
          <form action={site.formspreeAction} method="post" className="space-y-3">
            <input type="hidden" name="_subject" value="Message from rounak.tech/dev" />
            <label className="block">
              <span className="text-sm font-medium">Name</span>
              <input name="fullname" required autoComplete="name" className="mt-1 w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2" />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Email</span>
              <input type="email" name="email" required autoComplete="email" className="mt-1 w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2" />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Message</span>
              <textarea name="message" required rows={4} className="mt-1 w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2" />
            </label>
            <button type="submit" className="rounded-full bg-charcoal px-5 py-2.5 font-heading font-semibold text-cream hover:bg-charcoal-soft">
              Send message
            </button>
          </form>
        </div>
      </Section>
    </>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 border-t border-charcoal/10">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 id={`${id}-title`} className="mb-8 text-2xl font-bold sm:text-3xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-4 text-sm font-semibold">
      {project.live && (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-teal-deep underline underline-offset-4">
          Live site<span className="sr-only">: {project.name}</span>
        </a>
      )}
      {project.code && (
        <a href={project.code} target="_blank" rel="noopener noreferrer" className="text-teal-deep underline underline-offset-4">
          Code<span className="sr-only">: {project.name}</span>
        </a>
      )}
    </div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="grid gap-6 rounded-2xl bg-white p-5 ring-1 ring-charcoal/10 sm:p-7 md:grid-cols-[1.1fr_1fr]">
      <div>
        <h3 className="text-2xl font-bold">{project.name}</h3>
        <p className="mt-2 text-lg">{project.summary}</p>
        {project.problem && <p className="mt-3 text-charcoal-soft">{project.problem}</p>}
        {project.highlights && (
          <ul className="mt-4 list-disc space-y-1.5 pl-5 marker:text-orange">
            {project.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        )}
        <p className="mt-4 text-sm text-charcoal-soft">Built with {project.stack.join(", ")}</p>
        <div className="mt-4"><ProjectLinks project={project} /></div>
      </div>
      {project.image ? (
        <div className="relative aspect-[16/10] self-start overflow-hidden rounded-xl bg-cream-deep">
          <Image src={project.image} alt={`${project.name} screenshot`} fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover object-top" />
        </div>
      ) : (
        <div className="grid aspect-[16/10] self-start place-items-center rounded-xl bg-charcoal p-6 text-center font-heading text-cream/80">
          Screenshot coming soon
        </div>
      )}
    </article>
  );
}

function SmallProject({ project }: { project: Project }) {
  return (
    <li className="flex flex-col rounded-xl bg-white p-4 ring-1 ring-charcoal/10">
      {project.image && (
        <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg bg-cream-deep">
          <Image src={project.image} alt="" fill sizes="(min-width: 640px) 460px, 100vw" className="object-cover object-top" />
        </div>
      )}
      <h4 className="text-lg font-semibold">{project.name}</h4>
      {project.summary && <p className="text-charcoal-soft">{project.summary}</p>}
      <div className="mt-auto pt-3"><ProjectLinks project={project} /></div>
    </li>
  );
}
