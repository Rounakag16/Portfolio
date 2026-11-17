import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ChatHeading } from "@/components/client/ChatHeading";

export const metadata: Metadata = { title: "Page not found" };

/** Shown for any URL that doesn't exist. Points both audiences back to their page. */
export default function NotFound() {
  return (
    <>
      <header className="border-b border-charcoal/10">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-4 sm:px-6"><Logo /></div>
      </header>
      <main id="main" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <ChatHeading as="h1">Where did this page go?</ChatHeading>
        <div className="mt-4 flex justify-end">
          <p className="max-w-[46ch] rounded-[1.6rem] rounded-br-md bg-orange px-6 py-4 text-lg text-charcoal">
            That link doesn&apos;t lead anywhere. It may have moved, or there may be a typo in the address.
          </p>
        </div>
        <ul className="mt-12 flex flex-wrap gap-4">
          <li>
            <Link href="/" className="press inline-block rounded-full bg-charcoal px-5 py-2.5 font-heading font-semibold text-cream hover:bg-charcoal-soft">
              Go to the homepage
            </Link>
          </li>
          <li>
            <Link href="/dev" className="press inline-block rounded-full border-2 border-charcoal px-5 py-2 font-heading font-semibold hover:bg-charcoal hover:text-cream">
              See the developer portfolio
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}
