#!/usr/bin/env node
/**
 * generate-ai-news.mjs  (PLACEHOLDER)
 *
 * Produces content/digests/news-latest.json — the "biggest AI stories for
 * leaders" block used by the daily/weekly digest. This is the slot the
 * automation pipeline (Cowork / Codex + a news API or search) fills.
 *
 *   node scripts/generate-ai-news.mjs            # writes news-latest.json
 *   node scripts/generate-ai-news.mjs --sample    # copy the committed sample
 *
 * Contract (see NEWSLETTER-SETUP.md §News): an object with `generatedAt`
 * (YYYY-MM-DD) and `stories` ordered most-important-first, each:
 *   { title, url, source, summary }
 * The digest takes the top 3 (daily) or top 5 (weekly).
 *
 * TODO: GENERATOR — replace the body below with the real call:
 *   1. Fetch candidate stories (news API / search over the last 24h or 7d).
 *   2. Have the model rank + summarise the top stories *for leaders*
 *      (decision-relevant, sceptical, no hype) in Good Transformer's voice.
 *   3. Write the JSON in the shape above.
 * It will need a news source and an API key (e.g. NEWS_API_KEY, plus the
 * model provider key) supplied as GitHub Actions secrets.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIGEST_DIR = join(ROOT, 'content', 'digests')
const SAMPLE = join(DIGEST_DIR, 'news-sample.json')
const OUT = join(DIGEST_DIR, 'news-latest.json')

mkdirSync(DIGEST_DIR, { recursive: true })

// Until the generator is wired, fall back to the committed sample so the
// digest pipeline is runnable end-to-end (the digest build also tolerates a
// missing file and simply omits the news block).
if (existsSync(SAMPLE)) {
  const sample = readFileSync(SAMPLE, 'utf8')
  writeFileSync(OUT, sample)
  console.log('Wrote content/digests/news-latest.json from the sample (PLACEHOLDER).')
  console.log('→ Replace this script body with the real news generator. See the header.')
} else {
  writeFileSync(OUT, JSON.stringify({ generatedAt: '', stories: [] }, null, 2))
  console.log('Wrote an empty news-latest.json (no sample found).')
}
