import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BeforeAfter } from "@/components/client/BeforeAfter";
import { ChatHeading } from "@/components/client/ChatHeading";
import { caseStudies, getCaseStudy } from "@/content/work";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return pageMetadata({ title: `${study.title}: case study`, description: study.summary, path: `/work/${study.slug}`, type: "article" });
}

export default async function CaseStudyPage({ params }: Params) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  return (
    <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p className="font-medium text-teal-deep">{study.businessType}</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{study.title}</h1>
      <p className="mt-4 max-w-[56ch] text-lg text-charcoal-soft">{study.summary}</p>

      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_320px]">
        <div className="space-y-12">
          <section aria-labelledby="problem">
            <ChatHeading id="problem" className="text-2xl! sm:text-3xl!">The problem</ChatHeading>
            <p className="mt-5 max-w-[62ch] text-lg">{study.problem}</p>
          </section>
          <section aria-labelledby="built">
            <ChatHeading id="built" side="out" className="text-2xl! sm:text-3xl!">What I built</ChatHeading>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-lg marker:text-orange">
              {study.built.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </section>
          {study.results && (
            <section aria-labelledby="results">
              <ChatHeading id="results" className="text-2xl! sm:text-3xl!">What changed</ChatHeading>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-lg marker:text-orange">
                {study.results.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </section>
          )}
          <div className="flex flex-wrap items-center gap-5">
            <WhatsAppButton label="Get one for your business" />
            {study.demoLive && study.demoUrl ? (
              <a href={study.demoUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-orange decoration-2 underline-offset-4">
                Open the live demo
              </a>
            ) : (
              <p className="text-sm text-charcoal-soft">The live demo is on its way.</p>
            )}
          </div>
        </div>
        <div className="md:sticky md:top-24 md:self-start">
          <BeforeAfter study={study} />
        </div>
      </div>
    </article>
  );
}
