.PHONY: setup-env build up down clean test lint lint-fix redwood-studio install-deps-ci build-docker tag-docker publish-docker up-detached build-ci test-ci clean-ci

# Variables
DC := docker compose
DOCKERFILE_PATH := Dockerfile
DOCKER_TAG := stencil-auth0:latest

# ECS variables
AWS_ACCOUNT_ID := 717824651453
AWS_REGION := us-east-1
ECR_REGISTRY := $(AWS_ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com
ECR_REPOSITORY := stencil-auth0
DOCKER_ECS_TAG := $(ECR_REGISTRY)/$(ECR_REPOSITORY):latest

# Set COMPOSE_FILE environment variable for docker compose
export COMPOSE_FILE := compose.yml

# Primary make command
run: build up

# Setup commands
setup-env-local:
	cp .env.local.example .env

setup-env-docker:
	cp .env.docker.example .env

# Dev & CI commands
build:
	$(DC) build

up:
	$(DC) up

down:
	$(DC) down

clean: down

test:
	$(DC) exec -T api yarn rw test

lint:
	$(DC) exec -T api yarn rw lint

lint-fix:
	$(DC) exec -T api yarn rw lint --fix

redwood-studio:
	yarn rw studio

# CI-specific commands
up-detached:
	$(DC) up -d

install-deps-ci:
	$(DC) exec -T api yarn install --check-cache

build-ci:
	$(DC) exec -T api yarn rw build

test-ci:
	$(DC) exec -T api yarn rw test --no-watch

clean-ci:
	$(DC) down --volumes

# Docker commands for production
build-docker:
	docker build --target web -t "$(DOCKER_TAG)" -f $(DOCKERFILE_PATH) .
	docker build --target api -t "$(DOCKER_TAG)" -f $(DOCKERFILE_PATH) .

tag-docker:
	docker tag "$(DOCKER_TAG)" "$(DOCKER_ECS_TAG)"

publish-docker:
	aws ecr get-login-password --region $(AWS_REGION) | docker login --username AWS --password-stdin $(ECR_REGISTRY)
	docker push "$(DOCKER_ECS_TAG)"
