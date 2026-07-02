'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const PROJECT_ID = 'dx9xg01d'
const DATASET = 'production'

async function sanityFetch(query: string) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${encodeURIComponent(query)}`
  const res = await fetch(url)
  const data = await res.json()
  return data.result
}

function imgUrl(image: any, width?: number) {
  if (!image?.asset?._ref) return ''
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  const base = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}`
  return width ? `${base}?w=${width}&fit=max&auto=format` : base
}

const fallbackProjects = [
  { title: 'My Home Bhooja', category: 'Full Home', slug: { current: 'my-home-bhooja' } },
  { title: 'SMR Vinay Iconia', category: 'Full Home', slug: { current: 'smr-vinay-iconia' } },
  { title: 'DSR Residency', category: 'Kitchen', slug: { current: 'dsr-residency' } },
  { title: 'Aparna Apartments', category: 'Full Home', slug: { current: 'aparna-apartments' } },
]

export function PortfolioPreview() {
  const [projects, setProjects] = useState<any[]>(fallbackProjects)

  useEffect(() => {
    sanityFetch('*[_type == "project"] | order(_createdAt desc) [0...4] { title, slug, category, featuredImage }')
      .then((data: any[]) => { if (data?.length > 0) setProjects(data) })
      .catch(() => {})
  }, [])

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="parx-accent-line" />
            <h2 className="font-display font-light text-parx-black text-3xl md:text-4xl">
              Discover Our<br /><em className="italic text-parx-red">Amazing Creations</em>
            </h2>
          </div>
          <Link href="/projects" className="text-parx-red hover:text-parx-black text-sm font-sans font-medium tracking-wide transition-colors group inline-flex items-center gap-2">
            View all projects <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <Link key={p.slug?.current || i} href={`/projects/${p.slug?.current || '#'}`}
              className={`group relative overflow-hidden bg-parx-light cursor-pointer ${i === 0 ? 'md:row-span-2' : ''}`}>
              <div className={`${i === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'} overflow-hidden`}>
                {p.featuredImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imgUrl(p.featuredImage, 800)} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-parx-light flex items-center justify-center">
                    <div className="text-parx-gray text-center">
                      <div className="text-4xl mb-2 opacity-30">📷</div>
                      <p className="text-xs tracking-widest">PROJECT PHOTO</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-parx-black/60 to-transparent z-10" />
                <div className="absolute inset-0 bg-parx-red/10 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                <div className="text-parx-red text-[10px] tracking-[0.25em] uppercase mb-1">{p.category}</div>
                <div className="font-display text-lg text-white font-light">{p.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

const fallbackTestimonials = [
  {
    clientName: 'Rajesh K.',
    location: 'Gachibowli',
    projectType: 'Full Home Interior',
    text: 'Parx delivered our 3BHK on time and exactly as the 3D design showed. The modular kitchen is stunning. Every detail was thought through, and the team was professional throughout the entire process.',
    rating: 5,
  },
  {
    clientName: 'Priya S.',
    location: 'Kondapur',
    projectType: 'Modular Wardrobe',
    text: 'Finally found a studio that truly listens. Our wardrobe design is perfect — every inch utilised beautifully. The quality of materials and finish exceeded our expectations. Highly recommend Parx.',
    rating: 5,
  },
  {
    clientName: 'Arun Reddy',
    location: 'Jubilee Hills',
    projectType: 'Modular Kitchen',
    text: 'The factory visit convinced us completely. Seeing how everything is made in-house builds total confidence. Transparent pricing, no hidden costs, and delivered exactly on schedule. Worth every rupee.',
    rating: 5,
  },
]

const placeholderColors = [
  'from-stone-200 to-stone-300',
  'from-neutral-200 to-neutral-300',
  'from-zinc-200 to-zinc-300',
]

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#D63E73">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ review, index }: { review: any; index: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useState(() => {
    if (typeof window === 'undefined') return null
    return null
  })

  useEffect(() => {
    const el = document.getElementById(`tc-${index}`)
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div
      id={`tc-${index}`}
      className="bg-white rounded-[20px] overflow-hidden flex flex-col transition-all duration-700"
      style={{
        boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transitionDelay: `${index * 120}ms`,
      }}
    >
      {/* Project Image */}
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br relative"
        style={{ background: 'linear-gradient(135deg, #e8e3de 0%, #d4cfc9 100%)' }}>
        {review.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgUrl(review.image, 600)}
            alt={`${review.clientName} project`}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-stone-400/60 font-display text-lg font-light italic">{review.projectType || 'Interior Design'}</span>
          </div>
        )}
        {/* Project type tag */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-parx-black text-[10px] font-sans font-semibold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full">
          {review.projectType || 'Interior Design'}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Stars */}
        <StarRating count={review.rating || 5} />

        {/* Quote */}
        <p className="font-sans text-parx-black/80 text-sm leading-relaxed mt-4 flex-1">
          &ldquo;{review.text}&rdquo;
        </p>

        {/* Divider */}
        <div className="w-8 h-px bg-parx-border mt-5 mb-4" />

        {/* Client info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-sans font-bold flex-shrink-0"
            style={{ background: '#D63E73' }}>
            {review.clientName?.charAt(0) || 'P'}
          </div>
          <div>
            <div className="text-parx-black text-sm font-sans font-semibold leading-tight">{review.clientName}</div>
            <div className="text-parx-gray text-xs font-sans mt-0.5">{review.location}, Hyderabad</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const [reviews, setReviews] = useState<any[]>(fallbackTestimonials)
  const [trustVisible, setTrustVisible] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)

  useEffect(() => {
    sanityFetch('*[_type == "review"] | order(_createdAt desc) [0...3] { clientName, location, text, rating, projectType, image }')
      .then((data: any[]) => {
        if (data?.length > 0) setReviews(data)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const trustEl = document.getElementById('trust-block')
    const ctaEl = document.getElementById('reviews-cta')
    if (trustEl) {
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTrustVisible(true); obs.disconnect() } }, { threshold: 0.2 })
      obs.observe(trustEl)
    }
    if (ctaEl) {
      const obs2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setCtaVisible(true); obs2.disconnect() } }, { threshold: 0.2 })
      obs2.observe(ctaEl)
    }
  }, [])

  return (
    <section className="bg-parx-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="parx-accent-line" />
          <h2 className="font-display font-light text-parx-black mb-4" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
            Trusted by Hyderabad<br /><em className="italic" style={{ color: '#D63E73' }}>Homeowners</em>
          </h2>
          <p className="font-sans font-semibold text-parx-black text-sm tracking-wide mb-2">
            Real homes. Real transformations. Real experiences.
          </p>
          <p className="font-sans text-parx-gray text-sm leading-relaxed max-w-lg">
            Every project reflects our commitment to thoughtful design, quality craftsmanship, and a seamless customer experience.
          </p>
        </div>

        {/* Three Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {reviews.slice(0, 3).map((review, i) => (
            <TestimonialCard key={i} review={review} index={i} />
          ))}
        </div>

        {/* Trust Block */}
        <div
          id="trust-block"
          className="text-center py-16 md:py-20 px-6 rounded-[20px] mb-12 transition-all duration-700"
          style={{
            background: '#ffffff',
            boxShadow: '0 2px 24px rgba(0,0,0,0.05)',
            opacity: trustVisible ? 1 : 0,
            transform: trustVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div className="flex justify-center gap-1.5 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="#D63E73">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <h3 className="font-display font-light text-parx-black mb-4" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}>
            Trusted by Families Across Hyderabad
          </h3>
          <p className="font-sans text-parx-gray text-sm leading-relaxed max-w-md mx-auto">
            Every home we design is crafted with attention to detail, transparent communication, and professional execution.
          </p>
        </div>

        {/* Appreciation Message */}
        <div className="max-w-lg mx-auto mb-20">
          <div className="bg-white rounded-[20px] p-8 relative"
            style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-sans font-bold mb-5"
              style={{ background: '#D63E73' }}>
              S
            </div>
            <svg className="absolute top-8 right-8 opacity-10" width="32" height="32" viewBox="0 0 24 24" fill="#1B1B1B">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.293-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.293-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            <p className="font-sans text-parx-black/80 text-sm leading-relaxed mb-1">
              &ldquo;Thank you, Parx team.
            </p>
            <p className="font-sans text-parx-black/80 text-sm leading-relaxed mb-1">
              The final interiors looked exactly like the 3D design.
            </p>
            <p className="font-sans text-parx-black/80 text-sm leading-relaxed">
              The entire process was smooth and transparent.&rdquo;
            </p>
            <div className="mt-5 pt-5 border-t border-parx-border">
              <div className="text-parx-black text-xs font-sans font-semibold">Sravani T.</div>
              <div className="text-parx-gray text-xs font-sans mt-0.5">Hitech City, Hyderabad · Full Home Interior</div>
            </div>
          </div>
        </div>

        {/* CTA Block */}
        <div
          id="reviews-cta"
          className="text-center transition-all duration-700"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h2 className="font-display font-light text-parx-black mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            Let&apos;s Design a Home You&apos;ll Love<br />
            <em className="italic" style={{ color: '#D63E73' }}>for Years to Come.</em>
          </h2>
          <p className="font-sans text-parx-gray text-sm leading-relaxed max-w-md mx-auto mb-10">
            Book a free consultation with our interior design experts and start your home transformation with confidence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2.5 text-white font-sans font-medium text-sm tracking-wide px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
              style={{ background: '#D63E73', letterSpacing: '0.04em' }}>
              Book Free Consultation
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/projects"
              className="inline-flex items-center justify-center gap-2.5 text-parx-black font-sans font-medium text-sm tracking-wide px-8 py-4 rounded-full border border-parx-border hover:border-parx-black transition-all duration-300 w-full sm:w-auto"
              style={{ letterSpacing: '0.04em' }}>
              View Our Projects
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
