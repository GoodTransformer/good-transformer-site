# Good Transformer — Visual Rules

The design system is **warm, editorial, and premium** — not cool-blue SaaS, not generic beige. Think ink on paper, a well-lit study, a trusted adviser's desk.

For raw token values see `brand-tokens.json`.

---

## Core principles

| Principle | Rule |
|---|---|
| Backgrounds | Warm paper tones — never pure white (`#fff`), never cool grey |
| Text | Dark ink — never pure black, never mid-grey alone |
| Accent | Teal only — used for interactive moments, not decoration |
| Warmth | Small amber details in illustration only — never UI |
| Landing heroes | One full-bleed composition — not a dashboard, card grid, collage, or stack of promos |
| Brand | Brand/product name must be a hero-level signal on branded pages |

---

## Colour usage

### Backgrounds

| Surface | Class / CSS | When to use |
|---|---|---|
| Page body | `body` gradient (`#F3EEE6 → #ECE5DB`) | Default — applied by `body` in `globals.css` |
| Hero section | `.hero-stage-v2` | Homepage hero panel |
| Light section | default (inherits body gradient) | Most content sections |
| Blue-neutral band | `.bg-soft-blue` | Role/services intro section — one per page max |
| Warm paper band | `.bg-warm-paper` | Editorial sections, Patrick bio, testimonial area |
| Dark panel | `bg-ink` with `text-paper` | Final CTA sections only |

**Never use:** `bg-white`, `bg-gray-*`, or any cool blue/grey as a section background. The exception is `.bg-soft-blue` (a custom class that blends warm-neutral with a subtle teal-cool gradient).

### Text

| Context | Class |
|---|---|
| Headlines, primary | `text-ink` |
| Body, supporting | `text-slate` |
| Captions, muted | `text-slate` or `text-ink/65` |
| On dark surfaces | `text-paper` or `text-paper/74` |
| Teal accent word (e.g. "AI") | `text-brass` |

### Teal accent — when and how

Teal (`#008C95`, alias `brass`) is the **only UI accent colour**.

✅ **Use teal for:**
- The word "AI" in hero headlines (`text-brass`)
- CTA card borders (`border-brass`)
- Icon rings and small icons (`text-brass` or `text-accent-teal-bright`)
- Active/focus states on interactive elements
- Primary action buttons (bordered/ghost preferred over solid fill)
- Animated rule lines, arrows

❌ **Do not use teal for:**
- Large background fills or section bands
- Body text (use `text-accent-teal-deep` if teal must be used on small text)
- Decorative splashes covering more than a small element

### Warm amber — illustration only

`#C4873A` (warm amber) is permitted **only** in:
- Illustration details (robot labels, diagram annotations)
- Marketing imagery warmth

Never use for buttons, borders, text, or any interactive/UI element.

---

## Section patterns

### Landing-page hero budget

The first viewport should usually contain only:
- Brand or product name as a primary signal
- One headline
- One short supporting sentence
- One CTA group
- One dominant full-bleed image or atmospheric visual plane

Do not place stats, schedules, event listings, metadata rows, promos, proof strips, route cards, badges, or extra marketing blocks in the first viewport. If an older component still contains those patterns, treat them as legacy implementation details rather than design guidance.

### Standard content section
```jsx
<section className="section-divider">
  <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12 lg:py-24">
    {/* content */}
  </div>
</section>
```

### Blue-neutral intro band (home role section)
```jsx
<section className="section-divider bg-soft-blue">
```

### Warm paper editorial band (Patrick bio, testimonials)
```jsx
<section className="section-divider bg-warm-paper">
```

### Dark final CTA
```jsx
<section className="section-divider bg-ink text-paper">
```

---

## Panels and interactive containers

Default to no cards. Use borders, shadows, backgrounds, and radii only when they clarify interaction or meaning. Never use decorative cards in the hero.

### Offer panel (light surface)
```jsx
<article className="offer-panel">
```
This is a pre-built CSS class. Produces a warm paper panel with line border.

### Legacy route card classes

These classes still exist for the current home hero implementation, but they are not the preferred pattern for new hero work.

```jsx
<div className="hero-route-card hero-route-card--dark">
```
Near-black background (`rgba(3,24,28,0.96)`) with paper text and teal borders.

```jsx
<div className="hero-route-card hero-route-card--light">
```
Near-white (`rgba(255,253,249,0.97)`) with ink text.

---

## Typography

- **Serifs** (Newsreader) for all headlines and editorial display text
- **Sans** (Schibsted Grotesk) for body copy, UI labels, and navigation
- Use `font-serif` on `h1`, `h2`, `h3`, blockquotes
- Use `leading-[1.0]` or above on italic serif headlines to prevent ascender clipping
- Use `tracking-[-0.018em]` on large display serif for tighter premium feel

---

## Dark surface rules

- Text: `#F1ECE4` (paper) or white — never ink
- Accent: teal for icon rings, arrows, borders, active highlights only — no large teal fills
- Do not use warm amber on dark surfaces

---

## Logo

See `knowledge/brand/logo-usage.md` for full guidance.

- Light surface: `filter: brightness(0) opacity(0.82)` (renders as ink)
- Dark surface: `filter: brightness(0) invert(1) opacity(0.82)` (renders as white/paper)

---

## What to avoid

| ❌ Don't | ✅ Do instead |
|---|---|
| Pure white backgrounds | Use `#F1ECE4` (paper) or body gradient |
| Cool grey sections | Use body gradient or `.bg-warm-paper` |
| Old brass `#A5701E` | Use teal `#008C95` |
| Solid large teal fills | Use teal for borders, text, small icons |
| Sans serif headlines | Use `font-serif` for all h1/h2/h3 |
| Hardcoded copy in components | All copy in `src/content/site-content.ts` |
