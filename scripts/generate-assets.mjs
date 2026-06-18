#!/usr/bin/env node
/**
 * generate-assets.mjs
 *
 * Generates static brand assets for Good Transformer:
 *   public/og-image.png          2400×1260 Open Graph / social preview (2× retina)
 *   public/apple-touch-icon.png   180×180  Apple touch icon
 *   public/favicon.png             32×32   Browser favicon
 *   src/lib/og-version.ts                  Content hash of og-image.png (cache-bust)
 *
 * Run locally after any brand change, then commit the results:
 *   npm run generate:assets
 *
 * The generated files are committed to the repo and served as-is by the build.
 */

import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync, writeFileSync } from 'fs'
import { createHash } from 'crypto'

const __dir = dirname(fileURLToPath(import.meta.url))
const ROOT  = join(__dir, '..')
const PUB   = join(ROOT, 'public')
const LOGO  = join(PUB, 'logos', 'gt-logo.png')
const STACK = join(PUB, 'hero', 'attention-flow-the-path-to-ai-mastery-web.webp')

// ── Brand tokens ──────────────────────────────────────────────────────────────
const INK    = { r: 4,   g: 31,  b: 37  }   // #041F25
const PAPER  = { r: 250, g: 243, b: 234 }   // #FAF3EA
const SLATE  = { r: 90,  g: 97,  b: 102 }   // #5A6166
const TEAL   = { r: 0,   g: 140, b: 149 }   // #008C95
const AMBER  = { r: 196, g: 135, b: 58  }   // #C4873A

function rgb({ r, g, b }) {
  return `rgb(${r} ${g} ${b})`
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Colourize: return a copy of the logo PNG in a flat colour,
 * preserving the original alpha transparency.
 * Equivalent to CSS `filter: brightness(0)` + colour tint.
 */
async function colourize(r, g, b, w, h) {
  // Extract the alpha mask (shape of the tree) at target size
  const alpha = await sharp(LOGO)
    .resize(w, h, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extractChannel('alpha')
    .raw()
    .toBuffer()

  // Solid RGB plane in the requested colour
  const solid = await sharp({
    create: { width: w, height: h, channels: 3, background: { r, g, b } },
  })
    .raw()
    .toBuffer()

  // Join solid RGB + logo alpha → RGBA result
  return sharp(solid, { raw: { width: w, height: h, channels: 3 } })
    .joinChannel(alpha, { raw: { width: w, height: h, channels: 1 } })
    .png()
    .toBuffer()
}

// ═════════════════════════════════════════════════════════════════════════════
// OG IMAGES  1200 × 630  (rendered at 2× → 2400 × 1260)
// ═════════════════════════════════════════════════════════════════════════════
console.log('⏳  Generating OG images…')

const OW = 1200
const OH = 630
// Render at 2× (2400×1260) so cards stay crisp on retina screens and when
// social platforms uprender link previews. Layout coords below stay in the
// 1200×630 design space via each SVG's viewBox; only raster layers scale.
const SCALE = 2

// ── Shared layers (identical across every card) ───────────────────────────────
// 1. Exact warm paper background. Match the stack asset background exactly so
//    social previews do not show a visible block around the right-side visual.
const bgSvg = Buffer.from(`<svg width="${OW * SCALE}" height="${OH * SCALE}" viewBox="0 0 ${OW} ${OH}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${OW}" height="${OH}" fill="${rgb(PAPER)}"/>
  <circle cx="940" cy="145" r="220" fill="${rgb(TEAL)}" opacity="0.025"/>
  <circle cx="1015" cy="480" r="190" fill="${rgb(AMBER)}" opacity="0.018"/>
</svg>`)
const bg = await sharp(bgSvg).png().toBuffer()

// 2. Small ink logo for top-left brand mark.
const inkLogo78 = await colourize(INK.r, INK.g, INK.b, 78 * SCALE, 78 * SCALE)

// 3. Homepage stack visual for right-side social card continuity.
const stackVisual = await sharp(STACK)
  .resize(510 * SCALE, 510 * SCALE, { fit: 'contain', background: { ...PAPER, alpha: 0 } })
  .png()
  .toBuffer()

// ── Typography layer ──────────────────────────────────────────────────────────
//    Georgia for headlines (editorial serif), Helvetica Neue for UI text.
//    Both render correctly via librsvg/pango on macOS and on GitHub Actions
//    runners when font packages are installed. The headline is two lines; the
//    second line ends in a teal italic accent word ("AI." / "digest.").
function ogTextSvg({ headline1, headline2Pre, headline2Accent, tagline, byline, url }) {
  return Buffer.from(`<svg width="${OW * SCALE}" height="${OH * SCALE}" viewBox="0 0 ${OW} ${OH}" xmlns="http://www.w3.org/2000/svg">

  <!-- Brand eyebrow: "GOOD TRANSFORMER" in small teal caps -->
  <text x="191" y="114"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="12" letter-spacing="3.2"
    fill="${rgb(TEAL)}">GOOD TRANSFORMER</text>

  <!-- Headline line 1 -->
  <text x="80" y="278"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="80" font-weight="normal"
    letter-spacing="0"
    fill="${rgb(INK)}">${headline1}</text>

  <!-- Headline line 2 - prefix ink, accent word teal italic -->
  <text x="80" y="370"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="80" font-weight="normal"
    letter-spacing="0"
    fill="${rgb(INK)}">${headline2Pre}<tspan fill="${rgb(TEAL)}" font-style="italic">${headline2Accent}</tspan></text>

  <!-- Tagline -->
  <text x="80" y="434"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="24.5"
    fill="${rgb(SLATE)}">${tagline}</text>

  <!-- Hairline rule -->
  <rect x="80" y="486" width="500" height="1" fill="${rgb(INK)}" opacity="0.16"/>

  <!-- Patrick descriptor -->
  <text x="80" y="524"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="20.5"
    fill="${rgb(SLATE)}">${byline}</text>

  <!-- Site URL in teal -->
  <text x="80" y="562"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="20.5"
    fill="${rgb(TEAL)}">${url}</text>

</svg>`)
}

// ── Composite all layers into one card and write it ───────────────────────────
async function buildOgCard(outFile, copy) {
  await sharp(bg)
    .composite([
      // Homepage AI confidence stack - right-side social visual.
      { input: stackVisual,        left: 672 * SCALE, top: 60 * SCALE },
      // Brand mark top-left
      { input: inkLogo78,          left: 80 * SCALE,  top: 70 * SCALE },
      // All text
      { input: ogTextSvg(copy),    left: 0,           top: 0  },
    ])
    .png({ compressionLevel: 9 })
    .toFile(join(PUB, outFile))
  console.log(`✓  ${outFile}  (${OW * SCALE} × ${OH * SCALE})`)
}

// Default site-wide card — "Get confident with AI."
await buildOgCard('og-image.png', {
  headline1: 'Get confident',
  headline2Pre: 'with ',
  headline2Accent: 'AI.',
  tagline: 'AI lessons for leaders and advisory for teams',
  byline: 'Patrick Hussey - AI coach and fractional adviser',
  url: 'goodtransformer.ai',
})

// Newsletter card — instead of the hero stack, render the actual signup block
// (rhythm chooser + email + Subscribe) as vector art on the right. The left
// column carries the value proposition so "Get the digest" appears only once,
// inside the block. All elements are drawn in the 1200×630 design space.
const WARM = '#F7ECE4' // selected-card highlight (matches the live signup UI)
const newsletterArtSvg = Buffer.from(`<svg width="${OW * SCALE}" height="${OH * SCALE}" viewBox="0 0 ${OW} ${OH}" xmlns="http://www.w3.org/2000/svg">

  <!-- ── Left column: brand + value proposition ──────────────────────────── -->
  <!-- Brand eyebrow (sits beside the ink logo bitmap) -->
  <text x="191" y="114"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="12" letter-spacing="3.2"
    fill="${rgb(TEAL)}">GOOD TRANSFORMER</text>

  <!-- Headline line 1 -->
  <text x="80" y="255"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="64" fill="${rgb(INK)}">AI news for</text>

  <!-- Headline line 2 - "business " ink, "leaders." teal italic accent -->
  <text x="80" y="327"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="64" fill="${rgb(INK)}">business <tspan fill="${rgb(TEAL)}" font-style="italic">leaders.</tspan></text>

  <!-- Strapline -->
  <text x="80" y="381"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="22" fill="${rgb(SLATE)}">Read with judgement, not hype.</text>

  <!-- Hairline rule -->
  <rect x="80" y="486" width="430" height="1" fill="${rgb(INK)}" opacity="0.16"/>

  <!-- Patrick descriptor -->
  <text x="80" y="524"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="20.5" fill="${rgb(SLATE)}">Patrick Hussey - AI coach and fractional adviser</text>

  <!-- Site URL -->
  <text x="80" y="562"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="20.5" fill="${rgb(TEAL)}">goodtransformer.ai/newsletter</text>

  <!-- ── Right column: the signup block ──────────────────────────────────── -->
  <!-- Soft depth + white panel -->
  <rect x="660" y="138" width="480" height="370" rx="20" fill="${rgb(INK)}" opacity="0.05"/>
  <rect x="660" y="130" width="480" height="370" rx="20" fill="#ffffff" stroke="${rgb(INK)}" stroke-opacity="0.10" stroke-width="1.5"/>

  <!-- Block eyebrow + heading + sub -->
  <text x="692" y="180"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="12" letter-spacing="3.2" fill="${rgb(TEAL)}">NEWSLETTER</text>
  <text x="692" y="222"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="34" fill="${rgb(INK)}">Get the digest</text>
  <text x="692" y="250"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="14.5" fill="${rgb(SLATE)}">Choose your rhythm, then subscribe.</text>

  <!-- Weekly option (selected): warm fill, solid ink border, filled teal radio -->
  <rect x="692" y="272" width="200" height="116" rx="14" fill="${WARM}" stroke="${rgb(INK)}" stroke-width="2"/>
  <text x="712" y="312" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="21" font-weight="bold" fill="${rgb(INK)}">Weekly</text>
  <circle cx="864" cy="305" r="11" fill="none" stroke="${rgb(TEAL)}" stroke-width="2.5"/>
  <circle cx="864" cy="305" r="5" fill="${rgb(TEAL)}"/>
  <text x="712" y="344" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="13" fill="${rgb(SLATE)}">New Insights, plus</text>
  <text x="712" y="364" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="13" fill="${rgb(SLATE)}">5 big AI stories.</text>

  <!-- Daily option (unselected): white fill, faint border, empty radio -->
  <rect x="908" y="272" width="200" height="116" rx="14" fill="#ffffff" stroke="${rgb(INK)}" stroke-opacity="0.18" stroke-width="1.5"/>
  <text x="928" y="312" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="21" font-weight="bold" fill="${rgb(INK)}">Daily</text>
  <circle cx="1080" cy="305" r="11" fill="none" stroke="${rgb(SLATE)}" stroke-opacity="0.5" stroke-width="2"/>
  <text x="928" y="344" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="13" fill="${rgb(SLATE)}">New Insight, plus</text>
  <text x="928" y="364" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="13" fill="${rgb(SLATE)}">3 big AI stories.</text>

  <!-- Email input -->
  <rect x="692" y="410" width="288" height="52" rx="12" fill="#ffffff" stroke="${rgb(INK)}" stroke-opacity="0.18" stroke-width="1.5"/>
  <text x="712" y="443" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="18" fill="${rgb(SLATE)}" opacity="0.7">name@email.com</text>

  <!-- Subscribe button -->
  <rect x="992" y="410" width="116" height="52" rx="12" fill="${rgb(TEAL)}"/>
  <text x="1050" y="443" text-anchor="middle" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="18" font-weight="bold" fill="#ffffff">Subscribe</text>

</svg>`)

await sharp(bg)
  .composite([
    // Brand mark top-left
    { input: inkLogo78,          left: 80 * SCALE,  top: 70 * SCALE },
    // Left value prop + right signup block
    { input: newsletterArtSvg,   left: 0,           top: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(join(PUB, 'og-newsletter.png'))
console.log(`✓  og-newsletter.png  (${OW * SCALE} × ${OH * SCALE})`)

// Stamp a short content hash of each OG image into src/lib/og-version.ts.
// seo.ts appends it as ?v=<hash> so a card URL changes whenever its image does,
// busting platform caches (LinkedIn, X, iMessage, Slack) on its own.
const OG_VERSIONS = [
  ['og-image.png', 'OG_IMAGE_VERSION'],
  ['og-newsletter.png', 'OG_IMAGE_NEWSLETTER_VERSION'],
]
const versionLines = OG_VERSIONS.map(([file, name]) => {
  const hash = createHash('sha1')
    .update(readFileSync(join(PUB, file)))
    .digest('hex')
    .slice(0, 8)
  console.log(`✓  ${name}  (v=${hash})`)
  return `export const ${name} = ${JSON.stringify(hash)};`
})
writeFileSync(
  join(ROOT, 'src', 'lib', 'og-version.ts'),
  `// AUTO-GENERATED by scripts/generate-assets.mjs — do not edit by hand.\n` +
  `// Short content hashes of the public/og-*.png cards. Each is appended to its\n` +
  `// social-card URL so that when an image changes, the URL changes too, forcing\n` +
  `// platform caches (LinkedIn, X, Facebook, iMessage, Slack) to refetch the new image.\n` +
  versionLines.join('\n') + `\n`,
)
console.log(`✓  og-version.ts`)

// ═════════════════════════════════════════════════════════════════════════════
// FAVICON SET
// ═════════════════════════════════════════════════════════════════════════════
console.log('⏳  Generating favicons…')

/**
 * makeFavicon: teal rounded-square with centred white circuit tree.
 * size:   pixel dimensions (square)
 * radius: corner radius of the rounded square
 */
async function makeFavicon(size, radius) {
  const iconSize   = Math.round(size * 0.60)   // 60% of tile
  const offset     = Math.round((size - iconSize) / 2)

  // White tree at icon size
  const whiteLogo = await colourize(255, 255, 255, iconSize, iconSize)

  // Teal rounded-square background
  const bgSvgFav = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${rgb(TEAL)}"/>
    </svg>`
  )
  const bgFav = await sharp(bgSvgFav).png().toBuffer()

  return sharp(bgFav)
    .composite([{ input: whiteLogo, left: offset, top: offset }])
    .png()
    .toBuffer()
}

// apple-touch-icon  180 × 180
const touch = await makeFavicon(180, 38)
await sharp(touch).toFile(join(PUB, 'apple-touch-icon.png'))
console.log('✓  apple-touch-icon.png  (180 × 180)')

// favicon  32 × 32
const fav32 = await makeFavicon(32, 7)
await sharp(fav32).toFile(join(PUB, 'favicon.png'))
console.log('✓  favicon.png  (32 × 32)')

console.log('\n✅  All brand assets generated successfully.')
