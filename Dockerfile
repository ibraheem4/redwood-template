# ==
# Base
FROM node:18-alpine as base

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package.json
COPY yarn.lock yarn.lock

COPY redwood.toml redwood.toml
COPY graphql.config.js graphql.config.js

COPY api/package.json ./api/package.json
COPY web/package.json ./web/package.json

ENV HUSKY=0

RUN apk add --update --no-cache openssl1.1-compat

RUN yarn install --immutable --immutable-cache

# ==
# Build
FROM base as builder

COPY api api
COPY web web

RUN yarn rw build api web

# Generate Prisma Client and build the API and web
RUN yarn rw prisma generate

# ==
# Runners

# Runner for the Nginx web server
FROM nginx:alpine AS web

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built web from the builder stage
COPY --from=builder /app/web/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Runner for the API server
FROM node:18-alpine AS api

WORKDIR /app

# Copy everything from the builder stage
COPY --from=builder /app ./

# Copy the entry script
COPY entrypoint.sh /app/entrypoint.sh

# Make sure the entrypoint script is executable
RUN chmod +x /app/entrypoint.sh

EXPOSE 8911

CMD ["/app/entrypoint.sh"]
