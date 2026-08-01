import type { WithContext, Article } from 'schema-dts'
import { seoConfig } from '../seo.config'
import { createId, createUrl } from '../helpers/createUrl'
import { createImage } from '../helpers/createImage'
import type { ArticleInput } from '../types/blog'

export function articleSchema(article: ArticleInput): WithContext<Article> {
  const url = createUrl(`/blog/${article.slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}/#article`,
    headline: article.title,
    description: article.description,
    url,
    image: createImage(article.image),
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.authorName || seoConfig.companyName,
      url: seoConfig.website,
    },
    publisher: { '@id': createId('organization') } as any,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'en-IN',
    keywords: article.keywords?.join(', ') || seoConfig.keywords.join(', '),
    articleSection: article.section || 'Interior Design',
    about: { '@type': 'Thing', name: 'Interior Design Hyderabad' },
  }
}
