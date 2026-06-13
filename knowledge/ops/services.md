# Good Transformer - Third-party services register

A single reference for the external services the site depends on, and which account each one
lives under. Keep this current when a service is added, moved, or its owner changes.

> Note on accounts: where the exact login could not be verified from the codebase it is marked
> **_(confirm)_**. Please fill these in - they are the things that are painful to recover later.

---

## Services

| Service | Purpose | Account / based in | Key identifiers |
|---|---|---|---|
| **Domain** - `goodtransformer.ai` | Primary domain | Registrar **123 Reg** (123-reg.co.uk) **_(confirm login)_** | DNS points to GitHub Pages; `public/CNAME` |
| **GitHub** | Source control, hosting (GitHub Pages), CI/CD (Actions) | Org **`GoodTransformer`** | Repo `GoodTransformer/good-transformer-site`; workflow `Deploy GitHub Pages` |
| **Microsoft 365 (Outlook)** | Domain email | Microsoft 365 tenant on **`goodtransformer.ai`** **_(confirm admin login)_** | Mailboxes `patrick@goodtransformer.ai` and `hello@goodtransformer.ai`. (Note: the old Outlook Bookings calendar has been replaced by Cal.com below - email stays on Microsoft 365.) |
| **Cal.com** (EU instance, `cal.eu`) | Call / lesson scheduling calendar | Cal.com account, handle **`goodtransformerbooking`**, login email **`hello@goodtransformer.ai`** (primary). Log in via the **EU portal** `app.cal.eu` (not app.cal.com). | Live event types: `cal.eu/goodtransformerbooking/business-discovery-call` and `…/leaders-ai-discovery`. Stored in env vars **`NEXT_PUBLIC_CLARITY_CALL_URL`** (business; legacy name - it is **not** Microsoft/Calendly/Clarity) and `NEXT_PUBLIC_PERSONAL_LESSON_URL` (leaders). Both the GitHub secrets and the `.env.production` fallback hold these Cal.com URLs. |
| **Formspree** | Form submission backend for the two intake forms | Formspree account **_(confirm login email)_** | Personal lesson form `maqazwgn`; business brief form `xbdqerev` (both confirmed live in the production bundle) |
| **Google Analytics 4** | Site analytics (page views + click events) | Google account **`goodtransformer1@gmail.com`** | Account `353050501` · Property `486698902` · **Measurement ID `G-LN1EJ68X71`** |
| **Google Search Console** | Search indexing / domain verification | Same Google account as GA4 (**`goodtransformer1@gmail.com`**) | Verification file `public/googled0b1f3ab4da77175.html` |

---

## How each is wired into the site

- **GitHub Pages** builds and serves the static site from `main`; secrets are injected at build
  time (see [`env-vars.md`](env-vars.md) and [`deployment.md`](deployment.md)).
- **Cal.com** booking links are stored as the calendar URLs
  (`NEXT_PUBLIC_CLARITY_CALL_URL`, `NEXT_PUBLIC_PERSONAL_LESSON_URL`) and rendered as the
  "Continue to scheduling" handoff in `src/components/booking-form.tsx`.
- **Formspree** endpoints are stored as `NEXT_PUBLIC_FORMSPREE_*` and consumed in
  `src/components/booking-form.tsx`.
- **Google Analytics 4** is loaded by `src/components/google-analytics.tsx` and
  `src/components/analytics-events.tsx`, reading `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- **Google Search Console** is verified by a static file served from `public/`.

All config values live in [`env-vars.md`](env-vars.md). This file is the "who owns what" layer
on top of that.
