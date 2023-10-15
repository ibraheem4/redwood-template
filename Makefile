.PHONY: up-local up-ci install-deps-ci test-ci lint-ci build-local build-ci setup-env run-local

# Setup commands
setup-env:
	cp .env.example .env

# Dev commands
build-local:
	yarn rw build

up-local:
	yarn rw dev

run-local: build-local up-local

# CI commands
build-ci:
	yarn rw build

up-ci:
	yarn rw dev

install-deps-ci:
	yarn install --check-cache

test-ci:
	yarn rw test --no-watch

lint-ci:
	yarn rw lint
