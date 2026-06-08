# Good Transformer — Component Library

All components live in `src/components/`. This document covers props, purpose, and usage patterns.

---

## Layout components

### `SiteHeader` — `site-header.tsx`

Global navigation bar rendered on every page via `layout.tsx`.

**Features:**
- Brand logo (circuit tree PNG) + wordmark
- Navigation links from `navigation` in `site-content.ts`
- Desktop top-right "Book a lesson" CTA
- Mobile menu button and slide-down mobile nav
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

Design intent: the first viewport should read as one branded composition, not a dashboard. The current approved homepage hero contains one headline, intro/support copy, two route cards, a compact proof strip, and the right-side AI confidence stack. Preserve this structure unless the homepage hero is explicitly being redesigned.

**Props:**
```ts
{
  title: string           // Main headline (e.g. "Get confident with AI")
  descriptor: string      // Subtitle paragraph
  support: string         // Supporting paragraph (smaller, muted)
  routes: Array<{         // Current route CTAs consumed by HomeHero
    label: string         // e.g. "For individuals"
    title: string         // e.g. "Book a lesson"
    body: string
    href: string
    tone: "light" | "dark"
  }>
  signals: Array<{        // Current compact proof strip items
    title: string
    body: string
  }>
}
```

**Key details:**
- Uses `.hero-stage-v2` for exact paper background (`#FAF3EA`)
- Uses `public/hero/attention-flow-the-path-to-ai-mastery-web.webp` for the desktop-only right-side stack visual
- The word "AI" in the title is automatically highlighted in teal via `HighlightedTitle` (internal component)
- `leading-[1.0]` on the h1 is important — do not reduce below 1.0 or italic ascenders clip
- The route-card and signal-strip classes are approved homepage-specific implementation details. Do not copy them into new hero designs.

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

### `ServiceContactPrompt` — `service-contact-prompt.tsx`

Renders the compact service enquiry line and linked email address used above booking forms, on the booking chooser, and in the footer. Copy and the email address live in `serviceContact` in `site-content.ts`.

**Props:**
```ts
{
  className?: string
  compact?: boolean
}
```

---

### `BookingForm` — `booking-form.tsx`

Business brief intake form. Submits to Formspree.

Renders the multi-step form for `/book/business`. Reads field options from `bookingForm` in `site-content.ts`.

---

## CSS utility classes (applied via `className`)

See `knowledge/components/css-patterns.md` for the full list of custom CSS classes used alongside Tailwind utilities.
