import {defineField, defineType} from 'sanity'

const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
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
        {type: 'contactForm'},
        {type: 'content'},
        {type: 'hero'},
        {type: 'portfolioSwiper'},
        {type: 'sectionTitle'},
      ],
    }),
  ],
})

export default homePage
