import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import PageHero from '@/components/PageHero'
import ServicesSplitLayout from '@/components/ServicesSplitLayout'
import JsonLd from '@/components/JsonLd'
import { allServicesSchema, breadcrumbSchema } from '@/lib/seo'
import type { Metadata } from 'next'

const PROJECT_ID = 'dx9xg01d'
const DATASET = 'production'

function imgUrl(image: any, width = 1200) {
  if (!image?.asset?._ref) return ''
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}?w=${width}&auto=format`
}

async function getServices() {
  try {
    const query = encodeURIComponent('*[_type == "service"] | order(order asc){ _id, title, description, image, tag, features }')
    const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`, { next: { revalidate: 60 } })
    const data = await res.json()
    return data.result || []
  } catch {
    return []
  }
}

export const metadata: Metadata = {
  title: 'Interior Design Services in Hyderabad | Parx Interiors',
  description: 'Explore interior design services in Hyderabad including modular kitchens, wardrobes, living rooms, bedrooms and complete turnkey home interiors.',
}

const fallbackServices = [
  { _id: 'modular-kitchens', title: 'Modular Kitchens', tag: 'Most Popular', description: 'Custom-designed modular kitchens manufactured in our own factory. From L-shaped to island kitchens — every cabinet, countertop, and fitting is precision-built to your space.', imageUrl: '', features: ['Soft-close hinges & channels', 'BWP/BWR grade plywood', 'Granite/Quartz countertops', 'Customised to your exact measurements'] },
  { _id: 'wardrobes', title: 'Wardrobes & Walk-in Closets', tag: 'Storage Solutions', description: 'Floor-to-ceiling wardrobes, sliding wardrobes, and walk-in closets designed for the way you actually live. Every inch of space optimised for functionality.', imageUrl: '', features: ['Sliding & hinged options', 'Built-in organisers & accessories', 'Mirror integration', 'Anti-sag construction'] },
  { _id: 'full-home', title: 'Full Home Interiors', tag: 'End-to-End', description: 'Complete interior transformation — living room, bedrooms, kitchen, bathrooms, pooja room. One team handles everything from design to handover.', imageUrl: '', features: ['3D visualisation before execution', 'Civil + woodwork + painting', 'Single point of contact', 'Fixed-price contracts'] },
  { _id: 'office', title: 'Office & Commercial', tag: 'Commercial', description: 'Workspaces that impress clients and energise your team. From cabin layouts to reception areas — designed for productivity and brand image.', imageUrl: '', features: ['Space planning & ergonomics', 'Modular workstations', 'Conference & meeting rooms', 'Fast-track execution'] },
  { _id: 'ceilings', title: 'False Ceilings & Lighting', tag: 'Finishing Touch', description: 'Architectural false ceilings with integrated lighting design that transforms the ambience of any room.', imageUrl: '', features: ['Cove & profile lighting', 'Gypsum & POP options', 'LED integration', 'Clean, seamless finish'] },
  { _id: 'tv-units', title: 'TV Units & Entertainment', tag: 'Living Room', description: 'Custom TV units, entertainment walls, and media consoles designed to be the centrepiece of your living room.', imageUrl: '', features: ['Cable management built-in', 'Backlit panel options', 'Storage + display shelves', 'Custom sizes'] },
]

export default async function ServicesPage() {
  const sanityServices = await getServices()
  const services = (sanityServices.length > 0 ? sanityServices : fallbackServices).map((s: any) => ({
    ...s,
    imageUrl: s.image ? imgUrl(s.image) : (s.imageUrl || ''),
  }))

  return (
    <>
      <JsonLd schemas={[
        ...allServicesSchema(),
        breadcrumbSchema([{ name: 'Services', href: '/services' }]),
      ]} />
      <Nav />
      <main>
        <PageHero
          eyebrow="Our Services"
          title={<>Designed, manufactured<br />&amp; installed — <em className="italic text-parx-red">by us</em></>}
          subtitle="Every service is delivered end-to-end by our own team. No subcontracting, no middlemen — one team, one standard."
        />

        <ServicesSplitLayout services={services} />

        {/* Journey / Process Timeline */}
        <section className="bg-parx-cream py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <div className="parx-accent-line mx-auto" />
              <h2 className="font-display font-light text-parx-black text-3xl md:text-4xl">
                Your journey to a <em className="italic text-parx-red">dream home</em>
              </h2>
              <p className="text-parx-gray mt-4 max-w-md mx-auto text-sm leading-relaxed">
                A transparent, step-by-step process — so you always know what&apos;s happening and what&apos;s next.
              </p>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-parx-border md:-translate-x-px" />

              {[
                {
                  num: '01', title: 'Free Consultation', desc: 'We begin with a detailed conversation — your space, your lifestyle, your budget. Our designer visits your home and understands every requirement before a single line is drawn.',
                  illustration: (
                    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      {/* Two people at a table */}
                      <rect x="60" y="90" width="80" height="40" rx="2" stroke="#C8102E" strokeWidth="1.5"/>
                      <line x1="60" y1="110" x2="140" y2="110" stroke="#C8102E" strokeWidth="1"/>
                      <line x1="90" y1="90" x2="90" y2="130" stroke="#C8102E" strokeWidth="1"/>
                      {/* Person 1 */}
                      <circle cx="50" cy="65" r="12" stroke="#1A1A1A" strokeWidth="1.5"/>
                      <path d="M30 130 Q50 100 70 120" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
                      {/* Person 2 */}
                      <circle cx="150" cy="65" r="12" stroke="#1A1A1A" strokeWidth="1.5"/>
                      <path d="M130 130 Q150 100 170 120" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
                      {/* Speech bubble */}
                      <rect x="100" y="30" width="60" height="28" rx="4" stroke="#C8102E" strokeWidth="1.5"/>
                      <path d="M115 58 L110 68 L122 58" stroke="#C8102E" strokeWidth="1.5" strokeLinejoin="round"/>
                      <line x1="112" y1="40" x2="148" y2="40" stroke="#C8102E" strokeWidth="1"/>
                      <line x1="112" y1="48" x2="140" y2="48" stroke="#C8102E" strokeWidth="1"/>
                    </svg>
                  )
                },
                {
                  num: '02', title: 'Design & 3D Visualisation', desc: 'Our team creates a complete 3D render of your space so you can see exactly how it will look. You approve every detail — colours, materials, layout — before execution begins.',
                  illustration: (
                    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      {/* Blueprint paper */}
                      <rect x="40" y="20" width="120" height="100" rx="2" stroke="#C8102E" strokeWidth="1.5" fill="#C8102E" fillOpacity="0.04"/>
                      {/* Room layout lines */}
                      <rect x="55" y="35" width="90" height="70" stroke="#C8102E" strokeWidth="1"/>
                      <line x1="55" y1="75" x2="100" y2="75" stroke="#C8102E" strokeWidth="0.8"/>
                      <line x1="100" y1="35" x2="100" y2="105" stroke="#C8102E" strokeWidth="0.8"/>
                      {/* Door arc */}
                      <path d="M55 85 Q65 85 65 75" stroke="#1A1A1A" strokeWidth="1" fill="none"/>
                      {/* Window */}
                      <line x1="115" y1="35" x2="135" y2="35" stroke="#1A1A1A" strokeWidth="2"/>
                      {/* Ruler */}
                      <rect x="30" y="130" width="140" height="12" rx="1" stroke="#1A1A1A" strokeWidth="1"/>
                      {[0,1,2,3,4,5,6].map(t => (
                        <line key={t} x1={30 + t*20} y1="130" x2={30 + t*20} y2={t % 2 === 0 ? "136" : "133"} stroke="#1A1A1A" strokeWidth="1"/>
                      ))}
                      {/* Pencil */}
                      <path d="M155 25 L165 15 L172 22 L162 32 Z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round"/>
                      <line x1="162" y1="32" x2="158" y2="36" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )
                },
                {
                  num: '03', title: 'Transparent Quote', desc: 'You receive a fixed, itemised quote. What we quote is what you pay — no hidden charges, no last-minute additions. You know the exact cost before anything begins.',
                  illustration: (
                    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      {/* Document */}
                      <rect x="55" y="15" width="90" height="115" rx="3" stroke="#1A1A1A" strokeWidth="1.5"/>
                      <path d="M55 35 L145 35" stroke="#C8102E" strokeWidth="1"/>
                      {/* Lines of text */}
                      {[50, 62, 74, 86, 98].map(y => (
                        <line key={y} x1="68" y1={y} x2="132" y2={y} stroke="#1A1A1A" strokeWidth="0.8" strokeDasharray="3 2"/>
                      ))}
                      {/* Price amounts on right */}
                      {[50, 62, 74, 86, 98].map(y => (
                        <line key={y+'r'} x1="118" y1={y} x2="132" y2={y} stroke="#C8102E" strokeWidth="1.2"/>
                      ))}
                      {/* Total line */}
                      <line x1="68" y1="112" x2="132" y2="112" stroke="#1A1A1A" strokeWidth="1.5"/>
                      <line x1="118" y1="118" x2="132" y2="118" stroke="#C8102E" strokeWidth="2"/>
                      {/* Tick/checkmark */}
                      <circle cx="80" cy="24" r="7" stroke="#C8102E" strokeWidth="1.5"/>
                      <path d="M76 24 L79 27 L85 21" stroke="#C8102E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )
                },
                {
                  num: '04', title: 'Factory Manufacturing', desc: 'Every piece is manufactured in our own facility under strict quality control. No outsourcing, no subcontracting — factory-precision means consistent quality across your entire home.',
                  illustration: (
                    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      {/* Factory building */}
                      <rect x="30" y="70" width="140" height="70" stroke="#1A1A1A" strokeWidth="1.5"/>
                      {/* Roof sawtooth */}
                      <path d="M30 70 L55 40 L80 70 L105 40 L130 70 L155 40 L170 70" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round"/>
                      {/* Windows */}
                      <rect x="45" y="85" width="20" height="20" stroke="#C8102E" strokeWidth="1.2"/>
                      <rect x="90" y="85" width="20" height="20" stroke="#C8102E" strokeWidth="1.2"/>
                      <rect x="135" y="85" width="20" height="20" stroke="#C8102E" strokeWidth="1.2"/>
                      {/* Door */}
                      <rect x="83" y="115" width="34" height="25" stroke="#1A1A1A" strokeWidth="1.2"/>
                      {/* Chimney smoke */}
                      <rect x="58" y="35" width="8" height="20" stroke="#1A1A1A" strokeWidth="1"/>
                      <path d="M58 35 Q55 25 62 18 Q68 11 65 5" stroke="#1A1A1A" strokeWidth="1" strokeDasharray="2 2" fill="none"/>
                    </svg>
                  )
                },
                {
                  num: '05', title: 'Installation', desc: 'Our trained team handles every fitting, electrical coordination, and finishing detail on-site. We work to a committed timeline so your home is ready when promised.',
                  illustration: (
                    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      {/* Cabinet being installed */}
                      <rect x="60" y="40" width="80" height="90" rx="2" stroke="#1A1A1A" strokeWidth="1.5"/>
                      <line x1="60" y1="85" x2="140" y2="85" stroke="#1A1A1A" strokeWidth="1"/>
                      <line x1="100" y1="40" x2="100" y2="130" stroke="#1A1A1A" strokeWidth="1"/>
                      {/* Handles */}
                      <line x1="82" y1="65" x2="82" y2="75" stroke="#C8102E" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="118" y1="65" x2="118" y2="75" stroke="#C8102E" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="82" y1="100" x2="82" y2="110" stroke="#C8102E" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="118" y1="100" x2="118" y2="110" stroke="#C8102E" strokeWidth="2" strokeLinecap="round"/>
                      {/* Screwdriver */}
                      <line x1="150" y1="20" x2="168" y2="55" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M148 18 L155 14 L170 52 L163 56 Z" stroke="#C8102E" strokeWidth="1.2" fill="none"/>
                      {/* Worker person */}
                      <circle cx="35" cy="55" r="10" stroke="#1A1A1A" strokeWidth="1.5"/>
                      <path d="M25 120 Q35 90 45 100" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="35" y1="65" x2="55" y2="80" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )
                },
                {
                  num: '06', title: 'Handover & After-Sales Care', desc: 'We do a complete walkthrough before handover. Every detail checked and signed off. After you move in, our team stays available — full support for any queries or adjustments.',
                  illustration: (
                    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      {/* House */}
                      <path d="M60 90 L100 45 L140 90" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round"/>
                      <rect x="65" y="90" width="70" height="50" stroke="#1A1A1A" strokeWidth="1.5"/>
                      {/* Door */}
                      <rect x="85" y="110" width="30" height="30" stroke="#C8102E" strokeWidth="1.2"/>
                      {/* Window */}
                      <rect x="72" y="97" width="18" height="16" stroke="#C8102E" strokeWidth="1"/>
                      <line x1="81" y1="97" x2="81" y2="113" stroke="#C8102E" strokeWidth="0.8"/>
                      <line x1="72" y1="105" x2="90" y2="105" stroke="#C8102E" strokeWidth="0.8"/>
                      {/* Key */}
                      <circle cx="155" cy="40" r="14" stroke="#C8102E" strokeWidth="1.5"/>
                      <circle cx="155" cy="40" r="7" stroke="#C8102E" strokeWidth="1"/>
                      <line x1="165" y1="50" x2="178" y2="63" stroke="#C8102E" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="172" y1="60" x2="178" y2="56" stroke="#C8102E" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="175" y1="63" x2="180" y2="59" stroke="#C8102E" strokeWidth="1.5" strokeLinecap="round"/>
                      {/* Star/sparkle for care */}
                      <path d="M35 35 L38 28 L41 35 L48 38 L41 41 L38 48 L35 41 L28 38 Z" stroke="#C8102E" strokeWidth="1.2" fill="none"/>
                      {/* Handshake */}
                      <path d="M25 100 Q40 90 55 95 Q65 98 60 108 Q55 115 45 110 Q35 105 25 112" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                    </svg>
                  )
                },
              ].map((step, i) => {
                const isLeft = i % 2 === 0
                return (
                  <div key={step.num} className="relative mb-8 md:mb-16">

                    {/* Mobile layout: full width card with illustration inside */}
                    <div className="md:hidden ml-14 bg-white border border-parx-border overflow-hidden">
                      {/* Illustration top */}
                      <div className="bg-parx-cream flex items-center justify-center p-6 h-36">
                        <div className="w-full max-w-[180px] h-full opacity-90">
                          {step.illustration}
                        </div>
                      </div>
                      {/* Content bottom */}
                      <div className="p-5">
                        <span className="text-parx-red font-mono text-xs tracking-widest">{step.num}</span>
                        <h3 className="font-display font-light text-parx-black text-xl mt-2 mb-2">{step.title}</h3>
                        <p className="text-parx-gray text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>

                    {/* Desktop layout: alternating left/right */}
                    <div className={`hidden md:flex items-center gap-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                      {/* Content box */}
                      <div className={`w-[calc(50%-2.5rem)] bg-white border border-parx-border p-8 ${isLeft ? 'mr-10' : 'ml-10'}`}>
                        <span className="text-parx-red font-mono text-xs tracking-widest">{step.num}</span>
                        <h3 className="font-display font-light text-parx-black text-2xl mt-2 mb-3">{step.title}</h3>
                        <p className="text-parx-gray text-sm leading-relaxed">{step.desc}</p>
                      </div>

                      {/* Illustration */}
                      <div className={`w-[calc(50%-2.5rem)] flex items-center justify-center ${isLeft ? 'ml-10' : 'mr-10'}`}>
                        <div className="w-44 h-36 opacity-85">
                          {step.illustration}
                        </div>
                      </div>
                    </div>

                    {/* Circle on the vertical line */}
                    <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-8 w-4 h-4 rounded-full bg-white border-2 border-parx-red -translate-x-[7px] md:translate-x-0 z-10" />
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-parx-red py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-white text-3xl md:text-4xl mb-8">
              Not sure what you need?<br /><em className="italic">Let&apos;s figure it out together.</em>
            </h2>
            <a href="https://wa.me/919177822018?text=Hi%20Parx%20Interiors%2C%20I%20need%20help%20choosing%20the%20right%20service"
              target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-white text-parx-red hover:bg-parx-cream pl-7 pr-2.5 py-2.5 text-[14px] tracking-[0.5px] rounded-full font-medium transition-all duration-300">
              Free Consultation
              <span className="w-9 h-9 rounded-full bg-parx-red/10 flex items-center justify-center group-hover:bg-parx-red/20 group-hover:rotate-[-35deg] transition-all duration-300">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
