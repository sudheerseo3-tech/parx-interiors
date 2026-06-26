'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// ── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-parx-black/95 backdrop-blur-sm border-b border-parx-border' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl font-light tracking-widest text-parx-white">
            PAR<span className="text-parx-red font-normal">X</span>
          </span>
          <span className="text-[8px] tracking-[0.4em] text-parx-gray mt-0.5">INTERIORS</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Portfolio', 'Studio', 'Process', 'Blog'].map(item => (
            <Link key={item} href={`/${item.toLowerCase()}`}
              className="text-sm text-parx-gray hover:text-parx-white transition-colors duration-200 tracking-wide">
              {item}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://wa.me/91XXXXXXXXXX?text=Hi%20Parx%20Interiors%2C%20I%20would%20like%20a%20free%20design%20consultation"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-parx-red hover:bg-parx-red-dark text-white text-sm px-5 py-2.5 transition-all duration-200 tracking-wide">
            Free Consultation
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-6 h-0.5 bg-parx-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-parx-white transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-parx-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-parx-charcoal border-t border-parx-border px-6 py-6 flex flex-col gap-5">
          {['Services', 'Portfolio', 'Studio', 'Process', 'Blog', 'Contact'].map(item => (
            <Link key={item} href={`/${item.toLowerCase()}`}
              className="text-parx-white text-lg font-display font-light tracking-wide"
              onClick={() => setMenuOpen(false)}>
              {item}
            </Link>
          ))}
          <a href="https://wa.me/91XXXXXXXXXX"
            className="mt-2 bg-parx-red text-white text-center py-3 tracking-widest text-sm">
            WHATSAPP US
          </a>
        </div>
      )}
    </nav>
  )
}

// ── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-end pb-24 overflow-hidden bg-parx-black">
      {/* Background — replace src with actual video/image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-parx-charcoal via-parx-black to-parx-black opacity-100" />
        {/* Uncomment when client provides video:
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        */}
        {/* Placeholder grid pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(#C8102E 1px, transparent 1px), linear-gradient(90deg, #C8102E 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      </div>

      {/* Red accent — top right */}
      <div className="absolute top-0 right-0 w-px h-64 bg-parx-red opacity-60 z-10" />
      <div className="absolute top-0 right-0 w-32 h-px bg-parx-red opacity-60 z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="w-8 h-px bg-parx-red" />
            <span className="text-parx-red text-xs tracking-[0.3em] uppercase">Hyderabad's Premier Studio</span>
          </div>

          {/* Main headline */}
          <h1 className="font-display font-light text-parx-white mb-8 leading-[0.92] tracking-[-0.02em] opacity-0 animate-fade-up"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            Spaces that<br />
            <em className="italic text-parx-offwhite">speak</em> for<br />
            <span className="text-parx-red">themselves.</span>
          </h1>

          {/* Sub */}
          <p className="text-parx-gray text-lg md:text-xl font-light max-w-xl leading-relaxed mb-12 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            End-to-end interior design with in-house manufacturing.
            Residential &amp; commercial. Delivered on time, every time.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <a href="https://wa.me/91XXXXXXXXXX?text=Hi%20Parx%20Interiors%2C%20I%20would%20like%20a%20free%20design%20consultation"
              target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-parx-red hover:bg-parx-red-dark text-white px-8 py-4 text-sm tracking-[0.15em] uppercase transition-all duration-300">
              Get Free Consultation
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <Link href="/portfolio"
              className="inline-flex items-center gap-3 border border-parx-border hover:border-parx-white text-parx-gray hover:text-parx-white px-8 py-4 text-sm tracking-[0.15em] uppercase transition-all duration-300">
              View Our Work
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 pt-10 border-t border-parx-border grid grid-cols-3 md:grid-cols-3 gap-8 max-w-2xl opacity-0 animate-fade-up"
          style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
          {[
            { num: '100+', label: 'Projects completed' },
            { num: '8+',   label: 'Years in Hyderabad' },
            { num: '100%', label: 'In-house manufacturing' },
          ].map(s => (
            <div key={s.label}>
              <div className="font-display text-3xl md:text-4xl text-parx-white font-light mb-1">{s.num}</div>
              <div className="text-parx-gray text-xs tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-10">
        <span className="text-parx-gray text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-parx-gray animate-pulse" />
      </div>
    </section>
  )
}

// ── SERVICES ────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    { num: '01', title: 'Full Home Interiors', desc: 'Complete end-to-end transformation. Living, bedroom, kitchen, bathrooms — every room designed and built by our team.', tag: 'Residential' },
    { num: '02', title: 'Modular Kitchens',   desc: 'Custom-designed and manufactured in our own factory. Every cabinet built to your exact measurements and taste.', tag: 'Residential' },
    { num: '03', title: 'Wardrobes & Storage', desc: 'Floor-to-ceiling wardrobes, walk-in closets, and smart storage solutions. Designed for the way you live.', tag: 'Residential' },
    { num: '04', title: 'Office Interiors',   desc: 'Workspaces that impress clients and energise your team. Delivered fast — we understand your deadline is real.', tag: 'Commercial' },
    { num: '05', title: 'False Ceilings & Lighting', desc: 'Architectural ceilings with integrated lighting that transforms the feel of any room completely.', tag: 'Both' },
    { num: '06', title: 'Showrooms & Retail', desc: 'Commercial spaces designed to sell. From concept to opening day — single point of contact throughout.', tag: 'Commercial' },
  ]

  return (
    <section className="bg-parx-black py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="parx-accent-line" />
            <h2 className="font-display font-light text-parx-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              What we<br /><em className="italic">design & build</em>
            </h2>
          </div>
          <p className="text-parx-gray max-w-sm text-sm leading-relaxed">
            Every service is delivered end-to-end — design, manufacturing, installation — by our own team. No middlemen.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-parx-border">
          {services.map((s) => (
            <div key={s.num}
              className="group bg-parx-black hover:bg-parx-charcoal p-8 md:p-10 transition-all duration-300 cursor-default">
              <div className="flex justify-between items-start mb-6">
                <span className="text-parx-red font-mono text-sm">{s.num}</span>
                <span className="text-[10px] tracking-[0.2em] text-parx-gray border border-parx-border px-2 py-1 uppercase">{s.tag}</span>
              </div>
              <h3 className="font-display text-xl text-parx-white font-light mb-3 group-hover:text-parx-offwhite transition-colors">{s.title}</h3>
              <p className="text-parx-gray text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-6 w-0 group-hover:w-8 h-px bg-parx-red transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── USP: FACTORY ─────────────────────────────────────────────────────────────
function FactoryUSP() {
  return (
    <section className="bg-parx-charcoal py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <div className="parx-accent-line" />
            <h2 className="font-display font-light text-parx-white mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              We don't just<br />design it —<br />
              <em className="italic text-parx-red">we build it.</em>
            </h2>
            <p className="text-parx-gray leading-relaxed mb-6 text-sm md:text-base">
              Most interior studios outsource all woodwork to third-party carpenters.
              We own our manufacturing facility. Every modular unit, every wardrobe,
              every kitchen cabinet is built by our team — in our own factory.
            </p>
            <p className="text-parx-gray leading-relaxed mb-10 text-sm md:text-base">
              This means tighter quality control, faster delivery, and no surprise
              cost overruns. What we quote is what you pay.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              {[
                { title: 'Faster delivery',   desc: 'Factory-made units installed in days, not weeks' },
                { title: 'Better quality',    desc: 'Every piece made and inspected in-house' },
                { title: 'Fixed price',       desc: 'No middlemen means no hidden costs' },
                { title: 'One team',          desc: 'Design to handover — single point of contact' },
              ].map(f => (
                <div key={f.title} className="border-l-2 border-parx-red pl-4">
                  <div className="text-parx-white text-sm font-medium mb-1">{f.title}</div>
                  <div className="text-parx-gray text-xs leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>
            <a href="https://wa.me/91XXXXXXXXXX?text=I%20would%20like%20to%20visit%20the%20Parx%20Interiors%20factory"
              className="inline-flex items-center gap-3 text-parx-red hover:text-parx-white text-sm tracking-wide transition-colors group">
              Visit our factory
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Visual — replace with factory video/image */}
          <div className="relative">
            <div className="aspect-[4/5] bg-parx-black border border-parx-border flex items-center justify-center relative overflow-hidden">
              {/* Placeholder — swap with actual factory photo */}
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C8102E 0, #C8102E 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
              <div className="text-center z-10">
                <div className="font-display text-6xl text-parx-border mb-4">⚙</div>
                <p className="text-parx-border text-sm tracking-widest">FACTORY PHOTO / VIDEO</p>
                <p className="text-parx-border text-xs mt-2">Replace with client media</p>
              </div>
              {/* Red corner accent */}
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-parx-red" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 bg-parx-red p-6 z-10">
              <div className="font-display text-4xl text-white font-light">5yr</div>
              <div className="text-white/80 text-xs tracking-wide mt-1">Workmanship warranty</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── PORTFOLIO PREVIEW ────────────────────────────────────────────────────────
function PortfolioPreview() {
  const projects = [
    { id: 1, title: 'Modern 3BHK — Gachibowli',   cat: 'Full Home',      img: '/projects/project-1.jpg' },
    { id: 2, title: 'Modular Kitchen — Kondapur',  cat: 'Kitchen',        img: '/projects/project-2.jpg' },
    { id: 3, title: 'Tech Office — Hitech City',   cat: 'Commercial',     img: '/projects/project-3.jpg' },
    { id: 4, title: 'Villa Interiors — Jubilee Hills', cat: 'Full Home',  img: '/projects/project-4.jpg' },
  ]

  return (
    <section className="bg-parx-black py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="parx-accent-line" />
            <h2 className="font-display font-light text-parx-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Our recent<br /><em className="italic">projects</em>
            </h2>
          </div>
          <Link href="/portfolio"
            className="text-parx-red hover:text-parx-white text-sm tracking-wide transition-colors group inline-flex items-center gap-2">
            View all projects
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <div key={p.id}
              className={`group relative overflow-hidden bg-parx-charcoal cursor-pointer ${i === 0 ? 'md:row-span-2' : ''}`}>
              <div className={`${i === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'} bg-parx-charcoal flex items-center justify-center relative`}>
                {/* Replace div with Image when client photos available */}
                <div className="absolute inset-0 bg-gradient-to-t from-parx-black/80 to-transparent z-10" />
                <div className="text-parx-border text-center z-0">
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-xs tracking-widest">PROJECT PHOTO</p>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-parx-red/10 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20" />
              </div>
              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                <div className="text-parx-red text-[10px] tracking-[0.25em] uppercase mb-1">{p.cat}</div>
                <div className="font-display text-lg text-parx-white font-light">{p.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PROCESS ───────────────────────────────────────────────────────────────────
function Process() {
  const steps = [
    { n: '01', title: 'Free consultation', desc: 'Site visit or meeting. We understand your vision, requirements, and budget.' },
    { n: '02', title: '3D design proposal', desc: 'Full 3D visualisation and itemised quote delivered within 5 working days.' },
    { n: '03', title: 'Design approval',   desc: 'You approve the design and we sign the agreement. Fixed price, no surprises.' },
    { n: '04', title: 'Manufacturing',     desc: 'All woodwork and furniture built in our factory while site prep happens.' },
    { n: '05', title: 'Site execution',    desc: 'Civil, electrical, painting done in parallel for faster completion.' },
    { n: '06', title: 'Handover',          desc: 'Final walkthrough together. 5-year workmanship warranty. Your home, perfected.' },
  ]

  return (
    <section className="bg-parx-offwhite py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <div className="w-10 h-0.5 bg-parx-red mb-6" />
          <h2 className="font-display font-light text-parx-black" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            How we work<br /><em className="italic text-parx-red">with you</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={s.n} className="group">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-parx-red font-mono text-sm mt-1">{s.n}</span>
                <div className="flex-1 h-px bg-gray-200 mt-2.5" />
              </div>
              <h3 className="font-display text-xl text-parx-black font-light mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <a href="https://wa.me/91XXXXXXXXXX?text=Hi%20Parx%20Interiors%2C%20I%20would%20like%20to%20start%20my%20project"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-parx-black hover:bg-parx-red text-white px-10 py-4 text-sm tracking-[0.15em] uppercase transition-all duration-300">
            Start Your Project
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

// ── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    { name: 'Rajesh K.',     loc: 'Gachibowli',   text: 'Parx delivered our 3BHK on time and exactly as the 3D design showed. The modular kitchen is stunning. Highly recommend.', rating: 5 },
    { name: 'Priya S.',      loc: 'Kondapur',      text: 'Finally found a studio that truly listens. Our wardrobe design is perfect — every inch utilised. Quality is outstanding.', rating: 5 },
    { name: 'Arun Reddy',    loc: 'Jubilee Hills', text: 'The factory visit convinced us completely. Seeing how they make everything in-house builds total confidence. Worth every rupee.', rating: 5 },
  ]

  return (
    <section className="bg-parx-charcoal py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <div className="parx-accent-line" />
          <h2 className="font-display font-light text-parx-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            What our clients<br /><em className="italic">say about us</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="border border-parx-border p-8 hover:border-parx-red transition-colors duration-300">
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="text-parx-red text-sm">★</span>
                ))}
              </div>
              <p className="font-display text-parx-offwhite font-light italic leading-relaxed text-lg mb-8">"{t.text}"</p>
              <div>
                <div className="text-parx-white text-sm font-medium">{t.name}</div>
                <div className="text-parx-gray text-xs mt-1">{t.loc}, Hyderabad</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA FOOTER ────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="bg-parx-red py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-display font-light text-white mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
          Ready to transform<br /><em className="italic">your space?</em>
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
          Free consultation. No commitment. Just a conversation about your dream space.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/91XXXXXXXXXX?text=Hi%20Parx%20Interiors%2C%20I%20would%20like%20a%20free%20consultation"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white text-parx-red hover:bg-parx-offwhite px-10 py-4 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-200">
            WhatsApp Us Now
          </a>
          <Link href="/contact"
            className="inline-flex items-center justify-center gap-3 border border-white/40 hover:border-white text-white px-10 py-4 text-sm tracking-[0.15em] uppercase transition-all duration-200">
            Get a Free Quote
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-parx-black border-t border-parx-border py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex flex-col leading-none mb-4">
              <span className="font-display text-2xl font-light tracking-widest text-parx-white">
                PAR<span className="text-parx-red">X</span>
              </span>
              <span className="text-[8px] tracking-[0.4em] text-parx-gray mt-0.5">INTERIORS</span>
            </div>
            <p className="text-parx-gray text-sm leading-relaxed max-w-xs">
              Hyderabad's premier end-to-end interior design studio. Residential and commercial. In-house manufacturing.
            </p>
            <div className="flex gap-4 mt-6">
              {['Instagram', 'Facebook', 'YouTube'].map(s => (
                <a key={s} href="#" className="text-parx-gray hover:text-parx-red text-xs tracking-wide transition-colors">{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-parx-white text-xs tracking-[0.2em] uppercase mb-4">Services</h4>
            {['Full Home Interiors', 'Modular Kitchens', 'Wardrobes', 'Office Interiors', 'False Ceilings'].map(s => (
              <div key={s} className="text-parx-gray hover:text-parx-white text-sm mb-2 cursor-pointer transition-colors">{s}</div>
            ))}
          </div>
          <div>
            <h4 className="text-parx-white text-xs tracking-[0.2em] uppercase mb-4">Contact</h4>
            <div className="text-parx-gray text-sm mb-2">[FILL: Phone number]</div>
            <div className="text-parx-gray text-sm mb-2">[FILL: Email]</div>
            <div className="text-parx-gray text-sm mb-6">[FILL: Office address], Hyderabad</div>
            <a href="https://wa.me/91XXXXXXXXXX"
              className="inline-flex items-center gap-2 text-parx-red hover:text-parx-white text-sm transition-colors">
              WhatsApp →
            </a>
          </div>
        </div>
        <div className="border-t border-parx-border pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-parx-gray text-xs">© {new Date().getFullYear()} Parx Interiors. All rights reserved.</p>
          <p className="text-parx-gray text-xs">Interior Design · Hyderabad, Telangana, India</p>
        </div>
      </div>
    </footer>
  )
}

// ── WHATSAPP FLOAT ────────────────────────────────────────────────────────────
function WhatsAppButton() {
  return (
    <a href="https://wa.me/91XXXXXXXXXX?text=Hi%20Parx%20Interiors%2C%20I%27m%20interested%20in%20your%20services"
      target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-4 py-3 shadow-lg transition-all duration-200 hover:scale-105 group"
      aria-label="Chat on WhatsApp">
      {/* WhatsApp icon */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="text-sm font-medium">Chat with us</span>
    </a>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <FactoryUSP />
        <PortfolioPreview />
        <Process />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
