#!/bin/sh

yarn rw build web

# Run Prisma migrations
echo "Running Prisma migrations..."
yarn rw prisma migrate dev

# Seed the database
if [ "$ENVIRONMENT" = "development" ]; then
  # Seed the database
  echo "Environment is development. Seeding the database..."
  yarn rw prisma db seed
else
  echo "Environment is not set to development. Skipping database seeding."
fi

# Start the Redwood API server
echo "Starting the Redwood API server..."
exec yarn rw serve api
