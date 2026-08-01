import type { JsonLdInput } from '@/lib/seo/types/schema'

interface JsonLdProps {
  schemas: JsonLdInput | JsonLdInput[]
}

// Server component — no 'use client' needed.
// Accepts one schema, an array of schemas, or an array of arrays.
export default function JsonLd({ schemas }: JsonLdProps) {
  const flat = (Array.isArray(schemas) ? schemas : [schemas]).flat()
  return (
    <>
      {flat.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  )
}
