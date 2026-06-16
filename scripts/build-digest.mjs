#!/usr/bin/env node
/**
 * build-digest.mjs
 *
 * Assembles the HTML for a daily or weekly Insights digest from the content
 * layer (posts) + content/digests/news-latest.json (AI news). Used by
 * send-digest.mjs, and runnable standalone to preview the email.
 *
 *   node scripts/build-digest.mjs --cadence weekly --out preview.html
 *   node scripts/build-digest.mjs --cadence daily --day 2026-06-10 --out preview.html
 *
 * Flags:
 *   --cadence daily|weekly   (default weekly)
 *   --day YYYY-MM-DD         override "today" (for previews / testing)
 *   --window N               weekly look-back window in days (default 7)
 *   --out FILE               write the HTML to FILE
 *
 * Brand note: email clients can't load Newsreader/Schibsted, so this uses
 * Georgia (serif) + Arial (sans) fallbacks with the brand colours inline.
 */

import { writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

import { getNews, postsForDay, postsForWindow, SITE_URL } from './lib/insights-data.mjs'

const INK = '#041F25'
const PAPER = '#FAF3EA'
const SAND = '#FBF8F4'
const SLATE = '#5A6166'
const TEAL = '#008C95'
const MIST = '#D8D1C7'
const LOGO = `${SITE_URL}/logos/gt-logo.png`

function parseArgs() {
  const a = process.argv.slice(2)
  const o = { cadence: 'weekly', window: 7 }
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] === '--cadence') o.cadence = a[++i]
    else if (a[i] === '--day') o.day = a[++i]
    else if (a[i] === '--window') o.window = Number(a[++i])
    else if (a[i] === '--out') o.out = a[++i]
  }
  if (o.cadence !== 'daily' && o.cadence !== 'weekly') {
    throw new Error(`--cadence must be "daily" or "weekly" (got "${o.cadence}")`)
  }
  return o
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00Z`)
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

function postBlock(post) {
  return `
  <tr><td style="padding:0 0 16px 0;">
    <a href="${esc(post.url)}" style="font-family:Georgia,'Times New Roman',serif;font-size:19px;line-height:1.25;color:${INK};text-decoration:none;font-weight:600;">${esc(
      post.title,
    )}</a>
    <p style="margin:5px 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:${SLATE};">${esc(
      post.description,
    )}</p>
    <a href="${esc(post.url)}" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${TEAL};text-decoration:none;font-weight:bold;letter-spacing:0.04em;">Read it &rarr;</a>
  </td></tr>`
}

function storyBlock(story) {
  const source = story.source
    ? `<span style="color:${SLATE};font-weight:normal;"> &middot; ${esc(story.source)}</span>`
    : ''
  return `
  <tr><td style="padding:0 0 13px 0;">
    <a href="${esc(story.url || '#')}" style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.35;color:${INK};text-decoration:none;font-weight:bold;">${esc(
      story.title,
    )}</a>${source}
    ${story.summary ? `<p style="margin:4px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13.5px;line-height:1.5;color:${SLATE};">${esc(story.summary)}</p>` : ''}
  </td></tr>`
}

// How far back an Insight's topic counts as "already covered" in the news block.
// The curated news feed is a rolling ~7 days and each daily Insight is itself a
// newsjack of a top story, so without this the digest repeats itself: today's
// Insight and the top story say the same thing, and a story we wrote about days
// ago keeps reappearing while it lingers in the feed.
const COVERED_LOOKBACK_DAYS = 14
// At least this many distinctive shared terms means a story is about the same
// thing as an Insight. Real pairs share 5+; coincidental overlap shares 0-1.
const TOPIC_MATCH_MIN = 3
// A shared term only counts if it appears in at most this many recent Insights.
// Words common across the catalogue ("adoption", "productivity") carry no signal
// about *which* piece a story echoes, so this IDF-style cap discards them.
const TOPIC_DOC_FREQ_MAX = 2

// Domain words too generic across AI-for-leaders writing to signal a topic.
const TOPIC_GENERIC = new Set([
  'model', 'tool', 'leader', 'business', 'team', 'company', 'firm', 'client',
  'people', 'staff', 'work', 'system',
])

// Function words and common, non-topical nouns/verbs/qualifiers.
const TOPIC_STOP = new Set([
  'this', 'that', 'these', 'those', 'from', 'into', 'your', 'their', 'our', 'they',
  'them', 'have', 'will', 'would', 'could', 'should', 'about', 'after', 'before',
  'over', 'under', 'than', 'then', 'when', 'where', 'what', 'which', 'with', 'whether',
  'just', 'only', 'also', 'still', 'rather', 'being', 'been', 'does', 'gets', 'because',
  'while', 'here', 'there', 'most', 'more', 'very', 'much', 'many', 'each', 'some', 'such',
  'useful', 'point', 'real', 'thing', 'case', 'part', 'time', 'week', 'month', 'year',
  'first', 'last', 'every', 'make', 'made', 'take', 'find', 'keep', 'need', 'want',
  'like', 'said', 'tell', 'number', 'figure', 'percent', 'report', 'lesson', 'reason',
  'question', 'answer', 'thing', 'today', 'kind', 'step', 'place',
])

// Significant terms in a piece of text: lowercased, light-stemmed, 4+ chars, no
// stopwords. Stemming is crude but symmetric, so "reaches"/"reach" align.
function topicTokens(text) {
  const out = new Set()
  for (const raw of String(text).toLowerCase().split(/[^a-z]+/)) {
    if (raw.length < 4 || TOPIC_STOP.has(raw)) continue
    const stem = raw.replace(/(ing|ed|es|s)$/, '')
    const tok = stem.length >= 4 ? stem : raw
    if (TOPIC_STOP.has(tok)) continue
    out.add(tok)
  }
  return out
}

// True when a story is about the same thing as one Insight: enough of its terms
// overlap that Insight, counting only terms that are distinctive — not generic,
// and rare across the recent catalogue (docFreq tells us how many carry them).
function storyEchoesCovered(story, postTokens, docFreq) {
  let distinctive = 0
  for (const t of topicTokens(`${story.title} ${story.summary || ''}`)) {
    if (!postTokens.has(t)) continue
    if (TOPIC_GENERIC.has(t) || (docFreq.get(t) || 0) > TOPIC_DOC_FREQ_MAX) continue
    distinctive += 1
    if (distinctive >= TOPIC_MATCH_MIN) return true
  }
  return false
}

// Drop stories an Insight has already covered (today's or within the lookback),
// so the news block never repeats the blog, then return the survivors in order.
function freshStories(stories, today) {
  const covered = postsForWindow(today, COVERED_LOOKBACK_DAYS).map((p) =>
    topicTokens(`${p.title} ${p.description || ''} ${(p.tags || []).join(' ')}`),
  )
  const docFreq = new Map()
  for (const tokens of covered) for (const t of tokens) docFreq.set(t, (docFreq.get(t) || 0) + 1)
  return stories.filter(
    (story) => !covered.some((tokens) => storyEchoesCovered(story, tokens, docFreq)),
  )
}

function sectionLabel(text) {
  return `<tr><td style="padding:0 0 11px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${TEAL};font-weight:bold;">${esc(
    text,
  )}</td></tr>`
}

function buildText({ label, today, intro, posts, stories }) {
  const out = [`GOOD TRANSFORMER, Insights ${label}, ${formatDate(today)}`, '', intro, '']
  if (posts.length) {
    out.push((label === 'Weekly' ? 'THIS WEEK ON INSIGHTS' : "TODAY'S INSIGHT"))
    posts.forEach((p) => out.push(`• ${p.title}`, `  ${p.url}`))
    out.push('')
  }
  if (stories.length) {
    out.push('AI NEWS FOR LEADERS')
    stories.forEach((s) => out.push(`• ${s.title}${s.source ? ` (${s.source})` : ''}`, s.url ? `  ${s.url}` : ''))
    out.push('')
  }
  out.push(`Work with Good Transformer: ${SITE_URL}/book/`, '', 'Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}')
  return out.filter((line) => line !== undefined).join('\n')
}

export function buildDigest({ cadence = 'weekly', day, window = 7 } = {}) {
  const isWeekly = cadence === 'weekly'
  const today = day || new Date().toISOString().slice(0, 10)
  const posts = isWeekly ? postsForWindow(today, window) : postsForDay(today)
  const news = getNews()
  const stories = news ? freshStories(news.stories, today).slice(0, isWeekly ? 5 : 3) : []

  const label = isWeekly ? 'Weekly' : 'Daily'
  const subject = `Good Transformer ${label}, ${formatDate(today)}`
  const intro = isWeekly
    ? "This week's Insights, plus the AI news that matters for leaders."
    : "Today's Insight, plus the AI news that matters for leaders."

  const postsSection = posts.length
    ? sectionLabel(isWeekly ? 'This week on Insights' : "Today's Insight") +
      posts.map(postBlock).join('')
    : `<tr><td style="padding:0 0 24px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${SLATE};">No new Insight ${
        isWeekly ? 'this week' : 'today'
      }, just the AI news below.</td></tr>`

  const newsSection = stories.length
    ? sectionLabel(`AI news for leaders`) + stories.map(storyBlock).join('')
    : ''

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(
    subject,
  )}</title></head>
<body style="margin:0;padding:0;background:${PAPER};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};">
    <tr><td align="center" style="padding:24px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${SAND};border:1px solid ${MIST};border-radius:18px;overflow:hidden;">
        <tr><td style="background:${INK};padding:18px 32px;">
          <img src="${LOGO}" width="34" height="34" alt="Good Transformer" style="display:inline-block;vertical-align:middle;border:0;outline:none;text-decoration:none;">
          <span style="display:inline-block;vertical-align:middle;margin-left:11px;font-family:Arial,Helvetica,sans-serif;font-size:15px;letter-spacing:0.18em;text-transform:uppercase;color:${PAPER};font-weight:bold;">Good Transformer</span>
          <span style="display:inline-block;vertical-align:middle;margin-left:12px;font-family:Georgia,serif;font-size:13px;color:#AEB9B8;">Insights ${esc(
            label,
          )} &middot; ${esc(formatDate(today))}</span>
        </td></tr>
        <tr><td style="background:${SAND};padding:22px 32px 6px 32px;">
          <p style="margin:0 0 18px 0;font-family:Georgia,serif;font-size:17px;line-height:1.4;color:${INK};">${esc(
            intro,
          )}</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${postsSection}
          </table>
          ${
            newsSection
              ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${MIST};"><tr><td style="height:16px;"></td></tr>${newsSection}</table>`
              : ''
          }
        </td></tr>
        <tr><td style="padding:4px 32px 24px 32px;border-top:1px solid ${MIST};">
          <a href="${SITE_URL}/book/" style="display:inline-block;margin:16px 0 14px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:${INK};text-decoration:none;border:1px solid ${TEAL};border-radius:8px;padding:10px 16px;">Book a discovery call &rarr;</a>
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${SLATE};">
            You're receiving the ${esc(
              label.toLowerCase(),
            )} Good Transformer Insights digest.<br>
            <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:${SLATE};text-decoration:underline;">Unsubscribe</a> &middot; Good Transformer, United Kingdom
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  const text = buildText({ label, today, intro, posts, stories })

  return { subject, html, text, posts, stories, cadence }
}

// CLI
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs()
  const result = buildDigest(args)
  console.log(`Subject: ${result.subject}`)
  console.log(`Posts: ${result.posts.length} · Stories: ${result.stories.length}`)
  if (args.out) {
    writeFileSync(args.out, result.html)
    console.log(`Wrote ${args.out}`)
  } else {
    console.log('(pass --out FILE to write the HTML)')
  }
}
