import {defineLocations} from 'sanity/presentation'

const homePageLocations = defineLocations({
  select: {
    title: 'label',
    slug: 'slug.current',
  },
  resolve: (doc) => ({
    locations: [{title: doc?.title, href: doc?.slug === 'home' ? '/' : `/${doc?.slug}`}].filter(
      Boolean,
    ),
  }),
})

export default homePageLocations
