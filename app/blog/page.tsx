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
  title: 'Interior Design Ideas & Tips | Parx Interiors Blog',
  description: 'Discover interior design ideas, home décor inspiration, modular kitchen tips, renovation guides and expert advice from Parx Interiors.',
  alternates: { canonical: 'https://www.parxinteriors.com/blog' },
  openGraph: {
    title: 'Interior Design Ideas & Tips | Parx Interiors Blog',
    description: 'Discover interior design ideas, home décor inspiration, modular kitchen tips, renovation guides and expert advice from Parx Interiors.',
    url: 'https://www.parxinteriors.com/blog',
    images: [{ url: 'https://www.parxinteriors.com/og-image.jpg', width: 1200, height: 630 }],
  },
}

const categories = ['All', 'Kitchens', 'Wardrobes', 'Living Room', 'Bedroom', 'Office', 'Tips', 'Materials', 'Trends']

async function getPosts() {
  return sanityFetch<any[]>(`*[_type == "blogPost"] | order(publishedAt desc) { title, slug, category, excerpt, featuredImage, publishedAt }`)
}

function BlogGrid({ posts }: { posts: any[] }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-parx-gray text-lg">Blog posts coming soon!</p>
        <p className="text-parx-gray text-sm mt-2">Content will be published from the Sanity dashboard.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post: any) => (
        <Link key={post.slug?.current} href={`/blog/${post.slug?.current}`}
          className="group border border-parx-border hover:border-parx-red transition-all duration-300">
          <div className="aspect-video bg-parx-light overflow-hidden">
            {post.featuredImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={sanityImageUrl(post.featuredImage, 600)} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-parx-gray text-xs">Blog Image</span>
              </div>
            )}
          </div>
          <div className="p-6">
            <span className="text-parx-red text-[10px] tracking-[0.25em] uppercase">{post.category}</span>
            <h3 className="font-display text-lg text-parx-black font-light mt-2 mb-3 group-hover:text-parx-red transition-colors leading-snug">{post.title}</h3>
            <p className="text-parx-gray text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
            <span className="text-parx-red text-sm mt-4 inline-flex items-center gap-1 group-hover:gap-2 transition-all">Read more →</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <>
      <JsonLd schemas={breadcrumbSchema([{ name: 'Blog', href: '/blog' }])} />
      <NavServer />
      <main>
        <PageHero
          eyebrow="The Parx Journal"
          title={<>Design ideas, tips<br />&amp; <em className="italic text-parx-red">inspiration</em></>}
          subtitle="Expert advice on modular kitchens, wardrobes, home interiors, and everything in between. Curated for Hyderabad homeowners."
        />

        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <BlogGrid posts={posts} />
          </div>
        </section>

        <section className="bg-parx-cream py-16">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="parx-accent-line mx-auto" />
            <h2 className="font-display font-light text-parx-black text-2xl mb-4">Get design tips in your inbox</h2>
            <p className="text-parx-gray text-sm mb-6">Join Hyderabad homeowners who get our weekly interior design tips, trends, and project stories.</p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Your email address"
                className="flex-1 bg-white border border-parx-border px-4 py-3 text-parx-black text-sm focus:border-parx-red outline-none transition-colors" />
              <button className="bg-parx-red hover:bg-parx-red-dark text-white px-6 py-3 text-sm tracking-wide transition-all">Subscribe</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
