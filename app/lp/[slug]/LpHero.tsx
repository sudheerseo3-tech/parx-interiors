'use client'
import { useEffect, useState } from 'react'

interface Props {
  heroImage: string
  headline: string
  subheadline: string
  primaryCta: string
  secondaryCta: string
  trustPills: string[]
  onPrimaryClick: () => void
  onSecondaryClick: () => void
}

export default function LpHero({
  heroImage,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  trustPills,
  onPrimaryClick,
  onSecondaryClick,
}: Props) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t) }, [])

  const words = headline.split(' ')
  const lastWord = words[words.length - 1]
  const firstWords = words.slice(0, -1).join(' ')

  return (
    <section className="relative w-full overflow-hidden bg-parx-black" style={{ minHeight: '100svh' }}>
      {/* Background */}
      {heroImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={heroImage}
          alt="Parx Interiors"
          className="absolute inset-0 w-full h-full object-cover object-center"
          fetchPriority="high"
          loading="eager"
        />
      )}
      {/* Gradient overlay */}
      <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(90deg,rgba(0,0,0,0.78) 0%,rgba(0,0,0,0.45) 45%,rgba(0,0,0,0.1) 70%)' }} />
      <div className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.5) 60%,rgba(0,0,0,0.7) 100%)' }} />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center" style={{ minHeight: '100svh' }}>
        <div className="w-full max-w-6xl mx-auto px-5 md:px-10 py-32 md:py-0">
          <div className="max-w-[580px]">

            {/* Eyebrow */}
            <div className={`mb-6 transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '100ms' }}>
              <span className="inline-flex items-center gap-2 text-white/60 text-xs font-sans tracking-[0.2em] uppercase">
                <span className="w-5 h-px bg-parx-red" />
                Parx Interiors · Hyderabad
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`font-display font-light text-white leading-[1.08] mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', transitionDelay: '250ms' }}
            >
              {firstWords}{' '}
              <em className="not-italic italic" style={{ color: '#D63E73', textShadow: '0 0 40px rgba(214,62,115,0.4)' }}>
                {lastWord}
              </em>
            </h1>

            {/* Subheadline */}
            <p
              className={`font-sans text-white/65 leading-relaxed mb-10 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ fontSize: 'clamp(14px, 1.6vw, 18px)', transitionDelay: '400ms', maxWidth: '460px' }}
            >
              {subheadline}
            </p>

            {/* CTAs */}
            <div className={`flex flex-col sm:flex-row gap-3 mb-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '550ms' }}>
              <button
                onClick={onPrimaryClick}
                className="group inline-flex items-center justify-center gap-3 text-white font-sans font-semibold text-sm tracking-wide px-7 py-4 rounded-full transition-all duration-300 hover:shadow-xl"
                style={{ background: '#D63E73', letterSpacing: '0.03em', boxShadow: '0 4px 24px rgba(214,62,115,0.35)' }}
              >
                {primaryCta}
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 group-hover:rotate-[-35deg] transition-all duration-300">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              <button
                onClick={onSecondaryClick}
                className="inline-flex items-center justify-center text-white font-sans font-medium text-sm px-7 py-4 rounded-full border border-white/25 hover:border-white/60 hover:bg-white/8 transition-all duration-300"
                style={{ letterSpacing: '0.03em' }}
              >
                {secondaryCta}
              </button>
            </div>

            {/* Trust Pills */}
            {trustPills.length > 0 && (
              <div className={`flex flex-wrap gap-3 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '700ms' }}>
                {trustPills.map((pill, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 text-white/70 text-xs font-sans">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5.5" stroke="#D63E73" />
                      <path d="M3.5 6l1.8 1.8L8.5 4" stroke="#D63E73" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {pill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-40">
        <span className="text-white text-[10px] font-sans tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-white animate-[scrollLine_1.5s_ease-in-out_infinite]" style={{ animation: 'scrollLine 1.5s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  )
}
