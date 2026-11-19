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
    globals.css              Tailwind import + @theme brand and motion tokens, reveal/press/FAQ motion CSS
    sitemap.ts, robots.ts, icon.png
    (client)/                client pages: shared nav, footer, floating WhatsApp button
      page.tsx               home, every section from the brief
      apply/, work/[slug]/
      opengraph-image.tsx, twitter-image.tsx
    dev/                     recruiter pages: own nav and footer
      page.tsx               stacked-card portfolio (also the Workshop fallback)
      patents/, blog/
  components/
    RevealObserver.tsx       arms the one-time scroll reveals (mounted in the root layout)
    Avatar.tsx               avatar poses: PNG when ready, vector stand-in otherwise
    client/                  DmHero (scroll animation), BeforeAfter slider, ChatHeading, nav, footer
    dev/                     DevNav, DevFooter, Workshop (lazy loader) + WorkshopDesk
      workshop/              DeskArt (SVG objects), Panels (dialog content, reads content/dev.ts)
    phone/                   PhoneFrame plus mock screens (DMs, café, store)
  content/                   ALL copy and data lives here, not in components
    site.ts                  links, handles, WhatsApp number, Formspree, Tally ID
    home.ts                  client home copy (pains, services, steps, FAQ)
    work.ts                  case studies
    dev.ts                   projects, experience, education, skills, patents
    workshop.ts              Workshop desk labels, panel titles, sticky note
  lib/                       seo.ts (pageMetadata), og.tsx (OG images), devto.ts
public/assets/               images (paths kept from the old static site); the resume is on Google Drive (`site.resumeUrl`)
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
- Chat-bubble motif: section headings use `ChatHeading` (`side="in"` for a customer message, `"out"` for Rounak's reply). The home page reads as one conversation: position and colour say who is talking. The customer is white and on the left; Rounak is orange (or `orange-200` for long replies) and on the right. Services and the FAQ follow this, and `ReadTicks` marks only solid-orange replies. Don't add decoration that isn't part of the conversation, and don't append `→` to link or button text.
- Motion: the hero scroll animation is the one big moment. Beyond it, only subtle one-time reveals (`data-reveal="up"` / `"group"`, and `ChatHeading`'s typing bubble, armed by `RevealObserver`) and user-triggered feedback (the `press` utility on buttons). No looping or attention-seeking motion. Use the `--ease-out` / `--ease-in-out` tokens in `globals.css`; UI feedback stays under 300ms. Respect `prefers-reduced-motion` (reveals become a short fade).
- Mobile-first: most client visitors arrive from Instagram on phones. Check 390px width.
- Accessibility: visible focus, labelled controls, and the phone mockups use `role="img"` with a description.

**SEO**
- Every page sets metadata through `pageMetadata()` in `lib/seo.ts`, with its own canonical path.
- The Person JSON-LD (`personSchema`) is on both `/` and `/dev` so name searches for "Rounak Agarwal" keep working. Keep it.
- All structured data lives in `components/JsonLd.tsx` and is built from `content/*`: Person (image is the illustrated avatar `avatar/head.png`, skills, credentials; Rounak doesn't want his photo used), ProfessionalService with the services as offers, and FAQPage on `/`; ProfilePage on `/dev`. Update content, not the schema.
- Share cards are served from `app/og/client.png` and `app/og/dev.png`; `pageMetadata()` picks one by path. Don't add per-route `opengraph-image` files.
- New routes get added to `src/app/sitemap.ts`.
- Old URLs redirect in `next.config.ts` (`/index.html` → `/`, `/patents.html` → `/dev/patents`). Don't remove these.

**Avatar**
- Source artwork lives in `design/avatar-source/` (not published). `python design/avatar-source/make_avatars.py` removes the beige background, trims and pads each image to the 5:6 canvas and writes `public/avatar/<pose>.png`, plus a head-and-shoulders `head.png`.
- To add a pose: put the artwork in `design/avatar-source/`, map its file name to a pose in `POSES` in the script, run it, then add the pose name to the `READY` set in `Avatar.tsx`.
- Ready: waving, facepalm, celebrating, laptop, pointing-left, pointing-right, thinking, head. Still drawn as vector stand-ins: thumbs-up, holding-phone, shrug, arms-crossed, presenting (none is used on a page right now).

## Working with Rounak

- He works on Windows; mind line endings and path separators in scripts.
- Make small, focused commits.
- When he asks for a diff file instead of direct edits, export only the new changes as the next numbered file (`git diff --binary -M <last-delivered-commit> HEAD > NN-short-name.diff`). Delivered so far: 01 scaffold + SEO + `/dev`; 02 client home + `/apply` + `/work`; 03 this file. Never bundle earlier diffs into a new one.

## Open items

- No business WhatsApp number yet (Nov 2026). `whatsappNumber` stays empty on purpose; buttons fall back to the contact form. The personal number is never used.
- Remaining avatar poses (see Avatar above).
- Final fonts, pricing (the site says "pricing on request").
- Decided: DeedTracker stays private (no code or live links). Instagram is @rounakbuilds. Tally form is xVD7g9. Domain ownership for client sites is the customer's choice. The resume is served from Google Drive; `/resume` and the old `/assets/ResumeRounak.pdf` redirect there.
- The demo sites `cafe.rounak.tech` and `store.rounak.tech` aren't built yet. Set `demoLive: true` in `work.ts` when each one goes live.

## "The Workshop" on `/dev` (in progress)

Built: on screens 1024px and wider, an illustrated top-down desk sits between the hero and the stacked sections. Laptop → featured projects (code-editor tabs), sketchbook → design decisions (project highlights), toolbox → skills, framed certificates → education, certifications, patents and competitive programming, paper stack → resume download (direct link), phone → contact, coffee mug → about, availability and experience. Each object is a real `<button>` that opens one native `<dialog>`.

Constraints that still hold: the stacked-card page stays the mobile and screen-reader version, so the desk is an enhancement, never a replacement. Resume and GitHub stay one click from the top. The desk chunk loads via a plain `import()` only after `(min-width: 1024px)` matches. Don't switch it to `next/dynamic`, which preloads the chunk in the server HTML.

Still to do:
- Freelance work reframed technically (admin panels, payments, performance), once there are real projects to describe.
- Rounak's own process notes and architecture sketches for the sketchbook (TODO in `content/workshop.ts`).
- Swap the avatar stand-in into the scene once the PNGs exist.
