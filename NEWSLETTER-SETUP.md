# Insights newsletter: setup & architecture

The daily/weekly Insights digest, end to end. The code is all here; this doc is
the one-time account setup (the parts only you can do: create accounts, verify a
domain, paste secrets) plus how it runs.

## How it works

```
Reader subscribes (site)
   └─> Cloudflare Worker  ──>  Resend contact  (Topic: Daily | Weekly  +  "All subscribers" Segment)
                                     ▲
Scheduled GitHub Action (cron)       │ send
   1. generate-ai-news.mjs  ──> content/digests/news-latest.json  (picks news-daily/weekly.json by cadence)
   2. build-digest.mjs      ──> branded HTML (this week's/today's posts + news)
   3. send-digest.mjs       ──> Resend Broadcast (Segment scoped to Topic) ──┘
```

> **Resend model (2026):** there are no per-audience IDs. Contacts are
> account-level; you split them with **Topics** (the daily/weekly preference)
> and target sends with a **Segment**. A broadcast = a Segment (who) scoped to a
> Topic (which cadence).

- **Capture** is a tiny Cloudflare Worker so the Resend API key never touches the
  client. Until it's deployed, the signup form falls back to Formspree / an email
  draft, so nothing is broken in the meantime.
- **Sending** is a scheduled GitHub Action (no server needed), consistent with the
  static GitHub Pages model.
- **Free tier:** Resend gives 3,000 emails/month (100/day) and marketing sends to
  up to 1,000 contacts free, comfortably enough to start.

## One-time setup

### 1. Resend account + domain
1. Create a Resend account and **verify your sending domain** (`goodtransformer.ai`)
   under Domains. This lets you send from `insights@goodtransformer.ai`.
2. Create an **API key** (Full access). Keep it for the steps below.

### 2. Create the Topics + a Segment
Resend → **Audience → Topics → Create topic**. Make two, both **Opt-in**,
**Public**: `Daily digest` and `Weekly digest`. Copy each **Topic ID**.

Then Resend → **Audience → Segments → Create segment**: an **"All subscribers"**
segment that includes every contact. Copy its **Segment ID**; broadcasts send to
this segment, scoped to a topic.

### 3. Deploy the subscribe Worker
Follow [`workers/subscribe/README.md`](workers/subscribe/README.md):
set the audience IDs + `ALLOWED_ORIGIN` in `wrangler.toml`, add `RESEND_API_KEY`
as a secret, `npx wrangler deploy`, and copy the Worker URL.

### 4. GitHub repo secrets
Add these under Settings → Secrets and variables → Actions:

| Secret | Value |
|--------|-------|
| `NEXT_PUBLIC_SUBSCRIBE_ENDPOINT` | the Worker URL (so the form posts to it) |
| `RESEND_API_KEY` | your Resend API key |
| `RESEND_SEGMENT_ID` | the "All subscribers" Segment ID |
| `RESEND_TOPIC_DAILY_ID` | the Daily digest Topic ID |
| `RESEND_TOPIC_WEEKLY_ID` | the Weekly digest Topic ID |
| `DIGEST_FROM` | e.g. `Good Transformer <insights@send.goodtransformer.ai>` |

`NEXT_PUBLIC_SUBSCRIBE_ENDPOINT` is already wired into `deploy-pages.yml`; the rest
are read by `send-digest.yml`.

### 5. (Pipeline) AI news source, §News
The "AI news for leaders" block comes from `content/digests/news-latest.json`,
which is gitignored and rebuilt on every send by `scripts/generate-ai-news.mjs`.
That script is now plumbing, not the generator: it picks the engine's
purpose-built file for the cadence being sent, validates it, applies a freshness
guard, and copies it through to `news-latest.json`.

The files are written by the **Good Transformer newsjack engine** (the daily blog
machine, a separate repo). Selection, freshness and dedup now live there, because
it runs the scan and is the only component that knows what has already shipped:

- `content/digests/news-daily.json` — the daily send: up to **3** stories, deduped
  against recent dailies so they are fresh, ordered most-important-first.
- `content/digests/news-weekly.json` — the weekly send: up to **5**, the biggest of
  the last 7 days. A roundup, so it may repeat a story that went out in a daily.

All editorial judgement lives there, so the site and the newsletter speak with one
voice. Schema (both files), with a stable per-story `id` the engine keys dedup on:

```json
{
  "generatedAt": "2026-06-18",
  "cadence": "daily",
  "stories": [
    { "id": "stable-story-slug", "title": "…", "url": "https://…", "source": "OpenAI", "summary": "…" }
  ]
}
```
The lists arrive already counted and ranked, so the digest sends them as-is — no
slicing on this side. `freshStories()` in `build-digest.mjs` still runs as a guard,
dropping any story whose topic echoes a recent Insight. If the source file is
missing or older than 10 days, `generate-ai-news.mjs` writes an empty list and the
digest sends with just the posts. For a local preview with no engine, run `node
scripts/generate-ai-news.mjs --cadence daily --sample` to use the committed
`news-sample.json` (treated as an unselected pool, so the preview still slices it).

**Transition.** Until the site confirms it reads the two new files, the engine also
keeps writing the old rolling pool, `content/digests/news-curated.json` (a copy of
the weekly file). If a cadence file is absent, `generate-ai-news.mjs` falls back to
that pool and stamps `preselected: false`, so `build-digest.mjs` applies the legacy
top-3 (daily) / top-5 (weekly) slice and nothing breaks mid-switch. Once the daily
and weekly files are confirmed flowing in CI, tell the engine to stop writing
`news-curated.json`.

So nothing about the news source needs wiring here anymore; it is supplied by the
blog machine's daily run. This repo's only job is to render and send it.

**Keeping the feed fresh.** That automatic push needs a write credential,
`GT_PUBLISH_TOKEN`, set in the newsjack engine's own config (not this repo): a
fine-grained GitHub PAT with Contents read/write on this repo. Without it the
engine still builds the feed but cannot push, so `news-curated.json` only changes
when committed by hand. Because the digest drops the news block once the feed is
older than 10 days, a missing token means sends quietly go posts-only after about
a week. So if the "AI news for leaders" block ever disappears, the cause is a
stale `news-curated.json`: refresh it (engine push, or commit a new one).

## Running it

- **Schedule** (`.github/workflows/send-digest.yml`): daily on weekday mornings,
  weekly on Monday. Cadence is derived from which cron fired.
- **Manual / test**: run the **Send Insights digest** workflow via
  *Run workflow*: pick `daily`/`weekly` and keep `dry_run` ticked to build
  without sending.
- **Local preview** (no keys needed):
  ```bash
  npm run generate:ai-news
  npm run digest:build -- --cadence weekly --day 2026-06-10 --window 30 --out weekly.digest-preview.html
  open weekly.digest-preview.html
  ```

## What's automated vs you

| Step | Who |
|------|-----|
| Capture email + cadence → Resend audience | automated (Worker) |
| Pick today's / this week's posts | automated (content layer) |
| Curate the AI news | **the generator you wire in §5** |
| Build + send the digest on schedule | automated (Action) |
| Resend account, domain, audiences, secrets, Worker deploy | **you, once** |
