.PHONY: up-local up-ci install-deps-ci storybook test-ci lint-ci build-local down-local build-ci down-ci clean-local build-docker tag-docker publish-docker setup-env run-local

# Variables
DC_CI := docker compose -f compose.yml -f compose.ci.yml
DC_LOCAL := docker compose -f compose.yml -f compose.local.yml
DOCKER_TAG_WEB := stencil-dbauth-web-nginx-local:latest
DOCKER_TAG_API := stencil-dbauth-api-local:latest

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
