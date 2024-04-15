# Base Stage
FROM node:20-bookworm-slim AS base

RUN corepack enable

WORKDIR /app

# Define ARGs for sensitive information
ARG SESSION_SECRET
ARG POSTGRES_PASSWORD
ARG DB_SECRET

# Use ARGs to set ENVs for other variables that can derive from sensitive ones
ENV DISABLE_SIGNUP=true \
    REDWOOD_WEB_URL=http://localhost:8910 \
    REDWOOD_API_URL=http://localhost:8911 \
    ENVIRONMENT=development \
    NODE_ENV=development \
    COMPOSE_PROJECT_NAME=stencil-auth0 \
    POSTGRES_DB=stencil_auth0_local \
    POSTGRES_DB_TEST=stencil_auth0_test \
    POSTGRES_USER=postgres \
    DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB} \
    TEST_DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB_TEST} \
    AUTH0_DOMAIN=dev-yckirnadid5fdbrg.us.auth0.com \
    AUTH0_CLIENT_ID=BmFLgyxWH4Xy3MTdMnxI8DIDrIEljVAE \
    AUTH0_REDIRECT_URI=http://localhost:8910 \
    AUTH0_AUDIENCE=https://test.api.appratings.com

COPY package.json yarn.lock redwood.toml graphql.config.js .
COPY api/package.json api/
COPY web/package.json web/
ENV HUSKY=0
RUN apt-get update && \
    apt-get install -y openssl libssl-dev && \
    yarn install --immutable --immutable-cache --parallel && \
    yarn cache clean && \
    rm -rf /var/lib/apt/lists/*

# Build Stage
FROM base AS builder
COPY api/ /app/api/
COPY web/ /app/web/
COPY scripts/ /app/scripts/
RUN yarn global add @redwoodjs/cli && \
    yarn rw build api && \
    yarn rw build web && \
    yarn rw prisma generate

# Runner for the Nginx web server
FROM public.ecr.aws/nginx/nginx:1.19 AS web
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/web/dist .
EXPOSE 8910
CMD ["nginx", "-g", "daemon off;"]

# Runner for the API server
FROM base AS api
WORKDIR /app
RUN apt-get update && apt-get install -y libssl-dev jq
COPY --from=builder /app .
COPY entrypoint.local.sh /app/
RUN chmod +x /app/entrypoint.local.sh
EXPOSE 8911
CMD ["/app/entrypoint.local.sh"]
