/**
 * Copy for "The Workshop", the illustrated desk on /dev (large screens only).
 * Section content itself comes from dev.ts so the desk and the stacked page never drift apart.
 */

export type DeskObjectId = "laptop" | "sketchbook" | "toolbox" | "education" | "certificates" | "patents" | "resume" | "phone" | "mug";

export const workshop = {
  title: "The Workshop",
  intro: "Everything on the desk opens something. Prefer scrolling? The same content is in the sections below.",
  stickyNote: "click anything!",
  objects: {
    laptop: { label: "Projects", title: "Featured projects", hint: "Opens featured projects" },
    sketchbook: { label: "Design notes", title: "How they're built", hint: "Opens architecture and design decisions" },
    toolbox: { label: "Skills", title: "Skills and tools", hint: "Opens skills" },
    education: { label: "Education", title: "Education", hint: "Opens education" },
    certificates: { label: "Certifications", title: "Certifications and achievements", hint: "Opens certifications and competitive programming" },
    patents: { label: "Patents", title: "Patents", hint: "Opens patent applications" },
    resume: { label: "Resume", title: "Resume", hint: "Opens the resume in Google Drive" },
    phone: { label: "Contact", title: "Get in touch", hint: "Opens contact details" },
    mug: { label: "About", title: "About me", hint: "Opens about and availability" },
  } satisfies Record<DeskObjectId, { label: string; title: string; hint: string }>,
  availability: "Open to full-time roles and internships",
  projectsIntro: "The builds I'd show first. Open any one for the problem it solves and the decisions behind it.",
  sketchbookIntro: "The decisions behind each build, in short.",
  // TODO: Rounak's own process notes (how he scopes, plans and ships) and per-project architecture
  // sketches would make this panel stronger. Not written yet, so nothing is invented here.
};
