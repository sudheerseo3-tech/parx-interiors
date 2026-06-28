'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const PROJECT_ID = 'dx9xg01d'
const DATASET = 'production'

function imgUrl(image: any) {
  if (!image?.asset?._ref) return ''
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}?w=400&auto=format`
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [logo, setLogo] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    fetch(`https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${encodeURIComponent('*[_type == "siteSettings"][0]{ logo }')}`)
      .then(r => r.json())
      .then(d => {
        if (d.result?.logo) setLogo(imgUrl(d.result.logo))
      })
      .catch(() => {})
  }, [])

  const links = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Process', href: '/process' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2 md:py-3' : 'bg-white py-3 md:py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="Parx Interiors" className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-7 md:h-8' : 'h-8 md:h-9'}`} />
          ) : (
            <div className="flex flex-col leading-none">
              <span className={`font-display tracking-[0.15em] text-parx-black transition-all ${scrolled ? 'text-base md:text-lg' : 'text-lg md:text-xl'}`}>
                PAR<span className="text-parx-red">X</span>
              </span>
              <span className="text-[6px] md:text-[7px] tracking-[0.3em] text-parx-gray mt-0.5 font-sans">INTERIORS</span>
            </div>
          )}
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map(item => {
            const isActive = pathname === item.href
            return (
              <Link key={item.label} href={item.href}
                className={`relative px-4 py-2 text-[13px] font-sans font-medium tracking-wide transition-all duration-200 rounded-full
                  ${isActive
                    ? 'text-parx-red'
                    : 'text-parx-gray hover:text-parx-black hover:bg-parx-cream'
                  }`}>
                {item.label}
                {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-parx-red" />}
              </Link>
            )
          })}
        </div>

        <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-5 h-[1.5px] bg-parx-black transition-all ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-parx-black transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-parx-black transition-all ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-parx-border px-6 py-6 flex flex-col gap-4 shadow-lg">
          {links.map(item => {
            const isActive = pathname === item.href
            return (
              <Link key={item.label} href={item.href}
                className={`text-base font-sans font-medium tracking-wide py-1 ${isActive ? 'text-parx-red' : 'text-parx-black'}`}
                onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
