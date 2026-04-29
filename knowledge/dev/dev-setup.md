# Good Transformer — Development Setup

---

## Prerequisites

- Node.js 18+
- npm (included with Node)

---

## Local setup

```bash
# 1. Clone the repo
git clone https://github.com/[org]/good-transformer.git
cd good-transformer

# 2. Install dependencies
npm install

# 3. Create local env file
cp .env.example .env.local
# Fill in values (see knowledge/ops/env-vars.md)

# 4. Start dev server
npm run dev
```

Dev server runs at `http://localhost:3000`.

---

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Static export to `/out` |
| `npm run lint` | Run ESLint |

---

## Project root

```
/Users/patrickhussey/Desktop/Websites/Fractional AI champion site /
```

The folder name has a trailing space — include it in all paths.

---

## Environment variables

Local dev uses `.env.local`. See `knowledge/ops/env-vars.md` for descriptions.

Minimum viable dev setup (can use placeholder values):
```
NEXT_PUBLIC_FORMSPREE_PERSONAL_ENDPOINT=https://formspree.io/f/placeholder
NEXT_PUBLIC_FORMSPREE_BOOKING_ENDPOINT=https://formspree.io/f/placeholder
NEXT_PUBLIC_CLARITY_CALL_URL=https://cal.com/placeholder
```

---

## Static export notes

The site uses `output: 'export'` in `next.config.ts`. This means:
- No API routes
- No server actions
- Images use `unoptimized: true`
- Build output goes to `/out` directory

---

## TypeScript

Strict mode enabled. All components are typed. Content types are exported from `src/content/site-content.ts`.

---

## ESLint

Config in `eslint.config.mjs`. Runs on all `src/**/*.{ts,tsx}` files.

---

## Fonts

Google Fonts are loaded at build time via `next/font/google` in `src/app/layout.tsx`. No external font requests at runtime in production.
