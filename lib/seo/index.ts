// Config
export { seoConfig } from './seo.config'

// Schemas
export { organizationSchema } from './schemas/organization'
export { localBusinessSchema } from './schemas/localBusiness'
export { websiteSchema } from './schemas/website'
export { breadcrumbSchema } from './schemas/breadcrumb'
export { serviceSchema, allServicesSchema } from './schemas/service'
export { faqSchema } from './schemas/faq'
export { blogPostingSchema } from './schemas/blogPosting'
export { articleSchema } from './schemas/article'
export { personSchema, founderSchema } from './schemas/person'

// Types
export type { SchemaOrg, JsonLdInput } from './types/schema'
export type { ServiceInput } from './types/service'
export type { BlogPostingInput, ArticleInput } from './types/blog'
export type { BreadcrumbItem } from './schemas/breadcrumb'
export type { FaqItem } from './schemas/faq'
export type { PersonInput } from './schemas/person'

// Helpers
export { createAddress } from './helpers/createAddress'
export { createImage } from './helpers/createImage'
export { createUrl, createId } from './helpers/createUrl'
