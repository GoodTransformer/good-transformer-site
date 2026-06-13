# Good Transformer - globals.css Reference

**File:** `src/app/globals.css`

This file contains all CSS custom properties, global resets, and component-level CSS classes. It is the other half of the styling system alongside `tailwind.config.ts`.

---

## CSS custom properties

Two `:root` blocks. The second block (`/* Good Transformer 2026 direction */`) is the canonical set.

### First block (base colours - do not change without updating Tailwind config)

```css
:root {
  --color-bg-dark: 4 31 37;         /* #041F25 */
  --color-text-primary: 251 248 244;/* #FBF8F4 */
  --color-text-secondary: 218 221 220;
  --color-accent: 0 140 149;        /* #008C95 */
  --color-button-fill: 251 248 244; /* #FBF8F4 */
  --color-button-border: 216 209 199;/* #D8D1C7 */
  --color-paper: 250 243 234;       /* #FAF3EA */
  --color-sand: 251 248 244;        /* #FBF8F4 */
  --color-mist: 216 209 199;        /* #D8D1C7 */
  --color-ink: 4 31 37;             /* #041F25 */
  --color-slate: 90 97 102;         /* #5A6166 */
  --color-copper: 0 140 149;        /* #008C95 */
  --color-moss: 0 111 122;          /* #006F7A */
  --color-line: 4 31 37;            /* #041F25 */
  --color-glow: 251 248 244;        /* #FBF8F4 */
}
```

### Second block (2026 teal accent system)

```css
:root {
  --color-brass: 0 140 149;         /* #008C95 - teal primary */
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
  background: #FAF3EA;
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
- `.section-divider` - hairline top border between sections
- `.page-eyebrow` - tiny all-caps label above headings

### Background bands
- `.bg-soft-blue` - blue-neutral gradient (roles section)
- `.bg-warm-paper` - warm paper gradient (Patrick/testimonial section)

### Hero
- `.hero-stage-v2` - homepage hero background, exact `#FAF3EA`
- `.home-hero__layout` - two-column desktop hero grid
- `.home-hero__content` - left hero copy/cards/proof column
- `.home-hero__visual` - right hero visual column
- `.ai-stack-visual` - desktop-only wrapper for the stack image
- `.hero-route-card` - current homepage CTA card class; do not copy into new hero work
- `.hero-route-card--light` - near-white variant
- `.hero-route-card--dark` - dark teal-black variant
- `.hero-v2-copy` - text block container

### Panels
- `.offer-panel` - light paper panel
- `.roadmap-step` - numbered roadmap panel

### Typography
- `.text-link` - underline hover link
- `.button-light` - light surface button
- `.button-ghost-light` - ghost button for dark surfaces

Non-hero buttons use an editorial oblong radius (`0.45rem`), not pills. The homepage hero route cards and top nav CTA have their own established styling.

### Artefact / document cards
- `.artifact-sheet` - document sheet base
- `.artifact-sheet--governance` - governance variant (larger title)
- `.artifact-sheet-label` - small category label
- `.artifact-sheet-title` - document title
- `.artifact-sheet-subtitle` - subtitle line
- `.artifact-sheet-row` - table-style row

---

## Adding new component classes

Add to `globals.css` after the `/* Good Transformer 2026 direction */` block. Use `@layer components` if you want Tailwind's purge to apply, or write directly if the class is always needed.

---

## Important: do not use `#A5701E`

The old warm brass colour has been retired. All accent work should use `--color-brass` (teal `#008C95`) or the teal system. Any occurrence of `#A5701E` or `rgba(165,112,30,...)` in the codebase should be treated as a bug and replaced with the teal equivalent.
