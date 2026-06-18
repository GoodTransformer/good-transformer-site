# How blog and newsletter content is published

> Sitrep and standing reference for the AI that manages this site. Last updated 2026-06-18.

## The short version

Insights (the blog, `content/insights/*.md`) and the newsletter news feed
(`content/digests/news-daily.json` + `news-weekly.json`) are not authored here by
hand. A separate system, the **Good Transformer Blog Machine**, runs on a daily
schedule, drafts and validates content, and pushes finished files straight to
`main`. A push to `main` triggers the normal Pages deploy, so new posts go live
with no PR and no manual step. If you see a new file under `content/insights/` or
updated `content/digests/news-*.json` arrive on `main` without a pull request,
that is the Blog Machine working as intended.

> **News feed moved to two files (2026-06-18).** The machine used to write one
> rolling pool, `news-curated.json`, which the digest sliced top-3/top-5 — that
> made the daily re-send durable stories on consecutive days. It now writes a
> purpose-built file per cadence (`news-daily.json`, deduped vs recent dailies;
> `news-weekly.json`, the biggest of 7 days), with selection and dedup on its
> side. The site reads the cadence file and sends it as-is (see
> [`NEWSLETTER-SETUP.md`](../../NEWSLETTER-SETUP.md) §News). During the switch the
> machine still writes `news-curated.json` as a fallback; once the two files are
> confirmed flowing in CI, tell it to stop.

## The credential

Pushes use `GT_PUBLISH_TOKEN`, a fine-grained GitHub PAT with **Contents: Read
and write** on `GoodTransformer/good-transformer-site`. It is not a site build
variable and is not used by Next.js; it only authorises the external publisher's
push. If you rotate the PAT, update it where the publisher reads it (see below).

## What changed on 2026-06-17 (the sitrep)

1. **Token moved to a durable home.** The token used to live only in this repo's
   `.env`, which worked only when this repo was mounted into the publisher's
   session. The scheduled publisher does not mount this repo, so the token was
   unreachable and blog posts silently stayed staged instead of going live. The
   token's primary home is now the Blog Machine's own `.env`. This repo's `.env`
   still holds a copy and is still read if present, so rotating in either place
   is fine; the Blog Machine `.env` is what unattended runs read first.
2. **The publisher is now mount-independent.** It no longer needs this repo
   mounted. It clones its own clean checkout to local disk and pushes from there.
   A mounted copy is used only when explicitly pointed at it.
3. **Cloud-mount caveat (important).** When this repo sits in a cloud-synced
   folder (for example on the Desktop), git cannot remove its lock files from the
   automation sandbox ("Operation not permitted"), so a push from the mounted
   working copy fails. Pushes from the clean clone succeed. Automation should not
   rely on pushing from a cloud-synced working copy.

## State as of 2026-06-17

- Published live: `/insights/ai-adoption-is-the-bottleneck/` (brand voice).
- Newsletter feed refreshed: `content/digests/news-curated.json`, 7 stories,
  `generatedAt` 2026-06-17.

## What gates a publish (all run in the Blog Machine, before any push)

- `scripts/validate-insights.mjs`, the publishing contract (the same gate CI runs).
- A deterministic pre-publish check: profanity and slur blocklist, leftover
  template residue, and link-policy breaches.
- An adversarial voice and safety review of the finished article.
- A missing cover image never blocks a publish; CI regenerates covers, and the
  validator tolerates an absent cover.

## What this means for you (site AI)

- Do not hand-edit a published Insight to "fix" its voice or content. If
  something looks wrong, flag it for the weekly audit rather than rewriting it,
  so the two systems do not fight over the same file.
- BlogPosting and FAQPage JSON-LD is built from each post's frontmatter in
  `src/app/insights/[slug]/page.tsx`. The frontmatter is the source of truth, so
  there is no hand-pasted schema to maintain.
- The em-dash ban applies to this content too, and the publisher enforces it.
