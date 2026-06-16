#!/usr/bin/env node
/**
 * post-to-social.mjs
 *
 * Auto-posts a published Insight to LinkedIn (Good Transformer Company Page)
 * and X, with the post's social.jpg share card attached and platform-tailored
 * copy drafted by Claude. Run by .github/workflows/social-autopost.yml on push
 * to main, or manually.
 *
 *   node scripts/post-to-social.mjs                # post any unposted live insights (newest, capped by --limit)
 *   node scripts/post-to-social.mjs --slug eu-ai-act-and-your-firm
 *   node scripts/post-to-social.mjs --dry-run      # draft copy + resolve image, never post
 *   node scripts/post-to-social.mjs --seed         # mark all current live posts as posted, WITHOUT posting
 *   node scripts/post-to-social.mjs --limit 3      # max posts in one run (default 1)
 *
 * Required env (set as GitHub Actions secrets, see SOCIAL-AUTOPOST-SETUP.md):
 *   ANTHROPIC_API_KEY                  copy generation (optional; template fallback if unset)
 *   LINKEDIN_ACCESS_TOKEN              OAuth2 token with w_organization_social
 *   LINKEDIN_ORG_ID                    numeric org id (posts as urn:li:organization:<id>)
 *   X_API_KEY / X_API_SECRET           X app (consumer) OAuth1.0a credentials
 *   X_ACCESS_TOKEN / X_ACCESS_SECRET   X user (account) OAuth1.0a credentials
 *
 * Safe by default: if a platform's keys are missing it skips that platform and
 * exits 0 (an unconfigured pipeline never fails CI). --dry-run never posts and
 * never writes the ledger.
 */

import { readFileSync, readdirSync, existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import matter from 'gray-matter'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_DIR = join(ROOT, 'content', 'insights')
const PUBLIC_DIR = join(ROOT, 'public')
const LEDGER_PATH = join(ROOT, 'content', 'social', 'posted.json')

// LinkedIn versions its REST API by month (YYYYMM). Bump periodically; LinkedIn
// supports each version for ~12 months. See SOCIAL-AUTOPOST-SETUP.md.
const LINKEDIN_VERSION = '202506'

const SITE_URL = (process.env.SITE_URL || 'https://goodtransformer.ai').replace(/\/$/, '')

function parseArgs() {
  const a = process.argv.slice(2)
  const o = { dryRun: false, seed: false, limit: 1, slug: null }
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] === '--dry-run') o.dryRun = true
    else if (a[i] === '--seed') o.seed = true
    else if (a[i] === '--slug') o.slug = a[++i]
    else if (a[i] === '--limit') o.limit = Math.max(1, Number(a[++i]) || 1)
  }
  return o
}

function readLedger() {
  try {
    return JSON.parse(readFileSync(LEDGER_PATH, 'utf8'))
  } catch {
    return { posted: {} }
  }
}

function writeLedger(ledger) {
  mkdirSync(dirname(LEDGER_PATH), { recursive: true })
  writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2) + '\n')
}

/** Every publishable post that has a generated social card, newest first. */
function loadPosts() {
  let files = []
  try {
    files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_'))
  } catch {
    return []
  }
  const posts = []
  for (const file of files) {
    const slug = file.replace(/\.md$/, '')
    const { data } = matter(readFileSync(join(CONTENT_DIR, file), 'utf8'))
    if (data.draft === true || data.type === 'asset' || !data.cover) continue
    const socialRel = String(data.cover).replace(/cover\.(jpe?g|png|webp)$/i, 'social.jpg')
    const socialAbs = join(PUBLIC_DIR, socialRel.replace(/^\//, ''))
    if (!existsSync(socialAbs)) continue
    posts.push({
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ''),
      voice: data.voice === 'patrick' ? 'patrick' : 'brand',
      tags: Array.isArray(data.tags) ? data.tags : [],
      coverAlt: data.coverAlt ? String(data.coverAlt) : '',
      date: data.date ? new Date(data.date).getTime() : 0,
      url: `${SITE_URL}/insights/${slug}/`,
      socialAbs,
    })
  }
  return posts.sort((a, b) => b.date - a.date)
}

/** Tidy hashtags from tags: #aiRegulation style, max 3. */
function hashtags(tags, max) {
  return tags
    .slice(0, max)
    .map((t) =>
      '#' +
      String(t)
        .split('-')
        .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join('')
        .replace(/\bai\b/i, 'AI'),
    )
    .join(' ')
}

/** Deterministic fallback copy when no ANTHROPIC_API_KEY is set. */
function templateCopy(post) {
  const tagsLi = hashtags(post.tags, 3)
  const tagsX = hashtags(post.tags, 2)
  const linkedin = `${post.title}\n\n${post.description}\n\nRead the full piece: ${post.url}${
    tagsLi ? `\n\n${tagsLi}` : ''
  }`
  let x = `${post.title} ${post.url}`
  if (tagsX && (x.length + tagsX.length + 1) <= 270) x = `${post.title} ${tagsX} ${post.url}`
  return { linkedin, x }
}

const COPY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    linkedin: { type: 'string' },
    x: { type: 'string' },
  },
  required: ['linkedin', 'x'],
}

/** Draft copy with Claude; falls back to a template if the key is missing or the call fails. */
async function draftCopy(post) {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return { ...templateCopy(post), source: 'template' }

  let Anthropic
  try {
    ;({ default: Anthropic } = await import('@anthropic-ai/sdk'))
  } catch {
    console.warn('[social] @anthropic-ai/sdk not installed; using template copy.')
    return { ...templateCopy(post), source: 'template' }
  }

  const voiceRule =
    post.voice === 'patrick'
      ? 'Write in the first person as Patrick Hussey (I/my).'
      : 'Write in the first person plural as Good Transformer (we/our/us). Never use "I".'

  const system = `You write social copy for Good Transformer, an AI advisory for UK business leaders.
${voiceRule}
Hard rules:
- NEVER use em dashes or en dashes. Use commas, colons, or separate sentences.
- UK English. Plain, direct, credible. No hype, no clickbait, no emoji.
- Do not invent facts beyond the title and description provided.
- Always include the article URL exactly as given.
LinkedIn post: a strong one-line hook, then 2 to 3 short paragraphs of substance, then the URL on its own line, then 2 to 3 relevant hashtags. Aim for 700 to 1300 characters.
X post: one sharp sentence plus the URL, optionally one or two hashtags. Must be 270 characters or fewer including the URL.
Return only the two posts via the structured output schema.`

  const userMsg = `Title: ${post.title}
Description: ${post.description}
URL: ${post.url}
Topic tags: ${post.tags.join(', ') || 'none'}`

  try {
    const client = new Anthropic({ apiKey: key })
    const res = await client.messages.parse({
      model: 'claude-opus-4-8',
      max_tokens: 2000,
      output_config: { effort: 'low', format: { type: 'json_schema', schema: COPY_SCHEMA } },
      system,
      messages: [{ role: 'user', content: userMsg }],
    })
    const out = res.parsed_output
    if (!out || !out.linkedin || !out.x) throw new Error('empty structured output')
    // Belt and braces: strip any dash characters the model slipped in.
    const clean = (s) => s.replace(/\s*[—–]\s*/g, ', ').trim()
    return { linkedin: clean(out.linkedin), x: clean(out.x), source: 'claude' }
  } catch (err) {
    console.warn(`[social] copy generation failed (${err.message}); using template.`)
    return { ...templateCopy(post), source: 'template' }
  }
}

// ── LinkedIn (Company Page, REST Posts API) ─────────────────────────────────

function linkedinConfigured() {
  return Boolean(process.env.LINKEDIN_ACCESS_TOKEN && process.env.LINKEDIN_ORG_ID)
}

async function postToLinkedIn(post, text) {
  const token = process.env.LINKEDIN_ACCESS_TOKEN
  const owner = `urn:li:organization:${process.env.LINKEDIN_ORG_ID}`
  const base = 'https://api.linkedin.com/rest'
  const headers = {
    Authorization: `Bearer ${token}`,
    'LinkedIn-Version': LINKEDIN_VERSION,
    'X-Restli-Protocol-Version': '2.0.0',
    'Content-Type': 'application/json',
  }

  // 1. Register an image upload for the org.
  const initRes = await fetch(`${base}/images?action=initializeUpload`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ initializeUploadRequest: { owner } }),
  })
  if (!initRes.ok) throw new Error(`LinkedIn image init ${initRes.status}: ${await initRes.text()}`)
  const { value } = await initRes.json()
  const { uploadUrl, image: imageUrn } = value

  // 2. Upload the social card bytes.
  const bytes = readFileSync(post.socialAbs)
  const upRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'image/jpeg' },
    body: bytes,
  })
  if (!upRes.ok) throw new Error(`LinkedIn image upload ${upRes.status}: ${await upRes.text()}`)

  // 3. Create the post with the image attached.
  const body = {
    author: owner,
    commentary: text,
    visibility: 'PUBLIC',
    distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] },
    content: {
      media: {
        id: imageUrn,
        title: post.title.slice(0, 200),
        altText: (post.coverAlt || post.title).slice(0, 350),
      },
    },
    lifecycleState: 'PUBLISHED',
    isReshareDisabledByAuthor: false,
  }
  const postRes = await fetch(`${base}/posts`, { method: 'POST', headers, body: JSON.stringify(body) })
  if (!postRes.ok) throw new Error(`LinkedIn post ${postRes.status}: ${await postRes.text()}`)
  return postRes.headers.get('x-restli-id') || 'posted'
}

// ── X (media upload + tweet via twitter-api-v2) ─────────────────────────────

function xConfigured() {
  return Boolean(
    process.env.X_API_KEY &&
      process.env.X_API_SECRET &&
      process.env.X_ACCESS_TOKEN &&
      process.env.X_ACCESS_SECRET,
  )
}

async function postToX(post, text) {
  let TwitterApi
  try {
    ;({ TwitterApi } = await import('twitter-api-v2'))
  } catch {
    throw new Error('twitter-api-v2 not installed')
  }
  const client = new TwitterApi({
    appKey: process.env.X_API_KEY,
    appSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_SECRET,
  })
  const bytes = readFileSync(post.socialAbs)
  const mediaId = await client.v1.uploadMedia(bytes, { mimeType: 'image/jpeg' })
  try {
    await client.v1.createMediaMetadata(mediaId, {
      alt_text: { text: (post.coverAlt || post.title).slice(0, 1000) },
    })
  } catch {
    /* alt text is best-effort */
  }
  const tweet = await client.v2.tweet({ text, media: { media_ids: [mediaId] } })
  return tweet?.data?.id || 'posted'
}

// ── Orchestration ───────────────────────────────────────────────────────────

async function main() {
  const args = parseArgs()
  const ledger = readLedger()
  ledger.posted = ledger.posted || {}
  const posts = loadPosts()

  if (posts.length === 0) {
    console.log('[social] No publishable posts with a social card. Nothing to do.')
    return
  }

  // --seed: record all current posts as already handled, without posting.
  if (args.seed) {
    let added = 0
    for (const p of posts) {
      if (!ledger.posted[p.slug]) {
        ledger.posted[p.slug] = { seeded: true }
        added += 1
      }
    }
    writeLedger(ledger)
    console.log(`[social] Seeded ${added} post(s) as already-posted. Future publishes will post.`)
    return
  }

  // Choose targets.
  let targets
  if (args.slug) {
    targets = posts.filter((p) => p.slug === args.slug)
    if (targets.length === 0) {
      console.log(`[social] No post + social card found for slug "${args.slug}".`)
      return
    }
  } else {
    targets = posts.filter((p) => !ledger.posted[p.slug]).slice(0, args.limit)
    if (targets.length === 0) {
      console.log('[social] No new posts to share (all in ledger).')
      return
    }
  }

  const liOn = linkedinConfigured()
  const xOn = xConfigured()
  if (!liOn) console.log('[social] LinkedIn not configured (LINKEDIN_ACCESS_TOKEN / LINKEDIN_ORG_ID) — skipping.')
  if (!xOn) console.log('[social] X not configured (X_API_KEY/SECRET, X_ACCESS_TOKEN/SECRET) — skipping.')

  let ledgerDirty = false
  for (const post of targets) {
    const copy = await draftCopy(post)
    console.log(`\n[social] ${post.slug} (copy: ${copy.source})`)
    console.log(`  image: ${post.socialAbs}`)
    console.log(`  ── LinkedIn ──\n${copy.linkedin}`)
    console.log(`  ── X (${copy.x.length} chars) ──\n${copy.x}`)

    if (args.dryRun) {
      console.log('  [dry-run] not posting.')
      continue
    }

    const record = ledger.posted[post.slug] || {}
    if (liOn && !record.linkedin) {
      try {
        record.linkedin = await postToLinkedIn(post, copy.linkedin)
        console.log(`  ✓ LinkedIn: ${record.linkedin}`)
      } catch (err) {
        record.linkedinError = err.message
        console.error(`  ✗ LinkedIn: ${err.message}`)
      }
    }
    if (xOn && !record.x) {
      try {
        record.x = await postToX(post, copy.x)
        console.log(`  ✓ X: ${record.x}`)
      } catch (err) {
        record.xError = err.message
        console.error(`  ✗ X: ${err.message}`)
      }
    }
    // Only record a slug as handled once at least one platform succeeded, so a
    // transient failure can be retried on the next run.
    if (record.linkedin || record.x) {
      ledger.posted[post.slug] = record
      ledgerDirty = true
    }
  }

  if (ledgerDirty && !args.dryRun) {
    writeLedger(ledger)
    console.log('\n[social] Ledger updated.')
  }
}

main().catch((err) => {
  console.error('[social] Fatal:', err)
  process.exit(1)
})
