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
  { clientName: 'Rajesh K.', location: 'Gachibowli', text: 'Parx delivered our 3BHK on time and exactly as the 3D design showed. The modular kitchen is stunning. Highly recommend.', rating: 5, source: 'google' },
  { clientName: 'Priya S.', location: 'Kondapur', text: 'Finally found a studio that truly listens. Our wardrobe design is perfect — every inch utilised. Quality is outstanding.', rating: 5, source: 'google' },
  { clientName: 'Arun Reddy', location: 'Jubilee Hills', text: 'The factory visit convinced us completely. Seeing how they make everything in-house builds total confidence. Worth every rupee.', rating: 5, source: 'whatsapp' },
  { clientName: 'Sneha M.', location: 'Hitech City', text: 'Our modular kitchen turned out exactly like the 3D render. The soft-close hardware is so satisfying. Great team to work with.', rating: 5, source: 'google' },
  { clientName: 'Vikram P.', location: 'Manikonda', text: 'We compared 5 interior designers before choosing Parx. Best decision — transparent pricing, no hidden costs, delivered on schedule.', rating: 5, source: 'whatsapp' },
  { clientName: 'Lakshmi R.', location: 'Kukatpally', text: 'The false ceiling and lighting design transformed our living room completely. Mani and team were professional throughout.', rating: 5, source: 'google' },
]

function GoogleReviewCard({ review }: { review: any }) {
  return (
    <div className="bg-white border border-parx-border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Google header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-parx-red flex items-center justify-center text-white font-sans font-bold text-sm">
          {review.clientName?.charAt(0) || 'P'}
        </div>
        <div>
          <div className="text-parx-black text-sm font-sans font-semibold">{review.clientName}</div>
          <div className="text-parx-gray text-xs font-sans">{review.location}, Hyderabad</div>
        </div>
        <div className="ml-auto">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
      </div>
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {[...Array(review.rating || 5)].map((_: any, j: number) => (
          <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#FBBC05">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>
      {/* Review text */}
      <p className="text-parx-black text-sm font-sans leading-relaxed">&ldquo;{review.text}&rdquo;</p>
    </div>
  )
}

function WhatsAppReviewCard({ review }: { review: any }) {
  return (
    <div className="bg-[#e5ddd5] rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
      {/* WhatsApp header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white text-xs font-bold">
          {review.clientName?.charAt(0) || 'P'}
        </div>
        <div>
          <div className="text-parx-black text-xs font-sans font-semibold">{review.clientName}</div>
          <div className="text-parx-gray text-[10px] font-sans">{review.location}</div>
        </div>
        <svg className="ml-auto" width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </div>
      {/* Chat bubble */}
      <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm relative">
        <p className="text-parx-black text-sm font-sans leading-relaxed">&ldquo;{review.text}&rdquo;</p>
        <div className="text-right mt-2">
          <span className="text-parx-gray text-[10px] font-sans">
            10:23 AM
            {' '}
            <span className="text-[#4FC3F7]">✓✓</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const [reviews, setReviews] = useState<any[]>(fallbackTestimonials)

  useEffect(() => {
    sanityFetch('*[_type == "review"] | order(_createdAt desc) [0...6] { clientName, location, text, rating, projectType }')
      .then((data: any[]) => {
        if (data?.length > 0) {
          setReviews(data.map((r, i) => ({ ...r, source: i % 3 === 2 ? 'whatsapp' : 'google' })))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section className="bg-parx-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="parx-accent-line" />
            <h2 className="font-display font-light text-parx-black text-3xl md:text-4xl">
              What our clients<br /><em className="italic text-parx-red">say about us</em>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-parx-black text-sm font-sans font-semibold">4.9</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#FBBC05">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((t, i) => (
            t.source === 'whatsapp'
              ? <WhatsAppReviewCard key={i} review={t} />
              : <GoogleReviewCard key={i} review={t} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/reviews" className="inline-flex items-center gap-2 text-parx-red hover:text-parx-black text-sm font-sans font-medium tracking-wide transition-colors">
            Read all reviews <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
