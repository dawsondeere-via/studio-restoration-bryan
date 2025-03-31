import {defineField, defineType} from 'sanity'

const menuItem = defineType({
  name: 'menuItem',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'order',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      label: 'label',
      url: 'url',
      order: 'order',
    },
    prepare(selection) {
      const {label, url, order} = selection
      return {
        title: label,
        subtitle: `${url} - Order: ${order}`,
      }
    },
  },
})

export default menuItem
