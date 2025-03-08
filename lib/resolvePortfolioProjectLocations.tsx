import {defineLocations} from 'sanity/presentation'

const homePageLocations = defineLocations({
  select: {
    title: 'label',
    slug: 'slug.current',
  },
  resolve: (doc) => ({
    locations: [{title: 'Portfolio', href: '/portfolio'}],
  }),
})

export default homePageLocations
