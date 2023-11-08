.PHONY: up-local up-ci install-deps-ci test-ci lint-ci build-local down-local build-ci down-ci clean-local build-docker tag-docker publish-docker setup-env run-local

# Variables
DC_CI := docker compose -f compose.yml -f compose.ci.yml
DC_LOCAL := docker compose -f compose.yml -f compose.local.yml
DOCKER_TAG_WEB := stencil-auth0-web:latest
DOCKER_TAG_API := stencil-auth0-api:latest
DOCKERFILE_PATH_WEB := Dockerfile.web
DOCKERFILE_PATH_API := Dockerfile.api

# ECS variables
ECR_REGISTRY := 717824651453.dkr.ecr.us-east-1.amazonaws.com
ECR_WEB_REPOSITORY := stencil-auth0/web
ECR_API_REPOSITORY := stencil-auth0/api
DOCKER_ECS_TAG_WEB := $(ECR_REGISTRY)/$(ECR_WEB_REPOSITORY):latest
DOCKER_ECS_TAG_API := $(ECR_REGISTRY)/$(ECR_API_REPOSITORY):latest

# Setup commands
setup-env:
	cp .env.example .env

# Dev commands
build-local:
	$(DC_LOCAL) build

up-local:
	$(DC_LOCAL) up

down-local:
	$(DC_LOCAL) down

run-local: build-local up-local

clean-local: down-local

# CI commands
build-ci:
	$(DC_CI) build

down-ci:
	$(DC_CI) down

clean-ci: down-ci

up-ci:
	$(DC_CI) up -d

install-deps-ci:
	$(DC_CI) exec -T api yarn install --check-cache

test-ci:
	$(DC_CI) exec -T api yarn rw test --no-watch

lint-ci:
	$(DC_CI) exec -T api yarn rw lint

# Docker commands
build-docker:
	docker build --target web -t "$(DOCKER_TAG_WEB)" -f $(DOCKERFILE_PATH_WEB) .
	docker build --target api -t "$(DOCKER_TAG_API)" -f $(DOCKERFILE_PATH_API) .

tag-docker:
	docker tag "$(DOCKER_TAG_WEB)" "$(DOCKER_ECS_TAG_WEB)"
	docker tag "$(DOCKER_TAG_API)" "$(DOCKER_ECS_TAG_API)"

publish-docker:
	aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $(ECR_REGISTRY)
	docker push "$(DOCKER_ECS_TAG_WEB)"
	docker push "$(DOCKER_ECS_TAG_API)"
