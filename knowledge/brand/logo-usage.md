# Good Transformer - Logo Usage

---

## The mark

The Good Transformer logo mark is a **circuit tree** - a tree whose branches are formed from circuit board traces. It represents the intersection of technology and growth.

**File:** `public/logos/gt-logo.png`

This is a PNG with true alpha transparency (no white background). It is used alongside the wordmark "Good Transformer" in the site header, home nav, and footer.

---

## Colour treatments

The PNG is rendered as a single-colour flat mark using CSS filters. **Do not use the raw PNG colour** - always apply one of these treatments:

### On light surfaces (paper, warm backgrounds)

```css
filter: brightness(0) opacity(0.82);
```
Renders the mark in ink (`#041F25` at ~82% opacity).

```jsx
<img src="/logos/gt-logo.png" alt="" aria-hidden="true" className="h-8 w-auto" style={{filter: 'brightness(0) opacity(0.82)'}} />
```

### On dark surfaces (dark CTA panels, dark cards)

```css
filter: brightness(0) invert(1) opacity(0.82);
```
Renders the mark in white/paper at ~82% opacity.

### In the footer (slightly more muted)

```css
filter: brightness(0) opacity(0.72);
```
Slightly reduced opacity for the smaller footer context.

---

## Sizing

| Context | Height |
|---|---|
| Site header | `h-8` (2rem / 32px) |
| Home hero nav | `h-8` (2rem / 32px) |
| Footer | `h-8` (2rem / 32px) |
| Minimum legible size | 24px height |

Always set `w-auto` to maintain aspect ratio.

---

## Spacing

The mark sits alongside the wordmark "Good Transformer" with `gap-2` (8px) between them.

```jsx
<div className="flex items-center gap-2">
  <img src="/logos/gt-logo.png" alt="" aria-hidden="true" className="h-8 w-auto" style={{filter: '...'}} />
  <span>{siteConfig.brand}</span>
</div>
```

The `img` carries `alt=""` and `aria-hidden="true"` because the visible wordmark provides the accessible label.

---

## Where the logo appears

| Location | Component | Treatment |
|---|---|---|
| Site header | `src/components/site-header.tsx` | ink, `opacity(0.82)` |
| Site footer | `src/components/site-footer.tsx` | ink, `opacity(0.72)` |

---

## What not to do

- ❌ Do not use the raw PNG colour (it may appear silver/grey)
- ❌ Do not put the mark on a coloured background fill without checking contrast
- ❌ Do not use the mark without the wordmark at body scale
- ❌ Do not scale below 24px height
- ❌ Do not apply shadows, glows, or decorative effects
