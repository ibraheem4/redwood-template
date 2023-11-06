.PHONY: up-local up-ci install-deps-ci storybook test-ci lint-ci build-local down-local build-ci down-ci clean-local build-docker tag-docker publish-docker setup-env run-local

# Variables
DC_CI := docker compose -f compose.yml -f compose.ci.yml
DC_LOCAL := docker compose -f compose.yml -f compose.local.yml
DOCKER_TAG_WEB := stencil-auth0-web-nginx-local:latest
DOCKER_TAG_API := stencil-auth0-api-local:latest

# ECS variables
ECR_REGISTRY := 717824651453.dkr.ecr.us-east-1.amazonaws.com # e.g., 000000000000.dkr.ecr.us-east-1.amazonaws.com
ECR_WEB_REPOSITORY := stencil-auth0-web
ECR_API_REPOSITORY := stencil-auth0-api
DOCKER_ECS_TAG_WEB := $(ECR_REGISTRY)/$(ECR_WEB_REPOSITORY):latest
DOCKER_ECS_TAG_API := $(ECR_REGISTRY)/$(ECR_API_REPOSITORY):latest

# ECS commands
build-ecs: build-docker

tag-ecs:
	docker tag $(DOCKER_TAG_WEB) $(DOCKER_ECS_TAG_WEB)
	docker tag $(DOCKER_TAG_API) $(DOCKER_ECS_TAG_API)

publish-ecs:
	aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $(ECR_REGISTRY)
	docker push $(DOCKER_ECS_TAG_WEB)
	docker push $(DOCKER_ECS_TAG_API)

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
	docker build --target web -t $(DOCKER_TAG_WEB) -f Dockerfile .
	docker build --target api -t $(DOCKER_TAG_API) -f Dockerfile .

tag-docker:
	docker tag $(DOCKER_TAG_WEB) ibraheem4/$(DOCKER_TAG_WEB)
	docker tag $(DOCKER_TAG_API) ibraheem4/$(DOCKER_TAG_API)

publish-docker:
	echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
	docker push ibraheem4/$(DOCKER_TAG_WEB)
	docker push ibraheem4/$(DOCKER_TAG_API)
