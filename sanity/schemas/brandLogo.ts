export default {
  name: 'brandLogo',
  title: 'Brand / Material Logo',
  type: 'document',
  fields: [
    { name: 'name', title: 'Brand Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'logo', title: 'Logo Image', type: 'image', options: { hotspot: true }, validation: (Rule: any) => Rule.required() },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
  orderings: [{ title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
}
