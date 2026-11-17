# Frontend Skill Router

Read this before any frontend, UI, design or animation work. Use it to decide which installed skills to load, and which to leave out. Loading every skill at once makes the guidance conflict and wastes context. Pick only the ones the task actually needs.

## Step 0: Check what is installed

List the skills available in this session (`.claude/skills/`, `~/.claude/skills/` and installed plugins). Only route to skills that exist. If a skill this file recommends is missing, say so in one line and continue without it. Do not install anything unless the user asks.

Skills this file knows about:

| Key | Skill (repo) | What it is for |
|---|---|---|
| FD | `frontend-design` (anthropics) | Bold, distinctive aesthetic direction for new UI. Avoids generic "AI look". |
| UPM | `ui-ux-pro-max` (nextlevelbuilder) | Searchable database of styles, palettes, font pairings and UX rules. Best for picking a coherent design system for a product type. |
| TASTE | taste skill (leonxlnx/taste-skill) | Strict, metric-driven visual taste rules. Overrides generic output. |
| IMP | `impeccable` (pbakaus) | Polishing and auditing existing UI: hierarchy, spacing, UX gaps. |
| EMIL | `emil-design-eng` (emilkowalski/skills) | Animation judgment: whether to animate, easing, duration, micro-interactions, feel. |
| EMIL-AUDIT | `improve-animations` (emilkowalski/skills) | Read-only audit of existing animation code, outputs a fix plan. |
| GSAP | GSAP skills (greensock/gsap-skills) | GSAP timelines, ScrollTrigger, complex sequenced motion. |
| SCROLL | `gsap-framer-scroll-animation` (github/awesome-copilot) | Scroll recipes for GSAP ScrollTrigger and Motion (Framer Motion). |
| AWW | `awwwards-animations` (devmartinese) | Award-site style motion: smooth scroll (Lenis), page transitions, text reveals, creative effects. |
| VERCEL | Web Design Guidelines / React Best Practices (vercel-labs) | Accessibility, performance and React/Next.js rule audits. |

## Step 1: Classify the task

Pick the one row that best matches the request. If the request spans several, combine rows, but stay within the limits in Step 3.

| Task type | Examples | Load |
|---|---|---|
| A. New site or page from scratch, look matters | landing page, portfolio, marketing site, freelance client site | FD **or** TASTE (one, see Step 2) + UPM if a product/industry is named + EMIL |
| B. New site, heavy "wow" motion requested | "make it animated", "awwwards style", "scroll storytelling", parallax, pinned sections | A's design skill + AWW **or** GSAP (+ SCROLL if scroll-driven) + EMIL |
| C. App UI / dashboard / CRUD screens | admin panel, inventory app, data tables, forms | UPM + EMIL (micro-interactions only). Skip AWW/GSAP. |
| D. Improve or restyle existing UI | "make this look better", "fix the spacing", "it looks generic" | IMP (+ TASTE if the user wants a stronger visual change) |
| E. Improve or add animation to existing UI | "animations feel janky", "add hover/transition effects" | EMIL-AUDIT first, then EMIL. Add GSAP/SCROLL only if the plan needs scroll or timelines. |
| F. Single component | a button, modal, dropdown, toast, card | EMIL only (plus FD if no existing design system). |
| G. Review / audit only | "review my UI", "check accessibility", "is this production-ready?" | VERCEL + IMP. Add EMIL-AUDIT if there is notable motion. |
| H. Non-visual frontend work | state management, API calls, routing, bug fix with no UI change, tests | **No design skills.** Do the work directly. |

## Step 2: Resolve conflicts

- **Only one primary aesthetic skill.** FD, TASTE and UPM all set visual direction. Choose one as the lead:
  - User wants something bold, unusual, editorial or "not AI-looking" → FD.
  - User wants a very polished, restrained, premium feel, or says previous output looked generic → TASTE.
  - User names a product type or industry (SaaS, fintech, spa, e-commerce) or wants a full design system → UPM.
  - UPM may assist FD or TASTE as a lookup for palettes and fonts, but the lead skill's direction wins.
- **Only one animation engine.** Pick by stack and need:
  - React/Next.js with declarative entrance, hover, layout or exit animations → Motion (Framer Motion), via SCROLL or EMIL guidance.
  - Pinned sections, scrubbing, horizontal scroll, long sequenced timelines, or a non-React site → GSAP (+ SCROLL).
  - Simple hover/focus/press states → plain CSS transitions, no library.
  - Do not add both GSAP and Motion to one project unless the user asks.
- **EMIL decides timing and easing** whenever motion is involved, whichever engine runs it.
- **The existing project wins.** If the repo already has a design system, tokens, component library or animation library, follow it. Skills inform choices inside it; they do not replace it.
- **The user's explicit instructions win** over every skill.

## Step 3: Limits

- Load at most **3 skills** for a task (4 only for row B).
- If a skill's guidance does not change the output for this task, do not load it.
- Do not load skills for row H tasks.

## Step 4: Non-negotiables when motion is added

These apply whatever skills are loaded:

1. Respect `prefers-reduced-motion`: reduce or remove non-essential motion.
2. Animate only `transform` and `opacity` where possible. Avoid animating layout properties (width, height, top, left).
3. UI feedback (hover, press, toggles) stays short, roughly 100–300 ms. Larger entrance or page transitions may be longer.
4. Motion must have a purpose: guide attention, show state change, or give feedback. No animation just because it can move.
5. Clean up GSAP/ScrollTrigger instances and listeners on unmount (`useGSAP` or `gsap.context` in React).
6. Keep added bundle weight reasonable: import only the plugins used.

## Step 5: Verify

If a browser tool (for example Playwright MCP) is available, open the page, check desktop and mobile widths, and check that animations run without layout jumps. Otherwise, say that it was not visually checked.

## Step 6: Report your choice

Before writing code, state in 2–4 lines:

```
Task type: <row letter + name>
Skills used: <keys> — <one-line reason each>
Skipped: <keys considered but not used> — <reason>
Animation engine: <CSS / Motion / GSAP / none>
```

Then proceed without waiting for approval, unless the task is ambiguous between rows with very different outcomes (for example, C vs B). In that case, ask one short question first.
