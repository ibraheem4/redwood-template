.PHONY: setup-env build up down clean test lint lint-fix install-deps build-docker tag-docker publish-docker

# Variables
DC := docker-compose
DOCKERFILE_PATH := Dockerfile
DOCKER_TAG := stencil-auth0:latest

# ECS variables
AWS_ACCOUNT_ID := 717824651453
AWS_REGION := us-east-1
ECR_REGISTRY := $(AWS_ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com
ECR_REPOSITORY := stencil-auth0
DOCKER_ECS_TAG := $(ECR_REGISTRY)/$(ECR_REPOSITORY):latest

# Primary make command
run: build up

# Setup commands
setup-env-local:
	cp .env.local.example .env

setup-env-docker:
	cp .env.docker.example .env

# Dev & CI commands
build:
	$(DC) -f compose.yml build

up:
	$(DC) -f compose.yml up

down:
	$(DC) -f compose.yml down

clean: down

test:
	$(DC) -f compose.yml exec -T api yarn rw test --no-watch

lint:
	$(DC) -f compose.yml exec -T api yarn rw lint

lint-fix:
	$(DC) -f compose.yml exec -T api yarn rw lint --fix

install-deps:
	$(DC) -f compose.yml exec -T api yarn install --check-cache

# Docker commands for production
build-docker:
	docker build --target web -t "$(DOCKER_TAG)" -f $(DOCKERFILE_PATH) .
	docker build --target api -t "$(DOCKER_TAG)" -f $(DOCKERFILE_PATH) .

tag-docker:
	docker tag "$(DOCKER_TAG)" "$(DOCKER_ECS_TAG)"

publish-docker:
	aws ecr get-login-password --region $(AWS_REGION) | docker login --username AWS --password-stdin $(ECR_REGISTRY)
	docker push "$(DOCKER_ECS_TAG)"
