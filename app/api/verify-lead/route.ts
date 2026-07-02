import { NextRequest, NextResponse } from 'next/server'

// In-memory rate limit store (resets on cold start — good enough for edge spam protection)
const rateLimitMap = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 5

function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, '').replace(/[<>'"]/g, '').trim().slice(0, 500)
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  // ── Rate limiting ──────────────────────────────────────────────────────────
  const now = Date.now()
  const hits = (rateLimitMap.get(ip) || []).filter(t => now - t < WINDOW_MS)
  if (hits.length >= MAX_REQUESTS) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }
  rateLimitMap.set(ip, [...hits, now])

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { token, honeypot, completionTime, phone } = body

  // ── Honeypot ───────────────────────────────────────────────────────────────
  if (honeypot) {
    return NextResponse.json({ error: 'Blocked.' }, { status: 400 })
  }

  // ── Completion time (min 5 seconds) ───────────────────────────────────────
  if (typeof completionTime !== 'number' || completionTime < 5000) {
    return NextResponse.json({ error: 'Form submitted too quickly.' }, { status: 400 })
  }

  // ── Indian phone validation ────────────────────────────────────────────────
  const rawPhone = String(phone || '').replace(/\D/g, '').replace(/^91/, '')
  if (!/^[6-9]\d{9}$/.test(rawPhone)) {
    return NextResponse.json({ error: 'Please enter a valid 10-digit Indian mobile number.' }, { status: 400 })
  }

  // ── Cloudflare Turnstile verification ─────────────────────────────────────
  if (!process.env.TURNSTILE_SECRET_KEY) {
    // Secret not configured yet — allow in dev/staging
    return NextResponse.json({ success: true, phone: rawPhone })
  }

  const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip,
    }),
  })

  const result = await verify.json() as { success: boolean }
  if (!result.success) {
    return NextResponse.json({ error: 'Human verification failed. Please try again.' }, { status: 400 })
  }

  return NextResponse.json({ success: true, phone: rawPhone })
}
