import NavServer from '@/components/NavServer'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import Link from 'next/link'
import { sanityFetch, sanityImageUrl } from '@/lib/sanityFetch'

async function getProject(slug: string) {
  const projects = await sanityFetch<any[]>(`*[_type == "project" && slug.current == "${slug}"]{ title, slug, category, location, propertyName, bhk, year, description, featuredImage, gallery, videoUrl }`)
  return projects?.[0]
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)

  if (!project) {
    const title = params.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    return (
      <>
        <NavServer />
        <main className="bg-white pt-36 pb-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="font-display text-3xl text-parx-black mb-4">{title}</h1>
            <p className="text-parx-gray mb-6">Project details will be available soon.</p>
            <Link href="/projects" className="text-parx-red">← Back to Projects</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <NavServer />
      <main>
        <section className="bg-parx-cream pt-36 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <Link href="/projects" className="text-parx-red text-sm tracking-wide mb-6 inline-flex items-center gap-2 hover:text-parx-black transition-colors">
              ← Back to Projects
            </Link>
            <h1 className="font-display font-light text-parx-black text-4xl md:text-5xl mt-4 mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-6 text-parx-gray text-sm">
              {project.location && <span>Location: {project.location}</span>}
              {project.category && <span>Type: {project.category}</span>}
              {project.bhk && <span>Size: {project.bhk}</span>}
              {project.year && <span>Year: {project.year}</span>}
              {project.propertyName && <span>Builder: {project.propertyName}</span>}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            {project.description && (
              <p className="text-parx-gray leading-relaxed max-w-3xl mb-12">{project.description}</p>
            )}

            {project.videoUrl && (
              <div className="aspect-video mb-12 overflow-hidden">
                <iframe src={project.videoUrl.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title="Project video" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.featuredImage && (
                <div className="aspect-[4/3] overflow-hidden col-span-full md:col-span-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={sanityImageUrl(project.featuredImage, 1200)} alt={project.title} className="w-full h-full object-cover" />
                </div>
              )}
              {project.gallery?.map((img: any, i: number) => (
                <div key={i} className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={sanityImageUrl(img, 600)} alt={img.alt || `${project.title} - Photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-center gap-4">
              <span className="text-parx-gray text-sm">Share:</span>
              {['WhatsApp', 'Instagram', 'Facebook'].map(s => (
                <a key={s} href="#" className="text-parx-gray hover:text-parx-red text-sm transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-parx-red py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-white text-3xl mb-6">Love this project? Let&apos;s create yours.</h2>
            <a href="https://wa.me/919177822018?text=Hi%2C%20I%20loved%20your%20project%20and%20would%20like%20a%20consultation"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-parx-red hover:bg-parx-cream px-10 py-4 text-sm tracking-[0.15em] uppercase font-medium transition-all">
              Get Free Consultation →
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
