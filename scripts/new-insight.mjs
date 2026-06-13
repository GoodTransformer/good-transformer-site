#!/usr/bin/env node
/**
 * new-insight.mjs
 *
 * Scaffolds a new Insights entry that satisfies the publishing contract
 * (content/insights/CONTRACT.md). This is the same shape the automation
 * pipeline (Cowork / Codex / another generator) should produce — use it by
 * hand, or as the reference for the generated output.
 *
 *   node scripts/new-insight.mjs "Your Headline Here"
 *   node scripts/new-insight.mjs "AI Readiness Checklist" --asset --tags ai-adoption,leadership
 *
 * Flags:
 *   --tags a,b,c   Comma-separated topic tags (default: "ai-adoption")
 *   --asset        Scaffold a downloadable asset instead of a written post
 *   --date YYYY-MM-DD  Override the publish date (default: today)
 *
 * Writes:
 *   content/insights/<slug>.md
 *   public/insights/<slug>/        (folder for the cover image; drop cover.jpg here)
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_DIR = join(ROOT, 'content', 'insights')
const PUBLIC_DIR = join(ROOT, 'public', 'insights')

const argv = process.argv.slice(2)
const flags = {}
const positional = []
for (let i = 0; i < argv.length; i += 1) {
  const arg = argv[i]
  if (arg === '--asset') flags.asset = true
  else if (arg === '--tags') flags.tags = argv[++i]
  else if (arg === '--date') flags.date = argv[++i]
  else positional.push(arg)
}

const title = positional.join(' ').trim()
if (!title) {
  console.error('Usage: node scripts/new-insight.mjs "Your Headline" [--tags a,b] [--asset] [--date YYYY-MM-DD]')
  process.exit(1)
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const slug = slugify(title)
const date = flags.date ?? new Date().toISOString().slice(0, 10)
const tags = (flags.tags ?? 'ai-adoption')
  .split(',')
  .map((t) => slugify(t))
  .filter(Boolean)

const mdPath = join(CONTENT_DIR, `${slug}.md`)
if (existsSync(mdPath)) {
  console.error(`✗ A post already exists at content/insights/${slug}.md`)
  process.exit(1)
}

mkdirSync(CONTENT_DIR, { recursive: true })

const yamlTags = `[${tags.map((t) => `"${t}"`).join(', ')}]`

const frontmatter = flags.asset
  ? `---
title: "${title}"
description: "One or two sentences describing the asset and who it is for."
date: ${date}
author: "Patrick Hussey"
type: asset
tags: ${yamlTags}
assetFile: /insights/assets/${slug}.pdf
assetFormat: "PDF · TODO pages"
assetCta: "Download the guide"
draft: true
---

A short paragraph that appears nowhere public yet (draft: true). Set draft: false
to publish once the asset PDF is in public/insights/assets/${slug}.pdf.
`
  : `---
title: "${title}"
description: "One or two sentences that work as both the index excerpt and the meta description."
date: ${date}
author: "Patrick Hussey"
type: post
tags: ${yamlTags}
cover: /insights/${slug}/cover.jpg
coverAlt: "Describe the cover image for screen readers and SEO."
featured: false
draft: true
---

Open with a strong lead paragraph. This one is set larger automatically.

## A section heading

Write in Good Transformer's voice: clear, practical, sceptical in the right
places. Set \`draft: false\` and add public/insights/${slug}/cover.jpg to publish.
`

writeFileSync(mdPath, frontmatter)
if (!flags.asset) {
  mkdirSync(join(PUBLIC_DIR, slug), { recursive: true })
}

console.log(`✓ Created content/insights/${slug}.md (draft)`)
if (flags.asset) {
  console.log(`  → Add the payload at public/insights/assets/${slug}.pdf`)
} else {
  console.log(`  → Add the cover at public/insights/${slug}/cover.jpg (≈1600×900)`)
}
console.log('  → Set draft: false when ready, then: node scripts/validate-insights.mjs')
