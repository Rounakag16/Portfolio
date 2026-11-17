import { sameAs, site } from "@/content/site";
import { certifications, skills } from "@/content/dev";
import { faqs, services } from "@/content/home";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; "<" is escaped so content can't close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const personId = `${site.url}/#person`;

/**
 * The same Person entity on / and /dev keeps "Rounak Agarwal" name searches pointing here.
 * Everything in it comes from content/*, so it stays in step with what the pages say.
 */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: site.name,
  url: site.url,
  image: `${site.url}/assets/images/rounak-agarwal.jpg`,
  jobTitle: "Full-Stack Developer",
  description:
    "Full-stack MERN and AI developer, competitive programmer and IT undergraduate at VIT Vellore. Builds websites for businesses that sell on Instagram.",
  email: `mailto:${site.email}`,
  homeLocation: {
    "@type": "Place",
    address: { "@type": "PostalAddress", addressLocality: "Siliguri", addressRegion: "West Bengal", addressCountry: "IN" },
  },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Vellore Institute of Technology, Vellore" },
  knowsAbout: skills.flatMap((g) => g.items),
  hasCredential: certifications.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c.title,
    url: c.href,
  })),
  sameAs,
};

/** /dev is a profile page about the Person above (Google's ProfilePage structured data). */
export const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.url}/dev#profile`,
  url: `${site.url}/dev`,
  name: `${site.name}: full-stack developer portfolio`,
  mainEntity: { "@id": personId },
};

/** The freelance service on /, with the services list as its offer catalogue. */
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#service`,
  name: "Rounak: websites for Instagram businesses",
  url: site.url,
  image: `${site.url}/og/client.png`,
  description: "Website design and development for cafés, local shops, coaches, creators and D2C brands that sell through Instagram.",
  areaServed: { "@type": "Country", name: "India" },
  address: { "@type": "PostalAddress", addressLocality: "Siliguri", addressRegion: "West Bengal", addressCountry: "IN" },
  founder: { "@id": personId },
  email: site.email,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Website services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.body, audience: { "@type": "BusinessAudience", name: s.for } },
    })),
  },
  sameAs: [site.instagramBusiness.url],
};

/** The home page FAQ, so search and answer engines can read the questions and answers directly. */
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/#faq`,
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
