#!/usr/bin/env node
/**
 * validate-insights.mjs
 *
 * Validates every Insights post against the publishing contract
 * (content/insights/CONTRACT.md). This is the gate the automation pipeline
 * must satisfy: it runs before `next build` in CI, so a malformed generated
 * post fails fast instead of shipping broken.
 *
 *   node scripts/validate-insights.mjs
 *
 * Exits 0 when every post is valid, 1 (with a report) otherwise.
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import matter from 'gray-matter'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_DIR = join(ROOT, 'content', 'insights')
const PUBLIC_DIR = join(ROOT, 'public')

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const PATRICK_AUTHOR = 'Patrick Hussey'
const FIRST_PERSON_SINGULAR_RE = /\b(?:I|i|I['’](?:m|ll|ve|d)|i['’](?:m|ll|ve|d)|me|my|mine|myself)\b/g

// Docs that live alongside the content but are not posts.
const IGNORED_FILES = new Set(['CONTRACT.md', 'README.md'])

const errors = []
const warnings = []

function fail(slug, message) {
  errors.push(`  ✗ ${slug}: ${message}`)
}

function warn(slug, message) {
  warnings.push(`  ! ${slug}: ${message}`)
}

/** Resolve a root-relative public path ("/insights/x/cover.jpg") to disk. */
function publicPath(ref) {
  return join(PUBLIC_DIR, ref.replace(/^\//, ''))
}

function stripInlineMarkdownNoise(line) {
  return line
    .replace(/`[^`]*`/g, ' ')
    .replace(/\]\([^)]+\)/g, ']')
}

function findFirstPersonSingular(content) {
  const matches = []
  let inFence = false

  content.split('\n').forEach((rawLine, index) => {
    const trimmed = rawLine.trim()
    if (trimmed.startsWith('```')) {
      inFence = !inFence
      return
    }
    if (inFence) return

    const line = stripInlineMarkdownNoise(rawLine)
    FIRST_PERSON_SINGULAR_RE.lastIndex = 0
    if (!FIRST_PERSON_SINGULAR_RE.test(line)) return

    const snippet = line.trim().replace(/\s+/g, ' ').slice(0, 120)
    matches.push(`line ${index + 1}: "${snippet}"`)
  })

  return matches
}

let files = []
try {
  files = readdirSync(CONTENT_DIR).filter(
    (f) => f.endsWith('.md') && !f.startsWith('_') && !IGNORED_FILES.has(f),
  )
} catch {
  console.log('No content/insights directory found. Nothing to validate.')
  process.exit(0)
}

if (files.length === 0) {
  console.log('No Insights posts found yet. Nothing to validate.')
  process.exit(0)
}

for (const file of files) {
  const slug = file.replace(/\.md$/, '')
  const raw = readFileSync(join(CONTENT_DIR, file), 'utf8')

  let data, content
  try {
    ;({ data, content } = matter(raw))
  } catch (err) {
    fail(slug, `frontmatter could not be parsed (${err.message})`)
    continue
  }

  // Slug == filename, kebab-case.
  if (!SLUG_RE.test(slug)) {
    fail(slug, 'filename must be lowercase kebab-case (a-z, 0-9, hyphens)')
  }

  // Required on every entry.
  if (!data.title || String(data.title).trim() === '') fail(slug, 'missing required field: title')
  if (!data.description || String(data.description).trim() === '')
    fail(slug, 'missing required field: description')

  // Date.
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? '')
  if (!date) {
    fail(slug, 'missing required field: date')
  } else if (!ISO_DATE_RE.test(date)) {
    fail(slug, `date must be YYYY-MM-DD (got "${date}")`)
  }

  // Tags.
  if (data.tags !== undefined && !Array.isArray(data.tags)) {
    fail(slug, 'tags must be a YAML list, e.g. ["ai-adoption", "leadership"]')
  } else if (!data.tags || data.tags.length === 0) {
    warn(slug, 'no tags: the post will not appear under any topic filter')
  }

  const type = data.type ?? 'post'
  if (type !== 'post' && type !== 'asset') {
    fail(slug, `type must be "post" or "asset" (got "${type}")`)
  }

  const voice = data.voice ?? 'brand'
  if (voice !== 'brand' && voice !== 'patrick') {
    fail(slug, `voice must be "brand" or "patrick" (got "${voice}")`)
  }

  const author = data.author ? String(data.author).trim() : ''
  if (type === 'post' && voice === 'patrick' && author !== PATRICK_AUTHOR) {
    fail(slug, 'voice: patrick requires author: "Patrick Hussey"')
  }
  if (type === 'post' && voice !== 'patrick' && author === PATRICK_AUTHOR) {
    fail(slug, 'author: "Patrick Hussey" is only allowed when voice: patrick is explicitly set')
  }

  // Cover image.
  if (data.cover) {
    if (!String(data.cover).startsWith('/')) {
      fail(slug, 'cover must be a root-relative path starting with "/"')
    } else if (!existsSync(publicPath(String(data.cover)))) {
      fail(slug, `cover image not found at public${data.cover}`)
    }
    if (!data.coverAlt || String(data.coverAlt).trim() === '') {
      fail(slug, 'coverAlt is required when a cover image is set (accessibility + SEO)')
    }
  } else if (type === 'post') {
    warn(slug, 'no cover image: the card will render text-only')
  }

  // Asset payload.
  if (type === 'asset') {
    if (!data.assetFile) {
      fail(slug, 'type "asset" requires assetFile')
    } else if (!String(data.assetFile).startsWith('/')) {
      fail(slug, 'assetFile must be a root-relative path starting with "/"')
    } else if (!existsSync(publicPath(String(data.assetFile)))) {
      fail(slug, `asset payload not found at public${data.assetFile}`)
    }
  }

  // Body present (skip for assets, which may be download-only).
  if (type === 'post' && content.trim().length < 80) {
    warn(slug, 'body is very short (< 80 chars)')
  }

  // Editorial voice.
  if (type === 'post' && voice !== 'patrick') {
    const firstPersonMatches = findFirstPersonSingular(content)
    if (firstPersonMatches.length > 0) {
      fail(
        slug,
        `brand-voice posts must use Good Transformer we/our/us, not first-person singular (${firstPersonMatches
          .slice(0, 3)
          .join('; ')})`,
      )
    }
  }
}

if (warnings.length > 0) {
  console.log(`\nInsights warnings (${warnings.length}):`)
  console.log(warnings.join('\n'))
}

if (errors.length > 0) {
  console.error(`\nInsights validation FAILED (${errors.length} error${errors.length > 1 ? 's' : ''}):`)
  console.error(errors.join('\n'))
  console.error('\nSee content/insights/CONTRACT.md for the publishing contract.\n')
  process.exit(1)
}

console.log(`\n✓ Insights validation passed: ${files.length} entr${files.length > 1 ? 'ies' : 'y'} OK.`)
