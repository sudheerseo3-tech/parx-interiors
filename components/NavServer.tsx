import Nav from './Nav'

const PROJECT_ID = 'dx9xg01d'
const DATASET = 'production'

function imgUrl(image: any) {
  if (!image?.asset?._ref) return ''
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}?w=400&auto=format`
}

async function getLogoUrl(): Promise<string | undefined> {
  try {
    const query = encodeURIComponent('*[_type == "siteSettings"][0]{ logo }')
    const res = await fetch(
      `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`,
      { next: { revalidate: 3600 } } // cache for 1 hour
    )
    const data = await res.json()
    return data.result?.logo ? imgUrl(data.result.logo) : undefined
  } catch {
    return undefined
  }
}

export default async function NavServer() {
  const logoUrl = await getLogoUrl()
  return <Nav logoUrl={logoUrl} />
}
