import type { WithContext, BlogPosting } from 'schema-dts'
import { seoConfig } from '../seo.config'
import { createId, createUrl } from '../helpers/createUrl'
import { createImage } from '../helpers/createImage'
import type { BlogPostingInput } from '../types/blog'

export function blogPostingSchema(post: BlogPostingInput): WithContext<BlogPosting> {
  const url = createUrl(`/blog/${post.slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}/#blogposting`,
    headline: post.title,
    description: post.description,
    url,
    image: createImage(post.image),
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      '@type': 'Organization',
      name: post.authorName || seoConfig.companyName,
      url: seoConfig.website,
    },
    publisher: { '@id': createId('organization') } as any,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'en-IN',
    keywords: post.keywords?.join(', ') || seoConfig.keywords.join(', '),
    isPartOf: {
      '@type': 'Blog',
      name: `${seoConfig.companyName} Blog`,
      url: createUrl('/blog'),
    } as any,
  }
}
