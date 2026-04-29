# Good Transformer — Site Content Guide

**File:** `src/content/site-content.ts`

This is the intended **single source of truth** for editable website copy. Components should receive content as props and should not gain new hardcoded marketing text.

Important caveat: a few legacy strings may still exist in page components, structured data, or utility files. If you are editing one of those strings, move it into this file as part of the change instead of adding another hardcoded string.

---

## Why one file?

- AI agents, developers, and copywriters can update all text without touching component logic
- Consistent vocabulary across pages
- Easy to audit what the site says
- Easier to keep SEO, visible page copy, and booking flows aligned

---

## Exports — what's in the file

### `siteConfig`
Global brand settings used across all pages and components.

```ts
siteConfig.brand          // "Good Transformer"
siteConfig.descriptor     // Tagline / sub-brand description
siteConfig.primaryCta     // { label, href } — generic "Book a call"
siteConfig.personalCta    // { label, href } — personal lesson CTA
siteConfig.businessCta    // { label, href } — business call CTA
```

### `navigation`
Array of `{ href, label }` — the links in the site header.
Currently: Services, Patrick, About.

### `homePage`
All copy for the home page organised by section:
```ts
homePage.hero       // brand, title, descriptor, support, routes[], signals[]
homePage.role       // heading, support
homePage.services   // heading, intro, note
homePage.patrick    // heading, body, frame: { label, heading, body, kicker }
homePage.faqs       // Array<{ question, answer }>
homePage.finalCta   // heading, body
```

`homePage.hero.routes` and `homePage.hero.signals` are currently consumed by the legacy home hero implementation. Do not treat them as permission to add more hero cards, stats, chips, or signal strips. For new landing-page hero work, follow the lean hero budget in `AGENTS.md`.

### `lessonOffers`
Array of two panels for the personal/business offer comparison:
```ts
[
  { name: "Personal AI Lessons", label, purpose, points[], href },
  { name: "Business AI Advisory", label, purpose, points[], href }
]
```

### `offers`
Array of three business engagement tiers (used on Services page and home):
```ts
[
  { name: "AI Reality Check Sprint", duration, purpose, outputs[], fit, cadence[] },
  { name: "90-Day Adoption Build", ... },
  { name: "Fractional Retainer", ... }
]
```

### `lessonPricing`
Personal lesson pricing tiers:
```ts
{
  heading, delivery,
  tiers: [
    { name: "Intro lesson", price: "£75", duration: "1 hr", body },
    { name: "Starter pack", price: "£375", duration: "3 × 1 hr", body },
    { name: "Ongoing rhythm", price: "£250 / month", duration: "2 × 1 hr + async support", body }
  ]
}
```

### `testimonial`
Single featured testimonial:
```ts
{ quote: string, attribution: string }
```

### `proofSignals`
Client logos and proof artefact cards:
```ts
{
  label: string,
  organisations: ProofOrganisation[],  // Client logos (Google, Microsoft, etc.)
  artefacts: ProofArtefact[]           // Document artefact cards
}
```

### `servicesPage`
All copy for `/services`. Includes intro, personal section, business section, sample arc, and close.

### `patrickPage`
All copy for `/patrick`. Includes intro, portrait, and body sections array.

### `aboutPage`
All copy for `/about`. Includes intro and sections: background, ethics, talks, name origin.

### `bookingPage`
All copy for `/book`, `/book/personal`, `/book/business`.

### `bookingForm`
Dropdown options for the business brief form: org sizes, sectors, current state, next steps.

### `operatingModel`
Three operating model rows (Lead / Embed / Enable) for the services page.

---

## How to update copy

1. Open `src/content/site-content.ts`
2. Find the export that corresponds to the page/section
3. Search the codebase for the exact old string to check whether it is hardcoded anywhere else
4. Edit the string value, or move the legacy hardcoded string into this file if needed
5. Save — the change appears immediately in dev server

**Example:** To change the hero headline:
```ts
// In homePage.hero
title: "Get confident with AI",   // ← edit this string
```

---

## Types

Types are exported at the top of the file:
- `LinkItem` — `{ href, label }`
- `LessonTier` — `{ name, price, duration, body }`
- `Offer` — `{ name, duration, purpose, outputs, fit?, cadence? }`
- `ProofArtefact` — `{ title, label, subtitle, rows }`
- `ProofOrganisation` — `{ name, slug, src, width, height, maxWidth }`
