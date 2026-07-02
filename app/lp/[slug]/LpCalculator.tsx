'use client'
import { useState, useEffect, useRef } from 'react'

const SIZE_OPTIONS = ['2 BHK', '3 BHK', '4 BHK or more']
const TYPE_OPTIONS = ['Independent / Villa', 'Apartment']
const BUDGET_OPTIONS = ['₹12 to ₹15 Lakhs', '₹16 – ₹20 Lakhs', '₹21 – ₹30 Lakhs', '₹31 L – 1 Cr+']

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

interface FormState {
  name: string
  email: string
  phone: string
  city: string
  size: string
  type: string
  budget: string
  message: string
  honeypot: string // hidden from humans
}

const inputStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.15)',
  color: 'white',
}

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id: string) => void
    }
  }
}

export default function LpCalculator({ whatsappNumber }: { whatsappNumber: string }) {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', city: '',
    size: '', type: '', budget: '', message: '', honeypot: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [widgetId, setWidgetId] = useState('')
  const turnstileRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef<number>(Date.now())

  // Load Turnstile script
  useEffect(() => {
    startTimeRef.current = Date.now()
    if (!SITE_KEY) return

    const existing = document.getElementById('cf-turnstile-script')
    if (existing) {
      mountWidget()
      return
    }

    const script = document.createElement('script')
    script.id = 'cf-turnstile-script'
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = mountWidget
    document.head.appendChild(script)
  }, [])

  function mountWidget() {
    if (!turnstileRef.current || !window.turnstile) return
    const id = window.turnstile.render(turnstileRef.current, {
      sitekey: SITE_KEY,
      theme: 'dark',
      callback: (token: string) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
    })
    setWidgetId(id)
  }

  const set = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))

  const pick = (key: keyof FormState, val: string) =>
    setForm(f => ({ ...f, [key]: f[key] === val ? '' : val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim()) { setError('Please enter your name.'); return }
    if (!form.phone.trim()) { setError('Please enter your mobile number.'); return }

    // Client-side phone pre-check
    const rawPhone = form.phone.replace(/\D/g, '').replace(/^91/, '')
    if (!/^[6-9]\d{9}$/.test(rawPhone)) {
      setError('Please enter a valid 10-digit Indian mobile number.')
      return
    }

    if (SITE_KEY && !turnstileToken) {
      setError('Please wait for the security check to complete.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/verify-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: turnstileToken,
          honeypot: form.honeypot,
          completionTime: Date.now() - startTimeRef.current,
          phone: form.phone,
        }),
      })

      const data = await res.json() as { success?: boolean; error?: string; phone?: string }

      if (!res.ok || !data.success) {
        setError(data.error || 'Verification failed. Please try again.')
        if (widgetId && window.turnstile) window.turnstile.reset(widgetId)
        setTurnstileToken('')
        setLoading(false)
        return
      }

      // Build WhatsApp message
      const lines = [
        `Hi Parx Interiors! 👋`,
        ``,
        `Name: ${form.name.trim()}`,
        form.email ? `Email: ${form.email.trim()}` : '',
        `Phone: ${data.phone}`,
        form.city ? `City: ${form.city.trim()}` : '',
        form.size ? `Home Size: ${form.size}` : '',
        form.type ? `Type: ${form.type}` : '',
        form.budget ? `Budget: ${form.budget}` : '',
        form.message.trim() ? `\nMessage: ${form.message.trim()}` : '',
      ].filter(Boolean).join('\n')

      setSubmitted(true)
      setLoading(false)

      setTimeout(() => {
        window.open(
          `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(lines)}`,
          '_blank'
        )
      }, 600)
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <section id="lp-calculator" style={{ background: '#0a0a0a' }} className="py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-5 md:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-display font-light text-white mb-4 leading-tight" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
            Ready to turn your dream home<br />into a <em className="italic" style={{ color: '#D63E73' }}>reality?</em>
          </h2>
          <p className="font-sans text-white/50 text-sm leading-relaxed">
            Let us help bring your dreams to life with precision, passion, and unparalleled expertise.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl p-12 text-center" style={{ background: 'rgba(214,62,115,0.1)', border: '1px solid rgba(214,62,115,0.3)' }}>
            <div className="text-4xl mb-4">🎉</div>
            <p className="font-display text-white text-xl font-light mb-2">We've received your request!</p>
            <p className="font-sans text-white/50 text-sm">Opening WhatsApp now. Our team will respond within 30 minutes.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {/* Honeypot — hidden from humans, bots fill this */}
            <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.honeypot}
                onChange={set('honeypot')}
              />
            </div>

            {/* Full Name */}
            <input
              type="text"
              required
              placeholder="Full Name*"
              value={form.name}
              onChange={set('name')}
              className="w-full px-5 py-4 rounded-xl font-sans text-sm outline-none placeholder:text-white/30 focus:border-parx-red transition-all"
              style={inputStyle}
            />

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={set('email')}
                className="w-full px-5 py-4 rounded-xl font-sans text-sm outline-none placeholder:text-white/30 focus:border-parx-red transition-all"
                style={inputStyle}
              />
              <input
                type="tel"
                required
                placeholder="Mobile Number* (10 digits)"
                value={form.phone}
                onChange={set('phone')}
                maxLength={13}
                className="w-full px-5 py-4 rounded-xl font-sans text-sm outline-none placeholder:text-white/30 focus:border-parx-red transition-all"
                style={inputStyle}
              />
            </div>

            {/* City */}
            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={set('city')}
              className="w-full px-5 py-4 rounded-xl font-sans text-sm outline-none placeholder:text-white/30 focus:border-parx-red transition-all"
              style={inputStyle}
            />

            {/* Home details */}
            <div className="rounded-2xl p-6 space-y-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="font-sans text-white/60 text-sm font-semibold">Tell us about your home</p>

              {/* Size */}
              <div>
                <p className="font-sans text-white/40 text-xs mb-3">Size:</p>
                <div className="flex flex-wrap gap-2">
                  {SIZE_OPTIONS.map(opt => (
                    <button key={opt} type="button" onClick={() => pick('size', opt)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full font-sans text-sm transition-all duration-200"
                      style={{
                        background: form.size === opt ? 'rgba(214,62,115,0.15)' : 'rgba(255,255,255,0.06)',
                        border: form.size === opt ? '1.5px solid #D63E73' : '1.5px solid rgba(255,255,255,0.15)',
                        color: form.size === opt ? '#D63E73' : 'rgba(255,255,255,0.6)',
                      }}>
                      <span className="w-3.5 h-3.5 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ border: form.size === opt ? '1.5px solid #D63E73' : '1.5px solid rgba(255,255,255,0.3)' }}>
                        {form.size === opt && <span className="w-2 h-2 rounded-full" style={{ background: '#D63E73' }} />}
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div>
                <p className="font-sans text-white/40 text-xs mb-3">Type:</p>
                <div className="flex flex-wrap gap-2">
                  {TYPE_OPTIONS.map(opt => (
                    <button key={opt} type="button" onClick={() => pick('type', opt)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full font-sans text-sm transition-all duration-200"
                      style={{
                        background: form.type === opt ? 'rgba(214,62,115,0.15)' : 'rgba(255,255,255,0.06)',
                        border: form.type === opt ? '1.5px solid #D63E73' : '1.5px solid rgba(255,255,255,0.15)',
                        color: form.type === opt ? '#D63E73' : 'rgba(255,255,255,0.6)',
                      }}>
                      <span className="w-3.5 h-3.5 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ border: form.type === opt ? '1.5px solid #D63E73' : '1.5px solid rgba(255,255,255,0.3)' }}>
                        {form.type === opt && <span className="w-2 h-2 rounded-full" style={{ background: '#D63E73' }} />}
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <p className="font-sans text-white/40 text-xs mb-3">Tentative Budget:</p>
                <div className="flex flex-wrap gap-2">
                  {BUDGET_OPTIONS.map(opt => (
                    <button key={opt} type="button" onClick={() => pick('budget', opt)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full font-sans text-sm transition-all duration-200"
                      style={{
                        background: form.budget === opt ? 'rgba(214,62,115,0.15)' : 'rgba(255,255,255,0.06)',
                        border: form.budget === opt ? '1.5px solid #D63E73' : '1.5px solid rgba(255,255,255,0.15)',
                        color: form.budget === opt ? '#D63E73' : 'rgba(255,255,255,0.6)',
                      }}>
                      <span className="w-3.5 h-3.5 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ border: form.budget === opt ? '1.5px solid #D63E73' : '1.5px solid rgba(255,255,255,0.3)' }}>
                        {form.budget === opt && <span className="w-2 h-2 rounded-full" style={{ background: '#D63E73' }} />}
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Message */}
            <textarea
              placeholder="Message (optional)"
              rows={4}
              value={form.message}
              onChange={set('message')}
              className="w-full px-5 py-4 rounded-xl font-sans text-sm outline-none placeholder:text-white/30 focus:border-parx-red transition-all resize-none"
              style={inputStyle}
            />

            {/* Cloudflare Turnstile widget */}
            {SITE_KEY && (
              <div className="flex justify-center">
                <div ref={turnstileRef} />
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="text-sm font-sans text-center" style={{ color: '#D63E73' }}>{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full font-sans font-semibold text-white text-sm tracking-wide transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: '#D63E73', boxShadow: '0 4px 24px rgba(214,62,115,0.4)' }}
            >
              {loading ? 'Verifying…' : 'Submit'}
            </button>

            <p className="text-center font-sans text-white/25 text-xs">
              We reply within 30 minutes. No spam, ever.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
