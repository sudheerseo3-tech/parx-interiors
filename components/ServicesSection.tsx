'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const PROJECT_ID = 'dx9xg01d'
const DATASET = 'production'

function imgUrl(image: any) {
  if (!image?.asset?._ref) return ''
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}?w=800&fit=max&auto=format`
}

const fallbackServices = [
  { num: '01', title: 'Full Home Interiors', desc: 'Complete end-to-end transformation. Living, bedroom, kitchen, bathrooms — every room designed and built by our team. From 3D visualisation to final handover, one team handles it all.', tag: 'Residential' },
  { num: '02', title: 'Modular Kitchens', desc: 'Custom-designed and manufactured in our own factory. L-shaped, U-shaped, island — every cabinet, countertop, and fitting is precision-built to your exact measurements.', tag: 'Residential' },
  { num: '03', title: 'Wardrobes & Storage', desc: 'Floor-to-ceiling wardrobes, walk-in closets, sliding wardrobes, and smart storage solutions. Every inch optimised for functionality and style.', tag: 'Residential' },
  { num: '04', title: 'TV Units & Living', desc: 'Custom entertainment walls, media consoles, and display units designed to be the centrepiece of your living room. Backlit panels, cable management, and modular options.', tag: 'Residential' },
  { num: '05', title: 'False Ceilings & Lighting', desc: 'Architectural false ceilings with integrated lighting that transforms the ambience of any room. Gypsum, POP, and wooden options with cove and profile lighting.', tag: 'Both' },
  { num: '06', title: 'Turnkey Interiors', desc: 'Complete turnkey solutions for homes and offices. Civil work, electrical, plumbing, painting, furniture — everything under one roof with a single point of contact.', tag: 'Both' },
]

export default function ServicesSection() {
  const [services, setServices] = useState(fallbackServices.map(s => ({ ...s, image: '' })))

  useEffect(() => {
    fetch(`https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${encodeURIComponent('*[_type == "service"] | order(order asc) { title, description, image, tag, order }')}`)
      .then(r => r.json())
      .then(d => {
        if (d.result && d.result.length > 0) {
          setServices(d.result.map((s: any, i: number) => ({
            num: String(i + 1).padStart(2, '0'),
            title: s.title,
            desc: s.description || fallbackServices[i]?.desc || '',
            tag: s.tag || 'Residential',
            image: s.image ? imgUrl(s.image) : '',
          })))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-20">
          <div className="parx-accent-line mx-auto" />
          <h2 className="font-display font-light text-parx-black" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            What we <em className="italic">design &amp; build</em>
          </h2>
          <p className="text-parx-gray max-w-lg mx-auto text-sm leading-relaxed mt-4">
            Every service is delivered end-to-end — design, manufacturing, installation — by our own team. No middlemen.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {services.map((s, i) => (
            <div key={s.num} className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}>
              <div className={`${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                <div className="aspect-[4/3] bg-parx-light border border-parx-border overflow-hidden">
                  {s.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-parx-cream">
                      <div className="text-center">
                        <div className="text-4xl mb-2 opacity-30">📷</div>
                        <p className="text-parx-gray text-xs tracking-widest">{s.title.toUpperCase()}</p>
                        <p className="text-parx-gray text-[10px] mt-1">Upload from Sanity</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={`${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-parx-red font-mono text-sm">{s.num}</span>
                  <span className="text-[10px] tracking-[0.2em] text-parx-gray border border-parx-border px-2 py-1 uppercase">{s.tag}</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-parx-black font-light mb-4">{s.title}</h3>
                <p className="text-parx-gray text-sm md:text-base leading-relaxed mb-6">{s.desc}</p>
                <Link href="/services"
                  className="inline-flex items-center gap-2 text-parx-red hover:text-parx-black text-sm tracking-wide transition-colors group">
                  Learn more
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
