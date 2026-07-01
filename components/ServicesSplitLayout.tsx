'use client'
import { useEffect, useRef, useState } from 'react'

interface Service {
  _id: string
  title: string
  description: string
  tag?: string
  image?: any
  features?: string[]
  imageUrl?: string
}

export default function ServicesSplitLayout({ services }: { services: Service[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionRefs.current.forEach((ref, i) => {
      if (!ref) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setAnimating(true)
            setTimeout(() => {
              setActiveIndex(i)
              setAnimating(false)
            }, 150)
          }
        },
        { threshold: 0.5 }
      )
      observer.observe(ref)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [services])

  const active = services[activeIndex]

  return (
    <div className="flex min-h-screen">
      {/* Left — scrollable service list */}
      <div className="w-full md:w-1/2 border-r border-parx-border">
        {services.map((s, i) => (
          <div
            key={s._id}
            ref={el => { sectionRefs.current[i] = el }}
            className="min-h-screen flex flex-col justify-center px-8 md:px-16 py-20 cursor-pointer group border-b border-parx-border last:border-b-0"
            onClick={() => setActiveIndex(i)}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className={`font-mono text-sm transition-colors duration-300 ${activeIndex === i ? 'text-parx-red' : 'text-parx-border'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {s.tag && (
                <span className="text-[10px] tracking-[0.2em] text-parx-gray border border-parx-border px-2 py-1 uppercase">
                  {s.tag}
                </span>
              )}
            </div>

            <h2 className={`font-display font-light text-4xl md:text-5xl lg:text-6xl mb-6 transition-colors duration-300 leading-tight ${activeIndex === i ? 'text-parx-black' : 'text-parx-border group-hover:text-parx-gray'}`}>
              {s.title}
            </h2>

            <p className={`text-sm leading-relaxed max-w-sm transition-all duration-300 ${activeIndex === i ? 'text-parx-gray opacity-100' : 'text-parx-gray opacity-0 group-hover:opacity-60'}`}>
              {s.description}
            </p>

            {/* Mobile image (shown below text on mobile) */}
            {s.imageUrl && (
              <div className="mt-8 md:hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.imageUrl} alt={s.title} className="w-full aspect-video object-cover" />
              </div>
            )}

            {activeIndex === i && (
              <div className="mt-8">
                {s.features && s.features.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-8">
                    {s.features.map((f: string) => (
                      <div key={f} className="flex items-start gap-2">
                        <span className="text-parx-red mt-0.5 text-xs">✓</span>
                        <span className="text-parx-gray text-xs">{f}</span>
                      </div>
                    ))}
                  </div>
                )}
                <a
                  href={`https://wa.me/919177822018?text=Hi%2C%20I%27m%20interested%20in%20your%20${encodeURIComponent(s.title)}%20service`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-3 bg-parx-red hover:bg-parx-red-dark text-white pl-7 pr-2.5 py-2.5 text-[14px] tracking-[0.5px] rounded-full transition-all duration-300"
                >
                  Get Quote
                  <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center group-hover/btn:bg-white/25 group-hover/btn:rotate-[-35deg] transition-all duration-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right — sticky image panel (desktop only) */}
      <div className="hidden md:block w-1/2">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Progress indicator */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-parx-border z-10">
            <div
              className="bg-parx-red w-full transition-all duration-500 ease-out"
              style={{ height: `${((activeIndex + 1) / services.length) * 100}%` }}
            />
          </div>

          {/* Image */}
          <div className={`w-full h-full transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
            {active?.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={active.imageUrl}
                alt={active.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-parx-light flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-4">📷</div>
                  <p className="text-parx-gray text-xs tracking-widest">{active?.title?.toUpperCase()}</p>
                  <p className="text-parx-gray/50 text-[10px] mt-2">Upload image in Sanity → Services</p>
                </div>
              </div>
            )}

            {/* Overlay info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-parx-black/80 via-parx-black/30 to-transparent p-10">
              <div className={`transition-all duration-300 ${animating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-2">{active?.tag}</p>
                <h3 className="font-display font-light text-white text-3xl">{active?.title}</h3>
              </div>
            </div>

            {/* Service counter */}
            <div className="absolute top-8 right-8 text-right">
              <span className="font-mono text-white/40 text-sm">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="font-mono text-white/20 text-sm"> / {String(services.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
