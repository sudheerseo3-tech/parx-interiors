import NavServer from '@/components/NavServer'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import PageHero from '@/components/PageHero'
import Link from 'next/link'
import { sanityFetch, sanityImageUrl } from '@/lib/sanityFetch'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Interior Design Projects in Hyderabad | Parx Interiors',
  description: 'Explore completed interior design projects by Parx Interiors featuring premium apartments, villas and customized home interiors across Hyderabad.',
  alternates: { canonical: 'https://www.parxinteriors.com/projects' },
  openGraph: {
    title: 'Interior Design Projects in Hyderabad | Parx Interiors',
    description: 'Explore completed interior design projects by Parx Interiors featuring premium apartments, villas and customized home interiors across Hyderabad.',
    url: 'https://www.parxinteriors.com/projects',
    images: [{ url: 'https://www.parxinteriors.com/og-image.jpg', width: 1200, height: 630 }],
  },
}

async function getProjects() {
  return sanityFetch<any[]>(`*[_type == "project"] | order(_createdAt desc) { title, slug, category, location, featuredImage }`)
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      <JsonLd schemas={breadcrumbSchema([{ name: 'Projects', href: '/projects' }])} />
      <NavServer />
      <main>
        <PageHero
          eyebrow="Our Projects"
          title={<>250+ homes transformed<br /><em className="italic text-parx-red">across Hyderabad</em></>}
          subtitle="From compact 2BHKs to sprawling villas — explore the spaces we've designed and built for families just like yours."
        />

        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            {projects && projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((p: any) => (
                  <Link key={p.slug?.current} href={`/projects/${p.slug?.current}`}
                    className="group relative overflow-hidden bg-parx-light">
                    <div className="aspect-[4/3] overflow-hidden">
                      {p.featuredImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={sanityImageUrl(p.featuredImage, 600)} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-parx-light flex items-center justify-center">
                          <span className="text-parx-gray text-xs">Project Photo</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-parx-black/60 to-transparent z-10" />
                      <div className="absolute inset-0 bg-parx-red/10 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                      <div className="text-parx-red text-[10px] tracking-[0.25em] uppercase mb-1">{p.category}{p.location ? ` · ${p.location}` : ''}</div>
                      <div className="font-display text-lg text-white font-light">{p.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-parx-gray text-lg">Projects coming soon!</p>
                <p className="text-parx-gray text-sm mt-2">Upload projects from the Sanity dashboard.</p>
              </div>
            )}
          </div>
        </section>

        <section className="bg-parx-red py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-white text-3xl mb-6">Want your home on this wall?</h2>
            <a href="https://wa.me/919177822018?text=Hi%20Parx%20Interiors%2C%20I%20saw%20your%20projects%20and%20would%20like%20a%20consultation"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-parx-red hover:bg-parx-cream px-10 py-4 text-sm tracking-[0.15em] uppercase font-medium transition-all">
              Start Your Project →
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
