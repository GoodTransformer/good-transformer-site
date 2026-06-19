#!/usr/bin/env node
/**
 * generate-insight-covers.mjs
 *
 * Generates tasteful placeholder cover images for Insights posts that declare a
 * `cover:` in frontmatter but don't yet have the file on disk. Covers are
 * full-bleed dark-teal editorial art (house rule: teal is crisp/structural, and
 * dark treatments are the right call for full-bleed art): a seeded "attention"
 * node-graph motif, a quiet nod to the Transformer the brand is named for,
 * with the topic eyebrow and wordmark. The title is deliberately NOT drawn, so
 * the cover never duplicates the headline shown beside it.
 *
 *   node scripts/generate-insight-covers.mjs           # fill any missing covers
 *   node scripts/generate-insight-covers.mjs --force    # regenerate all
 *
 * Real cover art (e.g. from the automation generator) always wins. This only
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
// --check: don't write images; just report any card whose copy would be clipped
// and exit non-zero. Lets the publish flow fail fast on overflowing headlines.
const CHECK = process.argv.includes('--check')

// Slugs whose social headline/subtitle overflowed its box and had to be
// ellipsised. A clipped card means the copy needs an explicit, shorter
// `socialTitle`/`socialSubtitle` in the post frontmatter.
const overflow = []

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

/** Condense a raw string into a punchy cover line: strip markup, prefer the
 *  first complete sentence, and hard-cap length so it never runs mid-thought. */
function condense(text) {
  let quote = String(text || '')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  // Prefer the first complete sentence: punchier, and never ends mid-thought.
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

/** First Markdown blockquote in the body, cleaned up: the article's pull-quote. */
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
  return condense(collected.join(' '))
}

/** Greedy word-wrap into at most maxLines lines of ~maxChars.
 *  If the text doesn't fit, the final line is closed with an ellipsis (at a
 *  word boundary) rather than chopped mid-phrase, and `wrap.truncated` is set
 *  so callers can warn instead of silently shipping clipped copy. Read
 *  `wrap.truncated` immediately after the call you care about. */
function wrap(text, maxChars, maxLines) {
  const words = String(text).split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''
  let consumed = 0
  for (const word of words) {
    const tentative = line ? `${line} ${word}` : word
    if (tentative.length > maxChars && line) {
      if (lines.length + 1 >= maxLines) break // last allowed line is full; stop
      lines.push(line)
      line = word
    } else {
      line = tentative
    }
    consumed += 1
  }
  if (line && lines.length < maxLines) lines.push(line)

  wrap.truncated = consumed < words.length
  if (wrap.truncated && lines.length) {
    let last = lines[lines.length - 1]
    while (last && `${last}…`.length > maxChars && /\s/.test(last)) {
      last = last.replace(/\s*\S+$/, '')
    }
    lines[lines.length - 1] = `${last.replace(/[\s,;:.]+$/, '')}…`
  }
  return lines
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

function buildSvg({ eyebrow, seed, quote, slug }) {
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
  // above the line. markDrop seats it against the words instead. The opening
  // mark hangs a fixed gap left of the column (text-anchor end, so the gap is
  // glyph-independent); the closing mark trails the final word with the same
  // drop so the pair reads symmetric.
  // NB: covers render in the Georgia fallback (no Newsreader on the box), so
  // the 0.35 drop fraction is tuned for Georgia: re-check it if Newsreader is
  // ever bundled.
  let quoteSvg = ''
  if (quote) {
    const qLines = wrap(quote, 22, 4)
    if (wrap.truncated) {
      overflow.push(`${slug}: cover quote clipped → "${qLines.join(' ')}" (set a shorter coverQuote, or shorten the post's first blockquote)`)
    }
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

// Social / OG share card (1200x630). Unlike the on-site cover, the headline and
// subtitle are baked IN — this image is used only for social sharing and the
// og:image, never rendered on the site, so it can carry the title without
// duplicating the heading shown beside the on-site cover. House style: dark
// teal, crisp bright-teal accent, the attention graph pulled clear to the right.
function buildSocialSvg({ eyebrow, title, subtitle, seed, slug }) {
  const rand = mulberry32(seed || 1)
  const SW = 1200
  const SH = 630
  const ACCENT = '#46D3C4' // crisp bright teal for the rule + active-node glow

  // Right-side attention graph, kept clear of the left text column.
  const minX = 700
  const N = 5 + Math.floor(rand() * 3)
  const nodes = []
  for (let i = 0; i < N; i += 1) {
    nodes.push({
      x: Math.round(minX + rand() * (SW - minX - 90)),
      y: Math.round(120 + rand() * (SH - 240)),
      r: 4 + Math.round(rand() * 2),
      o: (0.4 + rand() * 0.3).toFixed(2),
    })
  }
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
        `<line x1="${nodes[a].x}" y1="${nodes[a].y}" x2="${nodes[b].x}" y2="${nodes[b].y}" stroke="${PAPER}" stroke-opacity="0.16" stroke-width="1.5"/>`,
    )
    .join('')
  // Active nodes get a teal glow built from stacked translucent discs (no SVG
  // filter, so it renders identically on every box — same lesson as the covers).
  const nodeSvg = nodes
    .map((n, i) =>
      accent.has(i)
        ? `<circle cx="${n.x}" cy="${n.y}" r="46" fill="${ACCENT}" fill-opacity="0.10"/><circle cx="${n.x}" cy="${n.y}" r="30" fill="${ACCENT}" fill-opacity="0.16"/><circle cx="${n.x}" cy="${n.y}" r="19" fill="${ACCENT}" fill-opacity="0.22"/><circle cx="${n.x}" cy="${n.y}" r="17" fill="none" stroke="${PAPER}" stroke-opacity="0.5" stroke-width="1.5"/><circle cx="${n.x}" cy="${n.y}" r="8.5" fill="${PAPER}" fill-opacity="0.95"/>`
        : `<circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${PAPER}" fill-opacity="${n.o}"/>`,
    )
    .join('')
  const focus = [...accent][0]
  const glowX = nodes[focus]?.x ?? 900
  const glowY = nodes[focus]?.y ?? 300

  // Headline: auto-fit so it never spills the left column or runs past 3 lines.
  const colChars = (fs) => Math.max(8, Math.floor(560 / (0.55 * fs)))
  let titleFs = 50
  let titleLines = wrap(title, colChars(50), 4)
  for (const cand of [78, 70, 62, 56, 50]) {
    const lines = wrap(title, colChars(cand), 4)
    if (lines.length <= 3) {
      titleFs = cand
      titleLines = lines
      break
    }
  }
  const lh = Math.round(titleFs * 1.08)
  // Did the chosen headline drop words? (The fit-loop's later wrap() calls
  // clobber wrap.truncated, so compare rendered words against the source.)
  const wordCount = (s) => String(s).split(/\s+/).filter(Boolean).length
  const titleClipped = wordCount(titleLines.join(' ').replace(/…/g, '')) < wordCount(title)
  const subLines = wrap(subtitle, 46, 2)
  const subClipped = wrap.truncated
  const subLh = 32

  if (titleClipped) {
    overflow.push(`${slug}: headline clipped → "${titleLines.join(' ')}" (set a shorter socialTitle)`)
  }
  if (subClipped) {
    overflow.push(`${slug}: subtitle clipped → "${subLines.join(' ')}" (set a shorter socialSubtitle)`)
  }
  const subGap = 52
  // Centre the headline+subtitle block, but clamp so the last subtitle line
  // never drops past y=512 (≈62px above the wordmark) however tall the title is.
  const span = (titleLines.length - 1) * lh + subGap + (subLines.length - 1) * subLh
  const firstBaseline = Math.round(Math.max(250, Math.min(SH / 2 - span / 2 + 30, 512 - span)))
  const titleSvg = titleLines
    .map((line, i) => `<tspan x="80" y="${firstBaseline + i * lh}">${escapeXml(line)}</tspan>`)
    .join('')
  const subStart = firstBaseline + (titleLines.length - 1) * lh + subGap
  const subSvg = subLines
    .map((line, i) => `<tspan x="80" y="${subStart + i * subLh}">${escapeXml(line)}</tspan>`)
    .join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SW}" height="${SH}" viewBox="0 0 ${SW} ${SH}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${INK}"/>
      <stop offset="0.62" stop-color="${MOSS}"/>
      <stop offset="1" stop-color="${TEAL}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${PAPER}" stop-opacity="0.16"/>
      <stop offset="1" stop-color="${PAPER}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" fill="none" stroke="${PAPER}" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${SW}" height="${SH}" fill="url(#bg)"/>
  <rect width="${SW}" height="${SH}" fill="url(#grid)"/>
  <circle cx="${glowX}" cy="${glowY}" r="360" fill="url(#glow)"/>

  <g>${edgeSvg}${nodeSvg}</g>

  <line x1="80" y1="120" x2="178" y2="120" stroke="${ACCENT}" stroke-width="3"/>
  <text x="80" y="166" font-family="Schibsted Grotesk, Arial, sans-serif" font-size="22" letter-spacing="5" fill="${PAPER}" fill-opacity="0.85">${escapeXml(
    eyebrow.toUpperCase(),
  )}</text>

  <text font-family="Schibsted Grotesk, Arial, sans-serif" font-weight="700" font-size="${titleFs}" letter-spacing="-0.5" fill="${PAPER}">${titleSvg}</text>
  <text font-family="Schibsted Grotesk, Arial, sans-serif" font-size="25" fill="${PAPER}" fill-opacity="0.72">${subSvg}</text>

  <text x="80" y="${SH - 56}" font-family="Schibsted Grotesk, Arial, sans-serif" font-size="22" letter-spacing="4" fill="${PAPER}" fill-opacity="0.62">GOOD TRANSFORMER</text>
</svg>`
}

let files = []
try {
  files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_'))
} catch {
  console.log('No content/insights directory. Nothing to do.')
  process.exit(0)
}

let made = 0
for (const file of files) {
  const slug = file.replace(/\.md$/, '')
  const { data, content } = matter(readFileSync(join(CONTENT_DIR, file), 'utf8'))
  if (!data.cover) continue
  const out = join(PUBLIC_DIR, String(data.cover).replace(/^\//, ''))
  const socialOut = join(dirname(out), 'social.jpg')
  const eyebrow = Array.isArray(data.tags) && data.tags[0] ? formatTag(data.tags[0]) : 'Insight'

  // On-site cover: attention graph + pull-quote. The title is deliberately NOT
  // drawn — it renders as text beside the cover on the listing/article pages.
  if (CHECK || !existsSync(out) || FORCE) {
    // Quote source, in order of preference: an explicit coverQuote, then the
    // article's first blockquote, then the frontmatter description. The last
    // guarantees auto-published posts never ship a wordless cover even when the
    // author wrote no pull-quote.
    const quote =
      (data.coverQuote ? String(data.coverQuote) : firstQuote(content)) ||
      condense(data.description)
    // buildSvg records any clipped pull-quote in `overflow` as a side effect.
    const svg = buildSvg({ eyebrow, seed: hash(slug), quote, slug })
    if (!CHECK) {
      mkdirSync(dirname(out), { recursive: true })
      await sharp(Buffer.from(svg)).jpeg({ quality: 86 }).toFile(out)
      made += 1
      console.log(`✓ ${data.cover}`)
    }
  }

  // Social / OG card: headline + subtitle baked in, for sharing only (never
  // shown on-site). Optional socialTitle/socialSubtitle override the defaults.
  if (CHECK || !existsSync(socialOut) || FORCE) {
    const title = String(data.socialTitle ?? data.title ?? slug)
    const subtitle = condense(data.socialSubtitle ?? data.description)
    // buildSocialSvg records any clipping in `overflow` as a side effect.
    const svg = buildSocialSvg({ eyebrow, title, subtitle, seed: hash(slug), slug })
    if (!CHECK) {
      mkdirSync(dirname(socialOut), { recursive: true })
      await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(socialOut)
      made += 1
      console.log(`✓ ${String(data.cover).replace(/cover\.jpg$/i, 'social.jpg')}`)
    }
  }
}

if (overflow.length) {
  console.error(`\n⚠ ${overflow.length} image(s) have clipped copy:`)
  for (const w of overflow) console.error(`  • ${w}`)
}

if (CHECK) {
  console.log(overflow.length ? '' : '✓ All cover and social card copy fits.')
  process.exit(overflow.length ? 1 : 0)
}

console.log(made === 0 ? 'All images already present.' : `Generated ${made} image(s).`)
