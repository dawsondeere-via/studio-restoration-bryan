import {defineConfig, isDev} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {visionTool} from '@sanity/vision'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {media} from 'sanity-plugin-media'

import {schemaTypes} from './schemaTypes'
import {homePageLocations, mainDocuments, menuItemLocations, portfolioProjectLocations} from './lib'

export default defineConfig({
  name: 'default',
  title: 'Restoration Bryan', // !!

  projectId: '2ynddnto', // !!
  dataset: 'production',

  plugins: [
    structureTool({name: 'content', title: 'Content'}),
    presentationTool({
      resolve: {
        mainDocuments: mainDocuments,
        locations: {
          homePage: homePageLocations,
          menuItem: menuItemLocations,
          portfolioProject: portfolioProjectLocations,
        },
      },
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      name: 'preview',
      title: 'Preview',
    }),
    media(),
    unsplashImageAsset(),
    ...(isDev ? [visionTool({name: 'queries', title: 'Queries'})] : []),
  ],

  schema: {
    types: schemaTypes,
  },

  scheduledPublishing: {
    enabled: !isDev,
  },
})
