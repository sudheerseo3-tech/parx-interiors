'use client'
import { useEffect, useState } from 'react'
import { LogoSlider, fallbackBuilderLogos, fallbackBrandLogos } from './LogoSlider'

const PROJECT_ID = 'dx9xg01d'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

async function sanityFetch(query: string) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`
  const res = await fetch(url)
  const data = await res.json()
  return data.result
}

function sanityImageUrl(image: any) {
  if (!image?.asset?._ref) return undefined
  const ref = image.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}`
}

interface SanityLogo {
  name: string
  logo?: any
}

function mapLogos(data: SanityLogo[]) {
  return data.map(item => ({
    name: item.name,
    logo: item.logo ? sanityImageUrl(item.logo) : undefined,
  }))
}

export function BuilderLogosSection() {
  const [logos, setLogos] = useState(fallbackBuilderLogos)

  useEffect(() => {
    sanityFetch('*[_type == "builderLogo"] | order(order asc) { name, logo, order }')
      .then((data: SanityLogo[]) => {
        if (data && data.length > 0) {
          setLogos(mapLogos(data))
        }
      })
      .catch((err) => console.error('Failed to fetch builder logos:', err))
  }, [])

  return (
    <LogoSlider
      items={logos}
      title='<div class="parx-accent-line mx-auto"></div><h2 class="font-display font-light text-parx-black text-2xl md:text-3xl">Homes we&apos;ve <em class="italic text-parx-red">transformed</em></h2><p class="text-parx-gray text-sm mt-3 font-sans">Trusted by residents across Hyderabad&apos;s finest communities</p>'
    />
  )
}

export function BrandLogosSection() {
  const [logos, setLogos] = useState(fallbackBrandLogos)

  useEffect(() => {
    sanityFetch('*[_type == "brandLogo"] | order(order asc) { name, logo, order }')
      .then((data: SanityLogo[]) => {
        if (data && data.length > 0) {
          setLogos(mapLogos(data))
        }
      })
      .catch((err) => console.error('Failed to fetch brand logos:', err))
  }, [])

  return (
    <LogoSlider
      items={logos}
      title='<div class="parx-accent-line mx-auto"></div><h2 class="font-display font-light text-parx-black text-2xl md:text-3xl">Built with <em class="italic text-parx-red">the best</em></h2><p class="text-parx-gray text-sm mt-3 font-sans">Premium materials &amp; hardware trusted by professionals</p>'
      speed="slow"
    />
  )
}
