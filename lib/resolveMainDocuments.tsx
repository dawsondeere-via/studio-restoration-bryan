import {defineDocuments} from 'sanity/presentation'

const mainDocuments = defineDocuments([
  {
    route: '/',
    filter: `_type == "homePage" && slug.current == "home"`,
  },
  {
    route: '/:slug',
    filter: `_type == "homePage" && slug.current == $slug`,
  },
])

export default mainDocuments
