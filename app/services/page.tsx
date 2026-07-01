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
