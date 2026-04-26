# Architecture — Yash Pandey Portfolio

## Overview

Single-page Next.js app (App Router, static export). No backend, no database. All data is static TypeScript arrays in `lib/`. Deployed on Vercel free tier.

---

## State Flow

```
page.tsx
  └── revealed: boolean  (false → true once, never reset)
        │
        ├── PortalCurtain   writes: calls onComplete() when animation done
        │     └── onComplete() → setRevealed(true)
        │
        ├── Header          reads: revealed → activates scroll listener + visibility
        │
        └── Hero            reads: revealed → triggers CSS fade/slide in
```

`revealed` is the single source of truth for post-portal state. Body scroll is locked (`overflow: hidden`) during portal and restored exactly when `onComplete` fires.

---

## Component Responsibilities

### `app/layout.tsx`
- Full SEO: title template, description, keywords, Open Graph, Twitter card, canonical
- JSON-LD Person schema (Google rich results)
- Imports `Cursor` and `Noise` globally
- `suppressHydrationWarning` on `<html>` (browser extension attribute injection)

### `app/page.tsx`
- Owns `revealed` state
- Z-index layering: content div (`z-auto`) under PortalCurtain (`z-40`)
- `pointerEvents: none` on content until `revealed`

### `components/PortalCurtain.tsx`
- SVG mask animation — `YP` text scales from 1→220 via `applyProgress(p)`
- `progressRef` is mutable (no React state) — direct `setAttribute` on SVG at 60fps
- Inputs: wheel, click, keydown (Space/Enter/ArrowDown/PageDown), touch
- Auto-advance: `animateTo(1, 2800)` fires once at `progressRef >= 0.5`
- Scroll-up: `cancelAnim()` allows backward scrub
- On complete: `document.body.style.overflow = ""` restores scroll, `setCurtainVisible(false)`
- Returns `null` when done (stays mounted in parent — cleanup handled explicitly, not via effect)

### `components/Header.tsx`
- `visible = revealed` — no timer, strictly gated on portal completion
- Scroll listener only registered after `revealed` — no false triggers during portal
- `scrolled` state: `scrollY > 80` → frosted glass (`rgba(5,5,5,0.88)` + `blur(16px)` + bottom border)
- `hidden` state: hide on scroll down (delta > 8, y > 80), show on scroll up

### `components/Hero.tsx`
- `useGitHubRepos("Yash-Pandey07")` — live fetch of public repo count from GitHub API
- Stats: live repos, 4+ years SDET, 52+ production deploys
- `useTypewriter()` — cycles 4 role strings with backspace animation
- `useCountUp(target, active)` — rAF loop with cubic ease-out
- `ParticleCanvas` — 90 particles on `<canvas>`, resize-aware, `Math.random` only client-side (no hydration issue)
- `useTilt(strength)` — `perspective(900px) rotateX/Y` on mousemove
- Activity grid: deterministic `Math.sin` hash (no `Math.random` → no SSR hydration mismatch)
- Avatar: `public/avatar.jpg` displayed in info card

### `components/Projects.tsx`
- Exports `SectionHeader` (reused by ManualQA, Skills, Blog)
- Splits projects by `status`: `"live"` section + `"wip"` section
- Per-card accent color (6-color rotation by index)
- Mouse-follow glow: tracks `clientX/Y` within card, renders blurred circle
- 3D tilt: same pattern as Hero tilt hook but inline
- Data from `lib/projects.ts`

### `components/Terminal.tsx`
- Real Playwright test run output (not fake code) — 4 tests, chromium + firefox
- Shows: pass lines (green), fail line (red), error detail with `toBeVisible` assertion, HTML report line
- `IntersectionObserver` triggers typing on scroll-into-view
- Line-by-line reveal with `setTimeout` chain

### `components/ManualQA.tsx`
- 6 QA area cards: Test Case Design, Exploratory Testing, Bug Reporting, Regression, API Testing, Cross-Browser
- Hover state: bg/border lighten
- Tools panel: 11 tool badges
- Data from `lib/skills.ts` → `manualQAItems`

### `components/Skills.tsx`
- `activeFilter: "all" | "proficient" | "familiar" | "roadmap"`
- Filters `lib/skills.ts` array client-side
- Each chip: `IntersectionObserver` + staggered CSS transition delay

### `components/Footer.tsx`
- Contains `ContactSection` (contact form) + slim footer bar
- Form: name/email/message → `POST https://formspree.io/f/xeevdznw`
- States: `idle | sending | success | error`
- Contact details: email, LinkedIn, GitHub, location

### `components/Cursor.tsx`
- Dot: exact mouse position
- Ring: lerped (`+= delta * 0.1`) for lag effect — runs in `requestAnimationFrame` loop
- `MutationObserver` re-attaches hover listeners on DOM changes
- `cursor: none` on body via `globals.css`

---

## Data Layer

### `lib/projects.ts`
```ts
interface Project {
  title: string
  description: string
  tags: string[]
  github: string
  demo?: string
  featured?: boolean
  status?: "live" | "wip" | "planned"
}
```
Add project → push to `projects` array. Status controls which section it appears in.

### `lib/skills.ts`
```ts
type SkillLevel = "proficient" | "familiar" | "roadmap"

interface Skill {
  name: string
  level: SkillLevel
  category: string  // available for future filtering
}

interface ManualQAItem {
  area: string
  description: string
  tools: string[]
}
```

---

## Portal Animation — Technical Detail

```
Input (wheel/click/key/touch)
  → triggerAutoAdvance() OR delta applied to progressRef

applyProgress(p: 0→1):
  scale = 1 + 219 * p^2.5          ← exponential expansion feels cinematic
  maskGroup.setAttribute('transform', translate-scale-translate)

  p > 0.85 → curtain opacity fades (1 → 0)
  p >= 1.0 → document.body.overflow = "", setCurtainVisible(false), onComplete()

Auto-advance (once at p >= 0.5):
  animateTo(1, 2800ms) via rAF cubic ease-in-out
```

Why `setAttribute` not React state: 60fps via React state = 60 full re-renders/sec. Direct DOM mutation keeps animation smooth with zero React overhead.

---

## Styling System

All custom styles in `app/globals.css`. Tailwind v4 (no config file — `@import "tailwindcss"`).

| Token | Value |
|---|---|
| Base bg | `#050505` |
| Section alt bg | `#060606`, `#080808` |
| Indigo accent | `rgba(99,102,241,...)` |
| Easing (cinematic) | `cubic-bezier(0.77, 0, 0.175, 1)` |
| Card bg | `rgba(255,255,255,0.08)` |
| Card border | `rgba(255,255,255,0.15)` |
| Heading font | Cabinet Grotesk 900 |
| Body font | Satoshi 400/500/700 |

---

## Known Limitations

- `backdrop-filter` requires Chrome/Edge/Safari — degrades gracefully in Firefox
- Blog section is placeholder — no CMS or MDX setup
- GitHub activity grid in Hero card is decorative (deterministic hash, not real contribution data)
- No analytics or sitemap yet — add before launch
- Mobile layout not fully tested — verify tilt card and terminal on small screens
