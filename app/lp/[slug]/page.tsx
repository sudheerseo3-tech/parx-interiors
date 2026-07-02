import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import LpHero from './LpHero'
import LpFaq from './LpFaq'
import LpSticky from './LpSticky'

// Dynamic imports for heavy interactive sections
const LpBeforeAfter = dynamic(() => import('./LpBeforeAfter'), { ssr: false })
const LpCalculator  = dynamic(() => import('./LpCalculator'),  { ssr: false })

// ─── Sanity ──────────────────────────────────────────────────────────────────
const PROJECT_ID = 'dx9xg01d'
const DATASET    = 'production'

function sanityImgUrl(image: any, w = 1200): string {
  if (!image?.asset?._ref) return ''
  const [, id, dim, fmt] = image.asset._ref.split('-')
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dim}.${fmt}?w=${w}&fit=max&auto=format`
}

async function getLp(slug: string) {
  const query = encodeURIComponent(
    `*[_type == "landingPage" && slug.current == "${slug}" && isActive != false][0]{
      internalTitle, slug, metaTitle, metaDescription, ogImage,
      heroImage, heroHeadline, heroSubheadline, heroPrimaryCta, heroSecondaryCta, trustPills,
      beforeAfterPairs[]{ label, beforeImage, afterImage },
      processSteps[]{ stepNumber, title, description },
      whyCards[]{ icon, title, description },
      faqs[]{ question, answer },
      finalCtaHeadline, finalCtaSubtext, finalCtaButton, whatsappNumber
    }`
  )
  const res = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`,
    { next: { revalidate: 3600 } }
  )
  const data = await res.json()
  return data.result
}

// Also fetch builder + brand logos for the trust bar
async function getLogos() {
  const q = encodeURIComponent(`{
    "builders": *[_type == "builderLogo"] | order(order asc) { name, logo },
    "brands":   *[_type == "brandLogo"]   | order(order asc) { name, logo }
  }`)
  const res = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${q}`,
    { next: { revalidate: 3600 } }
  )
  const data = await res.json()
  return data.result ?? { builders: [], brands: [] }
}

// ─── generateStaticParams ────────────────────────────────────────────────────
export async function generateStaticParams() {
  const q = encodeURIComponent('*[_type == "landingPage" && isActive != false]{ "slug": slug.current }')
  const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${q}`)
  const data = await res.json()
  return (data.result ?? []).map((r: any) => ({ slug: r.slug }))
}

// ─── generateMetadata ────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const lp = await getLp(params.slug)
  if (!lp) return { title: 'Parx Interiors' }
  return {
    title: lp.metaTitle || 'Premium Interior Design Hyderabad | Parx Interiors',
    description: lp.metaDescription || 'Free consultation. End-to-end interior design in Hyderabad.',
    robots: { index: false, follow: false },
    openGraph: {
      title: lp.metaTitle || 'Parx Interiors',
      description: lp.metaDescription || '',
      images: lp.ogImage ? [sanityImgUrl(lp.ogImage, 1200)] : [],
    },
  }
}

// ─── Defaults ────────────────────────────────────────────────────────────────
const DEFAULT_PROCESS = [
  { stepNumber: '01', title: 'Free Consultation',     description: 'A 45-minute call to understand your vision, style, budget, and timeline.' },
  { stepNumber: '02', title: 'Site Visit',            description: 'Our team visits your home to measure every space and assess the layout.' },
  { stepNumber: '03', title: '3D Design',             description: 'Detailed 3D renders so you see exactly how your home will look before work begins.' },
  { stepNumber: '04', title: 'Manufacturing',         description: 'Every piece is built in our own facility using premium materials and hardware.' },
  { stepNumber: '05', title: 'Installation',          description: 'Our experienced team installs everything with precision and care.' },
  { stepNumber: '06', title: 'Handover',              description: 'Full walkthrough, quality check, and handover of your beautifully finished home.' },
]

const DEFAULT_WHY = [
  { icon: '🏭', title: 'In-house Manufacturing',   description: 'We own our factory. Every wardrobe and kitchen is built by our own team — no middlemen.' },
  { icon: '💬', title: 'Transparent Pricing',      description: 'Detailed cost breakdown upfront. No hidden charges. No surprises at handover.' },
  { icon: '🪵', title: 'Premium Materials',        description: 'Häfele, Hettich, Merino, CenturyPly — only the best brands in every project.' },
  { icon: '👤', title: 'Dedicated Project Manager',description: 'One point of contact from day one to handover. Always reachable, always accountable.' },
  { icon: '📅', title: 'On-time Delivery',         description: 'Factory-made modules mean faster timelines and reliable delivery — guaranteed.' },
  { icon: '🛡', title: 'After-Sales Care',         description: 'We support you even after the project is complete. Your satisfaction is long-term.' },
]

const DEFAULT_FAQ = [
  { question: 'How long does a full home interior project take?', answer: 'A typical 3BHK full home interior takes 6–10 weeks from design approval to handover. Timeline varies based on scope, but we always commit to a fixed delivery date upfront.' },
  { question: 'What is included in the free consultation?', answer: 'The free consultation includes a site visit, discussion of your design preferences and budget, and an initial 3D mood board. There is absolutely no obligation to proceed.' },
  { question: 'Do you manufacture everything in-house?', answer: 'Yes. We own our own manufacturing facility in Hyderabad. Every modular kitchen unit, wardrobe, and TV unit is designed and built by our team — not outsourced to carpenters.' },
  { question: 'What premium brands do you use?', answer: 'We use Häfele and Hettich for hardware, Merino and Greenlam for laminates, CenturyPly and Greenply for plywood, and Austin for hardware fittings — all top-tier brands.' },
  { question: 'Is there a warranty on the work?', answer: 'Yes. We provide warranty coverage on all manufacturing defects and continue to offer after-sales support for our projects. Your investment is protected.' },
  { question: 'Can I see 3D designs before committing?', answer: 'Absolutely. We create detailed, photorealistic 3D renders for every space before a single nail is hammered. You approve the design before work begins.' },
  { question: 'Do you offer fixed pricing or variable quotes?', answer: 'We provide fixed-price quotations with full cost breakdowns before you commit. No escalations, no hidden costs. The price you see is the price you pay.' },
  { question: 'Which areas of Hyderabad do you serve?', answer: 'We serve all of Hyderabad — including Gachibowli, Kondapur, Hitech City, Jubilee Hills, Manikonda, Kukatpally, Kompally, Miyapur, and surrounding areas.' },
]

// ─── Static Section Components ───────────────────────────────────────────────

function TrustBar({ builders, brands }: { builders: any[]; brands: any[] }) {
  const allLogos = [...builders, ...brands]
  if (!allLogos.length) return null
  const doubled = [...allLogos, ...allLogos]

  return (
    <section className="bg-white py-12 overflow-hidden border-y border-parx-border">
      <p className="text-center text-parx-gray text-[10px] font-sans tracking-[0.3em] uppercase mb-8">
        Trusted by residents of these communities · Built with these premium brands
      </p>
      <div className="relative">
        <div className="flex gap-10 items-center animate-scroll">
          {doubled.map((logo: any, i: number) => {
            const url = sanityImgUrl(logo.logo, 200)
            return (
              <div key={i} className="flex-shrink-0 h-12 w-36 flex items-center justify-center px-3 group">
                {url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={url} alt={logo.name} className="max-h-10 max-w-[120px] object-contain grayscale opacity-45 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-400" loading="lazy" />
                ) : (
                  <span className="text-parx-gray/40 text-xs font-sans font-medium tracking-wide group-hover:text-parx-black transition-colors">{logo.name}</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProcessSection({ steps }: { steps: typeof DEFAULT_PROCESS }) {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        <div className="text-center mb-16">
          <div className="parx-accent-line mx-auto" />
          <h2 className="font-display font-light text-parx-black mb-3" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
            Our <em className="italic" style={{ color: '#D63E73' }}>6-Step Process</em>
          </h2>
          <p className="font-sans text-parx-gray text-sm max-w-md mx-auto">From your first call to handing over the keys — here is exactly what to expect.</p>
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden md:grid grid-cols-6 gap-4 relative">
          <div className="absolute top-8 left-[8%] right-[8%] h-px bg-parx-border" />
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-parx-cream border-2 border-parx-border flex items-center justify-center mb-5 relative z-10">
                <span className="font-display font-light text-parx-red text-lg">{step.stepNumber}</span>
              </div>
              <h3 className="font-sans font-semibold text-parx-black text-[13px] mb-2">{step.title}</h3>
              <p className="font-sans text-parx-gray text-[11px] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-0">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-full bg-parx-cream border-2 border-parx-border flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-light text-parx-red text-sm">{step.stepNumber}</span>
                </div>
                {i < steps.length - 1 && <div className="w-px flex-1 bg-parx-border my-2" />}
              </div>
              <div className={`${i < steps.length - 1 ? 'pb-8' : ''}`}>
                <h3 className="font-sans font-semibold text-parx-black text-sm mb-1.5 mt-2.5">{step.title}</h3>
                <p className="font-sans text-parx-gray text-xs leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhySection({ cards }: { cards: typeof DEFAULT_WHY }) {
  return (
    <section className="bg-parx-cream py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        <div className="mb-14">
          <div className="parx-accent-line" />
          <h2 className="font-display font-light text-parx-black mb-3" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
            Why Hyderabad Families<br /><em className="italic" style={{ color: '#D63E73' }}>Choose Parx</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {cards.map((card, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
              <div className="text-2xl mb-4">{card.icon}</div>
              <h3 className="font-sans font-semibold text-parx-black text-sm mb-2">{card.title}</h3>
              <p className="font-sans text-parx-gray text-xs leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MaterialsSection({ logos }: { logos: any[] }) {
  if (!logos.length) return null
  const doubled = [...logos, ...logos]
  return (
    <section className="bg-white py-16 overflow-hidden border-y border-parx-border">
      <div className="text-center mb-8">
        <div className="parx-accent-line mx-auto" />
        <h2 className="font-display font-light text-parx-black" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}>
          Built with <em className="italic" style={{ color: '#D63E73' }}>the best</em>
        </h2>
        <p className="font-sans text-parx-gray text-xs mt-2">Premium materials & hardware trusted by professionals</p>
      </div>
      <div className="flex gap-8 items-center animate-scroll-slow">
        {doubled.map((logo: any, i: number) => {
          const url = sanityImgUrl(logo.logo, 200)
          return (
            <div key={i} className="flex-shrink-0 h-12 w-32 flex items-center justify-center group">
              {url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={url} alt={logo.name} className="max-h-10 max-w-[110px] object-contain grayscale opacity-45 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-400" loading="lazy" />
              ) : (
                <span className="text-parx-gray/40 text-xs font-sans font-medium group-hover:text-parx-black transition-colors">{logo.name}</span>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

function FinalCtaSection({ headline, subtext, btnLabel, onCtaClick }: { headline: string; subtext: string; btnLabel: string; onCtaClick?: () => void }) {
  return (
    <section className="py-24 md:py-32" style={{ background: '#D63E73' }}>
      <div className="max-w-3xl mx-auto px-5 md:px-10 text-center">
        <h2 className="font-display font-light text-white mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.2 }}>
          {headline}
        </h2>
        <p className="font-sans text-white/75 text-sm leading-relaxed mb-10 max-w-md mx-auto">{subtext}</p>
        <a
          href="#lp-calculator"
          className="inline-flex items-center gap-3 bg-white font-sans font-semibold text-sm px-10 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
          style={{ color: '#D63E73', letterSpacing: '0.03em' }}
        >
          {btnLabel}
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <p className="text-white/50 text-xs font-sans mt-5">Free consultation · No commitment · Hyderabad only</p>
      </div>
    </section>
  )
}

function LpFooterSection() {
  return (
    <footer style={{ background: '#1B1B1B' }} className="py-10">
      <div className="max-w-3xl mx-auto px-5 text-center">
        <div className="flex flex-col items-center leading-none mb-5">
          <span className="font-sans font-black text-2xl tracking-tight text-white">PAR<span style={{ color: '#D63E73' }}>X</span></span>
          <span className="text-[8px] tracking-[0.4em] text-white/30 mt-1 font-sans">INTERIORS</span>
        </div>
        <p className="font-sans text-white/35 text-xs mb-5">Where Function Meets Finesse.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 text-xs font-sans">
          <a href="tel:+919177822018" className="text-white/40 hover:text-white transition-colors">+91 91778 22018</a>
          <a href="mailto:parxinteriors@gmail.com" className="text-white/40 hover:text-white transition-colors">parxinteriors@gmail.com</a>
          <span className="text-white/40">SMR Vinay Iconia, Kondapur, Hyderabad</span>
        </div>
        <p className="text-white/20 text-[11px] font-sans">© {new Date().getFullYear()} Parx Interiors. All rights reserved.</p>
      </div>
    </footer>
  )
}

// ─── Client wrapper for hero CTAs ────────────────────────────────────────────
// (page is a Server Component — CTA click handlers are passed from a thin wrapper)
import LpClientWrapper from './LpClientWrapper'

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function LandingPage({ params }: { params: { slug: string } }) {
  const [lp, logos] = await Promise.all([getLp(params.slug), getLogos()])
  if (!lp) notFound()

  const processSteps = lp.processSteps?.length ? lp.processSteps : DEFAULT_PROCESS
  const whyCards     = lp.whyCards?.length    ? lp.whyCards    : DEFAULT_WHY
  const faqItems     = lp.faqs?.length        ? lp.faqs        : DEFAULT_FAQ
  const whatsapp     = lp.whatsappNumber || '+919177822018'

  const beforeAfterPairs = (lp.beforeAfterPairs || []).map((p: any) => ({
    label:       p.label || '',
    beforeImage: sanityImgUrl(p.beforeImage, 800),
    afterImage:  sanityImgUrl(p.afterImage, 800),
  })).filter((p: any) => p.beforeImage && p.afterImage)

  // FAQPage JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((f: any) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <LpClientWrapper
        heroImage={sanityImgUrl(lp.heroImage, 1920)}
        headline={lp.heroHeadline || 'Where Function Meets Finesse.'}
        subheadline={lp.heroSubheadline || 'Thoughtfully designed interiors for modern homes in Hyderabad.'}
        primaryCta={lp.heroPrimaryCta || 'Estimate Your Interior Budget'}
        secondaryCta={lp.heroSecondaryCta || 'Book Free Consultation'}
        trustPills={lp.trustPills || ['Free Consultation', '3D Design Included', 'Transparent Pricing', 'Professional Installation']}
        whatsappNumber={whatsapp}
        stickyCtaLabel={lp.heroPrimaryCta || 'Book Free Consultation'}
      />

      <TrustBar builders={logos.builders || []} brands={logos.brands || []} />

      {beforeAfterPairs.length > 0 && <LpBeforeAfter pairs={beforeAfterPairs} />}

      <LpCalculator whatsappNumber={whatsapp} />

      <ProcessSection steps={processSteps} />

      <WhySection cards={whyCards} />

      <MaterialsSection logos={logos.brands || []} />

      <LpFaq items={faqItems} />

      <FinalCtaSection
        headline={lp.finalCtaHeadline || "Let's Design a Home You'll Love for Years to Come."}
        subtext={lp.finalCtaSubtext || 'Book a free consultation and start your home transformation.'}
        btnLabel={lp.finalCtaButton || 'Book Free Consultation'}
      />

      <LpFooterSection />

      <LpSticky ctaLabel={lp.heroPrimaryCta || 'Book Free Consultation'} />
    </>
  )
}
