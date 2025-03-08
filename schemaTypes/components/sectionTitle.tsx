import {defineField, defineType} from 'sanity'
import CustomPreview from './CustomPreview'

const sectionTitle = defineType({
  name: 'sectionTitle',
  title: 'Section Title',
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
  ],
  components: {preview: CustomPreview},
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheadline',
    },
  },
})

export default sectionTitle
