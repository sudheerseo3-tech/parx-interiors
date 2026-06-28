'use client'
import { useEffect, useState, useRef } from 'react'

const cards = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="24" height="24" rx="2" />
        <path d="M4 12h24M12 4v24" />
        <path d="M18 18l3 3-3 3" />
      </svg>
    ),
    title: 'Tailored Design',
    desc: 'Every home is designed around your lifestyle, needs and personality.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 28V14l10-10 10 10v14H6z" />
        <path d="M12 28v-8h8v8" />
        <path d="M2 16l14-14 14 14" />
      </svg>
    ),
    title: 'In-House Manufacturing',
    desc: 'Precision craftsmanship ensures superior quality and timely delivery.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="12" r="4" />
        <circle cx="8" cy="22" r="3" />
        <circle cx="24" cy="22" r="3" />
        <path d="M12 14l-2 6M20 14l2 6" />
      </svg>
    ),
    title: 'End-to-End Execution',
    desc: 'From concept to completion, one team handles it all seamlessly.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="12" />
        <path d="M16 8v8l5 3" />
      </svg>
    ),
    title: 'On-Time Delivery',
    desc: 'We respect your time and deliver as promised, every time.',
  },
]

function Card({ icon, title, desc, delay }: { icon: React.ReactNode; title: string; desc: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`group p-8 md:p-10 bg-white border border-parx-border hover:border-parx-red/30 hover:shadow-lg transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-parx-red/80 mb-5 group-hover:text-parx-red transition-colors duration-300">
        {icon}
      </div>
      <h3 className="font-display text-lg text-parx-black font-light mb-3 group-hover:text-parx-red transition-colors duration-300">{title}</h3>
      <p className="text-parx-gray text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

export default function ValueCards() {
  return (
    <section className="bg-parx-cream py-0">
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-parx-border shadow-xl">
          {cards.map((card, i) => (
            <Card key={card.title} icon={card.icon} title={card.title} desc={card.desc} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}
