#!/usr/bin/env node
/**
 * generate-insight-covers.mjs
 *
 * Generates tasteful placeholder cover images for Insights posts that declare a
 * `cover:` in frontmatter but don't yet have the file on disk. Covers are
 * full-bleed dark-teal editorial art (house rule: teal is crisp/structural, and
 * dark treatments are the right call for full-bleed art): a seeded "attention"
 * node-graph motif — a quiet nod to the Transformer the brand is named for —
 * with the topic eyebrow and wordmark. The title is deliberately NOT drawn, so
 * the cover never duplicates the headline shown beside it.
 *
 *   node scripts/generate-insight-covers.mjs           # fill any missing covers
 *   node scripts/generate-insight-covers.mjs --force    # regenerate all
 *
 * Real cover art (e.g. from the automation generator) always wins — this only
 * fills gaps. Generated files are committed to the repo.
 */

import { readFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import matter from 'gray-matter'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_DIR = join(ROOT, 'content', 'insights')
const PUBLIC_DIR = join(ROOT, 'public')
const FORCE = process.argv.includes('--force')

const W = 1600
const H = 900

// Brand tokens
const INK = '#041F25'
const TEAL = '#008C95'
const MOSS = '#006F7A'
const PAPER = '#FAF3EA'

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h)
}

function formatTag(tag) {
  return tag.replace(/-/g, ' ').replace(/\bai\b/gi, 'AI').replace(/^./, (c) => c.toUpperCase())
}

/** First Markdown blockquote in the body, cleaned up — the article's pull-quote. */
function firstQuote(content) {
  const lines = content.split('\n')
  const collected = []
  let started = false
  for (const line of lines) {
    if (line.trimStart().startsWith('>')) {
      started = true
      collected.push(line.replace(/^\s*>\s?/, ''))
    } else if (started) {
      break
    }
  }
  let quote = collected
    .join(' ')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  // Prefer the first complete sentence — punchier, and never ends mid-thought.
  const sentence = quote.match(/^[^.!?]*[.!?]/)
  if (sentence) {
    const first = sentence[0].trim()
    if (first.length >= 24 && first.length < quote.length) quote = first
  }
  // Hard cap as a last resort for a single very long sentence.
  if (quote.length > 100) {
    quote = quote.slice(0, 97).replace(/\s+\S*$/, '') + '…'
  }
  return quote
}

/** Greedy word-wrap into at most maxLines lines of ~maxChars. */
function wrap(text, maxChars, maxLines) {
  const words = text.split(/\s+/)
  const lines = []
  let line = ''
  for (const word of words) {
    if ((line + ' ' + word).trim().length > maxChars && line) {
      lines.push(line)
      line = word
    } else {
      line = (line + ' ' + word).trim()
    }
  }
  if (line) lines.push(line)
  return lines.slice(0, maxLines)
}

/** Deterministic PRNG so each slug gets a distinct-but-stable composition. */
function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildSvg({ eyebrow, seed, quote }) {
  const rand = mulberry32(seed || 1)

  // With a quote, the constellation pulls right so the two never collide.
  const minX = quote ? 860 : 560
  const N = (quote ? 5 : 6) + Math.floor(rand() * 3)
  const nodes = []
  for (let i = 0; i < N; i += 1) {
    nodes.push({
      x: Math.round(minX + rand() * (W - minX - 150)),
      y: Math.round(150 + rand() * (H - 300)),
      r: 5 + Math.round(rand() * 2),
      o: (0.45 + rand() * 0.3).toFixed(2),
    })
  }

  // Connect each node to its two nearest neighbours (deduped) → a sparse graph.
  const seen = new Set()
  const edges = []
  nodes.forEach((n, i) => {
    nodes
      .map((m, j) => ({ j, d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
      .forEach((o) => {
        const key = i < o.j ? `${i}-${o.j}` : `${o.j}-${i}`
        if (!seen.has(key)) {
          seen.add(key)
          edges.push([i, o.j])
        }
      })
  })

  // Two right-most nodes become bright "active" nodes with a focus ring.
  const accent = new Set(
    nodes
      .map((n, i) => ({ i, x: n.x }))
      .sort((a, b) => b.x - a.x)
      .slice(0, 2)
      .map((o) => o.i),
  )

  const edgeSvg = edges
    .map(
      ([a, b]) =>
        `<line x1="${nodes[a].x}" y1="${nodes[a].y}" x2="${nodes[b].x}" y2="${nodes[b].y}" stroke="${PAPER}" stroke-opacity="0.18" stroke-width="1.5"/>`,
    )
    .join('')

  const nodeSvg = nodes
    .map((n, i) =>
      accent.has(i)
        ? `<circle cx="${n.x}" cy="${n.y}" r="22" fill="none" stroke="${PAPER}" stroke-opacity="0.5" stroke-width="1.5"/><circle cx="${n.x}" cy="${n.y}" r="10" fill="${PAPER}" fill-opacity="0.92"/>`
        : `<circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${PAPER}" fill-opacity="${n.o}"/>`,
    )
    .join('')

  const focus = [...accent][0]
  const glowX = nodes[focus]?.x ?? 1120
  const glowY = nodes[focus]?.y ?? 280

  // Pull-quote: serif italic, vertically centred in the clean left column, set
  // inside a matched pair of decorative marks that hug the text. The marks are
  // ~1.5x the body (brand rule: modest and paired, never a lone oversized
  // float) and are dropped DOWN into each line's cap band: a curly quote glyph
  // sits high in the em, so pinning it to the text baseline leaves it hovering
  // above the line — markDrop seats it against the words instead. The opening
  // mark hangs a fixed gap left of the column (text-anchor end, so the gap is
  // glyph-independent); the closing mark trails the final word with the same
  // drop so the pair reads symmetric.
  // NB: covers render in the Georgia fallback (no Newsreader on the box), so
  // the 0.35 drop fraction is tuned for Georgia — re-check it if Newsreader is
  // ever bundled.
  let quoteSvg = ''
  if (quote) {
    const qLines = wrap(quote, 22, 4)
    const lh = 60
    const blockTop = Math.round((H - qLines.length * lh) / 2) + 24
    const last = qLines.length - 1
    const bodySize = 46
    const markSize = 68
    const markOpacity = '0.5'
    const markDrop = Math.round(markSize * 0.35) // seat the high quote glyph in the line's cap band
    const hang = 12 // opening mark's glyph ends `hang` px left of the text column
    const closerDx = 4 // closing mark tucks just past the final punctuation
    const tspans = qLines
      .map((line, i) => {
        const span = `<tspan x="120" y="${blockTop + i * lh}">${escapeXml(line)}</tspan>`
        // Closing mark trails the final word, dropped to match the opener.
        return i === last
          ? `${span}<tspan dx="${closerDx}" dy="${markDrop}" font-size="${markSize}" fill-opacity="${markOpacity}">&#8221;</tspan>`
          : span
      })
      .join('')
    quoteSvg = `
  <text text-anchor="end" x="${120 - hang}" y="${blockTop + markDrop}" font-family="Newsreader, Georgia, serif" font-style="italic" font-size="${markSize}" fill="${PAPER}" fill-opacity="${markOpacity}">&#8220;</text>
  <text font-family="Newsreader, Georgia, serif" font-style="italic" font-size="${bodySize}" fill="${PAPER}" fill-opacity="0.96">${tspans}</text>`
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${INK}"/>
      <stop offset="0.62" stop-color="${MOSS}"/>
      <stop offset="1" stop-color="${TEAL}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${PAPER}" stop-opacity="0.18"/>
      <stop offset="1" stop-color="${PAPER}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" fill="none" stroke="${PAPER}" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <circle cx="${glowX}" cy="${glowY}" r="420" fill="url(#glow)"/>

  <!-- attention motif: nodes + edges -->
  <g>${edgeSvg}${nodeSvg}</g>
${quoteSvg}

  <!-- structural teal mark + topic eyebrow (crisp, not a wash) -->
  <line x1="120" y1="150" x2="220" y2="150" stroke="${PAPER}" stroke-opacity="0.85" stroke-width="3"/>
  <text x="120" y="194" font-family="Schibsted Grotesk, Arial, sans-serif" font-size="26" letter-spacing="6" fill="${PAPER}" fill-opacity="0.82">${escapeXml(
    eyebrow.toUpperCase(),
  )}</text>

  <text x="120" y="${H - 70}" font-family="Schibsted Grotesk, Arial, sans-serif" font-size="26" letter-spacing="4" fill="${PAPER}" fill-opacity="0.7">GOOD TRANSFORMER</text>
</svg>`
}

let files = []
try {
  files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_'))
} catch {
  console.log('No content/insights directory — nothing to do.')
  process.exit(0)
}

let made = 0
for (const file of files) {
  const slug = file.replace(/\.md$/, '')
  const { data, content } = matter(readFileSync(join(CONTENT_DIR, file), 'utf8'))
  if (!data.cover) continue
  const out = join(PUBLIC_DIR, String(data.cover).replace(/^\//, ''))
  if (existsSync(out) && !FORCE) continue

  const eyebrow = Array.isArray(data.tags) && data.tags[0] ? formatTag(data.tags[0]) : 'Insight'
  const quote = data.coverQuote ? String(data.coverQuote) : firstQuote(content)
  const svg = buildSvg({ eyebrow, seed: hash(slug), quote })

  mkdirSync(dirname(out), { recursive: true })
  await sharp(Buffer.from(svg)).jpeg({ quality: 86 }).toFile(out)
  made += 1
  console.log(`✓ ${data.cover}`)
}

console.log(made === 0 ? 'All covers already present.' : `Generated ${made} cover image(s).`)
