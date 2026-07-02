'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const PROJECT_ID = 'dx9xg01d'
const DATASET = 'production'

function imgUrl(image: any) {
  if (!image?.asset?._ref) return ''
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}?w=400&auto=format`
}

export default function Footer() {
  const [logo, setLogo] = useState<string | null>(null)

  useEffect(() => {
    fetch(`https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${encodeURIComponent('*[_type == "siteSettings"][0]{ logoWhite, logo }')}`)
      .then(r => r.json())
      .then(d => {
        if (d.result?.logoWhite) setLogo(imgUrl(d.result.logoWhite))
        else if (d.result?.logo) setLogo(imgUrl(d.result.logo))
      })
      .catch(() => {})
  }, [])

  return (
    <footer className="bg-parx-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt="Parx Interiors" className="h-9 w-auto object-contain mb-5 brightness-0 invert" />
            ) : (
              <div className="flex flex-col leading-none mb-5">
                <span className="font-sans font-black text-2xl tracking-tight text-white">
                  PAR<span className="text-parx-red">X</span>
                </span>
                <span className="text-[8px] tracking-[0.35em] text-white/50 mt-0.5 font-sans font-medium">INTERIORS</span>
              </div>
            )}
            <p className="text-white/60 text-sm font-sans leading-relaxed max-w-xs mb-1">
              Where Function Meets Finesse.
            </p>
            <p className="text-white/40 text-xs font-sans leading-relaxed max-w-xs">
              Hyderabad&apos;s premier end-to-end interior design studio. In-house manufacturing since 2011.
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="text-white text-xs font-sans font-semibold tracking-[0.15em] uppercase mb-5">Sitemap</h4>
            {[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Services', href: '/services' },
              { label: 'Projects', href: '/projects' },
              { label: 'Blog', href: '/blog' },
              { label: 'Calculator', href: '/calculator' },
              { label: 'FAQ', href: '/faq' },
              { label: 'Reviews', href: '/reviews' },
              { label: 'Contact', href: '/contact' },
            ].map(s => (
              <Link key={s.label} href={s.href} className="block text-white/45 hover:text-white text-sm font-sans mb-2.5 transition-colors duration-200 hover:translate-x-1 transform">{s.label}</Link>
            ))}
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-white text-xs font-sans font-semibold tracking-[0.15em] uppercase mb-5">Socials</h4>
            {[
              { label: 'Instagram', href: '#' },
              { label: 'Facebook', href: '#' },
              { label: 'LinkedIn', href: '#' },
              { label: 'YouTube', href: '#' },
              { label: 'Twitter', href: '#' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="block text-white/45 hover:text-white text-sm font-sans mb-2.5 transition-colors duration-200 hover:translate-x-1 transform">{s.label}</a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-sans font-semibold tracking-[0.15em] uppercase mb-5">Contact</h4>
            <div className="space-y-4">
              <p className="text-white/45 text-sm font-sans leading-relaxed">
                SMR Vinay Iconia,<br />Tower Hamilton, 20th Floor<br />Kondapur, Hyderabad 500084
              </p>
              <a href="mailto:parxinteriors@gmail.com" className="block text-white/45 hover:text-white text-sm font-sans transition-colors duration-200">parxinteriors@gmail.com</a>
              <a href="tel:+919177822018" className="block text-white/45 hover:text-white text-sm font-sans transition-colors duration-200">+91 91778 22018</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col md:flex-row justify-between gap-3">
          <p className="text-white/25 text-xs font-sans">© {new Date().getFullYear()} Parx Interiors. All rights reserved.</p>
          <p className="text-white/25 text-xs font-sans">Interior Design · Hyderabad, Telangana, India</p>
        </div>
      </div>
    </footer>
  )
}
