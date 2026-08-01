import { seoConfig } from '../seo.config'

export interface ArticleInput {
  title: string
  description: string
  slug: string
  image?: string
  datePublished: string
  dateModified?: string
  authorName?: string
  keywords?: string[]
  section?: string
}

export function articleSchema(article: ArticleInput) {
  const s = seoConfig
  const url = `${s.website}/blog/${article.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}/#article`,
    headline: article.title,
    description: article.description,
    url,
    image: {
      '@type': 'ImageObject',
      url: article.image || s.ogImage,
      width: 1200,
      height: 630,
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.authorName || s.companyName,
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
    keywords: article.keywords?.join(', ') || s.keywords.join(', '),
    articleSection: article.section || 'Interior Design',
    about: {
      '@type': 'Thing',
      name: 'Interior Design Hyderabad',
    },
  }
}
