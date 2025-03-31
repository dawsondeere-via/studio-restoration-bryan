import {defineField, defineType} from 'sanity'

const sermon = defineType({
  name: 'sermon',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'scripture',
      type: 'scripture',
      // validation: (rule) => [rule.required()],
    }),
    defineField({
      name: 'sermonSeries',
      title: 'Sermon Series',
      type: 'reference',
      to: [{type: 'sermonSeries'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'speakers',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'speaker'}]}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'video',
      type: 'file',
      options: {accept: 'video/*'},
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Date',
      name: 'date',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      sermonSeriesName: 'sermonSeries.title',
      sermonSeriesImage: 'sermonSeries.image',
    },
    prepare(selection) {
      const {title, date, sermonSeriesName, sermonSeriesImage} = selection
      return {
        title: title,
        subtitle: `${sermonSeriesName} / ${date}`,
        media: sermonSeriesImage,
      }
    },
  },
})

export default sermon
