import {defineField, defineType} from 'sanity'

const portfolioProject = defineType({
  name: 'portfolioProject',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      type: 'string',
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Completed', value: 'completed'},
          {title: 'In progress', value: 'inProgress'},
          {title: 'Not started', value: 'notStarted'},
        ],
      },
    }),
    defineField({
      name: 'text',
      type: 'text',
    }),
    defineField({
      name: 'link',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
  ],
})

export default portfolioProject
