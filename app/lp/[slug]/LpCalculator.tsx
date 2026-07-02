'use client'
import { useState, useEffect, useRef } from 'react'

const SIZE_OPTIONS = ['2 BHK', '3 BHK', '4 BHK or more']
const TYPE_OPTIONS = ['Independent / Villa', 'Apartment']
const BUDGET_OPTIONS = ['₹8 – ₹15 Lakhs', '₹16 – ₹25 Lakhs', '₹26 – ₹40 Lakhs', '₹40 L – 1 Cr+']

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

interface FormState {
  name: string; email: string; phone: string; city: string
  size: string; type: string; budget: string; message: string; honeypot: string
}

const inputBase = 'w-full px-4 py-3.5 rounded-xl font-sans text-sm outline-none placeholder:text-white/30 transition-all'
const inputStyle = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string; reset: (id: string) => void }
  }
}

function RadioPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-full font-sans text-sm transition-all duration-200"
      style={{
        background: active ? 'rgba(214,62,115,0.15)' : 'rgba(255,255,255,0.06)',
        border: active ? '1.5px solid #D63E73' : '1.5px solid rgba(255,255,255,0.15)',
        color: active ? '#D63E73' : 'rgba(255,255,255,0.6)',
      }}>
      <span className="w-3.5 h-3.5 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{ border: active ? '1.5px solid #D63E73' : '1.5px solid rgba(255,255,255,0.3)' }}>
        {active && <span className="w-2 h-2 rounded-full" style={{ background: '#D63E73' }} />}
      </span>
      {label}
    </button>
  )
}

export default function LpCalculator({ whatsappNumber }: { whatsappNumber: string }) {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', city: '', size: '', type: '', budget: '', message: '', honeypot: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [widgetId, setWidgetId] = useState('')
  const turnstileRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    startTimeRef.current = Date.now()
    if (!SITE_KEY) return
    const existing = document.getElementById('cf-turnstile-script')
    if (existing) { mountWidget(); return }
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
      sitekey: SITE_KEY, theme: 'dark',
      callback: (token: string) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
    })
    setWidgetId(id)
  }

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const pick = (key: keyof FormState, val: string) =>
    setForm(f => ({ ...f, [key]: f[key] === val ? '' : val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) { setError('Please enter your name.'); return }
    if (!form.phone.trim()) { setError('Please enter your mobile number.'); return }
    const rawPhone = form.phone.replace(/\D/g, '').replace(/^91/, '')
    if (!/^[6-9]\d{9}$/.test(rawPhone)) { setError('Please enter a valid 10-digit Indian mobile number.'); return }
    if (SITE_KEY && !turnstileToken) { setError('Please wait for the security check to complete.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/verify-lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: turnstileToken, honeypot: form.honeypot, completionTime: Date.now() - startTimeRef.current, phone: form.phone }),
      })
      const data = await res.json() as { success?: boolean; error?: string; phone?: string }
      if (!res.ok || !data.success) {
        setError(data.error || 'Verification failed. Please try again.')
        if (widgetId && window.turnstile) window.turnstile.reset(widgetId)
        setTurnstileToken('')
        setLoading(false)
        return
      }
      const lines = [
        `Hi Parx Interiors! 👋`, ``,
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
      setTimeout(() => window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(lines)}`, '_blank'), 600)
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <section id="lp-calculator" style={{ background: '#0a0a0a' }} className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT: Info panel ── */}
          <div className="md:sticky md:top-10">
            <div className="parx-accent-line mb-6" />
            <h2 className="font-display font-light text-white mb-4 leading-tight" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
              Ready to turn your<br />dream home into a{' '}
              <em className="italic" style={{ color: '#D63E73' }}>reality?</em>
            </h2>
            <p className="font-sans text-white/50 text-sm leading-relaxed mb-10">
              Let us help bring your dreams to life with precision, passion, and unparalleled expertise.
            </p>

            <div className="space-y-5">
              {[
                { icon: '🏭', title: 'In-house Manufacturing', desc: 'Every piece built in our own Hyderabad facility — no middlemen.' },
                { icon: '🎨', title: 'Free 3D Design', desc: 'See exactly how your home will look before a single nail is hammered.' },
                { icon: '📞', title: 'Reply in 30 Minutes', desc: 'Our team responds fast. No waiting, no automated bots.' },
                { icon: '💰', title: 'Transparent Pricing', desc: 'Fixed quotes from ₹8 Lakhs. No hidden costs. No surprises.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                    style={{ background: 'rgba(214,62,115,0.12)', border: '1px solid rgba(214,62,115,0.2)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-white text-sm mb-0.5">{item.title}</p>
                    <p className="font-sans text-white/40 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex flex-col gap-2">
              <a href="tel:+919177822018" className="flex items-center gap-2 font-sans text-white/50 text-sm hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.07 1.18 2 2 0 012.07 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                +91 91778 22018
              </a>
              <a href="mailto:parxinteriors@gmail.com" className="flex items-center gap-2 font-sans text-white/50 text-sm hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                parxinteriors@gmail.com
              </a>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div>
            {submitted ? (
              <div className="rounded-2xl p-12 text-center" style={{ background: 'rgba(214,62,115,0.1)', border: '1px solid rgba(214,62,115,0.3)' }}>
                <div className="text-4xl mb-4">🎉</div>
                <p className="font-display text-white text-xl font-light mb-2">We've received your request!</p>
                <p className="font-sans text-white/50 text-sm">Opening WhatsApp now. Our team will respond within 30 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                {/* Honeypot */}
                <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={set('honeypot')} />
                </div>

                {/* Name */}
                <input type="text" required placeholder="Full Name*" value={form.name} onChange={set('name')}
                  className={inputBase} style={inputStyle} />

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="email" placeholder="Email Address" value={form.email} onChange={set('email')}
                    className={inputBase} style={inputStyle} />
                  <input type="tel" required placeholder="Mobile Number* (10 digits)" value={form.phone} onChange={set('phone')} maxLength={13}
                    className={inputBase} style={inputStyle} />
                </div>

                {/* City */}
                <input type="text" placeholder="City" value={form.city} onChange={set('city')}
                  className={inputBase} style={inputStyle} />

                {/* Home details */}
                <div className="rounded-2xl p-5 space-y-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p className="font-sans text-white/60 text-xs font-semibold tracking-widest uppercase">Tell us about your home</p>

                  <div>
                    <p className="font-sans text-white/40 text-xs mb-2.5">Size:</p>
                    <div className="flex flex-wrap gap-2">
                      {SIZE_OPTIONS.map(opt => <RadioPill key={opt} label={opt} active={form.size === opt} onClick={() => pick('size', opt)} />)}
                    </div>
                  </div>

                  <div>
                    <p className="font-sans text-white/40 text-xs mb-2.5">Type:</p>
                    <div className="flex flex-wrap gap-2">
                      {TYPE_OPTIONS.map(opt => <RadioPill key={opt} label={opt} active={form.type === opt} onClick={() => pick('type', opt)} />)}
                    </div>
                  </div>

                  <div>
                    <p className="font-sans text-white/40 text-xs mb-2.5">Tentative Budget:</p>
                    <div className="flex flex-wrap gap-2">
                      {BUDGET_OPTIONS.map(opt => <RadioPill key={opt} label={opt} active={form.budget === opt} onClick={() => pick('budget', opt)} />)}
                    </div>
                  </div>
                </div>

                {/* Message */}
                <textarea placeholder="Message (optional)" rows={3} value={form.message} onChange={set('message')}
                  className={`${inputBase} resize-none`} style={inputStyle} />

                {/* Turnstile */}
                {SITE_KEY && <div className="flex justify-center"><div ref={turnstileRef} /></div>}

                {/* Error */}
                {error && <p className="text-sm font-sans text-center" style={{ color: '#D63E73' }}>{error}</p>}

                <button type="submit" disabled={loading}
                  className="w-full py-4 rounded-full font-sans font-semibold text-white text-sm tracking-wide transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: '#D63E73', boxShadow: '0 4px 24px rgba(214,62,115,0.4)' }}>
                  {loading ? 'Verifying…' : 'Submit — Get Free Consultation'}
                </button>

                <p className="text-center font-sans text-white/25 text-xs">We reply within 30 minutes. No spam, ever.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
