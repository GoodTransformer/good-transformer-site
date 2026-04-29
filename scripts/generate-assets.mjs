#!/usr/bin/env node
/**
 * generate-assets.mjs
 *
 * Generates static brand assets for Good Transformer:
 *   public/og-image.png          1200×630  Open Graph / social preview
 *   public/apple-touch-icon.png   180×180  Apple touch icon
 *   public/favicon.png             32×32   Browser favicon
 *
 * Run once locally after any brand change:
 *   node scripts/generate-assets.mjs
 *
 * The generated files are committed to the repo.
 * Also runs as part of `npm run build` via the `prebuild` script.
 */

import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const ROOT  = join(__dir, '..')
const PUB   = join(ROOT, 'public')
const LOGO  = join(PUB, 'logos', 'gt-logo.png')

// ── Brand tokens ──────────────────────────────────────────────────────────────
const INK    = { r: 18,  g: 27,  b: 34  }   // #121B22
const PAPER  = { r: 241, g: 236, b: 228 }   // #F1ECE4
const SLATE  = { r: 73,  g: 83,  b: 92  }   // #49535C
const TEAL   = { r: 0,   g: 140, b: 149 }   // #008C95
const GRAD_T = '#F3EEE6'                      // gradient top
const GRAD_B = '#ECE5DB'                      // gradient bottom

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

/**
 * Fade: uniformly reduce the alpha channel of an RGBA PNG buffer.
 * fraction: 0.0 (transparent) → 1.0 (unchanged)
 */
async function fade(buffer, fraction) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  for (let i = 3; i < data.length; i += 4) {
    data[i] = Math.round(data[i] * fraction)
  }
  return sharp(Buffer.from(data), { raw: info }).png().toBuffer()
}

// ═════════════════════════════════════════════════════════════════════════════
// OG IMAGE  1200 × 630
// ═════════════════════════════════════════════════════════════════════════════
console.log('⏳  Generating og-image.png…')

const OW = 1200
const OH = 630

// ── 1. Warm gradient background ───────────────────────────────────────────────
const bgSvg = Buffer.from(`<svg width="${OW}" height="${OH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${GRAD_T}"/>
      <stop offset="100%" stop-color="${GRAD_B}"/>
    </linearGradient>
  </defs>
  <rect width="${OW}" height="${OH}" fill="url(#bg)"/>
</svg>`)
const bg = await sharp(bgSvg).png().toBuffer()

// ── 2. Logo layers ────────────────────────────────────────────────────────────
// Small ink logo for top-left brand mark  (90 × 90)
const inkLogo90  = await colourize(INK.r,  INK.g,  INK.b,  90,  90)
// Large ink logo for faded decorative panel (480 × 480)
const inkLogo480 = await colourize(INK.r,  INK.g,  INK.b,  480, 480)
const fadedLogo  = await fade(inkLogo480, 0.065)   // ~6.5% opacity ghost

// ── 3. Teal accent bars (SVG overlay) ─────────────────────────────────────────
const barsSvg = Buffer.from(`<svg width="${OW}" height="${OH}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0"       width="7"    height="${OH}" fill="#008C95"/>
  <rect x="0" y="${OH-4}" width="${OW}" height="4"    fill="#008C95"/>
</svg>`)

// ── 4. Typography layer ───────────────────────────────────────────────────────
//    Georgia for headlines (editorial serif), Helvetica Neue for UI text.
//    Both render correctly via librsvg/pango on macOS and on GitHub Actions
//    runners when font packages are installed.
const textSvg = Buffer.from(`<svg width="${OW}" height="${OH}" xmlns="http://www.w3.org/2000/svg">

  <!-- Brand eyebrow: "GOOD TRANSFORMER" in small teal caps -->
  <text x="191" y="114"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="12" letter-spacing="3.2"
    fill="#008C95">GOOD TRANSFORMER</text>

  <!-- Headline line 1 -->
  <text x="80" y="286"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="80" font-weight="normal"
    letter-spacing="-1.5"
    fill="#121B22">Get confident</text>

  <!-- Headline line 2 — "with " ink, "AI." teal -->
  <text x="80" y="378"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="80" font-weight="normal"
    letter-spacing="-1.5"
    fill="#121B22">with <tspan fill="#008C95">AI.</tspan></text>

  <!-- Tagline -->
  <text x="80" y="438"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="26.5"
    fill="#49535C">Personal AI lessons and practical business advisory</text>

  <!-- Hairline rule -->
  <rect x="80" y="490" width="530" height="1" fill="#121B22" opacity="0.16"/>

  <!-- Patrick descriptor -->
  <text x="80" y="528"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="20.5"
    fill="#49535C">Patrick Hussey — AI coach and fractional adviser</text>

  <!-- Site URL in teal -->
  <text x="80" y="566"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="20.5"
    fill="#008C95">goodtransformer.ai</text>

</svg>`)

// ── 5. Composite all layers ───────────────────────────────────────────────────
await sharp(bg)
  .composite([
    // Ghost circuit tree — decorative right-side panel
    { input: fadedLogo,  left: 678, top: 75 },
    // Teal bars (left edge + bottom edge)
    { input: barsSvg,    left: 0,   top: 0  },
    // Brand mark top-left
    { input: inkLogo90,  left: 80,  top: 68 },
    // All text
    { input: textSvg,    left: 0,   top: 0  },
  ])
  .png({ compressionLevel: 9 })
  .toFile(join(PUB, 'og-image.png'))

console.log('✓  og-image.png  (1200 × 630)')

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
      <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#008C95"/>
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
