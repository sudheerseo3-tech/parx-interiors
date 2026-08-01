import type { Thing, WithContext } from 'schema-dts'

// A single rendered schema block
export type SchemaOrg = WithContext<Thing>

// What JsonLd component accepts — one or many schemas
export type JsonLdInput = SchemaOrg | SchemaOrg[]
