'use client'
import { useState } from 'react'

interface FaqItem { question: string; answer: string }

function AccordionItem({ item, index, open, onToggle }: { item: FaqItem; index: number; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-parx-border last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-sans font-medium text-parx-black text-sm md:text-base leading-snug group-hover:text-parx-red transition-colors duration-200">
          {item.question}
        </span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full border border-parx-border flex items-center justify-center transition-all duration-300 mt-0.5"
          style={{ background: open ? '#D63E73' : 'transparent', borderColor: open ? '#D63E73' : '#E8E8E8' }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
            style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
            <path d="M5 1v8M1 5h8" stroke={open ? 'white' : '#1B1B1B'} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '400px' : '0px' }}
      >
        <p className="font-sans text-parx-gray text-sm leading-relaxed pb-5">{item.answer}</p>
      </div>
    </div>
  )
}

export default function LpFaq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-parx-cream py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-5 md:px-10">
        <div className="mb-12 text-center">
          <div className="parx-accent-line mx-auto" />
          <h2 className="font-display font-light text-parx-black mb-3" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
            Questions? We have <em className="italic" style={{ color: '#D63E73' }}>answers.</em>
          </h2>
          <p className="font-sans text-parx-gray text-sm">Everything you need to know before booking your free consultation.</p>
        </div>

        <div className="bg-white rounded-2xl px-6 md:px-8" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
