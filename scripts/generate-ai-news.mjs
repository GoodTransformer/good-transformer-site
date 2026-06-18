#!/usr/bin/env node
/**
 * generate-ai-news.mjs
 *
 * Produces content/digests/news-latest.json, the "AI news for leaders" block
 * in the daily/weekly digest. news-latest.json is gitignored and rebuilt on
 * every send; this script is the step that fills it.
 *
 * Source of truth: the newsjack engine (the daily blog machine) writes a
 * purpose-built file per cadence, with selection, freshness and same-cadence
 * dedup already done on its side (it is the only component that knows what has
 * shipped):
 *
 *   content/digests/news-daily.json   up to 3, deduped vs recent dailies, ranked
 *   content/digests/news-weekly.json  up to 5, the biggest of the last 7 days
 *
 * Both share one schema, with a stable per-story `id` the engine keys dedup on:
 *
 *   { "generatedAt": "YYYY-MM-DD", "cadence": "daily",
 *     "stories": [ { "id", "title", "url", "source", "summary" }, ... ] }
 *
 * Stories arrive ordered most-important-first and already counted, so this script
 * no longer slices them. It picks the file for the cadence being sent, validates
 * it, applies a freshness guard, and copies it through to news-latest.json. The
 * `preselected: true` flag it stamps tells build-digest.mjs not to re-slice.
 *
 * Transition: the engine also keeps writing the old rolling pool,
 * content/digests/news-curated.json (a copy of the weekly file), until the site
 * confirms the switch. If the cadence file is absent we fall back to that pool
 * and stamp `preselected: false`, so build-digest.mjs applies the legacy top-3
 * (daily) / top-5 (weekly) slice and nothing breaks mid-transition.
 *
 *   node scripts/generate-ai-news.mjs --cadence daily    # news-daily.json  -> latest
 *   node scripts/generate-ai-news.mjs --cadence weekly   # news-weekly.json -> latest (default)
 *   node scripts/generate-ai-news.mjs --sample           # committed sample (local preview only)
 *
 * Design notes:
 *  - If the source is missing, empty, or older than MAX_AGE_DAYS, this writes an
 *    empty stories list. The digest builder tolerates that and simply omits the
 *    news block, so a quiet week ships the posts alone rather than stale news.
 *  - All editorial judgement (what matters, the leader angle, the wording, and
 *    now the selection) lives in the newsjack engine, not here. This script is
 *    plumbing, kept dumb on purpose.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIGEST_DIR = join(ROOT, 'content', 'digests')
const CURATED = join(DIGEST_DIR, 'news-curated.json')
const DAILY = join(DIGEST_DIR, 'news-daily.json')
const WEEKLY = join(DIGEST_DIR, 'news-weekly.json')
const SAMPLE = join(DIGEST_DIR, 'news-sample.json')
const OUT = join(DIGEST_DIR, 'news-latest.json')

const MAX_AGE_DAYS = 10 // older than this and we drop the news block rather than mail stale stories
const useSample = process.argv.includes('--sample')
const cadIdx = process.argv.indexOf('--cadence')
const cadence = cadIdx !== -1 && process.argv[cadIdx + 1] === 'daily' ? 'daily' : 'weekly'

mkdirSync(DIGEST_DIR, { recursive: true })

function writeEmpty(reason) {
  writeFileSync(OUT, JSON.stringify({ generatedAt: '', cadence, preselected: false, stories: [] }, null, 2))
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
    const id = String(s.id || '').trim()
    const title = String(s.title || '').trim()
    const url = String(s.url || '').trim()
    const summary = String(s.summary || '').trim()
    const source = String(s.source || '').trim()
    if (!title || !summary || !isHttpUrl(url)) {
      console.warn(`! skipped a story missing a title, summary, or real URL: "${title || '(untitled)'}"`)
      continue
    }
    // Dedup on the stable id when present (a story's URL can change between days,
    // so the engine keys on id); fall back to the URL for the legacy pool.
    const key = id ? `id:${id.toLowerCase()}` : url.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(id ? { id, title, url, source, summary } : { title, url, source, summary })
  }
  return out
}

function ageInDays(iso) {
  const t = Date.parse(`${String(iso).slice(0, 10)}T00:00:00Z`)
  if (Number.isNaN(t)) return Infinity
  return (Date.now() - t) / 86400000
}

// Prefer the purpose-built file the engine writes for this cadence (already
// selected, so build-digest must not re-slice it). During the transition, fall
// back to the rolling curated pool, which is unselected and still needs slicing.
let sourcePath
let sourceLabel
let preselected
if (useSample) {
  sourcePath = SAMPLE
  sourceLabel = 'sample'
  preselected = false
} else {
  const cadenceFile = cadence === 'daily' ? DAILY : WEEKLY
  if (existsSync(cadenceFile)) {
    sourcePath = cadenceFile
    sourceLabel = `news-${cadence}.json`
    preselected = true
  } else {
    sourcePath = CURATED
    sourceLabel = 'news-curated.json (fallback)'
    preselected = false
  }
}

if (!existsSync(sourcePath)) {
  if (useSample) {
    writeEmpty('no sample found')
  } else {
    writeEmpty(`no news-${cadence}.json or news-curated.json found yet; the newsjack engine has not written one`)
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
  cadence,
  preselected,
  stories,
}
writeFileSync(OUT, JSON.stringify(payload, null, 2))
console.log(
  `Wrote content/digests/news-latest.json from ${sourceLabel} for the ${cadence} send ` +
    `(${stories.length} stories, generated ${payload.generatedAt}, preselected=${preselected}).`,
)
