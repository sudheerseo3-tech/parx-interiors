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
