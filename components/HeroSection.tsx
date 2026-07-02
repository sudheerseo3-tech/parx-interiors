'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface HeroProps {
  heading?: string
  description?: string
  ctaLabel?: string
  ctaUrl?: string
}

const PROJECT_ID = 'dx9xg01d'
const DATASET = 'production'

function sanityImgUrl(image: any) {
  if (!image?.asset?._ref) return ''
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}`
}

export default function HeroSection({
  heading = 'Where Function\nMeets Finesse.',
  description = 'End-to-end interior design with in-house manufacturing. Modular kitchens, wardrobes & full home interiors.',
  ctaLabel = 'Start Your Journey',
  ctaUrl = '/contact',
}: HeroProps) {
  const [heroImage, setHeroImage] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch(`https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${encodeURIComponent('*[_type == "siteSettings"][0]{ heroImage }')}`)
      .then(r => r.json())
      .then(d => {
        if (d.result?.heroImage) setHeroImage(sanityImgUrl(d.result.heroImage))
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const lines = heading.split('\n')
  const lastLine = lines[lines.length - 1]
  const otherLines = lines.slice(0, -1)

  return (
    <section className="hero-section relative w-full overflow-hidden bg-parx-black" style={{ minHeight: '850px', height: '100vh' }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroImage}
            alt="Parx Interiors"
            className="w-full h-full object-cover object-right md:object-center"
            loading="eager"
            fetchPriority="high"
          />
        ) : (
          <div className="w-full h-full bg-parx-black" />
        )}
      </div>

      {/* Desktop: Left gradient overlay (the image already has it, this is a safety fallback) */}
      <div className="absolute inset-0 z-[1] hidden md:block"
        style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0) 65%)' }}
      />

      {/* Mobile: Full vertical gradient */}
      <div className="absolute inset-0 z-[1] md:hidden"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-[600px] py-[120px] md:py-0">

            {/* Heading */}
            <h1 className={`font-display font-light text-white mb-7 leading-[1.05] transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{
                fontSize: 'clamp(42px, 5.5vw, 72px)',
                transitionDelay: '400ms',
              }}>
              {otherLines.map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
              {lastLine.includes('Finesse') ? (
                <>
                  {lastLine.replace('Finesse.', '').replace('Finesse', '')}
                  <em className="italic not-italic" style={{ color: '#D63E73', textShadow: '0 0 40px rgba(214,62,115,0.5), 0 0 80px rgba(214,62,115,0.2)', fontStyle: 'italic' }}>Finesse.</em>
                </>
              ) : (
                <span>{lastLine}</span>
              )}
            </h1>

            {/* Description */}
            <p className={`text-white/65 font-light leading-[1.7] mb-10 max-w-[480px] transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{
                fontSize: 'clamp(14px, 1.6vw, 17px)',
                transitionDelay: '600ms',
              }}>
              {description}
            </p>

            {/* CTA */}
            <div className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '800ms' }}>
              <Link href={ctaUrl}
                className="group inline-flex items-center gap-3 bg-parx-red hover:bg-parx-red-dark text-white pl-7 pr-2.5 py-2.5 text-[14px] tracking-[0.5px] rounded-full transition-all duration-400 hover:shadow-lg hover:shadow-parx-red/20">
                {ctaLabel}
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 group-hover:rotate-[-35deg] transition-all duration-400">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
