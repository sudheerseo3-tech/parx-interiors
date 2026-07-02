'use client'

interface Pair {
  label: string
  beforeImage: string
  afterImage: string
}

function BeforeAfterCard({ pair }: { pair: Pair }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
      {pair.label && (
        <div className="bg-white px-5 py-3.5 border-b border-parx-border flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#D63E73' }} />
          <p className="font-sans font-semibold text-parx-black text-sm">{pair.label}</p>
        </div>
      )}
      <div className="grid grid-cols-2">
        {/* Before */}
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pair.beforeImage}
            alt={`Before — ${pair.label}`}
            className="w-full object-cover"
            style={{ aspectRatio: '4/3' }}
            loading="lazy"
          />
          <span className="absolute bottom-3 left-3 text-[10px] font-sans font-bold tracking-[0.18em] uppercase text-white bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
            Before
          </span>
        </div>

        {/* After */}
        <div className="relative border-l-2 border-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pair.afterImage}
            alt={`After — ${pair.label}`}
            className="w-full object-cover"
            style={{ aspectRatio: '4/3' }}
            loading="lazy"
          />
          <span className="absolute bottom-3 right-3 text-[10px] font-sans font-bold tracking-[0.18em] uppercase text-white px-3 py-1 rounded-full" style={{ background: '#D63E73' }}>
            After
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
            Every project crafted in our own manufacturing facility in Hyderabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pairs.map((pair, i) => (
            <BeforeAfterCard key={i} pair={pair} />
          ))}
        </div>
      </div>
    </section>
  )
}
