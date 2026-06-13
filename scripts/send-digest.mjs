#!/usr/bin/env node
/**
 * send-digest.mjs
 *
 * Builds the daily/weekly digest and sends it to the matching Resend Audience
 * via the Broadcasts API. Run by .github/workflows/send-digest.yml on a cron.
 *
 *   node scripts/send-digest.mjs --cadence daily
 *   node scripts/send-digest.mjs --cadence weekly --dry-run
 *
 * Required env (set as GitHub Actions secrets — see NEWSLETTER-SETUP.md):
 *   RESEND_API_KEY
 *   RESEND_SEGMENT_ID       Segment of all subscribers (the broadcast recipients)
 *   RESEND_TOPIC_DAILY_ID   Topic that scopes the daily send
 *   RESEND_TOPIC_WEEKLY_ID  Topic that scopes the weekly send
 *   DIGEST_FROM             e.g. "Good Transformer <insights@send.goodtransformer.ai>"
 *
 * Safe by default: if keys are missing it logs and exits 0 (so an unconfigured
 * pipeline never fails CI). --dry-run builds but never sends.
 */

import { buildDigest } from './build-digest.mjs'

function parseArgs() {
  const a = process.argv.slice(2)
  const o = { cadence: 'weekly', window: 7, dryRun: false }
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] === '--cadence') o.cadence = a[++i]
    else if (a[i] === '--day') o.day = a[++i]
    else if (a[i] === '--window') o.window = Number(a[++i])
    else if (a[i] === '--dry-run') o.dryRun = true
  }
  return o
}

async function main() {
  const args = parseArgs()
  const { subject, html, text, posts, stories } = buildDigest(args)
  const segmentId = process.env.RESEND_SEGMENT_ID
  const topicId =
    args.cadence === 'daily'
      ? process.env.RESEND_TOPIC_DAILY_ID
      : process.env.RESEND_TOPIC_WEEKLY_ID
  const from = process.env.DIGEST_FROM || 'Good Transformer <insights@send.goodtransformer.ai>'
  const replyTo = process.env.DIGEST_REPLY_TO || 'hello@goodtransformer.ai'
  const apiKey = process.env.RESEND_API_KEY

  console.log(`[digest] cadence=${args.cadence} subject="${subject}"`)
  console.log(`[digest] posts=${posts.length} stories=${stories.length}`)

  if (posts.length === 0 && stories.length === 0) {
    console.log('[digest] Nothing to send (no posts, no news) — skipping.')
    return
  }

  if (args.dryRun) {
    console.log('[digest] --dry-run: built successfully, not sending.')
    return
  }

  if (!apiKey || !segmentId || !topicId) {
    console.log(
      '[digest] RESEND_API_KEY / RESEND_SEGMENT_ID / topic id not set — skipping send. See NEWSLETTER-SETUP.md.',
    )
    return
  }

  const { Resend } = await import('resend')
  const resend = new Resend(apiKey)

  // New Resend model: a broadcast targets a Segment (who) scoped to a Topic
  // (which cadence). send:true dispatches in the same call.
  const created = await resend.broadcasts.create({
    segmentId,
    topicId,
    from,
    replyTo,
    subject,
    name: subject,
    html,
    text,
    send: true,
  })
  if (created.error) throw new Error(`broadcasts.create failed: ${JSON.stringify(created.error)}`)

  console.log(`[digest] Sent ${args.cadence} broadcast ${created.data?.id} (segment ${segmentId}, topic ${topicId}).`)
}

main().catch((err) => {
  console.error('[digest] FAILED:', err.message)
  process.exit(1)
})
