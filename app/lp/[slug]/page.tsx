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
      internalTitle, slug, metaTitle, metaDescription, ogImage, favicon,
      heroImage, heroHeadline, heroSubheadline, heroPrimaryCta, heroSecondaryCta, trustPills,
      beforeAfterPairs[]{ label, beforeImage, afterImage },
      processSteps[]{ stepNumber, title, description },
      whyCards[]{ icon, title, description },
      faqs[]{ question, answer },
      finalCtaHeadline, finalCtaSubtext, finalCtaButton, whatsappNumber,
      footerLogo, footerPhone, footerEmail, footerAddress,
      instagramUrl, facebookUrl, whatsappSocialUrl, youtubeUrl, linkedinUrl, twitterUrl, pinterestUrl
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
    icons: lp.favicon ? {
      icon: [{ url: sanityImgUrl(lp.favicon, 512), sizes: '512x512', type: 'image/png' }],
      apple: [{ url: sanityImgUrl(lp.favicon, 180), sizes: '180x180', type: 'image/png' }],
    } : undefined,
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

interface FooterProps {
  logoUrl?: string
  phone?: string
  email?: string
  address?: string
  instagram?: string
  facebook?: string
  whatsappSocial?: string
  youtube?: string
  linkedin?: string
  twitter?: string
  pinterest?: string
}

function SocialIcon({ href, children }: { href: string; children: React.ReactNode }) {
  if (!href) return null
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
      {children}
    </a>
  )
}

function LpFooterSection({ logoUrl, phone, email, address, instagram, facebook, whatsappSocial, youtube, linkedin, twitter, pinterest }: FooterProps) {
  const hasSocial = instagram || facebook || whatsappSocial || youtube || linkedin || twitter || pinterest
  const ph = phone || '+919177822018'
  const em = email || 'parxinteriors@gmail.com'
  const addr = address || 'SMR Vinay Iconia, Kondapur, Hyderabad'

  return (
    <footer style={{ background: '#1B1B1B' }} className="py-12">
      <div className="max-w-3xl mx-auto px-5 text-center">

        {/* Logo */}
        <div className="flex flex-col items-center mb-5">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt="Parx Interiors" className="h-10 w-auto object-contain mb-1" loading="lazy" />
          ) : (
            <div className="leading-none">
              <span className="font-sans font-black text-2xl tracking-tight text-white">PAR<span style={{ color: '#D63E73' }}>X</span></span>
              <div className="text-[8px] tracking-[0.4em] text-white/30 mt-0.5 font-sans">INTERIORS</div>
            </div>
          )}
        </div>

        <p className="font-sans text-white/35 text-xs mb-6">Where Function Meets Finesse.</p>

        {/* Social icons */}
        {hasSocial && (
          <div className="flex justify-center gap-3 mb-7">
            <SocialIcon href={instagram || ''}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </SocialIcon>
            <SocialIcon href={facebook || ''}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </SocialIcon>
            {whatsappSocial && (
              <SocialIcon href={`https://wa.me/${whatsappSocial.replace(/\D/g, '')}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </SocialIcon>
            )}
            <SocialIcon href={youtube || ''}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
              </svg>
            </SocialIcon>
            <SocialIcon href={linkedin || ''}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </SocialIcon>
            {twitter && (
              <SocialIcon href={twitter}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </SocialIcon>
            )}
            {pinterest && (
              <SocialIcon href={pinterest}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
              </SocialIcon>
            )}
          </div>
        )}

        {/* Contact */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 text-xs font-sans">
          <a href={`tel:${ph.replace(/\s/g, '')}`} className="text-white/40 hover:text-white transition-colors">{ph}</a>
          <a href={`mailto:${em}`} className="text-white/40 hover:text-white transition-colors">{em}</a>
          <span className="text-white/40">{addr}</span>
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

      <LpFooterSection
        logoUrl={lp.footerLogo ? sanityImgUrl(lp.footerLogo, 400) : undefined}
        phone={lp.footerPhone}
        email={lp.footerEmail}
        address={lp.footerAddress}
        instagram={lp.instagramUrl}
        facebook={lp.facebookUrl}
        whatsappSocial={lp.whatsappSocialUrl}
        youtube={lp.youtubeUrl}
        linkedin={lp.linkedinUrl}
        twitter={lp.twitterUrl}
        pinterest={lp.pinterestUrl}
      />

      <LpSticky ctaLabel={lp.heroPrimaryCta || 'Book Free Consultation'} />
    </>
  )
}
