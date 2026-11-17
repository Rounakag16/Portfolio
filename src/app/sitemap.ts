import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { caseStudies } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });
  return [
    page("/", 1),
    page("/dev", 0.9),
    page("/apply", 0.7),
    ...caseStudies.map((c) => page(`/work/${c.slug}`, 0.7)),
    page("/dev/patents", 0.6),
    page("/dev/blog", 0.5),
  ];
}
