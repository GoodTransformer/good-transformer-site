# Insights publishing contract

This file defines the **interface** a publisher must satisfy to add an Insight to
goodtransformer.ai. It is written for both humans and an automated generator
(Cowork, Codex, or another system). If a generated post matches this contract,
`scripts/validate-insights.mjs` passes and the existing GitHub Pages deploy ships
it live — no other change required.

> **The whole job:** write one Markdown file + (for posts) one cover image,
> commit, push to `main`. That's it.

---

## 1. Where files go

| What | Path | Notes |
|------|------|-------|
| Post / asset source | `content/insights/<slug>.md` | Markdown + frontmatter |
| Cover image (posts) | `public/insights/<slug>/cover.jpg` | ~1600×900, 16:9 |
| Asset payload | `public/insights/assets/<file>` | PDF / template / etc. |

- **`<slug>`** is lowercase **kebab-case** (`a–z`, `0–9`, hyphens), and the
  Markdown filename **is** the URL: `content/insights/ai-readiness.md` →
  `https://goodtransformer.ai/insights/ai-readiness/`.
- Slugs must be **unique** and stable (don't rename a published slug — it breaks
  links and the RSS guid).

---

## 2. Frontmatter schema

```yaml
---
title: "Headline of the piece"            # REQUIRED
description: "One–two sentence excerpt."    # REQUIRED — index card + meta description
date: 2026-06-13                            # REQUIRED — YYYY-MM-DD
updated: 2026-06-20                         # optional — YYYY-MM-DD
author: "Patrick Hussey"                    # optional — defaults to Patrick Hussey
type: post                                  # optional — "post" (default) | "asset"
tags: ["ai-adoption", "leadership"]         # recommended — kebab-case topic tags
cover: /insights/<slug>/cover.jpg           # required for posts (see §3)
coverAlt: "Describe the cover image."        # REQUIRED whenever cover is set
featured: false                             # optional — true puts it in the lead slot
draft: false                                # optional — true hides it from the build
# ── asset-only (type: asset) ──
assetFile: /insights/assets/<file>.pdf      # REQUIRED for assets — must exist on disk
assetFormat: "PDF · 12 pages"               # optional — shown on the card
assetCta: "Download the guide"              # optional — defaults to "Download"
---
```

### Field rules the validator enforces
- `title`, `description`, `date` present and non-empty; `date` matches `YYYY-MM-DD`.
- `type` is `post` or `asset`.
- If `cover` is set: it starts with `/`, the file **exists** under `public/`, and
  `coverAlt` is non-empty.
- If `type: asset`: `assetFile` is set, starts with `/`, and **exists** under `public/`.
- Filename is valid kebab-case.
- `tags` (if present) is a YAML list.

Warnings (don't block the build): no tags, no cover on a post, very short body.

---

## 3. Cover image spec

- **Dimensions:** ~1600×900 (16:9). Rendered responsively; never upscaled.
- **Format:** `.jpg`, `.webp`, or `.png` (match the `cover:` path extension).
- **Path:** `public/insights/<slug>/cover.jpg`.
- **Alt text is mandatory** (`coverAlt`) — describe the image plainly.
- **Brand:** if the cover is a generated/abstract treatment, follow the house
  rule — teal stays crisp and structural; avoid a soft teal wash on cream
  (it reads "sickly"). Dark teal treatments are fine for full-bleed art.

---

## 4. Body (Markdown)

Standard Markdown + GitHub-flavoured extensions (tables, etc.). Supported and
styled by `.insight-prose`:

- `##` / `###` / `####` headings (auto-anchored)
- **bold**, _italic_, links, blockquotes, `---` rules
- ordered / unordered lists
- `figure` + `figcaption`, images (auto rounded/bordered)
- inline `code` and fenced code blocks
- tables

The **first paragraph** is automatically emphasised as a lead — open strong.

---

## 5. Publish flow

1. Create `content/insights/<slug>.md` per the schema above.
2. For a post, add `public/insights/<slug>/cover.jpg`. For an asset, add the
   payload under `public/insights/assets/`.
3. Set `draft: false`.
4. Run `node scripts/validate-insights.mjs` (CI runs this before the build).
5. Commit + push to `main` → GitHub Pages rebuilds and the post is live at
   `/insights/<slug>/`, in the index, the RSS feed (`/feed.xml`), and the sitemap.

Scaffold a correctly-shaped file with:

```
node scripts/new-insight.mjs "Your Headline" --tags ai-adoption,leadership
node scripts/new-insight.mjs "AI Readiness Checklist" --asset
```

---

## 6. Automation hand-off (placeholder)

`.github/workflows/publish-insight.yml` is the orchestration stub. A generator
step (Codex/Cowork) is expected to produce exactly the artefacts above —
the `.md` file and the cover image — then the workflow validates, commits, and
pushes. See the TODO markers in that file for where the generator plugs in and
which secret it needs. **Nothing downstream changes when the generator is wired:
it just writes to this contract.**
