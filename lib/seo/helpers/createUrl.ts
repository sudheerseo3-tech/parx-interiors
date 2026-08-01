import { seoConfig } from '../seo.config'

export function createUrl(path = ''): string {
  return `${seoConfig.website}${path}`
}

export function createId(fragment: string): string {
  return `${seoConfig.website}/#${fragment}`
}
