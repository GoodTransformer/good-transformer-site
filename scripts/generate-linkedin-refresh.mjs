#!/usr/bin/env node
/**
 * generate-linkedin-refresh.mjs
 *
 * Renders the refreshed Good Transformer LinkedIn set to public/social:
 *   linkedin-cover-v2.png            2100×350 @2× → 4200×700  company cover
 *   linkedin-avatar-v2-halo.png      1200×1200                profile / logo (primary)
 *   linkedin-avatar-v2-ink.png       1200×1200                profile / logo (dark)
 *   linkedin-avatar-v2-paper.png     1200×1200                profile / logo (light)
 *
 * Uses headless Chromium so the real brand fonts (Newsreader + Schibsted
 * Grotesk via Google Fonts) render exactly. Same approach as
 * generate-collateral.mjs; kept separate so it does not re-render every PDF.
 *
 *   npm run generate:linkedin     (or: node scripts/generate-linkedin-refresh.mjs)
 */

import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dir = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dir, '..')
const TPL = join(ROOT, 'marketing', 'templates')
const SOCIAL = join(ROOT, 'public', 'social')

const url = (file) => pathToFileURL(join(TPL, file)).href

async function ready(page) {
  await page.evaluate(async () => { await document.fonts.ready })
  await page.waitForTimeout(250)
}

await mkdir(SOCIAL, { recursive: true })

const browser = await chromium.launch()
console.log('⏳  Rendering refreshed LinkedIn set…\n')

// ── Cover (2100×350 @2×) ──────────────────────────────────────────────────────
{
  const page = await browser.newPage({ viewport: { width: 2100, height: 350 }, deviceScaleFactor: 2 })
  await page.goto(url('linkedin-cover-v2.html'), { waitUntil: 'networkidle' })
  await ready(page)
  await page.screenshot({ path: join(SOCIAL, 'linkedin-cover-v2.png'), clip: { x: 0, y: 0, width: 2100, height: 350 } })
  await page.close()
  console.log('✓  cover   public/social/linkedin-cover-v2.png  (4200×700)')
}

// ── X / Twitter header (1500×500 @2× → 3000×1000) ─────────────────────────────
{
  const page = await browser.newPage({ viewport: { width: 1500, height: 500 }, deviceScaleFactor: 2 })
  await page.goto(url('twitter-cover.html'), { waitUntil: 'networkidle' })
  await ready(page)
  await page.screenshot({ path: join(SOCIAL, 'twitter-cover.png'), clip: { x: 0, y: 0, width: 1500, height: 500 } })
  await page.close()
  console.log('✓  twitter public/social/twitter-cover.png  (3000×1000)')
}

// ── Avatars (each tile screenshotted @2× → 1200×1200) ─────────────────────────
{
  const AVATARS = [
    ['halo',  'linkedin-avatar-v2-halo.png'],
    ['ink',   'linkedin-avatar-v2-ink.png'],
    ['paper', 'linkedin-avatar-v2-paper.png'],
  ]
  const page = await browser.newPage({ viewport: { width: 2100, height: 800 }, deviceScaleFactor: 2 })
  await page.goto(url('linkedin-avatar-v2.html'), { waitUntil: 'networkidle' })
  await ready(page)
  for (const [id, out] of AVATARS) {
    await page.locator('#' + id).screenshot({ path: join(SOCIAL, out) })
    console.log(`✓  avatar  public/social/${out}  (1200×1200)`)
  }
  await page.close()
}

await browser.close()
console.log('\n✅  Refreshed LinkedIn set generated.')
