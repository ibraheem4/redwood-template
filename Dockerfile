# ==
# Base
# ==
FROM public.ecr.aws/docker/library/node:18.17.1-bookworm-slim as base
WORKDIR /app
COPY package.json yarn.lock redwood.toml graphql.config.js .
COPY api/package.json api/
COPY web/package.json web/
ENV HUSKY=0
RUN apt-get update && \
    apt-get install -y openssl libssl-dev && \
    yarn install --immutable --immutable-cache --parallel && \
    yarn cache clean && \
    rm -rf /var/lib/apt/lists/*

# ==
# Build
# ==
FROM base as builder
COPY api/ /app/api/
COPY web/ /app/web/
COPY scripts/ /app/scripts/
RUN yarn global add @redwoodjs/cli
RUN yarn rw build api
RUN yarn rw build web
RUN yarn rw prisma generate

# ==
# Runners
# ==
# Runner for the Nginx web server
FROM public.ecr.aws/nginx/nginx:1.19 AS web
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/web/dist .
EXPOSE 8910
CMD ["nginx", "-g", "daemon off;"]

# Runner for the API server
FROM public.ecr.aws/docker/library/node:18.17.1-bookworm-slim AS api
WORKDIR /app
RUN apt-get update && apt-get install -y libssl-dev jq
COPY --from=builder /app .
COPY entrypoint.local.sh /app/
RUN chmod +x /app/entrypoint.local.sh
EXPOSE 8911
CMD ["/app/entrypoint.local.sh"]

# Storybook stage
FROM public.ecr.aws/docker/library/node:18.17.1-bookworm-slim as storybook
WORKDIR /app
COPY . .
RUN yarn install
ENV IS_STORYBOOK=true
CMD ["yarn", "rw", "storybook"]

# Prisma Studio
FROM public.ecr.aws/docker/library/node:18.17.1-bookworm-slim AS prisma-studio
WORKDIR /app
RUN apt-get update && apt-get install -y openssl libssl-dev
COPY --from=builder /app .
EXPOSE 5556
CMD ["yarn", "rw", "prisma", "studio"]
