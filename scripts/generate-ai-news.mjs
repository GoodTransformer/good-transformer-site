#!/usr/bin/env node
/**
 * generate-ai-news.mjs
 *
 * Produces content/digests/news-latest.json, the "AI news for leaders" block
 * in the daily/weekly digest. news-latest.json is gitignored and rebuilt on
 * every send; this script is the step that fills it.
 *
 * Source of truth: content/digests/news-curated.json (tracked, committed).
 * That file is written by the Good Transformer newsjack engine (the daily blog
 * machine), which already scans the news, keeps the stories a leader must react
 * to, ranks them, and writes a rolling seven-day list in this exact schema:
 *
 *   { "generatedAt": "YYYY-MM-DD",
 *     "stories": [ { "title", "url", "source", "summary" }, ... ] }
 *
 * Stories are ordered most-important-first. The digest takes the top 3 (daily)
 * or top 5 (weekly). This script copies the curated list through to
 * news-latest.json after a light validation, with a freshness guard so a stale
 * feed is dropped rather than mailed.
 *
 *   node scripts/generate-ai-news.mjs           # curated -> latest (normal path)
 *   node scripts/generate-ai-news.mjs --sample  # use the committed sample (local preview only)
 *
 * Design notes:
 *  - If curated is missing, empty, or older than MAX_AGE_DAYS, this writes an
 *    empty stories list. The digest builder tolerates that and simply omits the
 *    news block, so a quiet week ships the posts alone rather than stale news.
 *  - All editorial judgement (what matters, the leader angle, the wording) lives
 *    in the newsjack engine, not here. This script is plumbing, kept dumb on
 *    purpose so there is one place that decides what leaders read.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIGEST_DIR = join(ROOT, 'content', 'digests')
const CURATED = join(DIGEST_DIR, 'news-curated.json')
const SAMPLE = join(DIGEST_DIR, 'news-sample.json')
const OUT = join(DIGEST_DIR, 'news-latest.json')

const MAX_AGE_DAYS = 10 // older than this and we drop the news block rather than mail stale stories
const useSample = process.argv.includes('--sample')

mkdirSync(DIGEST_DIR, { recursive: true })

function writeEmpty(reason) {
  writeFileSync(OUT, JSON.stringify({ generatedAt: '', stories: [] }, null, 2))
  console.log(`Wrote an empty news-latest.json (${reason}). The digest will omit the news block.`)
}

function isHttpUrl(u) {
  return typeof u === 'string' && /^https?:\/\//i.test(u) && !/example\.com/i.test(u)
}

// A story is shippable if it has a real title, a real link, and a summary.
function cleanStories(stories) {
  if (!Array.isArray(stories)) return []
  const seen = new Set()
  const out = []
  for (const s of stories) {
    if (!s || typeof s !== 'object') continue
    const title = String(s.title || '').trim()
    const url = String(s.url || '').trim()
    const summary = String(s.summary || '').trim()
    const source = String(s.source || '').trim()
    if (!title || !summary || !isHttpUrl(url)) {
      console.warn(`! skipped a story missing a title, summary, or real URL: "${title || '(untitled)'}"`)
      continue
    }
    const key = url.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push({ title, url, source, summary })
  }
  return out
}

function ageInDays(iso) {
  const t = Date.parse(`${String(iso).slice(0, 10)}T00:00:00Z`)
  if (Number.isNaN(t)) return Infinity
  return (Date.now() - t) / 86400000
}

const sourcePath = useSample ? SAMPLE : CURATED
const sourceLabel = useSample ? 'sample' : 'curated'

if (!existsSync(sourcePath)) {
  if (useSample) {
    writeEmpty('no sample found')
  } else {
    writeEmpty('no news-curated.json found yet; the newsjack engine has not written one')
  }
  process.exit(0)
}

let parsed
try {
  parsed = JSON.parse(readFileSync(sourcePath, 'utf8'))
} catch (e) {
  writeEmpty(`could not parse ${sourceLabel}: ${e.message}`)
  process.exit(0)
}

const age = ageInDays(parsed.generatedAt)
if (!useSample && age > MAX_AGE_DAYS) {
  writeEmpty(`curated feed is ${Math.round(age)} days old (limit ${MAX_AGE_DAYS}), treating as stale`)
  process.exit(0)
}

const stories = cleanStories(parsed.stories)
if (!stories.length) {
  writeEmpty(`${sourceLabel} had no shippable stories`)
  process.exit(0)
}

const payload = {
  generatedAt: String(parsed.generatedAt || '').slice(0, 10),
  stories,
}
writeFileSync(OUT, JSON.stringify(payload, null, 2))
console.log(
  `Wrote content/digests/news-latest.json from ${sourceLabel} (${stories.length} stories, generated ${payload.generatedAt}).`,
)
