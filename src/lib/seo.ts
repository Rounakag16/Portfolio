import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Use the full title as-is instead of "title | Rounak". */
  absoluteTitle?: boolean;
  type?: "website" | "profile" | "article";
};

/** Per-route metadata with canonical URL and matching Open Graph / Twitter tags. */
export function pageMetadata({ title, description, path, absoluteTitle, type = "website" }: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.shortName}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: "en_IN",
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
