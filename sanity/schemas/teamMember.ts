export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'role', title: 'Role/Designation', type: 'string' },
    { name: 'bio', title: 'Bio', type: 'text', rows: 3 },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
  orderings: [{ title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
}
