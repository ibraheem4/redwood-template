#!/bin/sh

# Run Prisma migrations
yarn rw prisma migrate dev

# Seed the database
if [ "$ENVIRONMENT" = "development" ]; then
  # Seed the database
  yarn rw prisma db seed
fi

# Start the Redwood API server
exec yarn rw serve api
