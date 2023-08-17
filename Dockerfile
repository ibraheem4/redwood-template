# Base Builder
FROM node:18-slim AS builder

WORKDIR /app

# Install OpenSSL and other required dependencies
RUN apt-get update && \
    apt-get install -y openssl libssl-dev && \
    rm -rf /var/lib/apt/lists/*

# Copy root package.json, yarn.lock, and redwood.toml
COPY package.json yarn.lock redwood.toml ./
COPY api/package.json ./api/package.json
COPY web/package.json ./web/package.json

ENV HUSKY=0

# Install dependencies for all workspaces
RUN yarn install --network-timeout 1000000

# Copy rest of the files
COPY api ./api
COPY web ./web

# Generate Prisma Client and build the API and web
RUN yarn rw prisma generate
RUN yarn rw build

# Stage 2: Run the Nginx web server
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

# Stage 3: Run the API server
FROM node:18-slim AS api

WORKDIR /app

# Copy everything from the builder stage
COPY --from=builder /app ./

EXPOSE 8911

CMD ["yarn", "rw", "serve", "api"]
