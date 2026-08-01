import { seoConfig } from '../seo.config'

export interface BlogPostingInput {
  title: string
  description: string
  slug: string
  image?: string
  datePublished: string
  dateModified?: string
  authorName?: string
  keywords?: string[]
}

export function blogPostingSchema(post: BlogPostingInput) {
  const s = seoConfig
  const url = `${s.website}/blog/${post.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}/#blogposting`,
    headline: post.title,
    description: post.description,
    url,
    image: {
      '@type': 'ImageObject',
      url: post.image || s.ogImage,
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      '@type': 'Organization',
      name: post.authorName || s.companyName,
      url: s.website,
    },
    publisher: {
      '@id': `${s.website}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    inLanguage: 'en-IN',
    keywords: post.keywords?.join(', ') || s.keywords.join(', '),
    isPartOf: {
      '@type': 'Blog',
      name: `${s.companyName} Blog`,
      url: `${s.website}/blog`,
    },
  }
}
