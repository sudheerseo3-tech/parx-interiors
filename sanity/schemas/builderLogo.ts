export default {
  name: 'builderLogo',
  title: 'Builder / Developer Logo',
  type: 'document',
  fields: [
    { name: 'name', title: 'Builder Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'logo', title: 'Logo Image', type: 'image', options: { hotspot: true }, validation: (Rule: any) => Rule.required() },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
  orderings: [{ title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
}
