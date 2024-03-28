#!/bin/sh

# Set DATABASE_URL from DB_SECRET if available
if [ -n "$DB_SECRET" ]; then
  echo "Using DB_SECRET to set DATABASE_URL..."
  export DATABASE_URL=$(echo $DB_SECRET | jq -r '"postgresql://" + .username + ":" + .password + "@" + .host + ":" + .port + "/" + .dbname')
fi

# Your existing script content
yarn rw build web

# Run Prisma migrations
echo "Running Prisma migrations..."
yarn rw prisma migrate dev

# Seed the database
if [ "$COPILOT_ENVIRONMENT_NAME" = "development" ]; then
  echo "Environment is development. Seeding the database..."
  yarn rw prisma db seed
else
  echo "Environment is not set to development. Skipping database seeding."
fi

# Start the Redwood API server
echo "Starting the Redwood API server..."
exec yarn rw serve api
