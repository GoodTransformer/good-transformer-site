#!/usr/bin/env node
/**
 * generate-collateral.mjs
 *
 * Renders the branded marketing collateral in marketing/templates/ to:
 *   public/downloads/*.pdf   one-pager, checklist, 3 sector inserts (A4)
 *   public/social/*.png      LinkedIn company cover (4200×700) + featured tile (1080×1080)
 *
 * Uses headless Chromium (Playwright) so the real brand fonts
 * (Newsreader + Schibsted Grotesk, loaded from Google Fonts) render exactly.
 *
 * Run locally after any copy/brand change, then commit the outputs:
 *   npx playwright install chromium   # one-time
 *   npm run generate:collateral
 *
 * Kept OUT of the build pipeline on purpose - the rendered files are committed,
 * so the static GitHub Pages deploy never needs a browser.
 */

import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dir = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dir, '..')
const TPL = join(ROOT, 'marketing', 'templates')
const DOWNLOADS = join(ROOT, 'public', 'downloads')
const SOCIAL = join(ROOT, 'public', 'social')
const PREVIEWS_DIR = join(ROOT, 'public', 'previews')

// A4 PDFs → public/downloads
const PDFS = [
  ['leaders-onepager.html',        'practical-ai-lessons-for-leaders.pdf'],
  ['checklist-5-questions.html',   '5-questions-before-buying-an-ai-tool.pdf'],
  ['insert-accountancy.html',      'ai-for-accountancy-and-advisory.pdf'],
  ['insert-recruitment.html',      'ai-for-recruitment.pdf'],
  ['insert-corporate-finance.html','ai-for-corporate-finance.pdf'],
  ['insert-agency.html',           'ai-for-agency-leaders.pdf'],
  ['insert-legal.html',            'ai-for-legal-and-risk-aware-professional-services.pdf'],
]

// PNGs (rendered at 2× for crisp retina display) → public/social
const PNGS = [
  ['linkedin-banner.html',         'linkedin-banner.png',         2100, 350],
  ['linkedin-featured.html',       'linkedin-featured.png',       1080, 1080],
  ['linkedin-featured-light.html', 'linkedin-featured-light.png', 1080, 1080],
]

// Page-image previews of each PDF, for the in-browser contact sheet → public/previews
const PREVIEWS = PDFS.map(([tpl, out]) => [tpl, out.replace(/\.pdf$/, '.png')])

// LinkedIn profile / company-page logo tiles (rendered from one template) → public/social
// [element id in linkedin-avatar.html, output filename]
const AVATARS = [
  ['teal',  'linkedin-avatar-teal.png'],
  ['ink',   'linkedin-avatar-ink.png'],
  ['paper', 'linkedin-avatar-paper.png'],
]

const url = (file) => pathToFileURL(join(TPL, file)).href

async function ready(page) {
  // Guarantee web fonts have loaded before we capture.
  await page.evaluate(async () => { await document.fonts.ready })
  await page.waitForTimeout(200)
}

await mkdir(DOWNLOADS, { recursive: true })
await mkdir(SOCIAL, { recursive: true })
await mkdir(PREVIEWS_DIR, { recursive: true })

const browser = await chromium.launch()
console.log('⏳  Generating collateral…\n')

// ── PDFs ────────────────────────────────────────────────────────────────────
for (const [tpl, out] of PDFS) {
  const page = await browser.newPage()
  await page.goto(url(tpl), { waitUntil: 'networkidle' })
  await ready(page)
  await page.emulateMedia({ media: 'print' })
  await page.pdf({
    path: join(DOWNLOADS, out),
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  })
  await page.close()
  console.log(`✓  pdf   public/downloads/${out}`)
}

// ── PNGs ────────────────────────────────────────────────────────────────────
for (const [tpl, out, w, h] of PNGS) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 })
  await page.goto(url(tpl), { waitUntil: 'networkidle' })
  await ready(page)
  await page.screenshot({ path: join(SOCIAL, out), clip: { x: 0, y: 0, width: w, height: h } })
  await page.close()
  console.log(`✓  png   public/social/${out}  (${w}×${h} @2×)`)
}

// ── PDF page-image previews (for the in-browser contact sheet) ────────────────
for (const [tpl, out] of PREVIEWS) {
  const page = await browser.newPage({ viewport: { width: 900, height: 1300 }, deviceScaleFactor: 2 })
  await page.goto(url(tpl), { waitUntil: 'networkidle' })
  await ready(page)
  await page.locator('.sheet').screenshot({ path: join(PREVIEWS_DIR, out) })
  await page.close()
  console.log(`✓  prev  public/previews/${out}`)
}

// ── LinkedIn avatar / company logo tiles ──────────────────────────────────────
{
  const page = await browser.newPage({ viewport: { width: 2100, height: 800 }, deviceScaleFactor: 2 })
  await page.goto(url('linkedin-avatar.html'), { waitUntil: 'networkidle' })
  await ready(page)
  for (const [id, out] of AVATARS) {
    await page.locator('#' + id).screenshot({ path: join(SOCIAL, out) })
    console.log(`✓  ava   public/social/${out}  (1200×1200)`)
  }
  await page.close()
}

await browser.close()
console.log('\n✅  All collateral generated.')
