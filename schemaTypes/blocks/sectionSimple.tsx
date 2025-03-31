import {defineField, defineType} from 'sanity'
import {CustomPreview} from '../sanityComponents'

const sectionSimple = defineType({
  name: 'sectionSimple',
  title: 'Section',
  type: 'object',
  fields: [
    defineField({
      name: 'textGroup',
      type: 'textGroup',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'imageAsBackground',
      title: 'Image as Background Image?',
      type: 'boolean',
    }),
  ],
  components: {preview: CustomPreview},
  preview: {
    select: {
      textGroup: 'textGroup',
      image: 'image',
    },
    prepare(selection) {
      const {textGroup, image} = selection
      return {
        title: textGroup.headline,
        subtitle: textGroup.subheadline,
        media: image,
      }
    },
  },
})

export default sectionSimple
