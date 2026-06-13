# Good Transformer - Brand Colour Guide

This document is the human quick reference for brand colours. The canonical machine-readable token source is `knowledge/brand/brand-tokens.json`. Use this guide when creating marketing assets, social graphics, illustrations, presentations, or any visual output that should look like Good Transformer.

---

## Guiding principles

The palette is **warm, editorial, and premium** - not cool-blue SaaS, not generic beige. Think ink on paper, a well-lit study, a trusted adviser's desk. Teal is the only accent. Everything else is warm neutrals and dark ink.

- **Backgrounds** are warm paper tones - never pure white, never cool grey
- **Text** is dark ink - never pure black, never mid-grey on its own
- **Accent** is teal - used for interactive elements, highlights, and key moments only
- **Warm amber** is a secondary accent - used sparingly for illustrative warmth only

---

## Core palette

### Ink & text

| Name | Hex | RGB | Use |
|---|---|---|---|
| Ink | `#121B22` | `18, 27, 34` | Main headlines, body copy, primary text - the default text colour |
| Slate | `#49535C` | `73, 83, 92` | Secondary text, captions, supporting copy |
| Line | `#11202B` | `17, 32, 43` | Dividers, hairlines, subtle borders |

### Paper & surfaces

| Name | Hex | RGB | Use |
|---|---|---|---|
| Paper | `#F1ECE4` | `241, 236, 228` | Primary light surface, cards, section backgrounds |
| Sand | `#E9E2D6` | `233, 226, 214` | Alternate light surface, slightly deeper than paper |
| Mist | `#CFC7BA` | `207, 199, 186` | Subtle borders, muted dividers, faint overlays |
| Glow | `#F8EDE0` | `248, 237, 224` | Warm highlight, near-white surfaces that need warmth |

### Body background gradient

The site body uses a three-stop warm gradient. Use this for any full-page or large-area background.

```
Top:    #F3EEE6
Middle: #F0EADF
Bottom: #ECE5DB
```

CSS:
```css
background: linear-gradient(180deg, #F3EEE6 0%, #F0EADF 54%, #ECE5DB 100%);
```

### Hero background gradient

Used for the homepage hero section. Warmer and slightly lighter than the body gradient.

```
Top:    #F3EEE6
Mid:    #F1ECE4
Bottom: #ECE5DB
```

CSS:
```css
background: linear-gradient(180deg, #F3EEE6 0%, #F1ECE4 45%, #ECE5DB 100%);
```

### Warm paper section gradient

Used for content sections that need a warm paper band (e.g. roadmap, editorial sections).

```
Start: #F3EEE2
End:   #EBE1D0
```

---

## Accent - Teal system

Teal is the **only UI accent**. It signals interactivity, highlights key words, and draws the eye to important moments. Do not use it for large fills or backgrounds.

| Name | Hex | RGB | Use |
|---|---|---|---|
| Teal (primary) | `#008C95` | `0, 140, 149` | Main accent - "AI" word highlight, CTA borders, icon rings, active states, primary buttons |
| Teal Deep | `#006F7A` | `0, 111, 122` | Teal on smaller text where `#008C95` lacks contrast; hover states; pressed states |
| Teal Bright | `#00A6B2` | `0, 166, 178` | Arrows, fine divider rules, small icon strokes, subtle animated lines |
| Teal Wash | `#D6F3F4` | `214, 243, 244` | Very light teal tint - badge backgrounds, subtle highlights, never a large fill |
| Soft Blue | `#D8E8EC` | `216, 232, 236` | Section band backgrounds where a light cool-neutral is needed |

### Teal usage rules

- ✅ Icon ring borders
- ✅ CTA card borders
- ✅ Arrow glyphs and animated lines
- ✅ The word "AI" in headlines
- ✅ Focus outlines and keyboard navigation indicators
- ✅ Form input focus borders
- ✅ Active checkboxes and radio buttons
- ✅ Primary action buttons (use solid teal background sparingly - prefer bordered or ghost)
- ❌ Large background fills
- ❌ Body text (unless contrast has been checked - use Teal Deep for small text)
- ❌ Decorative splashes or washes covering more than a small element

---

## Secondary accent - Warm amber

Used **only** for illustrative warmth. Never use as a UI accent.

| Name | Hex | RGB | Use |
|---|---|---|---|
| Warm Amber | `#C4873A` | `196, 135, 58` | Illustration details, diagram labels, blackboard writing, small decorative marks in marketing imagery |

### Warm amber rules

- ✅ Robot head labels or tags in AI imagery
- ✅ Tiny diagram annotations
- ✅ Illustrative warmth in brand graphics
- ❌ Buttons, borders, interactive elements
- ❌ Text (too low contrast on paper backgrounds)
- ❌ Large fills or backgrounds

---

## UI - Blue-grey

| Name | Hex | RGB | Use |
|---|---|---|---|
| Blue-grey (Copper) | `#70828D` | `112, 130, 141` | Form interactions on personal booking flow, secondary icon colour, muted UI chrome |

---

## Dark surfaces

| Name | Hex / RGBA | Use |
|---|---|---|
| Dark panel | `rgba(3, 24, 28, 0.96)` | Dark CTA panels and legacy current-hero route/signal elements - near-black with a warm dark-teal undertone |
| Dark bg | `#08070F` | Full dark backgrounds if ever needed |

### Rules for dark surfaces

- Text on dark surfaces: use `#F1ECE4` (paper) or pure white - never ink
- Accent on dark surfaces: teal for icon rings, arrows, borders, and active highlights only - no large teal fills
- Do not use warm amber on dark surfaces

---

## Accessibility

| Pairing | Contrast | Status |
|---|---|---|
| Ink `#121B22` on Paper `#F1ECE4` | ~14:1 | ✅ AAA |
| Ink `#121B22` on Glow `#F8EDE0` | ~13:1 | ✅ AAA |
| Teal `#008C95` on Paper `#F1ECE4` | ~3.8:1 | ✅ AA large text / UI |
| Teal Deep `#006F7A` on Paper `#F1ECE4` | ~5.1:1 | ✅ AA body text |
| Paper `#F1ECE4` on Dark card `rgba(3,24,28,0.96)` | ~13:1 | ✅ AAA |
| Teal Bright `#00A6B2` on Dark card | ~4.6:1 | ✅ AA |

**Rule:** Use `#008C95` for teal accents at 18px+ or bold. Use `#006F7A` for teal body text or small labels.

---

## Quick reference - all hex values

```
#121B22   Ink
#49535C   Slate
#11202B   Line

#F1ECE4   Paper
#E9E2D6   Sand
#CFC7BA   Mist
#F8EDE0   Glow

#F3EEE6   Body gradient top
#F0EADF   Body gradient middle
#ECE5DB   Body gradient bottom

#008C95   Teal (primary accent)
#006F7A   Teal Deep
#00A6B2   Teal Bright
#D6F3F4   Teal Wash

#C4873A   Warm Amber (secondary - use sparingly)

#70828D   Blue-grey / Copper (form UI)
#D8E8EC   Soft Blue (section bands)
```

---

## For AI agents generating brand assets

When creating any image, graphic, slide, social post, or document for Good Transformer:

1. **Background** - use the body gradient (`#F3EEE6 → #ECE5DB`) or flat `#F1ECE4`. Never white, never cool grey.
2. **Text** - `#121B22` for headlines and body. `#49535C` for secondary copy.
3. **Accent moments** - `#008C95` teal. One or two touches per composition maximum.
4. **Arrows, lines, fine detail** - `#00A6B2` teal bright.
5. **Illustrative warmth** - a small touch of `#C4873A` warm amber is permitted in imagery (e.g. a label, a highlight on a diagram). Do not overuse.
6. **Dark panels** - `rgba(3, 24, 28, 0.96)` with paper/white text and teal-only accents.
7. **No brass, gold, brown, or yellow** - the old brass accent (`#A5701E`) has been retired. Do not use it.
8. **No cool blue** - avoid `#DCECF0` or similar cool blues as backgrounds. Teal wash (`#D6F3F4`) is permitted in very small amounts only.
9. **Logo mark** - the circuit tree SVG/PNG is available at `public/logos/gt-logo.png`. Render it in ink (`#121B22`) on light surfaces or in paper/white on dark surfaces.
