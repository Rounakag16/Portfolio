import Link from "next/link";
import { site } from "@/content/site";
import { getDevtoPosts } from "@/lib/devto";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Blog | Rounak Agarwal",
  absoluteTitle: true,
  description: "Notes from Rounak Agarwal on building full-stack and AI projects, published on dev.to.",
  path: "/dev/blog",
});

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default async function BlogPage() {
  const posts = await getDevtoPosts();
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link href="/dev" className="text-sm font-medium text-teal-deep underline underline-offset-4">Back to portfolio</Link>
      <h1 className="mt-6 text-4xl font-bold">Blog</h1>
      {posts.length === 0 ? (
        <p className="mt-6 text-lg text-charcoal-soft">
          No posts yet. Follow along on{" "}
          <a href={site.devto.url} target="_blank" rel="noopener noreferrer" className="font-medium text-teal-deep underline underline-offset-4">dev.to</a>{" "}
          for the first one.
        </p>
      ) : (
        <ul className="mt-10 space-y-8">
          {posts.map((p) => (
            <li key={p.id}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block">
                <h2 className="text-xl font-semibold group-hover:text-teal-deep">{p.title}</h2>
                <p className="mt-1 text-charcoal-soft">{p.description}</p>
                <p className="mt-2 text-sm text-charcoal-soft">
                  <time dateTime={p.published_at}>{dateFmt.format(new Date(p.published_at))}</time>, {p.reading_time_minutes} min read
                </p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
