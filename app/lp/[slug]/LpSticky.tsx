'use client'
import { useEffect, useState } from 'react'

export default function LpSticky({ ctaLabel }: { ctaLabel: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToCalc = () => {
    document.getElementById('lp-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-350"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
    >
      <div className="bg-white border-t border-parx-border px-4 py-3 flex gap-3 items-center" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        <button
          onClick={scrollToCalc}
          className="flex-1 py-3.5 rounded-full text-white text-sm font-sans font-semibold text-center transition-all duration-200 active:scale-[0.98]"
          style={{ background: '#D63E73' }}
        >
          {ctaLabel}
        </button>
        <a
          href="tel:+919177822018"
          className="w-12 h-12 rounded-full border border-parx-border flex items-center justify-center flex-shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.07 1.18 2 2 0 012.07 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
