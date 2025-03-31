import {defineField, defineType} from 'sanity'

const topic = defineType({
  name: 'topic',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: (rule) => rule.required(),
    }),
  ],
})

export default topic
