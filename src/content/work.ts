/**
 * Client work shown on / and at /work/[slug].
 * The two demos are planned builds for cafe.rounak.tech and store.rounak.tech.
 * Brands in the demos are made up so nobody mistakes them for real shops.
 */

export type ScreenKind = "cafe" | "store";

export type CaseStudy = {
  slug: string;
  title: string;
  businessType: string;
  /** Shown on the card and as the page description. */
  summary: string;
  /** DMs the business was getting before, shown on the "before" side of the slider. */
  dms: { from: string; text: string }[];
  screen: ScreenKind;
  /** Only shown once filled in. */
  builtInDays?: number;
  demoUrl?: string;
  /** Flip to true when the subdomain is live. */
  demoLive: boolean;
  problem: string;
  built: string[];
  /** Real numbers only, after launch. */
  results?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "cafe-demo",
    title: "Brew & Bloom café",
    businessType: "Café and restaurant demo",
    summary: "Menu, hours, location and WhatsApp ordering on one page, so customers stop asking in DMs.",
    dms: [
      { from: "priya.eats", text: "menu send karo pls" },
      { from: "rahul_k", text: "open today??" },
      { from: "foodie.sgr", text: "cold coffee kitna ka hai?" },
      { from: "ankita.m", text: "table book ho sakta hai?" },
      { from: "dev_22", text: "location?" },
    ],
    screen: "cafe",
    demoUrl: "https://cafe.rounak.tech",
    demoLive: false,
    problem:
      "A café that runs on Instagram gets the same questions all day: the menu, the prices, whether it's open, where it is. Every answer is typed by hand, and customers who don't get a quick reply go somewhere else.",
    built: [
      "Menu with prices and photos, easy to update",
      "Opening hours that show whether the café is open right now",
      "Order on WhatsApp with the items already filled into the message",
      "Map, directions and a table booking request",
      "Google-friendly page so people searching nearby can find it",
    ],
  },
  {
    slug: "store-demo",
    title: "Mitti Candles store",
    businessType: "D2C brand demo",
    summary: "A small catalogue with cart and checkout, so orders stop getting lost in WhatsApp chats.",
    dms: [
      { from: "sneha.r", text: "price kya hai?" },
      { from: "karan.decor", text: "order kaise karein?" },
      { from: "meera_s", text: "COD available hai?" },
      { from: "gift.ideas", text: "lavender wala stock mein hai?" },
      { from: "tanvi.p", text: "maine kal order kiya tha, update?" },
    ],
    screen: "store",
    demoUrl: "https://store.rounak.tech",
    demoLive: false,
    problem:
      "A D2C brand selling through Instagram takes orders in DMs and WhatsApp. Prices, stock and order status live in someone's head, so orders get missed and customers chase updates.",
    built: [
      "Product catalogue with prices, variants and stock",
      "Cart and checkout with online payment or cash on delivery",
      "Order confirmation sent to the customer automatically",
      "Simple admin to add products and see orders",
      "Shareable product links for Instagram bio and stories",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
