import Link from "next/link";
import { PatentsSummary } from "@/components/dev/PatentsSummary";
import { patents } from "@/content/dev";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Patents | Rounak Agarwal",
  absoluteTitle: true,
  description:
    "Patent portfolio of Rounak Agarwal: co-inventor on 10 filed Indian patent applications spanning cybersecurity, AI/ML and healthcare informatics.",
  path: "/dev/patents",
});

export default function PatentsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link href="/dev" className="text-sm font-medium text-teal-deep underline underline-offset-4">Back to portfolio</Link>
      <h1 className="mt-6 text-4xl font-bold">Patents</h1>
      <div className="mt-6"><PatentsSummary /></div>
      <ul className="mt-10 space-y-6">
        {patents.items.map((p) => (
          <li key={p.number} className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10">
            <p className="font-mono text-sm text-teal-deep">Application {p.number}</p>
            <h2 className="mt-1 text-xl font-semibold">{p.title}</h2>
            <p className="mt-2 text-charcoal-soft">{p.detail}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-charcoal-soft">{patents.outro}</p>
    </div>
  );
}
