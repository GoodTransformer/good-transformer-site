# Good Transformer — Tailwind Configuration

**File:** `tailwind.config.ts`

---

## Content scanning

```ts
content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"]
```

---

## Extended colours

All colours reference CSS custom properties (RGB triplets) to enable Tailwind's alpha modifier syntax (`text-ink/72`, `bg-paper/90`, etc.).

```ts
colors: {
  sand:   "rgb(var(--color-sand) / <alpha-value>)",
  paper:  "rgb(var(--color-paper) / <alpha-value>)",
  mist:   "rgb(var(--color-mist) / <alpha-value>)",
  ink:    "rgb(var(--color-ink) / <alpha-value>)",
  slate:  "rgb(var(--color-slate) / <alpha-value>)",
  copper: "rgb(var(--color-copper) / <alpha-value>)",
  brass:  "rgb(var(--color-brass) / <alpha-value>)",   // teal #008C95
  moss:   "rgb(var(--color-moss) / <alpha-value>)",
  line:   "rgb(var(--color-line) / 0.14)",             // always 14% opacity
  glow:   "rgb(var(--color-glow) / 0.7)",              // always 70% opacity
}
```

**Key alias:** `brass` = teal (`#008C95`). This naming is a legacy holdover — the colour is teal.

---

## Extended fonts

```ts
fontFamily: {
  sans: ["var(--font-sans)"],   // Schibsted Grotesk
  serif: ["var(--font-serif)"], // Newsreader
}
```

---

## Extended shadows

```ts
boxShadow: {
  glow: "0 28px 80px rgba(10, 20, 26, 0.18)"
}
```
Used for card lift effect.

---

## Extended letter spacing

```ts
letterSpacing: {
  display: "0.22em"  // For brand mark / page-eyebrow labels
}
```

---

## Extended background images

```ts
backgroundImage: {
  haze: "radial-gradient(circle at top, ...) linear-gradient(...)"
}
```
Used for dark background haze effect.

---

## Custom animations

```ts
keyframes: {
  drift: { // legacy; avoid for new homepage hero work
    "0%, 100%": { transform: "scale(1.02) translate3d(0, 0, 0)" },
    "50%": { transform: "scale(1.08) translate3d(-1.5%, 1%, 0)" }
  },
  rise: {
    from: { opacity: "0", transform: "translate3d(0, 30px, 0)" },
    to:   { opacity: "1", transform: "translate3d(0, 0, 0)" }
  },
  lineSweep: {
    from: { transform: "scaleX(0)", transformOrigin: "left" },
    to:   { transform: "scaleX(1)", transformOrigin: "left" }
  }
}

animation: {
  drift:  "drift 22s ease-in-out infinite", // legacy
  rise:   "rise 0.8s ease forwards",
  line:   "lineSweep 1.1s ease forwards"
}
```

---

## Adding a new brand colour

1. Add the CSS variable to `globals.css` `:root` block:
   ```css
   --color-new-name: R G B;   /* RGB triplet, no commas */
   ```
2. Add to `tailwind.config.ts` colours:
   ```ts
   "new-name": "rgb(var(--color-new-name) / <alpha-value>)"
   ```
3. Use as `text-new-name`, `bg-new-name`, `border-new-name`
