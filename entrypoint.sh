#!/bin/sh

# Run Prisma migrations
yarn rw prisma migrate dev

# Seed the database
yarn rw prisma db seed

# Start the Redwood API server
exec yarn rw serve api
