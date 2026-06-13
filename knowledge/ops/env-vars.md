# Good Transformer - Environment Variables

---

## All variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_PERSONAL_ENDPOINT` | Yes | Formspree form URL for personal AI lesson booking (`/book/personal`) |
| `NEXT_PUBLIC_FORMSPREE_BOOKING_ENDPOINT` | Yes | Formspree form URL for business brief intake (`/book/business`) |
| `NEXT_PUBLIC_CLARITY_CALL_URL` | Yes | Calendar URL for scheduling the business call (Calendly, Cal.com, etc.) |
| `NEXT_PUBLIC_PERSONAL_LESSON_URL` | Yes | Calendar URL for scheduling a personal AI lesson after the personal intake form |
| `NEXT_PUBLIC_BOOKING_BRIEF_EMAIL` | Recommended | Email address used for manual `mailto:` fallback if a form endpoint or calendar URL is missing |

These use the `NEXT_PUBLIC_` prefix because they are embedded in client-side JavaScript. They are safe to expose - they are public form endpoints, public booking links, or a contact email, not secret keys.

---

## Where they are used

| Variable | Used in |
|---|---|
| `NEXT_PUBLIC_FORMSPREE_PERSONAL_ENDPOINT` | `src/components/booking-form.tsx` (`PersonalBookingForm`) |
| `NEXT_PUBLIC_FORMSPREE_BOOKING_ENDPOINT` | `src/components/booking-form.tsx` |
| `NEXT_PUBLIC_CLARITY_CALL_URL` | `src/components/booking-form.tsx` (calendar link after brief submission) |
| `NEXT_PUBLIC_PERSONAL_LESSON_URL` | `src/components/booking-form.tsx` (calendar link after personal lesson intake) |
| `NEXT_PUBLIC_BOOKING_BRIEF_EMAIL` | `src/components/booking-form.tsx` (manual email fallback for both forms) |

The variable names are also stored in `siteConfig`:
```ts
siteConfig.calendarEnvName = "NEXT_PUBLIC_CLARITY_CALL_URL"
siteConfig.briefEndpointEnvName = "NEXT_PUBLIC_FORMSPREE_BOOKING_ENDPOINT"
siteConfig.briefEmailEnvName = "NEXT_PUBLIC_BOOKING_BRIEF_EMAIL"
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
| `NEXT_PUBLIC_PERSONAL_LESSON_URL` | Same |
| `NEXT_PUBLIC_BOOKING_BRIEF_EMAIL` | Same, if you want manual email fallback in production |

The GitHub Actions workflow injects these at build time.

---

## Fallbacks

`.env.production` contains fallback values used if secrets are not set in GitHub. This file is committed to the repo but should contain only public endpoints, safe placeholders, or empty values - never private secrets.
