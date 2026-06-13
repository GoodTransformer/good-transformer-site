/**
 * Plain-JS reader for Insights posts, shared by the digest scripts.
 * Mirrors src/lib/insights.ts but without TypeScript / Node-ESM-only concerns,
 * so the .mjs build scripts can use it directly.
 */

import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import matter from 'gray-matter'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const CONTENT_DIR = join(ROOT, 'content', 'insights')
const IGNORED = new Set(['CONTRACT.md', 'README.md'])

export const SITE_URL = 'https://goodtransformer.ai'

function toIsoDate(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value === 'string' && value.trim()) return value.trim().slice(0, 10)
  return ''
}

/** All published written posts (type !== asset, not draft), newest first. */
export function getPosts() {
  let files = []
  try {
    files = readdirSync(CONTENT_DIR)
  } catch {
    return []
  }

  return files
    .filter((f) => f.endsWith('.md') && !f.startsWith('_') && !IGNORED.has(f))
    .map((f) => {
      const slug = f.replace(/\.md$/, '')
      const { data } = matter(readFileSync(join(CONTENT_DIR, f), 'utf8'))
      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ''),
        date: toIsoDate(data.date),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        type: data.type === 'asset' ? 'asset' : 'post',
        cover: data.cover ? String(data.cover) : null,
        draft: data.draft === true,
        url: `${SITE_URL}/insights/${slug}/`,
      }
    })
    .filter((p) => !p.draft && p.type === 'post')
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

/** Posts published on `isoDay` (default: the newest post's day). */
export function postsForDay(isoDay) {
  const posts = getPosts()
  const day = isoDay || posts[0]?.date
  return posts.filter((p) => p.date === day)
}

/** Posts published within the `days`-day window ending at `endIso` inclusive. */
export function postsForWindow(endIso, days = 7) {
  const posts = getPosts()
  const end = endIso || posts[0]?.date
  if (!end) return []
  const endMs = Date.parse(`${end}T00:00:00Z`)
  const startMs = endMs - (days - 1) * 86400000
  return posts.filter((p) => {
    const t = Date.parse(`${p.date}T00:00:00Z`)
    return !Number.isNaN(t) && t >= startMs && t <= endMs
  })
}

/** Read the AI-news payload, or null if absent/empty. */
export function getNews() {
  try {
    const raw = readFileSync(join(ROOT, 'content', 'digests', 'news-latest.json'), 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed.stories) && parsed.stories.length ? parsed : null
  } catch {
    return null
  }
}
