#!/bin/sh

cd /app # Navigate to the correct directory

# Run Prisma migrations (if needed in production)
yarn rw prisma migrate deploy

# Start the Redwood API server
exec yarn rw serve api
