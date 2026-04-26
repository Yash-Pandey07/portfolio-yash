# Yash Pandey — Portfolio

Personal portfolio for **Yash Pandey**, Senior SDET at Bayone Solutions (client: Hims & Hers).

Live: _deploy URL here after Vercel_

---

## Tech Stack

- **Framework:** Next.js (App Router, static export)
- **Language:** TypeScript
- **Styling:** Tailwind v4 + custom CSS (globals.css)
- **Fonts:** Cabinet Grotesk (headings) · Satoshi (body) via Fontshare CDN
- **Contact form:** Formspree
- **Deployment:** Vercel

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
app/
  layout.tsx       # SEO metadata, JSON-LD, font imports, Cursor + Noise
  page.tsx         # Root — owns `revealed` state, composes all sections
  globals.css      # All custom styles, design tokens, animations

components/
  PortalCurtain    # SVG mask intro animation (scroll/click/touch to advance)
  Header           # Fixed nav, frosted glass on scroll, gated on revealed
  Hero             # Name, typewriter, stats (live GitHub API), 3D tilt card, avatar
  Marquee          # Infinite tech ticker
  Projects         # Live + WIP project cards with 3D tilt and mouse-follow glow
  Terminal         # Real Playwright test output animation
  ManualQA         # Manual QA experience cards
  Skills           # Filterable skill chips (proficient / familiar / roadmap)
  Blog             # Article teasers (placeholder — connect Dev.to API when ready)
  Footer           # Contact section with Formspree form + social links
  Cursor           # Custom magnetic cursor (dot + lerped ring)
  Noise            # Fixed SVG noise overlay

lib/
  projects.ts      # Project data — add/edit projects here
  skills.ts        # Skills array + ManualQA items — add/edit here

public/
  avatar.jpg             # Profile photo
  Yash_Pandey_Resume.pdf # Downloadable resume
```

---

## Adding Content

**New project** → edit `lib/projects.ts`, push object to `projects` array.

**New skill** → edit `lib/skills.ts`, push to `skills` array with `level: "proficient" | "familiar" | "roadmap"`.

**New blog post** → write on [Dev.to](https://dev.to) under your account, then wire `GET https://dev.to/api/articles?username=YOUR_USERNAME` into Blog.tsx.

---

## Deployment

```bash
# 1. Push to GitHub
git remote add origin https://github.com/Yash-Pandey07/portfolio-yash.git
git add .
git commit -m "initial portfolio"
git branch -M main
git push -u origin main

# 2. Import repo on vercel.com → Deploy (auto-detects Next.js)
```

After deploy, update `BASE_URL` in `app/layout.tsx` to your real Vercel URL.

---

## Contact Form Setup

Form uses [Formspree](https://formspree.io). Form ID is already configured in `components/Footer.tsx`. Messages deliver to `ypandey777@yahoo.in`.
