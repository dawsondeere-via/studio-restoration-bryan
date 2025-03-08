import {defineField, defineType} from 'sanity'
import CustomPreview from './CustomPreview'

const content = defineType({
  name: 'content',
  title: 'Content',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      type: 'text',
    }),
  ],
  components: {preview: CustomPreview},
  preview: {
    select: {
      title: 'text',
    },
  },
})

export default content
