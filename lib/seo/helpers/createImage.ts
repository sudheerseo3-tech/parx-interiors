import type { ImageObject } from 'schema-dts'
import { seoConfig } from '../seo.config'

export function createImage(url?: string, width = 1200, height = 630): ImageObject {
  return {
    '@type': 'ImageObject',
    url: url || seoConfig.ogImage,
    width,
    height,
  }
}
