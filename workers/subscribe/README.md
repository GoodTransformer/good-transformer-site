# Newsletter subscribe Worker

A tiny Cloudflare Worker that receives the newsletter signup from the site and
creates a **Resend contact** subscribed to the chosen **Topic** (daily or weekly)
and added to the "all subscribers" **Segment**. It exists so the Resend API key
stays server-side: the static site can't hold it safely.

Free on Cloudflare's Workers free plan (100k requests/day).

## One-time setup

1. **Create the Topics + Segment in Resend** (Audience tab): two Topics
   `Daily digest` and `Weekly digest` (Opt-in, Public), and an "All subscribers"
   Segment. Copy the two Topic IDs and the Segment ID.
2. **Fill in `wrangler.toml`**: set `TOPIC_DAILY_ID`, `TOPIC_WEEKLY_ID`,
   `SEGMENT_ID`, and `ALLOWED_ORIGIN` (your site, e.g. `https://goodtransformer.ai`).
3. **Add the Resend key as a secret** (not in the file):
   ```bash
   cd workers/subscribe
   npx wrangler secret put RESEND_API_KEY
   ```
4. **Deploy**:
   ```bash
   npx wrangler deploy
   ```
   Wrangler prints the Worker URL, e.g. `https://gt-newsletter-subscribe.<you>.workers.dev`.
5. **Point the site at it**: set the build-time env var
   `NEXT_PUBLIC_SUBSCRIBE_ENDPOINT` to that URL (GitHub Pages secret, mirrored
   into `deploy-pages.yml`). With it set, the signup form posts here; without it,
   the form falls back to Formspree / an email draft.

## Local test

```bash
cd workers/subscribe && npx wrangler dev
# then POST to the local URL:
curl -X POST http://localhost:8787 \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","cadence":"weekly"}'
```

## Request / response

`POST` JSON `{ "email": "...", "cadence": "daily" | "weekly" }` →
`200 { "ok": true, "cadence": "weekly" }` on success.
