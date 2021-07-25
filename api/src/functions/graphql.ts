import {
  createGraphQLHandler,
  makeMergedSchema,
  makeServices
} from '@redwoodjs/graphql-server'
import schemas from 'src/graphql/**/*.{js,ts}'
import { getCurrentUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import services from 'src/services/**/*.{js,ts}'

export const handler = createGraphQLHandler({
  getCurrentUser,
  schema: makeMergedSchema({
    schemas,
    services: makeServices({ services })
  }),
  loggerConfig: {
    logger,
    options: {}
  },
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  }
})
