import Link from "next/link";
import { site } from "@/content/site";

export function DevFooter() {
  return (
    <footer className="border-t border-charcoal/10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-charcoal-soft sm:px-6">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li><a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-teal-deep">GitHub</a></li>
          <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-deep">LinkedIn</a></li>
          <li><a href={site.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-teal-deep">LeetCode</a></li>
          <li><a href={site.codechef} target="_blank" rel="noopener noreferrer" className="hover:text-teal-deep">CodeChef</a></li>
          <li><Link href="/dev/patents" className="hover:text-teal-deep">Patents</Link></li>
          <li><Link href="/dev/blog" className="hover:text-teal-deep">Blog</Link></li>
          <li><Link href="/" className="hover:text-teal-deep">Freelance websites</Link></li>
        </ul>
      </div>
    </footer>
  );
}
