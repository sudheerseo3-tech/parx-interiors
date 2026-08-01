'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import HeroSection from '@/components/HeroSection'
import ValueCards from '@/components/ValueCards'
import { BuilderLogosSection, BrandLogosSection } from '@/components/SanityLogoSliders'
import { PortfolioPreview as SanityPortfolio } from '@/components/SanityHomeSections'
import WhatsAppReviews from '@/components/WhatsAppReviews'
import ServicesSection from '@/components/ServicesSection'


function FactoryUSP() {
  const [factoryImg, setFactoryImg] = useState<string | null>(null)

  useEffect(() => {
    fetch(`https://dx9xg01d.api.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent('*[_type == "siteSettings"][0]{ factoryImage }')}`)
      .then(r => r.json())
      .then(d => {
        if (d.result?.factoryImage?.asset?._ref) {
          const ref = d.result.factoryImage.asset._ref
          const [, id, dim, fmt] = ref.split('-')
          setFactoryImg(`https://cdn.sanity.io/images/dx9xg01d/production/${id}-${dim}.${fmt}?w=800&fit=max&auto=format`)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section className="bg-parx-cream py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <div className="parx-accent-line" />
            <h2 className="font-display font-light text-parx-black mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              We don&apos;t just<br />design it —<br />
              <em className="italic text-parx-red">we build it.</em>
            </h2>
            <p className="text-parx-gray leading-relaxed mb-6 text-sm md:text-base">
              Most interior studios outsource all woodwork to third-party carpenters.
              We own our manufacturing facility. Every modular unit, every wardrobe,
              every kitchen cabinet is built by our team — in our own factory.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              {[
                { title: 'Faster delivery', desc: 'Factory-made units installed in days, not weeks' },
                { title: 'Better quality', desc: 'Every piece made and inspected in-house' },
                { title: 'Fixed price', desc: 'No middlemen means no hidden costs' },
                { title: 'One team', desc: 'Design to handover — single point of contact' },
              ].map(f => (
                <div key={f.title} className="border-l-2 border-parx-red pl-4">
                  <div className="text-parx-black text-sm font-medium mb-1">{f.title}</div>
                  <div className="text-parx-gray text-xs leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>
            <a href="https://wa.me/919177822018?text=I%20would%20like%20to%20visit%20the%20Parx%20Interiors%20factory"
              className="inline-flex items-center gap-3 text-parx-red hover:text-parx-black text-sm tracking-wide transition-colors group">
              Visit our factory
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-parx-light border border-parx-border overflow-hidden">
              {factoryImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={factoryImg} alt="Parx Interiors Factory" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-parx-cream">
                  <div className="text-center">
                    <div className="font-display text-6xl text-parx-border mb-4 opacity-30">⚙</div>
                    <p className="text-parx-gray text-xs tracking-widest">FACTORY PHOTO</p>
                    <p className="text-parx-gray text-[10px] mt-1">Upload in Site Settings</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    { n: '01', title: 'Free consultation', desc: 'Site visit or meeting. We understand your vision, requirements, and budget.' },
    { n: '02', title: '3D design proposal', desc: 'Full 3D visualisation and itemised quote delivered within 5 working days.' },
    { n: '03', title: 'Design approval', desc: 'You approve the design and we sign the agreement. Fixed price, no surprises.' },
    { n: '04', title: 'Manufacturing', desc: 'All woodwork and furniture built in our factory while site prep happens.' },
    { n: '05', title: 'Site execution', desc: 'Civil, electrical, painting done in parallel for faster completion.' },
    { n: '06', title: 'Handover', desc: 'Final walkthrough together. Your home, perfected.' },
  ]

  return (
    <section className="bg-parx-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <div className="parx-accent-line" />
          <h2 className="font-display font-light text-parx-black" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            How we work<br /><em className="italic text-parx-red">with you</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.n}>
              <div className="flex items-start gap-4 mb-4">
                <span className="text-parx-red font-mono text-sm mt-1">{s.n}</span>
                <div className="flex-1 h-px bg-parx-border mt-2.5" />
              </div>
              <h3 className="font-display text-xl text-parx-black font-light mb-2">{s.title}</h3>
              <p className="text-parx-gray text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <Link href="/contact"
            className="inline-flex items-center gap-3 bg-parx-black hover:bg-parx-red text-white px-8 py-3 text-sm tracking-wide rounded-full transition-all duration-300">
            Start Your Project
            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

function CostCalculatorCTA() {
  return (
    <section className="bg-parx-cream py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="border border-parx-border bg-white p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="parx-accent-line" />
            <h2 className="font-display font-light text-parx-black text-2xl md:text-3xl mb-3">
              Estimate your <em className="italic text-parx-red">interior cost</em>
            </h2>
            <p className="text-parx-gray text-sm max-w-md">
              Use our free calculator to get an instant estimate based on your BHK, rooms, and material preferences.
            </p>
          </div>
          <Link href="/calculator"
            className="inline-flex items-center gap-3 bg-parx-red hover:bg-parx-red-dark text-white px-7 py-3 text-sm tracking-wide rounded-full transition-all duration-300 whitespace-nowrap">
            Try Cost Calculator
            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function HomeClient() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection
          heading={'Where Function\nMeets Finesse.'}
          description="End-to-end interior design with in-house manufacturing. Modular kitchens, wardrobes & full home interiors."
          ctaLabel="Start Your Journey"
          ctaUrl="/contact"
        />
        <ValueCards />
        <ServicesSection />
        <FactoryUSP />
        <SanityPortfolio />
        <Process />
        <WhatsAppReviews />
        <BuilderLogosSection />
        <BrandLogosSection />
        <CostCalculatorCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
