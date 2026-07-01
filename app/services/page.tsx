import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import PageHero from '@/components/PageHero'
import ServicesSplitLayout from '@/components/ServicesSplitLayout'
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
  title: 'Services',
  description: 'Modular kitchens, custom wardrobes, full home interiors, office interiors, false ceilings — all designed and manufactured in-house by Parx Interiors Hyderabad.',
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
                { num: '01', title: 'Free Consultation', desc: 'We begin with a detailed conversation — your space, your lifestyle, your budget. No sales pitch, just listening. Our designer visits your home and understands every requirement before a single line is drawn.' },
                { num: '02', title: 'Design & 3D Visualisation', desc: 'Our team creates a complete 3D render of your space so you can see exactly how it will look before execution begins. You approve every detail — colours, materials, layout — nothing moves forward without your sign-off.' },
                { num: '03', title: 'Transparent Quote', desc: 'You receive a fixed, itemised quote. What we quote is what you pay — no hidden charges, no last-minute additions. You know the exact cost before we begin.' },
                { num: '04', title: 'Factory Manufacturing', desc: 'Every piece of furniture and cabinetry is manufactured in our own facility under strict quality control. No outsourcing, no subcontracting. Factory-precision means consistent quality across your entire home.' },
                { num: '05', title: 'Installation', desc: 'Our trained installation team handles every fitting, electrical coordination, and finishing detail on-site. We work to a committed timeline so your home is ready when promised.' },
                { num: '06', title: 'Handover & After-Sales Care', desc: 'We do a complete walkthrough with you before handover. Every detail is checked and signed off. After you move in, our team remains available — full support for any queries or adjustments.' },
              ].map((step, i) => {
                const isLeft = i % 2 === 0
                return (
                  <div key={step.num} className={`relative flex items-start gap-6 md:gap-0 mb-12 md:mb-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Content box */}
                    <div className={`ml-16 md:ml-0 md:w-[calc(50%-2.5rem)] bg-white border border-parx-border p-6 md:p-8 ${isLeft ? 'md:mr-10' : 'md:ml-10'} md:mb-12`}>
                      <span className="text-parx-red font-mono text-xs tracking-widest">{step.num}</span>
                      <h3 className="font-display font-light text-parx-black text-xl md:text-2xl mt-2 mb-3">{step.title}</h3>
                      <p className="text-parx-gray text-sm leading-relaxed">{step.desc}</p>
                    </div>

                    {/* Circle on the line */}
                    <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-parx-red mt-6 -translate-x-[7px] md:translate-x-0" />
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
