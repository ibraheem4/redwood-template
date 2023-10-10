import { clerkAuthDecoder as authDecoder } from '@redwoodjs/auth-clerk-api'
import { createGraphQLHandler } from '@redwoodjs/graphql-server'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { getCurrentUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = createGraphQLHandler({
  authDecoder,
  getCurrentUser,
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,
  cors: {
    origin: [
      process.env.REDWOOD_WEB_URL,
      'http://localhost:7910',
      'http://localhost:8910',
    ],
    credentials: true,
  },
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
