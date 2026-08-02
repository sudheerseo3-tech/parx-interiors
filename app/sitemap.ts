import { MetadataRoute } from 'next'
import { sanityFetch } from '@/lib/sanityFetch'

const BASE = 'https://www.parxinteriors.com'

// Static pages with their crawl priorities and change frequencies.
// priority 1.0 = homepage (most important)
// priority 0.9 = core commercial pages (services, projects)
// priority 0.8 = supporting pages (about, blog, landing pages)
// priority 0.7 = utility pages (contact, faq, calculator, individual posts)
const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE,                                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${BASE}/services`,                      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE}/projects`,                      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${BASE}/about`,                         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/blog`,                          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE}/lp/hyderabad-home-interiors`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/contact`,                       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/faq`,                           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/calculator`,                    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projectRoutes: MetadataRoute.Sitemap = []
  let blogRoutes: MetadataRoute.Sitemap = []

  // Fetch all published project slugs from Sanity.
  // Gracefully skips if Sanity is unreachable during build.
  try {
    const projects = await sanityFetch<{ slug: { current: string }; _updatedAt: string }[]>(
      `*[_type == "project" && defined(slug.current)]{ slug, _updatedAt }`
    )
    projectRoutes = projects.map(p => ({
      url: `${BASE}/projects/${p.slug.current}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch {}

  // Fetch all published blog post slugs from Sanity.
  try {
    const posts = await sanityFetch<{ slug: { current: string }; _updatedAt: string }[]>(
      `*[_type == "blogPost" && defined(slug.current)]{ slug, _updatedAt }`
    )
    blogRoutes = posts.map(p => ({
      url: `${BASE}/blog/${p.slug.current}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch {}

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
