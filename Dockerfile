# Base Builder
FROM node:18-slim AS builder

WORKDIR /app

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

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built web from the builder stage
COPY --from=builder /app/web/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Stage 3: Run the API server
FROM node:18-slim AS api

WORKDIR /app

# Install OpenSSL
RUN apt-get update && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

# Copy everything from the builder stage
COPY --from=builder /app ./

EXPOSE 8911

CMD ["yarn", "rw", "serve", "api"]
