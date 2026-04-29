# Good Transformer

Personal AI lessons and fractional AI advisory — [goodtransformer.ai](https://goodtransformer.ai)

> **AI agents and developers:** Start with [`AGENTS.md`](./AGENTS.md) for navigation, then see the [`knowledge/`](./knowledge/) folder for detailed reference on brand, components, content, and deployment.

## Stack

- Next.js 15 (static export)
- TypeScript
- Tailwind CSS

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in your values:

```bash
NEXT_PUBLIC_FORMSPREE_PERSONAL_ENDPOINT=https://formspree.io/f/your-personal-form-id
NEXT_PUBLIC_FORMSPREE_BOOKING_ENDPOINT=https://formspree.io/f/your-booking-form-id
NEXT_PUBLIC_CLARITY_CALL_URL=https://your-calendar-link
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Project structure

- `src/app` — pages: Home, Services, Patrick, About, Book
- `src/content/site-content.ts` — all copy and structured content
- `src/components` — layout, motion, CTA, FAQ, booking, and artefact components
- `public/hero/hero-coach.png` — home page hero illustration (woman + coach robot)
- `public/logos/gt-logo.png` — brand mark (circuit tree, transparent PNG)

## Brand colours

All variables are defined in `src/app/globals.css` and mapped to Tailwind utilities in `tailwind.config.ts`.

| Variable | Value | Use |
|---|---|---|
| `--color-ink` | `#121B22` | Body text, headlines |
| `--color-slate` | `#49535C` | Secondary text |
| `--color-paper` | `#F1ECE4` | Light surface |
| `--color-sand` | `#E9E2D6` | Alternate light surface |
| `--color-mist` | `#CFC7BA` | Borders, dividers |
| `--color-glow` | `#F8EDE0` | Warm highlight |
| `--color-brass` | `#008C95` | Primary accent (teal) |
| `--color-accent-teal-deep` | `#006F7A` | Teal on small text / high contrast |
| `--color-accent-teal-bright` | `#00A6B2` | Arrows, icon rings, fine rules |
| `--color-accent-teal-wash` | `#D6F3F4` | Teal tint backgrounds |
| `--color-warm-amber` | `#C4873A` | Secondary accent — use sparingly |
| `--color-copper` | `#70828D` | Blue-grey — form interactions |
| `--color-soft-blue` | `#D8E8EC` | Section band backgrounds |

## Deployment

Deploys automatically to GitHub Pages on push to `main` via [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

Environment variables are injected at build time from GitHub Secrets (`NEXT_PUBLIC_FORMSPREE_PERSONAL_ENDPOINT`, `NEXT_PUBLIC_FORMSPREE_BOOKING_ENDPOINT`, `NEXT_PUBLIC_CLARITY_CALL_URL`). The `.env.production` file provides fallback values if secrets are not set.

The site uses a custom domain (`goodtransformer.ai`) — no `basePath` or `assetPrefix` is needed.
