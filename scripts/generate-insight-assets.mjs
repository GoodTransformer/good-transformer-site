#!/usr/bin/env node
/**
 * generate-insight-assets.mjs
 *
 * Renders the branded Insights series assets in marketing/templates/insight-*.html to:
 *   public/insights/assets/<slug>.pdf          print-ready A4 download (linked from the article)
 *   public/insights/assets/<slug>-preview.png  web-friendly preview of page 1
 *
 * Uses headless Chromium (Playwright) so the real brand fonts (Newsreader +
 * Schibsted Grotesk, loaded from Google Fonts) render exactly, matching the
 * existing collateral pipeline in generate-collateral.mjs.
 *
 *   npx playwright install chromium    # one-time, if needed
 *   npm run generate:insight-assets
 *
 * The HTML templates are the editable source; the rendered PDF/PNG are committed.
 * Add a row to ASSETS for each new article asset.
 */

import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dir = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dir, '..')
const TPL = join(ROOT, 'marketing', 'templates')
const OUT = join(ROOT, 'public', 'insights', 'assets')

// [template filename, output slug]: slug must match the article's assetFile / link.
const ASSETS = [
  ['insight-ai-leadership-literacy-self-assessment.html', 'ai-leadership-literacy-self-assessment'],
  ['insight-ai-delegation-decision-tree.html', 'ai-delegation-decision-tree'],
  ['insight-ai-use-case-value-scorecard.html', 'ai-use-case-value-scorecard'],
  ['insight-ai-value-conversion-worksheet.html', 'ai-value-conversion-worksheet'],
  ['insight-ai-strategy-canvas.html', 'ai-strategy-canvas'],
  ['insight-90-day-ai-adoption-planner.html', '90-day-ai-adoption-planner'],
  ['insight-small-business-ai-policy-template.html', 'small-business-ai-policy-template'],
  ['insight-ai-friction-time-log.html', 'ai-friction-time-log'],
  ['insight-ai-leadership-readiness-checklist.html', 'ai-leadership-readiness-checklist'],
  ['insight-ai-agent-job-card.html', 'ai-agent-job-card'],
  ['insight-human-delegation-checklist.html', 'human-delegation-checklist'],
  ['insight-shadow-ai-discovery-survey.html', 'shadow-ai-discovery-survey'],
  ['insight-30-day-ai-learning-to-adoption-plan.html', '30-day-ai-learning-to-adoption-plan'],
  ['insight-ai-work-mode-selector.html', 'ai-work-mode-selector'],
  ['insight-ai-adoption-maturity-ladder.html', 'ai-adoption-maturity-ladder'],
]

const url = (file) => pathToFileURL(join(TPL, file)).href

async function ready(page) {
  await page.evaluate(async () => { await document.fonts.ready })
  await page.waitForTimeout(200)
}

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
console.log('⏳  Generating insight assets…\n')

for (const [tpl, slug] of ASSETS) {
  // Print-ready PDF (A4, full-bleed warm paper).
  const pdfPage = await browser.newPage()
  await pdfPage.goto(url(tpl), { waitUntil: 'networkidle' })
  await ready(pdfPage)
  await pdfPage.emulateMedia({ media: 'print' })
  await pdfPage.pdf({
    path: join(OUT, `${slug}.pdf`),
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  })
  await pdfPage.close()
  console.log(`✓  pdf   public/insights/assets/${slug}.pdf`)

  // Web preview of page 1 (first .sheet), 2× for crisp display.
  const pngPage = await browser.newPage({ viewport: { width: 900, height: 1300 }, deviceScaleFactor: 2 })
  await pngPage.goto(url(tpl), { waitUntil: 'networkidle' })
  await ready(pngPage)
  await pngPage.locator('.sheet').first().screenshot({ path: join(OUT, `${slug}-preview.png`) })
  await pngPage.close()
  console.log(`✓  png   public/insights/assets/${slug}-preview.png`)
}

await browser.close()
console.log('\n✅  All insight assets generated.')
