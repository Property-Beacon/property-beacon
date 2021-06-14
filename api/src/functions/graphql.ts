import {
  createGraphQLHandler,
  makeMergedSchema,
  makeServices
} from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { getCurrentUser } from 'src/lib/auth'
import schemas from 'src/graphql/**/*.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

export const handler = createGraphQLHandler({
  getCurrentUser,
  schema: makeMergedSchema({
    schemas,
    services: makeServices({ services })
  }),
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  }
})
