#!/usr/bin/env node
/**
 * generate-assets.mjs
 *
 * Generates static brand assets for Good Transformer:
 *   public/og-image.png          2400×1260 Open Graph / social preview (2× retina)
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
// OG IMAGE  1200 × 630
// ═════════════════════════════════════════════════════════════════════════════
console.log('⏳  Generating og-image.png…')

const OW = 1200
const OH = 630
// Render at 2× (2400×1260) so cards stay crisp on retina screens and when
// social platforms uprender link previews. Layout coords below stay in the
// 1200×630 design space via each SVG's viewBox; only raster layers scale.
const SCALE = 2

// ── 1. Exact warm paper background ────────────────────────────────────────────
// Match the stack asset background exactly so social previews do not show a
// visible block around the right-side visual.
const bgSvg = Buffer.from(`<svg width="${OW * SCALE}" height="${OH * SCALE}" viewBox="0 0 ${OW} ${OH}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${OW}" height="${OH}" fill="${rgb(PAPER)}"/>
  <circle cx="940" cy="145" r="220" fill="${rgb(TEAL)}" opacity="0.025"/>
  <circle cx="1015" cy="480" r="190" fill="${rgb(AMBER)}" opacity="0.018"/>
</svg>`)
const bg = await sharp(bgSvg).png().toBuffer()

// ── 2. Visual layers ──────────────────────────────────────────────────────────
// Small ink logo for top-left brand mark.
const inkLogo78 = await colourize(INK.r, INK.g, INK.b, 78 * SCALE, 78 * SCALE)

// Homepage stack visual for right-side social card continuity.
const stackVisual = await sharp(STACK)
  .resize(510 * SCALE, 510 * SCALE, { fit: 'contain', background: { ...PAPER, alpha: 0 } })
  .png()
  .toBuffer()

// ── 3. Teal accent bars (SVG overlay) ─────────────────────────────────────────
const barsSvg = Buffer.from(`<svg width="${OW * SCALE}" height="${OH * SCALE}" viewBox="0 0 ${OW} ${OH}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0"       width="7"    height="${OH}" fill="${rgb(TEAL)}"/>
  <rect x="0" y="${OH-4}" width="${OW}" height="4"    fill="${rgb(TEAL)}"/>
</svg>`)

// ── 4. Typography layer ───────────────────────────────────────────────────────
//    Georgia for headlines (editorial serif), Helvetica Neue for UI text.
//    Both render correctly via librsvg/pango on macOS and on GitHub Actions
//    runners when font packages are installed.
const textSvg = Buffer.from(`<svg width="${OW * SCALE}" height="${OH * SCALE}" viewBox="0 0 ${OW} ${OH}" xmlns="http://www.w3.org/2000/svg">

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
    fill="${rgb(INK)}">Get confident</text>

  <!-- Headline line 2 - "with " ink, "AI." teal -->
  <text x="80" y="370"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="80" font-weight="normal"
    letter-spacing="0"
    fill="${rgb(INK)}">with <tspan fill="${rgb(TEAL)}" font-style="italic">AI.</tspan></text>

  <!-- Tagline -->
  <text x="80" y="434"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="24.5"
    fill="${rgb(SLATE)}">AI lessons for leaders and advisory for teams</text>

  <!-- Hairline rule -->
  <rect x="80" y="486" width="500" height="1" fill="${rgb(INK)}" opacity="0.16"/>

  <!-- Patrick descriptor -->
  <text x="80" y="524"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="20.5"
    fill="${rgb(SLATE)}">Patrick Hussey - AI coach and fractional adviser</text>

  <!-- Site URL in teal -->
  <text x="80" y="562"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="20.5"
    fill="${rgb(TEAL)}">goodtransformer.ai</text>

</svg>`)

// ── 5. Composite all layers ───────────────────────────────────────────────────
await sharp(bg)
  .composite([
    // Homepage AI confidence stack - right-side social visual.
    { input: stackVisual, left: 672 * SCALE, top: 60 * SCALE },
    // Teal bars (left edge + bottom edge)
    { input: barsSvg,    left: 0,   top: 0  },
    // Brand mark top-left
    { input: inkLogo78,  left: 80 * SCALE,  top: 70 * SCALE },
    // All text
    { input: textSvg,    left: 0,   top: 0  },
  ])
  .png({ compressionLevel: 9 })
  .toFile(join(PUB, 'og-image.png'))

console.log(`✓  og-image.png  (${OW * SCALE} × ${OH * SCALE})`)

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
