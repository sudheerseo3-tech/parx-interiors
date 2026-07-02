'use client'
import { useState } from 'react'

interface LogoItem {
  name: string
  logo?: string
}

function LogoCard({ item }: { item: LogoItem }) {
  const [imgError, setImgError] = useState(false)

  if (!item.logo || imgError) {
    return (
      <div className="flex-shrink-0 h-16 w-40 flex items-center justify-center px-4 group">
        <span className="text-parx-gray/50 group-hover:text-parx-black text-xs text-center font-medium leading-tight tracking-wide transition-all duration-300">
          {item.name}
        </span>
      </div>
    )
  }

  return (
    <div className="flex-shrink-0 h-16 w-40 flex items-center justify-center px-3 group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.logo}
        alt={item.name}
        className="max-h-12 max-w-[130px] object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-400"
        loading="lazy"
        onError={() => setImgError(true)}
      />
    </div>
  )
}

export function LogoSlider({ items, title, speed = 'normal' }: { items: LogoItem[]; title: string; speed?: 'normal' | 'slow' }) {
  if (!items || items.length === 0) return null
  const doubled = [...items, ...items]
  const isHtml = title.includes('<')

  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        {isHtml ? (
          <div dangerouslySetInnerHTML={{ __html: title }} />
        ) : (
          <p className="text-parx-gray text-xs tracking-[0.3em] uppercase">{title}</p>
        )}
      </div>
      <div className="relative">
        <div className={`flex gap-6 items-center ${speed === 'slow' ? 'animate-scroll-slow' : 'animate-scroll'}`}>
          {doubled.map((b, i) => (
            <LogoCard key={`${b.name}-${i}`} item={b} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Fallback data used when Sanity has no content yet
export const fallbackBuilderLogos: LogoItem[] = [
  { name: 'Aparna Constructions' },
  { name: 'My Home Constructions' },
  { name: 'Prestige Group' },
  { name: 'Sumadhura Infracon' },
  { name: 'Rajapushpa Properties' },
  { name: 'Janapriya' },
  { name: 'Vasavi Group' },
]

export const fallbackBrandLogos: LogoItem[] = [
  { name: 'Häfele' },
  { name: 'Hettich' },
  { name: 'CenturyPly' },
  { name: 'Greenply' },
  { name: 'Austin Plywood' },
  { name: 'Merino Laminates' },
  { name: 'Greenlam Laminates' },
  { name: 'Royale Touche' },
  { name: 'Century Laminates' },
  { name: 'Fevicol' },
  { name: 'Euro Pratik' },
  { name: 'Zurich' },
  { name: 'Praveedh' },
]
