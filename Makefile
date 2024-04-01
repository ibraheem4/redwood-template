.PHONY: setup-env build-local up-local down-local run-local clean build-ci up-ci down-ci clean-ci lint-ci install-deps-ci test-ci install-deps-ci build-docker tag-docker publish-docker run dev-services-run

# Variables for basic app
DC := docker compose
DC_CI := docker compose -f compose.yml -f compose.ci.yml
DC_LOCAL := docker compose -f compose.yml -f compose.local.yml
DOCKER_TAG_WEB := stencil-auth0-web:latest
DOCKER_TAG_API := stencil-auth0-api:latest
DOCKERFILE_PATH_WEB := Dockerfile.web
DOCKERFILE_PATH_API := Dockerfile.api

# ECS variables
AWS_ACCOUNT_ID := 717824651453
AWS_REGION := us-east-1
ECR_REGISTRY := $(AWS_ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com
ECR_WEB_REPOSITORY := stencil-auth0/web
ECR_API_REPOSITORY := stencil-auth0/api
DOCKER_ECS_TAG_WEB := $(ECR_REGISTRY)/$(ECR_WEB_REPOSITORY):latest
DOCKER_ECS_TAG_API := $(ECR_REGISTRY)/$(ECR_API_REPOSITORY):latest

# Set COMPOSE_FILE environment variable for docker compose
export COMPOSE_FILE := compose.yml

run: build up

run-local: build-local up-local

# Setup commands
setup-env:
	cp .env.example .env

# Basic App commands
build:
	$(DC) build

up:
	$(DC) up

down:
	$(DC) down

build-local:
	$(DC_LOCAL) build

up-local:
	$(DC_LOCAL) up

down-local:
	$(DC_LOCAL) down

clean: down

# Development Services commands
dev-services-build:
	$(DC_LOCAL) build storybook prisma-studio

dev-services-up:
	$(DC_LOCAL) up storybook prisma-studio

dev-services-down:
	$(DC_LOCAL) down

dev-services-run: dev-services-build dev-services-up

# CI commands
build-ci:
	$(DC_CI) build

up-ci:
	$(DC_CI) up -d

down-ci:
	$(DC_CI) down

clean-ci: down-ci

test-ci:
	$(DC_CI) exec -T api yarn rw test --no-watch

lint-ci:
	$(DC_CI) exec -T api yarn rw lint

lint-ci-fix:
	$(DC_CI) exec -T api yarn rw lint --fix

redwood-studio:
	yarn rw studio

install-deps-ci:
	$(DC_CI) exec -T api yarn install --check-cache

# Docker commands for production deployment
build-docker:
	docker build --target web -t "$(DOCKER_TAG_WEB)" -f $(DOCKERFILE_PATH_WEB) .
	docker build --target api -t "$(DOCKER_TAG_API)" -f $(DOCKERFILE_PATH_API) .

tag-docker:
	docker tag "$(DOCKER_TAG_WEB)" "$(DOCKER_ECS_TAG_WEB)"
	docker tag "$(DOCKER_TAG_API)" "$(DOCKER_ECS_TAG_API)"

publish-docker:
	aws ecr get-login-password --region $(AWS_REGION) | docker login --username AWS --password-stdin $(ECR_REGISTRY)
	docker push "$(DOCKER_ECS_TAG_WEB)"
	docker push "$(DOCKER_ECS_TAG_API)"
