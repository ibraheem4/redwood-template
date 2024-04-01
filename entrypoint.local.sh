#!/bin/sh

# Set DATABASE_URL from DB_SECRET if available
echo "DB_SECRET: $DB_SECRET"
if [ -n "$DB_SECRET" ]; then
  echo "Using DB_SECRET to set DATABASE_URL..."
  export DATABASE_URL=$(echo $DB_SECRET | jq -r '"postgresql://" + .username + ":" + .password + "@" + .host + ":" + .port + "/" + .dbname')
  echo "DATABASE_URL: $DATABASE_URL"
else
  echo "DB_SECRET not found"
fi

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
