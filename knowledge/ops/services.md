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
| **Resend** | Newsletter sending - the daily & weekly Insights digest | Resend account, login email **`hello@goodtransformer.ai`** (primary), account `goodtransformer` | Sends from `insights@send.goodtransformer.ai` (subdomain `send.goodtransformer.ai`, **verified** 13 Jun 2026, region eu-west-1/Ireland; DNS at GoDaddy/123-reg). New Resend model: **Topics** `Daily digest` (`9034d02c-63ce-40e0-9f2b-a6e7dddcb421`) + `Weekly digest` (`bab99185-9d93-4934-933e-a564d8cfa71a`), and an "All subscribers" **Segment** (`3c41bcc6-4550-4a22-8367-2ab15cab6041`). Secrets `RESEND_API_KEY`, `RESEND_SEGMENT_ID`, `RESEND_TOPIC_DAILY_ID`, `RESEND_TOPIC_WEEKLY_ID`, `DIGEST_FROM` (GitHub Actions). Setup in [`NEWSLETTER-SETUP.md`](../../NEWSLETTER-SETUP.md). **_(IDs all wired; remaining: verify domain, deploy Worker, set GitHub secrets)_** |
| **Cloudflare Workers** | Hosts the newsletter `subscribe` endpoint (keeps the Resend key off the client) | Cloudflare account, login **`hello@goodtransformer.ai`** | Worker `gt-newsletter-subscribe` (see `workers/subscribe/`), live at **`https://gt-newsletter-subscribe.misty-smoke-81e7.workers.dev`**. `RESEND_API_KEY` set as a Worker secret; topic/segment IDs as plaintext vars. The site form defaults to this URL (override via `NEXT_PUBLIC_SUBSCRIBE_ENDPOINT`). **Deployed & tested** 13 Jun 2026. |
| **Google Analytics 4** | Site analytics (page views + click events) | Google account **`goodtransformer1@gmail.com`** | Account `353050501` · Property `486698902` · **Measurement ID `G-LN1EJ68X71`** |
| **LinkedIn Campaign Manager** | LinkedIn Insight Tag, audience insights, retargeting, and campaign conversion optimisation | Good Transformer LinkedIn Page / ad account **_(confirm admin login)_** | Partner ID `9252146`, stored as `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`; get it from Campaign Manager under Analyze → Insight Tag |
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
- **Resend** sends the Insights digest: a scheduled GitHub Action
  (`.github/workflows/send-digest.yml`) builds the email (`scripts/build-digest.mjs`) and
  sends it via the Broadcasts API (`scripts/send-digest.mjs`). Subscribers are captured by the
  Cloudflare **subscribe Worker** into the matching Resend audience; the signup form
  (`src/components/insights/newsletter-signup.tsx`) posts to `NEXT_PUBLIC_SUBSCRIBE_ENDPOINT`.
  Full wiring in [`NEWSLETTER-SETUP.md`](../../NEWSLETTER-SETUP.md).
- **Google Analytics 4** is loaded by `src/components/google-analytics.tsx`
  (reading `NEXT_PUBLIC_GA_MEASUREMENT_ID`); custom conversion/engagement events
  are dispatched via `src/lib/analytics.ts` + `src/components/analytics-events.tsx`.
  Full event list and the one-time GA4 admin setup: [`analytics.md`](analytics.md).
- **LinkedIn Insight Tag** is loaded by `src/components/linkedin-insight-tag.tsx`
  (reading `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`) for LinkedIn audience insights and
  retargeting. Setup notes live in [`analytics.md`](analytics.md).
- **Google Search Console** is verified by a static file served from `public/`.

All config values live in [`env-vars.md`](env-vars.md). This file is the "who owns what" layer
on top of that.
