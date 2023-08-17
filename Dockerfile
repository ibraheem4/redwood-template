###########################################################################################
# Base
###########################################################################################
FROM node:18 as base

WORKDIR /app

# Copy package files and install dependencies
COPY api/package.json ./api/package.json
COPY web/package.json ./web/package.json
COPY package.json .
COPY yarn.lock .
COPY redwood.toml .
COPY graphql.config.js .
ENV HUSKY=0
RUN yarn install

###########################################################################################
# Build
###########################################################################################
FROM base as builder

# Copy the rest of the files
COPY api ./api
COPY web ./web

# Generate Prisma Client and build the API and web
RUN yarn rw prisma generate
RUN yarn rw build

###########################################################################################
# Runner
###########################################################################################

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
FROM node:18 AS api

WORKDIR /app

# Copy everything from the builder stage
COPY --from=builder /app ./

EXPOSE 8911

CMD ["yarn", "rw", "serve", "api"]
