# Good Transformer - Page Routing

All routes are defined by the Next.js App Router directory structure in `src/app/`.

---

## Pages

| Route | File | Title | Purpose |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Home | Main landing page - hero, services overview, Patrick intro, testimonial, FAQ, final CTA |
| `/services` | `src/app/services/page.tsx` | Services | Full breakdown of both service lines and ways to work together |
| `/services/ai-lessons-for-leaders` | `src/app/services/ai-lessons-for-leaders/page.tsx` | AI Lessons for Leaders | Dedicated page for the leader lesson offer, general PDF and sector PDF downloads |
| `/services/ai-advisory-for-teams` | `src/app/services/ai-advisory-for-teams/page.tsx` | AI Advisory for Teams | Dedicated page for fractional AI advisory, team fit, engagement options and 90-day arc |
| `/patrick` | `src/app/patrick/page.tsx` | Patrick Hussey | About Patrick - bio, experience, approach, portrait |
| `/about` | `src/app/about/page.tsx` | About | About Good Transformer - mission, ethics, background, talks, name origin |
| `/book` | `src/app/book/page.tsx` | Book a session | Booking hub - two routes (personal / business) |
| `/book/personal` | `src/app/book/personal/page.tsx` | Book a lesson | Personal AI lesson booking with Formspree form |
| `/book/business` | `src/app/book/business/page.tsx` | Book a business call | Business brief intake form + calendar booking |

---

## Navigation

Navigation links are defined in `src/content/site-content.ts`:

```ts
export const navigation: LinkItem[] = [
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services/ai-lessons-for-leaders", label: "AI Lessons for Leaders" },
      { href: "/services/ai-advisory-for-teams", label: "AI Advisory for Teams" },
    ],
  },
  { href: "/patrick", label: "Patrick" },
  { href: "/about", label: "About" },
];
```

The site header renders these plus the logo/brand mark. The book route is accessed via CTA buttons throughout, not the main nav.

---

## CTAs and booking routes

Two booking routes are used throughout:

| Route | CTA label | Audience |
|---|---|---|
| `/book/personal` | "Book a personal AI lesson" | Individuals |
| `/book/business` | "Book a business call" | Teams and organisations |

These are referenced as `siteConfig.personalCta` and `siteConfig.businessCta` in `site-content.ts`.

---

## Unused / archived routes

No archived route directories are currently present in `src/app/`. Before linking to a route, confirm that the matching directory and `page.tsx` exist.
