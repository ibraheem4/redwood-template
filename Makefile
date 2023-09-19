.PHONY: up install-deps storybook test lint build down clean build-docker tag-docker publish-docker setup-env run-local seed

# Variables
DC_CI := docker-compose -f docker-compose.yml -f docker-compose.ci.yml
DC_DEV := docker-compose -f docker-compose.yml -f docker-compose.dev.yml
DOCKER_TAG_WEB := stencil-web-nginx-dev:latest
DOCKER_TAG_API := stencil-api-dev:latest

# Setup commands
setup-env:
	cp .env.example .env

build-ci:
	$(DC_CI) build

up:
	$(DC_CI) up

up-detached:
	$(DC_CI) up -d

down:
	$(DC_CI) down

install-deps:
	$(DC_CI) exec -T api yarn install

test:
	$(DC_CI) exec -T api yarn rw test web --no-watch

lint:
	$(DC_CI) exec -T api yarn rw lint

# Docker commands
build-docker:
	docker build --target web -t $(DOCKER_TAG_WEB) -f Dockerfile.dev .
	docker build --target api -t $(DOCKER_TAG_API) -f Dockerfile.dev .

tag-docker:
	docker tag $(DOCKER_TAG_WEB) ibraheem4/$(DOCKER_TAG_WEB)
	docker tag $(DOCKER_TAG_API) ibraheem4/$(DOCKER_TAG_API)

publish-docker:
	echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
	docker push ibraheem4/$(DOCKER_TAG_WEB)
	docker push ibraheem4/$(DOCKER_TAG_API)

# Dev commands
prisma-studio:
	$(DC_DEV) exec -T api yarn rw prisma studio

seed:
	$(DC_DEV) exec -T api yarn rw prisma db seed

build:
	$(DC_DEV) build

# Local commands
run-local: build up

clean: down
