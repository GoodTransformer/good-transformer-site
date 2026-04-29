# Good Transformer — Asset Guide

All public assets live in `/public`. Next.js serves them from the root path.

---

## Hero illustration

| File | Path | Description |
|---|---|---|
| Hero image | `public/hero/hero-coach.png` | Home page hero — woman + AI coach at desk scene. Warm illustration, right-aligned composition. |

**Replacing the hero image:**
- Keep the filename `hero-coach.png` so no code changes are needed
- PNG format preferred (transparent or white background — white is handled by `.hero-paper-plane` overlay)
- Composition: use it as a dominant full-bleed visual plane, not an inset image/card/collage
- Subject should sit in the right half, leaving the left clear for text overlay
- Colour mood: warm, not cool
- Do not add badges, labels, stickers, or callout boxes on top of the hero media

---

## Brand mark

| File | Path | Description |
|---|---|---|
| Logo | `public/logos/gt-logo.png` | Circuit tree mark. True alpha transparency PNG. |

**Usage:** See `knowledge/brand/logo-usage.md` for filter treatments.

**Replacing the logo:**
- Keep filename `gt-logo.png`
- Must be a PNG with true alpha transparency (no baked-in white background)
- SVG is preferred if an SVG version becomes available
- Aspect ratio: roughly square or slightly taller than wide

---

## Client / proof logos

| File | Path | Client |
|---|---|---|
| `google.svg` | `public/logos/google.svg` | Google |
| `microsoft.svg` | `public/logos/microsoft.svg` | Microsoft |
| `oneadvanced.svg` | `public/logos/oneadvanced.svg` | OneAdvanced |
| `sana-commerce.svg` | `public/logos/sana-commerce.svg` | Sana Commerce |

These are referenced in `proofSignals.organisations` in `site-content.ts`. Each entry includes:
- `name` — display name
- `src` — path from `/public` root
- `width`, `height` — intrinsic dimensions
- `maxWidth` — max display width in `rem` (controls relative size in the logo strip)

**Adding a new client logo:**
1. Add SVG to `public/logos/[slug].svg`
2. Add entry to `proofSignals.organisations` in `site-content.ts`

---

## Patrick portrait

| File | Path | Description |
|---|---|---|
| Portrait | `public/patrick/patrick-portrait.jpg` | Patrick Hussey headshot for `/patrick` page |

---

## Asset naming conventions

- All filenames are lowercase, hyphen-separated
- No spaces in filenames
- SVG for logos and icons (scales cleanly)
- PNG for illustrations with transparency
- JPG for photography
- Keep original/backup copies in `GT Back Up assets/` on desktop (not in the repo)

---

## Static export note

Because the site uses `output: 'export'`, Next.js image optimisation is disabled (`unoptimized: true` in `next.config.ts`). All images are served as-is. Optimise images manually before adding to `public/`:
- Compress PNGs with tools like TinyPNG
- Compress JPGs to ~80% quality
- SVGs should be cleaned/minified
