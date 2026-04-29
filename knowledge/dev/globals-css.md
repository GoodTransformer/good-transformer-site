# Good Transformer — globals.css Reference

**File:** `src/app/globals.css`

This file contains all CSS custom properties, global resets, and component-level CSS classes. It is the other half of the styling system alongside `tailwind.config.ts`.

---

## CSS custom properties

Two `:root` blocks. The second block (`/* Good Transformer 2026 direction */`) is the canonical set.

### First block (base colours — do not change without updating Tailwind config)

```css
:root {
  --color-bg-dark: 8 12 16;
  --color-text-primary: 245 241 236;
  --color-text-secondary: 210 217 223;
  --color-accent: 112 130 141;
  --color-button-fill: 245 241 236;
  --color-button-border: 218 225 230;
  --color-paper: 241 236 228;       /* #F1ECE4 */
  --color-sand: 233 226 214;        /* #E9E2D6 */
  --color-mist: 207 199 186;        /* #CFC7BA */
  --color-ink: 18 27 34;            /* #121B22 */
  --color-slate: 73 83 92;          /* #49535C */
  --color-copper: 112 130 141;      /* #70828D */
  --color-moss: 95 108 99;
  --color-line: 17 32 43;           /* #11202B */
  --color-glow: 248 237 224;        /* #F8EDE0 */
}
```

### Second block (2026 teal accent system)

```css
:root {
  --color-brass: 0 140 149;         /* #008C95 — teal primary */
  --color-soft-blue: 216 232 236;   /* #D8E8EC */
  --color-accent-teal-deep: 0 111 122;    /* #006F7A */
  --color-accent-teal-bright: 0 166 178;  /* #00A6B2 */
  --color-accent-teal-wash: 214 243 244;  /* #D6F3F4 */
  --color-warm-amber: 196 135 58;   /* #C4873A */
}
```

All values are **RGB triplets** (space-separated, no commas). This allows Tailwind's `/ alpha` modifier syntax.

---

## Global styles

### Body
```css
body {
  background:
    radial-gradient(circle at top, rgba(112,130,141,0.08), transparent 26%),
    linear-gradient(180deg, #f3eee6 0%, #f0eadf 54%, #ece5db 100%);
  color: rgb(var(--color-ink));
  font-family: var(--font-sans), sans-serif;
}
```

### Site frame (applied to `body` via layout)
`.site-frame` adds:
- A subtle vertical grid texture (fades out ~88% down the page)
- Soft radial glows at top corners
Both are cosmetic and pointer-events: none.

---

## Component classes

### Section layout
- `.section-divider` — hairline top border between sections
- `.page-eyebrow` — tiny all-caps label above headings

### Background bands
- `.bg-soft-blue` — blue-neutral gradient (roles section)
- `.bg-warm-paper` — warm paper gradient (Patrick/testimonial section)

### Hero
- `.hero-stage-v2` — full hero background
- `.hero-illustration-wrap` — image container with inset and scale
- `.hero-illustration` — cover image with filter and drift animation
- `.hero-paper-plane` — left-to-right fade overlay over image
- `.hero-atmosphere` — atmospheric radial glow
- `.hero-route-card` — legacy current-hero CTA card class; do not copy into new hero work
- `.hero-route-card--light` — legacy near-white variant
- `.hero-route-card--dark` — legacy dark teal-black variant
- `.hero-v2-copy` — text block container

### Panels
- `.offer-panel` — light paper panel
- `.roadmap-step` — numbered roadmap panel

### Typography
- `.text-link` — underline hover link
- `.button-light` — light surface button
- `.button-ghost-light` — ghost button for dark surfaces

### Artefact / document cards
- `.artifact-sheet` — document sheet base
- `.artifact-sheet--governance` — governance variant (larger title)
- `.artifact-sheet-label` — small category label
- `.artifact-sheet-title` — document title
- `.artifact-sheet-subtitle` — subtitle line
- `.artifact-sheet-row` — table-style row

---

## Adding new component classes

Add to `globals.css` after the `/* Good Transformer 2026 direction */` block. Use `@layer components` if you want Tailwind's purge to apply, or write directly if the class is always needed.

---

## Important: do not use `#A5701E`

The old warm brass colour has been retired. All accent work should use `--color-brass` (teal `#008C95`) or the teal system. Any occurrence of `#A5701E` or `rgba(165,112,30,...)` in the codebase should be treated as a bug and replaced with the teal equivalent.
