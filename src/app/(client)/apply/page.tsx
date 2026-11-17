import Script from "next/script";
import { Avatar } from "@/components/Avatar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ChatHeading } from "@/components/client/ChatHeading";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Apply for a free website",
  description:
    "Every month Rounak builds one website free for a small business that sells on Instagram. Tell him about your business to apply.",
  path: "/apply",
});

const points = [
  { title: "Who can apply", body: "Small businesses that sell through Instagram: cafés, local shops, home bakers, coaches, creators and D2C brands." },
  { title: "How one is picked", body: "Each month I read every application and pick the business where a website would make the biggest difference." },
  { title: "What happens next", body: "If you're picked, I message you on WhatsApp and we agree on what the site needs before I start." },
];

export default function ApplyPage() {
  const formId = site.tallyFormId;
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <ChatHeading as="h1">Apply for a free website</ChatHeading>
          <p className="mt-6 max-w-[56ch] text-lg text-charcoal-soft">
            Every month I build one website free for a small business on Instagram.
          </p>
        </div>
        <Avatar pose="celebrating" width={150} className="mx-auto" />
      </div>

      <ul className="mt-12 grid gap-8 sm:grid-cols-3">
        {points.map((p) => (
          <li key={p.title} className="border-t-4 border-charcoal pt-4">
            <h2 className="text-lg font-semibold">{p.title}</h2>
            <p className="mt-2 text-charcoal-soft">{p.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-14 rounded-[1.75rem] bg-white p-4 ring-1 ring-charcoal/10 sm:p-8">
        {formId ? (
          <>
            <iframe
              data-tally-src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
              loading="lazy"
              width="100%"
              height="600"
              title="Free website application form"
              className="w-full border-0"
            />
            <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
          </>
        ) : (
          <div className="space-y-4 py-6 text-center">
            <p className="text-lg">The application form opens soon. Until then, send your business details on WhatsApp.</p>
            <WhatsAppButton label="Apply on WhatsApp" message="Hi Rounak, I'd like to apply for the free website. My business is: " />
          </div>
        )}
      </div>
    </div>
  );
}
