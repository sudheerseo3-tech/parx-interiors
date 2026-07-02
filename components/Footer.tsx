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

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)
const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
)

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

  const socials = [
    { label: 'Instagram', href: '#', Icon: InstagramIcon },
    { label: 'Facebook', href: '#', Icon: FacebookIcon },
    { label: 'LinkedIn', href: '#', Icon: LinkedInIcon },
    { label: 'YouTube', href: '#', Icon: YouTubeIcon },
  ]

  return (
    <footer style={{ background: '#1B1B1B' }} className="text-white">

      {/* Main Footer Body */}
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="Parx Interiors" className="h-14 w-auto object-contain" />
          ) : (
            <div className="flex flex-col items-center leading-none">
              <span className="font-sans font-black text-3xl tracking-tight text-white">
                PAR<span style={{ color: '#D63E73' }}>X</span>
              </span>
              <span className="text-[9px] tracking-[0.4em] text-white/40 mt-1 font-sans font-medium">INTERIORS</span>
            </div>
          )}
        </div>

        {/* Tagline */}
        <h2 className="font-display font-light text-white/90 mb-5" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.3 }}>
          Where Function Meets <em className="italic" style={{ color: '#D63E73' }}>Finesse.</em>
        </h2>

        {/* Premium paragraph */}
        <p className="font-sans text-white/45 text-sm leading-relaxed max-w-md mx-auto mb-12">
          Creating thoughtfully designed interiors for apartments and villas across Hyderabad with expert craftsmanship and complete transparency.
        </p>

        {/* CTA Button */}
        <Link href="/contact"
          className="inline-flex items-center gap-3 text-white font-sans font-medium text-sm tracking-wide px-8 py-4 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all duration-300 mb-14"
          style={{ letterSpacing: '0.04em' }}>
          Book Free Consultation
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        {/* Divider */}
        <div className="w-12 h-px bg-white/15 mx-auto mb-12" />

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 mb-14 text-sm">
          <a href="tel:+919177822018" className="text-white/45 hover:text-white font-sans transition-colors duration-200">
            +91 91778 22018
          </a>
          <a href="mailto:parxinteriors@gmail.com" className="text-white/45 hover:text-white font-sans transition-colors duration-200">
            parxinteriors@gmail.com
          </a>
          <p className="text-white/45 font-sans">
            SMR Vinay Iconia, Kondapur, Hyderabad
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-5">
          {socials.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all duration-300">
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/25 text-xs font-sans">
            © {new Date().getFullYear()} Parx Interiors. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-white/25 hover:text-white/60 text-xs font-sans transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="text-white/25 hover:text-white/60 text-xs font-sans transition-colors duration-200">Terms</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
