import NavServer from '@/components/NavServer'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import Link from 'next/link'
import { sanityFetch, sanityImageUrl } from '@/lib/sanityFetch'
import { PortableText } from '@portabletext/react'
import JsonLd from '@/components/JsonLd'
import { blogPostingSchema, articleSchema, breadcrumbSchema } from '@/lib/seo'

async function getPost(slug: string) {
  const posts = await sanityFetch<any[]>(`*[_type == "blogPost" && slug.current == "${slug}"]{ title, slug, category, excerpt, featuredImage, body, seoTitle, seoDescription, publishedAt }`)
  return posts?.[0]
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sanityImageUrl(value, 800)} alt={value.alt || ''} className="w-full rounded" />
        {value.caption && <p className="text-parx-gray text-xs mt-2 text-center italic">{value.caption}</p>}
      </div>
    ),
    youtube: ({ value }: any) => (
      <div className="my-8 aspect-video">
        <iframe src={value.url?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title="YouTube video" />
      </div>
    ),
    instagram: ({ value }: any) => (
      <div className="my-8 flex justify-center">
        <blockquote className="instagram-media" data-instgrm-permalink={value.url} />
      </div>
    ),
    embed: ({ value }: any) => (
      <div className="my-8 aspect-video">
        <iframe src={value.url} className="w-full h-full border-0" allowFullScreen title={value.caption || 'Embed'} />
      </div>
    ),
  },
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    return (
      <>
        <NavServer />
        <main className="bg-white pt-36 pb-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="font-display text-3xl text-parx-black mb-4">Post not found</h1>
            <Link href="/blog" className="text-parx-red">← Back to Blog</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const postImage = post.featuredImage ? sanityImageUrl(post.featuredImage, 1200) : undefined
  const datePublished = post.publishedAt || new Date().toISOString()

  return (
    <>
      <JsonLd schemas={[
        blogPostingSchema({
          title: post.title,
          description: post.excerpt || post.seoDescription || '',
          slug: params.slug,
          image: postImage,
          datePublished,
          keywords: post.category ? [post.category] : undefined,
        }),
        articleSchema({
          title: post.title,
          description: post.excerpt || post.seoDescription || '',
          slug: params.slug,
          image: postImage,
          datePublished,
          section: post.category,
        }),
        breadcrumbSchema([
          { name: 'Blog', href: '/blog' },
          { name: post.title, href: `/blog/${params.slug}` },
        ]),
      ]} />
      <NavServer />
      <main>
        <article className="bg-white pt-36 pb-20">
          <div className="max-w-3xl mx-auto px-6">
            <Link href="/blog" className="text-parx-red text-sm tracking-wide mb-6 inline-flex items-center gap-2 hover:text-parx-black transition-colors">
              ← Back to Blog
            </Link>
            <div className="mt-6 mb-4">
              <span className="text-parx-red text-[10px] tracking-[0.25em] uppercase">{post.category}</span>
            </div>
            <h1 className="font-display font-light text-parx-black text-3xl md:text-5xl mb-6 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-4 text-parx-gray text-sm mb-10">
              <span>By Parx Interiors</span>
              <span>·</span>
              <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
            </div>

            {post.featuredImage && (
              <div className="aspect-video mb-10 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sanityImageUrl(post.featuredImage, 1200)} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            {post.body ? (
              <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-light prose-headings:text-parx-black prose-p:text-parx-gray prose-a:text-parx-red">
                <PortableText value={post.body} components={portableTextComponents} />
              </div>
            ) : (
              <p className="text-parx-gray">Content coming soon.</p>
            )}

            <div className="mt-12 pt-8 border-t border-parx-border flex items-center gap-4">
              <span className="text-parx-gray text-sm">Share:</span>
              {['WhatsApp', 'LinkedIn', 'Facebook', 'Twitter'].map(s => (
                <a key={s} href="#" className="text-parx-gray hover:text-parx-red text-sm transition-colors">{s}</a>
              ))}
            </div>

            <div className="mt-12 border-2 border-parx-red p-8 text-center bg-red-50">
              <h3 className="font-display font-light text-parx-black text-xl mb-3">Ready to transform your space?</h3>
              <a href="https://wa.me/919177822018?text=Hi%2C%20I%20read%20your%20blog%20and%20would%20like%20a%20consultation"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-parx-red hover:bg-parx-red-dark text-white px-6 py-3 text-sm tracking-wide transition-all mt-2">
                Get Free Consultation →
              </a>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
