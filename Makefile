.PHONY: up install-deps storybook test lint build down clean build-docker tag-docker publish-docker setup-env run-local

setup-env:
	cp .env.example .env

build:
	docker-compose -f docker-compose.ci.yml exec -T api yarn rw build

up:
	docker-compose -f docker-compose.yml -f docker-compose.ci.yml up

up-detached:
	docker-compose -f docker-compose.yml -f docker-compose.ci.yml up -d

down:
	docker-compose -f docker-compose.yml -f docker-compose.ci.yml down

install-deps:
	docker-compose -f docker-compose.ci.yml exec -T api yarn install

storybook:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml exec -T api yarn storybook

prisma-studio:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml exec -T api yarn rw prisma studio

test:
	docker-compose -f docker-compose.ci.yml exec -T api yarn rw test web --no-watch

lint:
	docker-compose -f docker-compose.ci.yml exec -T api yarn rw lint

build-docker:
	docker build --target web -t redwood-web-nginx-dev:latest -f Dockerfile.dev .
	docker build --target api -t redwood-api-dev:latest -f Dockerfile.dev .

tag-docker:
	docker tag redwood-web-nginx-dev:latest ibraheem4/redwood-web-nginx-dev:latest
	docker tag redwood-api-dev:latest ibraheem4/redwood-api-dev:latest

publish-docker:
	echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
	docker push ibraheem4/redwood-web-nginx-dev:latest
	docker push ibraheem4/redwood-api-dev:latest

run-local:
	$(MAKE) build
	$(MAKE) up

clean:
	$(MAKE) down
