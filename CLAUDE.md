# rounak.tech: notes for Claude Code

Personal site for Rounak Agarwal with two audiences on one domain:

| Route | Audience | Goal |
|---|---|---|
| `/` | Clients: businesses that sell on Instagram (cafés, local shops, coaches, creators, D2C brands), anywhere in India | WhatsApp chat or free-build application |
| `/apply` | Clients | Free-build application (Tally embed) |
| `/work/[slug]` | Both | Case study per project |
| `/dev` | Recruiters (MERN full-stack and AI roles) | Resume, GitHub, LinkedIn, email |
| `/dev/patents`, `/dev/blog` | Recruiters | Patent list; dev.to posts |

The full design brief is in the claude.ai project "Freelance Rounak" (`claude/website-brief.md`). This file is the working summary of it.

## Stack and commands

- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4. Deploys to Vercel.
- `npm run dev` for local dev, `npm run build` for a production build (run it before calling a change done), `npm run typecheck` for types only.
- Fonts are self-hosted with Fontsource (Poppins for headings, Inter for body). Don't switch to `next/font/google`.
- Analytics: `@vercel/analytics`. Forms: Formspree (contact) and Tally (`/apply`).
- Next 16 specifics: route `params` are a Promise (`const { slug } = await params`), and `next lint` no longer exists.

## Layout

```
src/
  app/
    layout.tsx               root: fonts, metadataBase, analytics
    globals.css              Tailwind import + @theme brand tokens
    sitemap.ts, robots.ts, icon.png
    (client)/                client pages: shared nav, footer, floating WhatsApp button
      page.tsx               home, every section from the brief
      apply/, work/[slug]/
      opengraph-image.tsx, twitter-image.tsx
    dev/                     recruiter pages: own nav and footer
      page.tsx               stacked-card portfolio (also the Workshop fallback)
      patents/, blog/
  components/
    Avatar.tsx               avatar poses: PNG when ready, vector stand-in otherwise
    client/                  DmHero (scroll animation), BeforeAfter slider, ChatHeading, nav, footer
    dev/                     DevNav, DevFooter
    phone/                   PhoneFrame plus mock screens (DMs, café, store)
  content/                   ALL copy and data lives here, not in components
    site.ts                  links, handles, WhatsApp number, Formspree, Tally ID
    home.ts                  client home copy (pains, services, steps, FAQ)
    work.ts                  case studies
    dev.ts                   projects, experience, education, skills, patents
  lib/                       seo.ts (pageMetadata), og.tsx (OG images), devto.ts
public/assets/               images and resume PDF (paths kept from the old static site)
public/avatar/               avatar PNGs go here
```

## Rules

**Content**
- Copy changes go in `src/content/*`. Keep components free of hard-coded copy where practical.
- Never invent facts about Rounak, his projects, numbers, timelines or client results. Leave a `// TODO` and ask instead. Case-study `results` and `builtInDays` stay empty until real.
- Demo brands (Brew & Bloom, Mitti Candles) are made up on purpose. Never use real business names or logos in demos.
- No job-seeking language on client pages (`/`, `/apply`, `/work`). "Open to roles" appears only under `/dev`.
- English everywhere. Hinglish appears only inside customer DM bubbles, as the customer's voice.
- Don't publish Rounak's personal phone number or birth date. WhatsApp CTAs use the business number in `site.ts`.

**Design**
- Palette: charcoal `#1c1917`, orange `#f97316`, cream `#fff7ed`, teal `#14b8a6`. Use the Tailwind tokens (`bg-orange`, `text-charcoal`, `text-orange-deep`, `text-teal-deep`). Orange buttons take charcoal text, never white (contrast).
- Chat-bubble motif: section headings use `ChatHeading` (`side="in"` for a customer message, `"out"` for Rounak's reply).
- Motion: the hero scroll animation is the one big moment. Keep everything else still or user-triggered. Respect `prefers-reduced-motion`.
- Mobile-first: most client visitors arrive from Instagram on phones. Check 390px width.
- Accessibility: visible focus, labelled controls, and the phone mockups use `role="img"` with a description.

**SEO**
- Every page sets metadata through `pageMetadata()` in `lib/seo.ts`, with its own canonical path.
- The Person JSON-LD (`personSchema`) is on both `/` and `/dev` so name searches for "Rounak Agarwal" keep working. Keep it.
- New routes get added to `src/app/sitemap.ts`.
- Old URLs redirect in `next.config.ts` (`/index.html` → `/`, `/patents.html` → `/dev/patents`). Don't remove these.

**Avatar**
- Drop a pose PNG in `public/avatar/<pose>.png`, then add the pose name to the `READY` set in `Avatar.tsx`.

## Working with Rounak

- He works on Windows; mind line endings and path separators in scripts.
- Make small, focused commits.
- When he asks for a diff file instead of direct edits, export only the new changes as the next numbered file (`git diff --binary -M <last-delivered-commit> HEAD > NN-short-name.diff`). Delivered so far: 01 scaffold + SEO + `/dev`; 02 client home + `/apply` + `/work`; 03 this file. Never bundle earlier diffs into a new one.

## Open items

- Business WhatsApp number and Tally form ID (`src/content/site.ts`).
- Avatar PNGs.
- One-line summaries for EquiDecide, EduCore and FriendFi; DeedTracker links if public (`src/content/dev.ts`).
- FAQ answers marked `CONFIRM` in `src/content/home.ts`.
- Final fonts, pricing (the site says "pricing on request"), Instagram handle (leaning rounak.builds).
- The demo sites `cafe.rounak.tech` and `store.rounak.tech` aren't built yet. Set `demoLive: true` in `work.ts` when each one goes live.

## Next up: "The Workshop" on `/dev`

Large screens get a top-down illustrated desk; each object opens a section:
laptop → featured projects (could open as a code-editor style view), sketchbook → architecture and process, bookshelf or toolbox → skills, framed certificates → education and certifications, paper stack → resume download, phone → contact, coffee mug → about and availability. Also add freelance work reframed technically (admin panels, payments, performance).

Constraints: the current stacked-card page stays as the mobile and screen-reader version, so the desk is an enhancement on top of it, never a replacement. Resume and GitHub stay one click from the top. Lazy-load the illustration and keep mobile load under 2 seconds.
