import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { JsonLd, personSchema } from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BeforeAfter } from "@/components/client/BeforeAfter";
import { ChatHeading } from "@/components/client/ChatHeading";
import { DmHero } from "@/components/client/DmHero";
import { faqs, pains, services, steps } from "@/content/home";
import { site } from "@/content/site";
import { caseStudies } from "@/content/work";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Rounak Agarwal | Websites for Instagram Businesses in India",
  absoluteTitle: true,
  description:
    "Rounak Agarwal builds fast, mobile-first websites for cafés, coaches, creators and D2C brands that sell on Instagram, so customers find menus, prices and ordering without DMs.",
  path: "/",
});

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#service`,
  name: "Rounak: websites for Instagram businesses",
  url: site.url,
  description: "Website design and development for cafés, local shops, coaches, creators and D2C brands that sell through Instagram.",
  areaServed: { "@type": "Country", name: "India" },
  founder: { "@id": `${site.url}/#person` },
  sameAs: [site.instagramBusiness.url],
};

const container = "mx-auto max-w-6xl px-4 sm:px-6";

export default function HomePage() {
  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={serviceSchema} />

      <DmHero />

      {/* The problem */}
      <section aria-labelledby="problem-title" className={`${container} py-20`}>
        <ChatHeading id="problem-title">Running a business from your DMs is hard</ChatHeading>
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
          {pains.map((p) => (
            <div key={p.title}>
              <p className="mb-4 inline-block rounded-2xl rounded-bl-sm bg-white px-4 py-2 text-[0.95rem] text-charcoal-soft ring-1 ring-charcoal/10">
                {p.dm}
              </p>
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-charcoal-soft">{p.body}</p>
            </div>
          ))}
          <Avatar pose="facepalm" width={130} className="hidden md:block" />
        </div>
      </section>

      {/* Work */}
      <section id="work" aria-labelledby="work-title" className="scroll-mt-16 bg-cream-deep py-20">
        <div className={container}>
          <ChatHeading id="work-title" side="out">Here&apos;s what that looks like fixed</ChatHeading>
          <ul className="mt-14 grid gap-16 md:grid-cols-2 md:gap-10">
            {caseStudies.map((c) => (
              <li key={c.slug} className="flex flex-col gap-6">
                <BeforeAfter study={c} />
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm font-medium text-teal-deep">{c.businessType}</p>
                    <span className="-rotate-2 rounded-md border-2 border-dashed border-orange-deep px-2 py-0.5 font-heading text-xs font-bold text-orange-deep">
                      {c.builtInDays ? `Built in ${c.builtInDays} days` : "Demo, launching soon"}
                    </span>
                  </div>
                  <h3 className="mt-2 text-2xl font-bold">{c.title}</h3>
                  <p className="mt-2 max-w-[48ch] text-charcoal-soft">{c.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-5 font-semibold">
                    <Link href={`/work/${c.slug}`} className="underline decoration-orange decoration-2 underline-offset-4 hover:text-orange-deep">
                      Read the case study<span className="sr-only">: {c.title}</span>
                    </Link>
                    {c.demoLive && c.demoUrl && (
                      <a href={c.demoUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-orange decoration-2 underline-offset-4 hover:text-orange-deep">
                        Open the live demo<span className="sr-only">: {c.title}</span>
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section id="services" aria-labelledby="services-title" className={`${container} scroll-mt-16 py-20`}>
        <ChatHeading id="services-title">What can you build for me?</ChatHeading>
        <ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.title} className="border-t-4 border-charcoal pt-5">
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-charcoal-soft">{s.body}</p>
              <p className="mt-3 text-sm font-medium text-teal-deep">Good for: {s.for}</p>
            </li>
          ))}
        </ul>
        <p className="mt-12 max-w-[60ch] text-lg">
          Pricing depends on what you need. Message me about your business and you&apos;ll get a clear quote before any work starts.
        </p>
      </section>

      {/* Process */}
      <section id="process" aria-labelledby="process-title" className="scroll-mt-16 bg-charcoal py-20 text-cream">
        <div className={container}>
          <ChatHeading id="process-title" className="text-charcoal">How does it work?</ChatHeading>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span aria-hidden className="grid size-11 place-items-center rounded-full bg-orange font-heading text-lg font-bold text-charcoal">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-cream/75">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Free build */}
      <section aria-labelledby="free-title" className={`${container} py-20`}>
        <div className="grid items-center gap-8 rounded-[2rem] bg-orange px-6 py-10 sm:px-12 md:grid-cols-[auto_1fr_auto]">
          <span className="mx-auto grid size-36 place-items-center rounded-full bg-cream"><Avatar pose="celebrating" width={110} /></span>
          <div>
            <h2 id="free-title" className="text-3xl font-bold sm:text-4xl">I build one website free every month</h2>
            <p className="mt-3 max-w-[52ch] text-lg">
              Run a small business on Instagram? Apply, and each month I pick one business and build its website at no cost.
            </p>
          </div>
          <Link href="/apply" className="justify-self-start rounded-full bg-charcoal px-7 py-3.5 font-heading font-semibold text-cream hover:bg-charcoal-soft md:justify-self-end">
            Apply →
          </Link>
        </div>
      </section>

      {/* About */}
      <section id="about" aria-labelledby="about-title" className={`${container} scroll-mt-16 pb-20`}>
        <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
          <Avatar pose="arms-crossed" width={190} className="mx-auto" />
          <div>
            <ChatHeading id="about-title">Who&apos;s building this?</ChatHeading>
            <div className="mt-6 max-w-[62ch] space-y-4 text-lg text-charcoal-soft">
              <p>
                I&apos;m Rounak, a full-stack developer from Siliguri. I&apos;ve built inventory software for businesses with several
                warehouses, a land-records tool for a client, and plenty of web apps in between.
              </p>
              <p>
                Now I build websites for businesses that live on Instagram: fast on a phone, simple to update, and made to turn
                followers into customers.
              </p>
              <p>
                Want to see who you&apos;d be working with? Say hi on my personal Instagram,{" "}
                <a href={site.instagramPersonal.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-charcoal underline decoration-orange decoration-2 underline-offset-4">
                  @{site.instagramPersonal.handle}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-16 bg-cream-deep py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ChatHeading id="faq-title">Questions people usually ask</ChatHeading>
          <div className="mt-10 divide-y divide-charcoal/15 border-y border-charcoal/15">
            {faqs.map((f) => (
              <details key={f.q} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-heading text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="text-2xl leading-none text-orange-deep transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-[62ch] pb-5 text-charcoal-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-title" className={`${container} scroll-mt-16 py-20`}>
        <div className="grid items-end gap-10 md:grid-cols-[minmax(0,42rem)_auto] md:gap-16">
          <div className=" overflow-hidden rounded-[1.75rem] bg-[#efeae2] ring-1 ring-charcoal/10">
            <div className="flex items-center gap-3 bg-teal-deep px-5 py-3 text-white">
              <span className="grid size-10 place-items-center overflow-hidden rounded-full bg-cream">
                <Avatar pose="head" width={34} />
              </span>
              <div>
                <h2 id="contact-title" className="font-heading text-base font-semibold">Rounak</h2>
                <p className="text-xs text-white/80">Websites for Instagram businesses</p>
              </div>
            </div>
            <div className="space-y-2 p-5">
              <p className="w-fit max-w-[85%] rounded-xl rounded-tl-sm bg-white px-4 py-2 shadow-sm">Hi! Tell me about your business.</p>
              <p className="w-fit max-w-[85%] rounded-xl rounded-tl-sm bg-white px-4 py-2 shadow-sm">
                What do you sell, and where do your customers find you right now?
              </p>
              <div className="pt-3"><WhatsAppButton label="Reply on WhatsApp" /></div>
            </div>
            <form action={site.formspreeAction} method="post" className="space-y-3 border-t border-charcoal/10 bg-white/60 p-5">
              <p className="text-sm text-charcoal-soft">Prefer not to use WhatsApp? Leave a message here.</p>
              <input type="hidden" name="_subject" value="New website enquiry from rounak.tech" />
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium">Your name</span>
                  <input name="fullname" required autoComplete="name" className="mt-1 w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2" />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Phone or email</span>
                  <input name="email" required autoComplete="email" className="mt-1 w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2" />
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-medium">Business Instagram (optional)</span>
                <input name="instagram" placeholder="@yourbusiness" className="mt-1 w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2" />
              </label>
              <label className="block">
                <span className="text-sm font-medium">What do you need?</span>
                <textarea name="message" required rows={3} className="mt-1 w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2" />
              </label>
              <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 font-heading font-semibold text-cream hover:bg-charcoal-soft">
                Send message
              </button>
            </form>
          </div>
          <Avatar pose="thumbs-up" width={150} className="mx-auto hidden md:block" />
        </div>
      </section>
    </>
  );
}
