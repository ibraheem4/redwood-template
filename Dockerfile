# Base Builder
FROM node:18 AS builder

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

# Stage 2: Run the web server
FROM nginx:alpine AS web

# Copy built web from the builder stage
COPY --from=builder /app/web/dist /usr/share/nginx/html

EXPOSE 8910

CMD ["nginx", "-g", "daemon off;"]

# Stage 3: Run the API server
FROM node:18 AS api

WORKDIR /app

# Copy everything from the builder stage
COPY --from=builder /app ./

EXPOSE 8911

CMD ["yarn", "rw", "serve", "api"]
