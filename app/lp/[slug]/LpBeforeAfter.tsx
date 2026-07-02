'use client'
import { useRef, useState, useCallback } from 'react'

interface Pair {
  label: string
  beforeImage: string
  afterImage: string
}

function CompareSlider({ pair }: { pair: Pair }) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updatePos = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100))
    setPos(pct)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    updatePos(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => { if (dragging.current) updatePos(e.clientX) }
  const onPointerUp = () => { dragging.current = false }

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm bg-stone-100" style={{ aspectRatio: '4/3' }}>
      <div
        ref={containerRef}
        className="relative w-full h-full select-none cursor-col-resize touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* Before image */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pair.beforeImage} alt="Before" className="w-full h-full object-cover" loading="lazy" draggable={false} />
          <span className="absolute bottom-4 left-4 text-[10px] font-sans font-bold tracking-[0.18em] uppercase text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">Before</span>
        </div>

        {/* After image — clipped from the left */}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pair.afterImage} alt="After" className="w-full h-full object-cover" loading="lazy" draggable={false} />
          <span className="absolute bottom-4 right-4 text-[10px] font-sans font-bold tracking-[0.18em] uppercase text-white px-2.5 py-1 rounded-full" style={{ background: '#D63E73' }}>After</span>
        </div>

        {/* Drag handle */}
        <div className="absolute top-0 bottom-0 w-px bg-white/90 shadow-lg" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-xl flex items-center justify-center gap-0.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3L2 7L5 11" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 3L12 7L9 11" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Room label */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
          <span className="text-[10px] font-sans font-semibold tracking-[0.15em] uppercase text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full whitespace-nowrap">
            {pair.label}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function LpBeforeAfter({ pairs }: { pairs: Pair[] }) {
  if (!pairs || pairs.length === 0) return null

  return (
    <section className="bg-parx-cream py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        <div className="mb-14">
          <div className="parx-accent-line" />
          <h2 className="font-display font-light text-parx-black mb-3" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
            Real Transformations,<br /><em className="italic" style={{ color: '#D63E73' }}>Real Homes</em>
          </h2>
          <p className="font-sans text-parx-gray text-sm max-w-md">
            Drag the slider to reveal the transformation. Every project is crafted in our own manufacturing facility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pairs.map((pair, i) => (
            <CompareSlider key={i} pair={pair} />
          ))}
        </div>
      </div>
    </section>
  )
}
