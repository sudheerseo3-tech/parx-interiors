import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import PageHero from '@/components/PageHero'
import { sanityFetch, sanityImageUrl } from '@/lib/sanityFetch'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reviews & Testimonials',
  description: 'Read what our clients say about Parx Interiors. 250+ happy homeowners across Hyderabad trust us with their dream interiors.',
}

async function getReviews() {
  return sanityFetch<any[]>(`*[_type == "review"] | order(_createdAt desc) { clientName, location, rating, text, clientPhoto, videoUrl, projectType }`)
}

const fallbackReviews = [
  { clientName: 'Rajesh K.', location: 'Gachibowli', text: 'Parx delivered our 3BHK on time and exactly as the 3D design showed. The modular kitchen is stunning. Highly recommend.', rating: 5, projectType: 'Full Home' },
  { clientName: 'Priya S.', location: 'Kondapur', text: 'Finally found a studio that truly listens. Our wardrobe design is perfect — every inch utilised. Quality is outstanding.', rating: 5, projectType: 'Wardrobe' },
  { clientName: 'Arun Reddy', location: 'Jubilee Hills', text: 'The factory visit convinced us completely. Seeing how they make everything in-house builds total confidence. Worth every rupee.', rating: 5, projectType: 'Full Home' },
  { clientName: 'Sneha M.', location: 'Hitech City', text: 'Our modular kitchen turned out exactly like the 3D render. The soft-close hardware is so satisfying. Great team to work with.', rating: 5, projectType: 'Kitchen' },
  { clientName: 'Vikram P.', location: 'Manikonda', text: 'We compared 5 interior designers before choosing Parx. Best decision — transparent pricing, no hidden costs, delivered on schedule.', rating: 5, projectType: 'Full Home' },
  { clientName: 'Lakshmi R.', location: 'Kukatpally', text: 'The false ceiling and lighting design transformed our living room completely. Mani and team were professional throughout.', rating: 5, projectType: 'False Ceiling' },
]

export default async function ReviewsPage() {
  const sanityReviews = await getReviews()
  const reviews = sanityReviews && sanityReviews.length > 0 ? sanityReviews : fallbackReviews

  const videoReviews = reviews.filter((r: any) => r.videoUrl)
  const textReviews = reviews.filter((r: any) => !r.videoUrl || r.text)

  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Client Reviews"
          title={<>Trusted by<br /><em className="italic text-parx-red">250+ families</em></>}
          subtitle="Don't take our word for it — hear from the families who trusted Parx Interiors with their dream homes."
        />

        <section className="bg-parx-cream py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: '250+', label: 'Happy Clients' },
                { num: '4.9/5', label: 'Average Rating' },
                { num: '14+', label: 'Years of Trust' },
                { num: '98%', label: 'Referral Rate' },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-display text-3xl text-parx-black font-light mb-1">{s.num}</div>
                  <div className="text-parx-gray text-xs tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            {videoReviews.length > 0 && (
              <div className="mb-16">
                <div className="parx-accent-line" />
                <h2 className="font-display font-light text-parx-black text-2xl mb-8">Video Testimonials</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {videoReviews.map((r: any, i: number) => (
                    <div key={i} className="aspect-video overflow-hidden">
                      <iframe src={r.videoUrl.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={`Testimonial by ${r.clientName}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="parx-accent-line" />
              <h2 className="font-display font-light text-parx-black text-2xl mb-8">Client Reviews</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {textReviews.map((r: any, i: number) => (
                  <div key={i} className="border border-parx-border p-8 hover:border-parx-red transition-colors duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-1">
                        {[...Array(r.rating || 5)].map((_, j) => (
                          <span key={j} className="text-parx-red text-sm">★</span>
                        ))}
                      </div>
                      {r.projectType && <span className="text-[10px] tracking-[0.2em] text-parx-gray border border-parx-border px-2 py-1 uppercase">{r.projectType}</span>}
                    </div>
                    <p className="font-display text-parx-black font-light italic leading-relaxed text-lg mb-6">&ldquo;{r.text}&rdquo;</p>
                    <div>
                      <div className="text-parx-black text-sm font-medium">{r.clientName}</div>
                      <div className="text-parx-gray text-xs mt-1">{r.location}{r.location && ', '}Hyderabad</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-parx-cream py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-parx-black text-2xl mb-4">See us on Google</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/919177822018?text=Hi%20Parx%20Interiors%2C%20I%20saw%20your%20reviews%20and%20want%20a%20consultation"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-parx-red hover:bg-parx-red-dark text-white px-6 py-3 text-sm tracking-wide transition-all">
                Get Free Consultation →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
