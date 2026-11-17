/**
 * Copy for "The Workshop", the illustrated desk on /dev (large screens only).
 * Section content itself comes from dev.ts so the desk and the stacked page never drift apart.
 */

export type DeskObjectId = "laptop" | "sketchbook" | "toolbox" | "certificates" | "resume" | "phone" | "mug";

export const workshop = {
  title: "The Workshop",
  intro: "Everything on the desk opens something. Prefer scrolling? The same content is in the sections below.",
  stickyNote: "click anything!",
  objects: {
    laptop: { label: "Projects", title: "Featured projects", hint: "Opens featured projects" },
    sketchbook: { label: "Design notes", title: "How they're built", hint: "Opens architecture and design decisions" },
    toolbox: { label: "Skills", title: "Skills and tools", hint: "Opens skills" },
    certificates: { label: "Education", title: "Education and certifications", hint: "Opens education, certifications and achievements" },
    resume: { label: "Resume", title: "Resume", hint: "Downloads the resume PDF" },
    phone: { label: "Contact", title: "Get in touch", hint: "Opens contact details" },
    mug: { label: "About", title: "About me", hint: "Opens about and availability" },
  } satisfies Record<DeskObjectId, { label: string; title: string; hint: string }>,
  availability: "Open to full-time roles and internships",
  sketchbookIntro: "The decisions behind each build, in short.",
  // TODO: Rounak's own process notes (how he scopes, plans and ships) and per-project architecture
  // sketches would make this panel stronger. Not written yet, so nothing is invented here.
};
