import {defineField, defineType} from 'sanity'
import CustomPreview from './CustomPreview'

const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      type: 'string',
    }),
    defineField({
      name: 'subheadline',
      type: 'string',
    }),
    defineField({
      name: 'text',
      type: 'text',
    }),
    defineField({
      name: 'buttonLabel',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      type: 'string',
      description: 'For internal links, be sure to start with a forward slash (ex. /properties)',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'imageOnLeft',
      title: 'Image on Left?',
      type: 'boolean',
    }),
  ],
  components: {preview: CustomPreview},
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheadline',
      media: 'image',
    },
  },
})

export default hero
