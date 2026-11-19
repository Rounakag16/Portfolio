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

/**
 * Share cards live at fixed URLs (app/og/*). They're attached here explicitly because a page that sets
 * its own `openGraph` replaces the parent's file-based image rather than inheriting it.
 */
const cards = {
  client: { url: "/og/client.png", alt: "Websites for Instagram businesses, by Rounak" },
  dev: { url: "/og/dev.png", alt: "Rounak Agarwal, full-stack developer (MERN and AI)" },
};

/** Per-route metadata with canonical URL, matching Open Graph / Twitter tags and the right share card. */
export function pageMetadata({ title, description, path, absoluteTitle, type = "website" }: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.shortName}`;
  const card = path === "/dev" || path.startsWith("/dev/") ? cards.dev : cards.client;
  const image = { url: card.url, alt: card.alt, width: 1200, height: 630, type: "image/png" };
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
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      site: `@${site.x.handle}`,
      creator: `@${site.x.handle}`,
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
