import {defineField, defineType} from 'sanity'
import CustomPreview from './CustomPreview'

const portfolioSwiper = defineType({
  name: 'portfolioSwiper',
  title: 'Portfolio Swiper',
  type: 'object',
  fields: [
    defineField({
      name: 'show',
      type: 'string',
      options: {
        list: [
          {title: 'All projects', value: 'all'},
          {title: 'Started projects', value: 'started'},
          {title: 'Completed projects', value: 'completed'},
        ],
      },
    }),
  ],
  components: {preview: CustomPreview},
  preview: {
    select: {
      show: 'show',
    },
    prepare(selection) {
      const {show} = selection
      return {
        title: 'Portfolio Swiper',
        subtitle: `Showing ${show} projects`,
      }
    },
  },
})

export default portfolioSwiper
