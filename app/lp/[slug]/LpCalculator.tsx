'use client'
import { useState, useEffect, useRef } from 'react'
import { getEstimate, formatLakhs, type BhkType, type ServiceType } from '@/lib/lpPricingMatrix'

const BHK_OPTIONS: BhkType[] = ['1BHK', '2BHK', '3BHK', '4BHK+']

const SERVICE_OPTIONS: { id: ServiceType; label: string; desc: string }[] = [
  { id: 'Full Home',       label: 'Full Home',         desc: 'Complete interior' },
  { id: 'Modular Kitchen', label: 'Kitchen',           desc: 'Modular kitchen' },
  { id: 'Wardrobes',       label: 'Wardrobes',         desc: 'Bedroom storage' },
  { id: 'Living & Dining', label: 'Living & Dining',   desc: 'Common areas' },
  { id: 'TV Unit',         label: 'TV Unit',           desc: 'Entertainment wall' },
  { id: 'False Ceiling',   label: 'False Ceiling',     desc: 'Lighting design' },
]

interface FormState { name: string; phone: string }

function useCountUp(target: number, duration = 500) {
  const [val, setVal] = useState(target)
  const frame = useRef<number>(0)

  useEffect(() => {
    const start = val
    const diff = target - start
    const startTime = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      setVal(parseFloat((start + diff * eased).toFixed(1)))
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  return val
}

export default function LpCalculator({ whatsappNumber }: { whatsappNumber: string }) {
  const [bhk, setBhk] = useState<BhkType | null>(null)
  const [services, setServices] = useState<ServiceType[]>([])
  const [step, setStep] = useState<'calc' | 'form' | 'done'>('calc')
  const [form, setForm] = useState<FormState>({ name: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const estimate = bhk && services.length > 0 ? getEstimate(bhk, services) : null
  const minVal = useCountUp(estimate?.min ?? 0)
  const maxVal = useCountUp(estimate?.max ?? 0)

  const toggleService = (s: ServiceType) => {
    if (s === 'Full Home') {
      setServices(prev => prev.includes('Full Home') ? [] : ['Full Home'])
      return
    }
    setServices(prev => {
      const without = prev.filter(x => x !== 'Full Home')
      return without.includes(s) ? without.filter(x => x !== s) : [...without, s]
    })
  }

  const handleGetQuote = () => {
    if (!estimate) return
    setStep('form')
    setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || form.phone.trim().length < 10) return
    setSubmitting(true)

    const servicesList = services.join(', ')
    const msg = encodeURIComponent(
      `Hi Parx Interiors! 👋\n\nI'm ${form.name} and I'm interested in interior design for my ${bhk} home in Hyderabad.\n\nServices: ${servicesList}\nBudget estimate: ${formatLakhs(minVal)} – ${formatLakhs(maxVal)}\n\nPlease contact me. My number is ${form.phone}.`
    )

    setStep('done')
    setSubmitting(false)

    setTimeout(() => {
      window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${msg}`, '_blank')
    }, 600)
  }

  return (
    <section ref={sectionRef} id="lp-calculator" style={{ background: '#1B1B1B' }} className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-5 md:px-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="parx-accent-line mx-auto" />
          <h2 className="font-display font-light text-white mb-3" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
            Estimate Your Interior <em className="italic" style={{ color: '#D63E73' }}>Budget</em>
          </h2>
          <p className="font-sans text-white/50 text-sm max-w-md mx-auto">
            Get a quick ballpark in 30 seconds. No commitment required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* LEFT — Selectors */}
          <div className="space-y-8">
            {/* BHK */}
            <div>
              <p className="text-white/60 text-xs font-sans font-semibold tracking-[0.18em] uppercase mb-4">Select your home size</p>
              <div className="flex gap-3 flex-wrap">
                {BHK_OPTIONS.map(b => (
                  <button
                    key={b}
                    onClick={() => setBhk(b)}
                    className="px-6 py-3 rounded-full text-sm font-sans font-semibold transition-all duration-250"
                    style={{
                      background: bhk === b ? '#D63E73' : 'rgba(255,255,255,0.07)',
                      color: bhk === b ? 'white' : 'rgba(255,255,255,0.6)',
                      border: bhk === b ? '1.5px solid #D63E73' : '1.5px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <p className="text-white/60 text-xs font-sans font-semibold tracking-[0.18em] uppercase mb-4">What do you need? (select all that apply)</p>
              <div className="grid grid-cols-2 gap-3">
                {SERVICE_OPTIONS.map(s => {
                  const active = services.includes(s.id)
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      className="text-left px-4 py-3.5 rounded-xl transition-all duration-250"
                      style={{
                        background: active ? 'rgba(214,62,115,0.15)' : 'rgba(255,255,255,0.05)',
                        border: active ? '1.5px solid #D63E73' : '1.5px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded mt-0.5 flex-shrink-0 flex items-center justify-center transition-all"
                          style={{ background: active ? '#D63E73' : 'transparent', border: active ? 'none' : '1.5px solid rgba(255,255,255,0.3)' }}>
                          {active && (
                            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5l2.5 2.5L8 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="text-white text-xs font-sans font-semibold">{s.label}</div>
                          <div className="text-white/40 text-[11px] font-sans">{s.desc}</div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* RIGHT — Estimate + Form */}
          <div>
            {/* Estimate display */}
            <div className="rounded-2xl p-8 mb-5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              {!estimate ? (
                <div className="text-center py-6">
                  <p className="text-white/30 text-sm font-sans">Select your home size and at least one service to see an estimate</p>
                </div>
              ) : (
                <>
                  <p className="text-white/50 text-xs font-sans font-semibold tracking-[0.18em] uppercase mb-3">Estimated Investment Range</p>
                  <div className="font-display font-light text-white mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                    {formatLakhs(minVal)} <span className="text-white/30 text-xl">–</span> {formatLakhs(maxVal)}
                  </div>
                  <p className="text-white/35 text-xs font-sans mb-6">
                    for {bhk} · {services.join(', ')} · Hyderabad
                  </p>
                  <div className="w-full h-px bg-white/10 mb-5" />
                  <div className="space-y-2 mb-6">
                    {['Includes 3D design & planning', 'In-house manufacturing', 'Premium hardware & materials', 'Professional installation'].map(item => (
                      <div key={item} className="flex items-center gap-2 text-white/50 text-xs font-sans">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <circle cx="6" cy="6" r="5.5" stroke="#D63E73" />
                          <path d="M3.5 6l1.8 1.8L8.5 4" stroke="#D63E73" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Form or done state */}
            {step === 'calc' && (
              <button
                onClick={handleGetQuote}
                disabled={!estimate}
                className="w-full py-4 rounded-full text-white font-sans font-semibold text-sm tracking-wide transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: estimate ? '#D63E73' : 'rgba(214,62,115,0.3)', boxShadow: estimate ? '0 4px 24px rgba(214,62,115,0.35)' : 'none' }}
              >
                Get Detailed Quote — Free
              </button>
            )}

            {step === 'form' && (
              <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="text-white text-sm font-sans font-semibold">Get your detailed quote — free, no obligation</p>
                <div>
                  <label className="text-white/50 text-xs font-sans block mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-white text-sm font-sans outline-none focus:ring-1 focus:ring-parx-red transition-all"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs font-sans block mb-1.5">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-white text-sm font-sans outline-none focus:ring-1 focus:ring-parx-red transition-all"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full text-white font-sans font-semibold text-sm tracking-wide transition-all duration-300"
                  style={{ background: '#D63E73', boxShadow: '0 4px 24px rgba(214,62,115,0.35)' }}
                >
                  {submitting ? 'Sending...' : 'Send My Estimate via WhatsApp →'}
                </button>
                <p className="text-white/30 text-[11px] font-sans text-center">No spam. We reply within 30 minutes.</p>
              </form>
            )}

            {step === 'done' && (
              <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(214,62,115,0.12)', border: '1px solid rgba(214,62,115,0.3)' }}>
                <div className="text-3xl mb-3">🎉</div>
                <p className="text-white font-sans font-semibold mb-1">Your estimate is on its way!</p>
                <p className="text-white/50 text-sm font-sans">Opening WhatsApp now. Our team will respond within 30 minutes.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
