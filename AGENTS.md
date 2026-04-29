# Good Transformer — Agent Navigation

Welcome, AI agent. This file is your starting point. Read it first, then navigate to the topic you need.

---

## What this project is

**Good Transformer** ([goodtransformer.ai](https://goodtransformer.ai)) is a personal website and booking platform for Patrick Hussey — AI coach and fractional AI adviser. Two service lines:

1. **Personal AI Lessons** — one-to-one coaching for individuals
2. **Business AI Advisory** — fractional advisory engagements for teams and organisations

Stack: **Next.js 15 (static export) · TypeScript · Tailwind CSS · GitHub Pages**

---

## Knowledge base map

| File | What it answers |
|---|---|
| `knowledge/brand/brand-tokens.json` | Every brand colour (hex + RGB), font, and spacing token |
| `knowledge/brand/visual-rules.md` | How to apply colours, logos, and layout rules |
| `knowledge/brand/copy-voice.md` | Tone of voice, writing rules, vocabulary |
| `knowledge/brand/logo-usage.md` | Logo file locations, colour treatments, sizing |
| `knowledge/site/architecture.md` | Tech stack, project structure, build/deploy |
| `knowledge/site/routing.md` | All pages, their paths, and what they do |
| `knowledge/components/component-library.md` | Every React component — props and usage |
| `knowledge/components/css-patterns.md` | Tailwind utility classes and custom CSS patterns |
| `knowledge/content/site-content-guide.md` | How `site-content.ts` works — where to edit copy |
| `knowledge/services/offers.md` | Both service lines — pricing, structure, audience |
| `knowledge/dev/dev-setup.md` | How to run and build the project locally |
| `knowledge/dev/tailwind-config.md` | Tailwind theme extensions and custom utilities |
| `knowledge/dev/globals-css.md` | CSS custom properties, component classes |
| `knowledge/ops/deployment.md` | GitHub Actions deploy, custom domain, secrets |
| `knowledge/ops/env-vars.md` | All environment variables with descriptions |
| `knowledge/assets/asset-guide.md` | Images, logos, and other public assets |

---

## Critical rules before you write any code or assets

1. **All copy lives in `src/content/site-content.ts`** — never hardcode text in components
2. **Colours are CSS custom properties** named `--color-*` (RGB triplets, not hex) — use Tailwind utilities: `text-ink`, `bg-paper`, `text-brass` etc.
3. **Teal is `#008C95`** — mapped to `brass` in Tailwind/CSS for historical reasons. `text-brass`, `bg-brass`, `border-brass` all produce teal.
4. **No warm brass (`#A5701E`)** — this colour has been retired. If you see it anywhere, replace with teal.
5. **Background is warm paper** — never pure white (`#ffffff`) or cool grey as a page background
6. **Fonts**: `font-serif` = Newsreader (editorial), `font-sans` = Schibsted Grotesk (UI)
7. **Logo** = `public/logos/gt-logo.png` rendered with `filter: brightness(0) opacity(0.82)` for ink colour on light, `filter: brightness(0) invert(1) opacity(0.82)` on dark
8. **Static export** — no server-side features (no API routes, no `getServerSideProps`)

---

## Quick file lookup

| Task | File to edit |
|---|---|
| Change any page copy | `src/content/site-content.ts` |
| Change service pricing or names | `src/content/site-content.ts` → `lessonPricing` or `offers` |
| Add or change navigation links | `src/content/site-content.ts` → `navigation` |
| Change page layout | `src/app/[page]/page.tsx` |
| Change global styles | `src/app/globals.css` |
| Add a new Tailwind colour | `tailwind.config.ts` + `src/app/globals.css` |
| Change the hero image | `public/hero/hero-coach.png` (replace file, keep same name) |
| Change the logo | `public/logos/gt-logo.png` (replace file, keep same name) |

---

## Commit and deploy

Push to `main` → GitHub Actions auto-deploys to `goodtransformer.ai`. See `knowledge/ops/deployment.md`.
