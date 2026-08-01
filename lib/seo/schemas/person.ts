import type { WithContext, Person } from 'schema-dts'
import { seoConfig } from '../seo.config'
import { createId } from '../helpers/createUrl'

export interface PersonInput {
  name: string
  jobTitle: string
  description?: string
  image?: string
  sameAs?: string[]
}

export function personSchema(person: PersonInput): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    image: person.image,
    worksFor: { '@id': createId('organization') } as any,
    url: seoConfig.website,
    sameAs: person.sameAs || [],
  }
}

// Pre-built for Parx founder — update details when ready
export function founderSchema(): WithContext<Person> {
  return personSchema({
    name: 'Parx Interiors Founder',
    jobTitle: 'Founder & Lead Designer',
    description: 'Founder of Parx Interiors, Hyderabad\'s premium end-to-end interior design studio with in-house manufacturing.',
    sameAs: Object.values(seoConfig.socialLinks).filter(Boolean) as string[],
  })
}
