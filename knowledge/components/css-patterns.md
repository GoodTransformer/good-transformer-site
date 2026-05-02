# Good Transformer — CSS Patterns

This covers the custom CSS component classes defined in `src/app/globals.css` and how they combine with Tailwind utilities.

---

## Tailwind colour aliases

These are defined in `tailwind.config.ts` and backed by CSS custom properties in `globals.css`.

| Tailwind utility | CSS var | Hex |
|---|---|---|
| `text-ink` / `bg-ink` | `--color-ink` | `#121B22` |
| `text-slate` / `bg-slate` | `--color-slate` | `#49535C` |
| `text-paper` / `bg-paper` | `--color-paper` | `#F1ECE4` |
| `text-sand` / `bg-sand` | `--color-sand` | `#E9E2D6` |
| `text-mist` / `bg-mist` | `--color-mist` | `#CFC7BA` |
| `text-glow` / `bg-glow` | `--color-glow` | `#F8EDE0` |
| `text-brass` / `bg-brass` / `border-brass` | `--color-brass` | `#008C95` (teal) |
| `text-copper` / `bg-copper` | `--color-copper` | `#70828D` |
| `border-line` | `--color-line` | `#11202B` at 14% opacity |
| `shadow-glow` | — | `0 28px 80px rgba(10,20,26,0.18)` |

**Alpha modifier syntax** — supported on all brand colours:
```
text-ink/72      → ink at 72% opacity
text-paper/74    → paper at 74% opacity
bg-ink/90        → ink background at 90% opacity
```

---

## Section and layout classes

### `.section-divider`
Adds a subtle top border between sections. Apply to every `<section>` element.

### `.page-eyebrow`
Small all-caps label above a heading.
```
font-size: ~0.7rem
letter-spacing: 0.18em
text-transform: uppercase
color: inherit (usually text-brass or text-ink/72)
```

---

## Background classes

### `.bg-soft-blue`
Blue-neutral gradient band with warm radial highlight:
```css
background:
  radial-gradient(circle at 12% 18%, rgba(255,255,255,0.5), transparent 24%),
  linear-gradient(180deg, rgb(221,235,238) 0%, rgb(239,234,222) 100%);
```
Used for: role/services intro section on home.

### `.bg-warm-paper`
Warm paper gradient with subtle teal radial:
```css
background:
  radial-gradient(circle at 82% 10%, rgba(0,140,149,0.06), transparent 26%),
  linear-gradient(180deg, #f3eee2 0%, #ebe1d0 100%);
```
Used for: Patrick bio section, testimonial area.

---

## Hero classes

Hero CSS includes current homepage route-card and signal-strip classes because the approved Good Transformer hero still renders two route cards and a compact proof strip. Treat these as homepage-specific implementation details, not generic patterns to copy into unrelated landing pages.

### `.hero-stage-v2`
Full-viewport homepage hero container with exact warm paper background `#FAF3EA`, `100dvh` height, and `isolation: isolate`.

### `.home-hero__layout`
Two-column desktop hero layout. The left column holds the headline, intro copy, CTA cards, and proof strip. The right column holds the AI confidence stack visual.

### `.ai-stack-visual`
Desktop-only wrapper for the current stack image, `public/hero/attention-flow-the-path-to-ai-mastery-web.webp`. Its outer background must match the page paper exactly (`#FAF3EA`) so the visual reads as part of the hero surface.

### `.hero-route-card`
Base class for the two CTA cards in the current homepage hero.

### `.hero-route-card--light`
Near-white card: `rgba(255,253,249,0.97)` background with ink text.

### `.hero-route-card--dark`
Dark card: `rgba(3,24,28,0.96)` background with paper text and teal borders.

### `.hero-signal-strip`
Legacy proof strip in the current hero. Do not add new hero proof strips, stats, badges, or chips unless a redesign explicitly calls for them outside the first viewport.

### `.hero-v2-copy`
Container for the hero text block — positions copy on top of the image.

---

## Content panels

### `.offer-panel`
Light paper panel with border and padding. Used in the "two routes" section:
```css
background: paper/warm-paper surface
border: 1px border-line
padding: p-6 lg:p-8
```

### `.roadmap-step`
Panel used in the "Learn → Explore → Practice → Adopt → Scale" roadmap:
- Numbered label, heading, and one-line description
- Warm paper background with teal left-border accent on hover

---

## Typography classes

### `.text-link`
Underline-on-hover link style. Used for in-body navigation links.

### `.button-light`
Light surface button (ink text, paper background, line border).

### `.button-ghost-light`
Ghost button on dark surface (paper border, transparent background, paper text).

---

## Animation keyframes (in Tailwind config)

| Name | Trigger | Effect |
|---|---|---|
| `drift` | Auto / infinite | Slow scale + translate on hero image |
| `rise` | On mount / reveal | Fade-up from `translate3d(0,30px,0)` |
| `lineSweep` | On mount | Scale from 0→1 on X axis (left origin) |
| `heroPresence` | Auto / infinite | Defined in globals.css — slow parallax effect on hero illustration |

---

## Site frame effects

The `body` element has `site-frame` class which applies:
- A subtle vertical column grid overlay (very faint, mask-fades out)
- Soft radial light bleed at top-left and top-right

These are cosmetic and do not affect layout.
