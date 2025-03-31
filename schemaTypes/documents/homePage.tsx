import {defineField, defineType} from 'sanity'

const homePage = defineType({
  name: 'homePage',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        {type: 'accordion'},
        {type: 'cardGrid'},
        {type: 'divider'},
        {type: 'hero'},
        {type: 'heroSwiper'},
        {type: 'multiColumnContent'},
        {type: 'section'},
      ],
    }),
  ],
  preview: {
    select: {
      label: 'label',
      slug: 'slug',
    },
    prepare(selection) {
      const {label, slug} = selection
      const route = slug.current === 'home' ? '/' : `/${slug.current}`
      return {
        title: label,
        subtitle: `Route: ${route}`,
      }
    },
  },
})

export default homePage
