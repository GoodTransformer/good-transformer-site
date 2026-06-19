# Social auto-posting — setup

When a new Insight lands on `main`, [`social-autopost.yml`](.github/workflows/social-autopost.yml)
runs [`scripts/post-to-social.mjs`](scripts/post-to-social.mjs), which:

1. Picks the newest published Insight not already in the ledger (`content/social/posted.json`).
2. Drafts platform-tailored copy with Claude (`claude-opus-4-8`), in Good Transformer's
   we-voice (or Patrick's voice for `voice: patrick` posts), with no em dashes.
3. Attaches that post's `social.jpg` share card (uploaded as bytes, no public URL needed).
4. Posts to the **LinkedIn Company Page** and **X**, then records the result in the ledger.

**Until the secrets below are set, the script is a safe no-op** (it logs "not configured"
and exits 0). Add the secrets in GitHub → repo **Settings → Secrets and variables → Actions**.

> **Decision (2026-06-16): X only, LinkedIn parked.** LinkedIn's Company Page posting
> needs the Community Management API, which is gated on an *active registered business*.
> Good Transformer trades as a sole trader (no Companies House registration), so that
> application would be rejected. We are running **X only** for now. The LinkedIn section
> below is kept for reference in case the entity is incorporated later; leaving the
> `LINKEDIN_*` secrets unset makes the script skip LinkedIn cleanly. To post to LinkedIn
> without the API in the meantime, use a scheduler that already holds Page rights (Buffer,
> Hootsuite) or post manually. Only sections **0**, **1**, and **3** apply right now.

---

## 0. Before you flip it on — seed the ledger

There are already ~20 live posts. Without seeding, the first run would start posting the
backlog. Seed the ledger once so only *future* posts go out:

```bash
node scripts/post-to-social.mjs --seed
git add content/social/posted.json && git commit -m "Seed social ledger" && git push
```

To post a specific existing one manually later: run the **Auto-post Insight to social**
workflow from the Actions tab with a `slug` input (or `node scripts/post-to-social.mjs --slug <slug>` locally with secrets exported).

---

## 1. Claude (copy) — `ANTHROPIC_API_KEY`

From the Anthropic Console → API keys. Optional: if unset, the script falls back to a
plain template (title + description + link + hashtags). With it set, copy is drafted per post.

| Secret | Value |
|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-...` |

---

## 2. LinkedIn Company Page — `LINKEDIN_ACCESS_TOKEN`, `LINKEDIN_ORG_ID` — PARKED (see decision note above)

Posting as the Company Page needs the **Community Management API**, which requires
LinkedIn's app review. Expect a few days.

1. Create an app at <https://www.linkedin.com/developers/apps>, associated with the
   Good Transformer Company Page. You must be a **Page admin**.
2. Request the **Community Management API** product (review required). Also add
   **Sign In with LinkedIn using OpenID Connect** so you can run the OAuth flow.
3. Scopes needed: `w_organization_social` (post), `r_organization_social`,
   `rw_organization_admin`.
4. Run the 3-legged OAuth flow as a Page admin to mint an **access token**. Member/org
   access tokens last ~60 days; the refresh token ~12 months. **This token expires** — set
   a calendar reminder to refresh it, or extend the script to exchange a stored
   `LINKEDIN_REFRESH_TOKEN` at runtime (see "Token refresh" below).
5. Find the org's numeric id: it's the number in
   `https://www.linkedin.com/company/<id>/admin/` (or via the `organizationalEntityAcls` API).

| Secret | Value |
|---|---|
| `LINKEDIN_ACCESS_TOKEN` | the OAuth2 access token |
| `LINKEDIN_ORG_ID` | numeric org id, e.g. `12345678` (the script forms `urn:li:organization:12345678`) |

The REST API is month-versioned. The script pins `LINKEDIN_VERSION = '202506'` — bump it
in `scripts/post-to-social.mjs` roughly yearly (LinkedIn supports each version ~12 months).

### Token refresh (recommended hardening)

The current script uses a static `LINKEDIN_ACCESS_TOKEN`, so posting silently fails once it
expires (the run still exits 0; you'll see a `linkedinError` in the ledger). To make it
unattended, store `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`, and
`LINKEDIN_REFRESH_TOKEN`, then exchange them for a fresh access token at the top of
`postToLinkedIn()` via `POST https://www.linkedin.com/oauth/v2/accessToken`
(`grant_type=refresh_token`). Say the word and I'll wire that in.

---

## 3. X — `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_SECRET`

1. Create a project + app in the X Developer Portal: <https://developer.x.com/en/portal/dashboard>.
2. A tier with **write** access is required. The Free tier currently allows ~500 posts/month
   write, which is ample for a blog cadence; if media upload is restricted on your tier you
   may need **Basic** ($100/mo). Confirm media upload is available before relying on it.
3. Set app permissions to **Read and write**.
4. Generate, under the @goodtransformer account: **API Key & Secret** (consumer) and
   **Access Token & Secret** (user). The script uses OAuth 1.0a (via `twitter-api-v2`) for
   both the v1.1 media upload and the v2 tweet.

| Secret | Value |
|---|---|
| `X_API_KEY` | consumer API key |
| `X_API_SECRET` | consumer API secret |
| `X_ACCESS_TOKEN` | @goodtransformer access token |
| `X_ACCESS_SECRET` | @goodtransformer access token secret |

---

## Behaviour notes

- **Idempotent.** A slug is recorded in the ledger only after at least one platform
  succeeds; a transient failure is retried on the next run. A platform that already
  succeeded is never re-posted (the per-slug record carries `linkedin` / `x` ids).
- **One per run.** Default `--limit 1` posts only the newest unposted Insight. The ledger
  commit lives outside the workflow's trigger paths, so it can't loop.
- **Per-post copy override.** Optional frontmatter `socialTitle:` / `socialSubtitle:`
  control the share *image*; the copy is always drafted from `title` + `description`.
- **Dry run.** `node scripts/post-to-social.mjs --dry-run` (or the workflow's `dry_run`
  input) prints the drafted copy and resolved image without posting.
