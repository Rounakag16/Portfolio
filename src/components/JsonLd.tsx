import { sameAs, site } from "@/content/site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; "<" is escaped so content can't close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** The same Person entity on / and /dev keeps "Rounak Agarwal" name searches pointing here. */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  url: site.url,
  jobTitle: "Full-Stack Developer",
  description: "Full-stack MERN developer and competitive programmer, IT undergraduate at VIT Vellore.",
  email: `mailto:${site.email}`,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Vellore Institute of Technology, Vellore" },
  sameAs,
};
