const PROJECT_ID = 'dx9xg01d'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

export async function sanityFetch<T = any>(query: string): Promise<T> {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`
  const res = await fetch(url, { next: { revalidate: 60 } })
  const data = await res.json()
  return data.result
}

export function sanityImageUrl(image: any, width?: number) {
  if (!image?.asset?._ref) return ''
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  const base = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}`
  return width ? `${base}?w=${width}&fit=max&auto=format` : base
}
