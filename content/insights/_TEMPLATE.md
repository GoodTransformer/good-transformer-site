---
# Copy this file to content/insights/<your-slug>.md and fill it in.
# Files beginning with "_" are ignored by the build. See CONTRACT.md for rules.
title: "Headline of the piece"
description: "One or two sentences. Used as the index excerpt and the meta description."
date: 2026-06-13            # YYYY-MM-DD
# updated: 2026-06-20       # optional
author: "Patrick Hussey"
type: post                  # "post" | "asset"
tags: ["ai-adoption", "leadership"]
cover: /insights/your-slug/cover.jpg
coverAlt: "Describe the cover image for screen readers and SEO."
featured: false             # true = lead slot on the index
draft: true                 # set to false to publish
# ── asset-only (delete for a normal post) ──
# type: asset
# assetFile: /insights/assets/your-slug.pdf
# assetFormat: "PDF · 12 pages"
# assetCta: "Download the guide"
---

Open with a strong lead paragraph — it is automatically set larger than the rest.
Say the most useful thing first.

## A section heading

Write in Good Transformer's voice: clear, practical, honest, sceptical in the
right places. Short paragraphs. Concrete examples over abstraction.

> A pull-quote earns its place when it sharpens the argument.

- Lists are fine for steps or criteria
- Keep them tight

Set `draft: false` and add the cover image, then run
`node scripts/validate-insights.mjs` before committing.
