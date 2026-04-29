# Good Transformer — Component Library

All components live in `src/components/`. This document covers props, purpose, and usage patterns.

---

## Layout components

### `SiteHeader` — `site-header.tsx`

Global navigation bar rendered on every page via `layout.tsx`.

**Features:**
- Brand logo (circuit tree PNG) + wordmark
- Navigation links from `navigation` in `site-content.ts`
- Scroll-aware opacity behaviour
- No props — reads directly from `siteConfig` and `navigation`

**Usage:** Added once in `layout.tsx`. Do not add to pages directly.

---

### `SiteFooter` — `site-footer.tsx`

Global footer rendered on every page via `layout.tsx`.

**Features:**
- Logo mark + wordmark + descriptor
- Navigation links
- No copyright line (intentional)

**Usage:** Added once in `layout.tsx`.

---

## Hero component

### `HomeHero` — `home-hero.tsx`

The full-screen hero for the homepage only.

Design intent: the first viewport should read as one branded composition, not a dashboard. For future hero work, keep the budget to brand/product signal, one headline, one short supporting sentence, one CTA group, and one dominant full-bleed image.

**Props:**
```ts
{
  title: string           // Main headline (e.g. "Get confident with AI")
  descriptor: string      // Subtitle paragraph
  support: string         // Supporting paragraph (smaller, muted)
  backgroundImageSrc: string  // Path to hero illustration PNG
  routes: Array<{         // Legacy route CTAs currently consumed by HomeHero
    label: string         // e.g. "For individuals"
    title: string         // e.g. "Book a lesson"
    body: string
    href: string
    tone: "light" | "dark"
  }>
  signals: Array<{        // Legacy proof signals currently consumed by HomeHero
    title: string
    body: string
  }>
}
```

**Key details:**
- Uses `.hero-stage-v2` for background (warm gradient)
- The word "AI" in the title is automatically highlighted in teal via `HighlightedTitle` (internal component)
- `leading-[1.0]` on the h1 is important — do not reduce below 1.0 or italic ascenders clip
- The route-card and signal-strip classes are legacy implementation details. Do not copy them into new hero designs; simplify or remove them when redesigning the hero.

---

## Content components

### `AnimatedReveal` — `animated-reveal.tsx`

Wrapper that reveals children with a fade-up animation when scrolled into view.

**Props:**
```ts
{
  children: ReactNode
  className?: string    // Applied to the wrapper div
}
```

**Usage:** Wrap any section of content you want to animate in on scroll:
```jsx
<AnimatedReveal className="max-w-3xl">
  <h2>...</h2>
  <p>...</p>
</AnimatedReveal>
```

**Note:** Uses `IntersectionObserver`. Content is hidden until it enters the viewport — be aware of this when using `window.scrollTo()` in scripts or tests.

---

### `FAQList` — `faq-list.tsx`

Accordion-style FAQ list.

**Props:**
```ts
{
  items: Array<{
    question: string
    answer: string
  }>
}
```

**Usage:**
```jsx
<FAQList items={homePage.faqs} />
```

---

### `ArtefactDeck` — `artefact-deck.tsx`

Shows a row of document artefact panels (used in the Patrick/proof section to show deliverables).

**Props:**
```ts
{
  items: ProofArtefact[]
  // ProofArtefact = { title, label, subtitle, rows: string[] }
}
```

Each card represents a deliverable document (AI direction brief, use-case scorecard, etc.).

---

### `ClientLogoStrip` — `client-logo-strip.tsx`

Horizontal strip of client organisation logos.

**Props:**
```ts
{
  items: ProofOrganisation[]
  assetBasePath: string     // Prefix for image src paths (from publicBasePath)
}
```

Logos are defined in `proofSignals.organisations` in `site-content.ts`.

---

### `PageIntro` — `page-intro.tsx`

Standard page header pattern used on inner pages (Services, About, etc.).

**Props:**
```ts
{
  title: string
  intro?: string
}
```

---

### `CTAGroup` — `cta-group.tsx`

Renders the standard two-CTA pair (personal lesson + business call).

No required props — reads from `siteConfig` directly.

---

### `BookingForm` — `booking-form.tsx`

Business brief intake form. Submits to Formspree.

Renders the multi-step form for `/book/business`. Reads field options from `bookingForm` in `site-content.ts`.

---

## CSS utility classes (applied via `className`)

See `knowledge/components/css-patterns.md` for the full list of custom CSS classes used alongside Tailwind utilities.
