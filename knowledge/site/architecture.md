# Good Transformer — Site Architecture

---

## Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 15 | Static export (`output: 'export'`) |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS + custom CSS | `tailwind.config.ts` + `globals.css` |
| Fonts | Google Fonts via `next/font` | Newsreader (serif), Schibsted Grotesk (sans) |
| Forms | Formspree | Environment variables for endpoints |
| Hosting | GitHub Pages | Custom domain `goodtransformer.ai` |
| Deploy | GitHub Actions | Push to `main` triggers build |

---

## Directory structure

```
/
├── AGENTS.md                    ← AI agent navigation (start here)
├── README.md                    ← Developer quick-start
├── COLOURS.md                   ← Brand colour quick reference
├── knowledge/                   ← Full knowledge base (this folder)
│
├── src/
│   ├── app/                     ← Next.js App Router pages
│   │   ├── layout.tsx           ← Root layout (fonts, header, footer)
│   │   ├── globals.css          ← CSS custom properties + component classes
│   │   ├── page.tsx             ← Home page
│   │   ├── about/page.tsx       ← About page
│   │   ├── services/page.tsx    ← Services page
│   │   ├── patrick/page.tsx     ← Patrick Hussey page
│   │   └── book/
│   │       ├── page.tsx         ← Booking hub page
│   │       ├── personal/page.tsx← Personal lesson booking
│   │       └── business/page.tsx← Business call booking
│   │
│   ├── components/              ← Reusable React components
│   │   ├── site-header.tsx      ← Navigation header
│   │   ├── site-footer.tsx      ← Footer
│   │   ├── home-hero.tsx        ← Homepage hero section
│   │   ├── animated-reveal.tsx  ← Scroll-triggered reveal animation
│   │   ├── artefact-deck.tsx    ← Document artefact cards (proof section)
│   │   ├── client-logo-strip.tsx← Client logos row
│   │   ├── cta-group.tsx        ← CTA button pair
│   │   ├── faq-list.tsx         ← Accordion FAQ list
│   │   ├── page-intro.tsx       ← Page header/intro pattern
│   │   └── booking-form.tsx     ← Business brief intake form
│   │
│   ├── content/
│   │   └── site-content.ts      ← ALL copy and structured data
│   │
│   └── lib/
│       └── public-base-path.ts  ← Asset path helper
│
├── public/
│   ├── hero/
│   │   └── hero-coach.png       ← Home hero illustration (woman + AI coach)
│   ├── logos/
│   │   ├── gt-logo.png          ← Brand mark (circuit tree, alpha PNG)
│   │   ├── google.svg
│   │   ├── microsoft.svg
│   │   ├── oneadvanced.svg
│   │   └── sana-commerce.svg
│   └── patrick/
│       └── patrick-portrait.jpg ← Patrick portrait for Patrick page
│
├── tailwind.config.ts
├── next.config.ts
└── .github/workflows/
    └── deploy-pages.yml         ← GitHub Actions deploy
```

---

## Key architectural decisions

### Static export

`next.config.ts` uses `output: 'export'`. This means:
- No server-side rendering or API routes
- All pages are pre-rendered at build time to static HTML
- No `getServerSideProps` or server actions
- Images use `unoptimized: true` (GitHub Pages can't run Next.js image optimisation)

### Single content source

All copy, navigation, service descriptions, FAQs, testimonials, and structured data live in **one file**: `src/content/site-content.ts`. Components receive this data as props. Never hardcode strings in component files.

### CSS architecture

Two layers:
1. **Tailwind utilities** — layout, spacing, colour (uses CSS custom properties via `rgb(var(--color-*) / alpha)`)
2. **Custom component classes** in `globals.css` — complex multi-property patterns (`.hero-stage-v2`, `.offer-panel`, `.roadmap-step`, etc.)

### Font loading

Fonts are loaded via `next/font/google` in `layout.tsx` and injected as CSS variables (`--font-sans`, `--font-serif`), then applied globally in the `body` and through Tailwind's `font-serif` / `font-sans` utilities.

---

## Build commands

```bash
npm run dev      # Local dev server (localhost:3000)
npm run build    # Production static export to /out
npm run lint     # ESLint
```

Build output goes to `/out` — this is what GitHub Pages serves.
