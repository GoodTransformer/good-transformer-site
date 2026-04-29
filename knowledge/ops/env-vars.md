# Good Transformer — Environment Variables

---

## All variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_PERSONAL_ENDPOINT` | Yes | Formspree form URL for personal AI lesson booking (`/book/personal`) |
| `NEXT_PUBLIC_FORMSPREE_BOOKING_ENDPOINT` | Yes | Formspree form URL for business brief intake (`/book/business`) |
| `NEXT_PUBLIC_CLARITY_CALL_URL` | Yes | Calendar URL for scheduling the business call (Calendly, Cal.com, etc.) |

All three use the `NEXT_PUBLIC_` prefix because they are embedded in client-side JavaScript. They are safe to expose — they are public form endpoints, not secret keys.

---

## Where they are used

| Variable | Used in |
|---|---|
| `NEXT_PUBLIC_FORMSPREE_PERSONAL_ENDPOINT` | `src/app/book/personal/page.tsx` or `src/components/booking-form.tsx` |
| `NEXT_PUBLIC_FORMSPREE_BOOKING_ENDPOINT` | `src/components/booking-form.tsx` |
| `NEXT_PUBLIC_CLARITY_CALL_URL` | `src/components/booking-form.tsx` (calendar link after brief submission) |

The variable names are also stored in `siteConfig`:
```ts
siteConfig.calendarEnvName = "NEXT_PUBLIC_CLARITY_CALL_URL"
siteConfig.briefEndpointEnvName = "NEXT_PUBLIC_FORMSPREE_BOOKING_ENDPOINT"
```

---

## Local dev

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

For local testing, Formspree test endpoints can be used, or real endpoints from your Formspree account.

---

## Production (GitHub Pages)

Set as **GitHub Secrets** in the repository settings under Settings → Secrets and variables → Actions.

| GitHub Secret name | Maps to |
|---|---|
| `NEXT_PUBLIC_FORMSPREE_PERSONAL_ENDPOINT` | Same |
| `NEXT_PUBLIC_FORMSPREE_BOOKING_ENDPOINT` | Same |
| `NEXT_PUBLIC_CLARITY_CALL_URL` | Same |

The GitHub Actions workflow injects these at build time.

---

## Fallbacks

`.env.production` contains fallback values used if secrets are not set in GitHub. This file is committed to the repo but should contain only safe placeholder or empty values — never real secrets.
