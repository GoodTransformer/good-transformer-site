/**
 * Good Transformer: newsletter subscribe Worker (Cloudflare).
 *
 * Receives the signup POST from the static site and creates a Resend contact
 * subscribed to the chosen Topic (daily or weekly), and adds them to the
 * "all subscribers" Segment. The Resend API key lives here as a Worker secret,
 * never in the client. Free on Cloudflare's Workers plan.
 *
 * Uses the current Resend model: account-level contacts + Topics + Segments
 * (no audience_id).
 *
 * Deploy: see workers/subscribe/README.md.
 *
 * Env (wrangler secrets / vars):
 *   RESEND_API_KEY     (secret)  Resend API key
 *   TOPIC_DAILY_ID     (var)     Resend Topic id for the daily digest
 *   TOPIC_WEEKLY_ID    (var)     Resend Topic id for the weekly digest
 *   SEGMENT_ID         (var)     Resend Segment id for all subscribers
 *   ALLOWED_ORIGIN     (var)     e.g. https://goodtransformer.ai
 */

function cors(origin, allowed) {
  const ok = allowed && origin === allowed
  return {
    'Access-Control-Allow-Origin': ok ? origin : allowed || '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  })
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const handler = {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''
    const headers = cors(origin, env.ALLOWED_ORIGIN)

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers })
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, headers)

    let payload
    try {
      payload = await request.json()
    } catch {
      return json({ error: 'Invalid JSON' }, 400, headers)
    }

    const email = String(payload.email || '').trim()
    const cadence = payload.cadence === 'daily' ? 'daily' : 'weekly'
    if (!EMAIL_RE.test(email)) return json({ error: 'Invalid email' }, 422, headers)

    const topicId = cadence === 'daily' ? env.TOPIC_DAILY_ID : env.TOPIC_WEEKLY_ID
    if (!env.RESEND_API_KEY || !topicId) {
      return json({ error: 'Subscribe is not configured' }, 500, headers)
    }

    const body = {
      email,
      unsubscribed: false,
      topics: [{ id: topicId, subscription: 'opt_in' }],
    }
    // Add to the "all subscribers" segment if one is configured (broadcasts send to it).
    if (env.SEGMENT_ID) body.segments = [{ id: env.SEGMENT_ID }]

    const res = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    // 201 on create; a duplicate (409) is fine, treat as success.
    if (!res.ok && res.status !== 409) {
      const detail = await res.text()
      return json({ error: 'Subscribe failed', detail }, 502, headers)
    }

    return json({ ok: true, cadence }, 200, headers)
  },
}

export default handler
