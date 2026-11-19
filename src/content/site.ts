/**
 * One place for every link, handle and ID the site uses.
 * Anything marked TODO needs a real value before you deploy.
 */

export const site = {
  name: "Rounak Agarwal",
  shortName: "Rounak",
  url: "https://rounak.tech",
  email: "rounakoff16@gmail.com",

  /**
   * Business WhatsApp number, digits only with country code (e.g. "919876543210").
   * None yet (Nov 2026), and the personal number stays private, so this is empty on purpose:
   * WhatsApp buttons say "Send me a message" and lead to the contact form until it's filled in.
   */
  whatsappNumber: "",
  whatsappGreeting: "Hi Rounak, I saw your website and I'd like to talk about a website for my business.",

  /** Freelance Instagram. */
  instagramBusiness: { handle: "rounakbuilds", url: "https://www.instagram.com/rounakbuilds/" },
  /** Personal Instagram, linked from About for trust. */
  instagramPersonal: { handle: "rounak_ag", url: "https://www.instagram.com/rounak_ag" },

  github: "https://github.com/Rounakag16",
  linkedin: "https://www.linkedin.com/in/agarwalrounak16/",
  leetcode: "https://leetcode.com/u/RounakAg/",
  codechef: "https://www.codechef.com/users/rounak_16",
  x: "https://x.com/RounakOff",
  devto: { username: "rounakag", url: "https://dev.to/rounakag" },

  resumePath: "/assets/ResumeRounak.pdf",

  /** Existing Formspree form from the old site. */
  formspreeAction: "https://formspree.io/f/meozzqze",

  /** Tally form for the free-build application (the part after tally.so/r/). */
  tallyFormId: "xVD7g9",

  demos: {
    cafe: "https://cafe.rounak.tech",
    store: "https://store.rounak.tech",
  },
} as const;

export function whatsappLink(message: string = site.whatsappGreeting): string | null {
  if (!site.whatsappNumber) return null;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Profiles listed in the Person structured data (helps name searches). */
export const sameAs = [
  site.github,
  site.linkedin,
  site.leetcode,
  site.codechef,
  site.x,
  site.instagramPersonal.url,
  site.devto.url,
];
