.PHONY: up install-deps storybook test lint build down clean

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

test:
	docker-compose -f docker-compose.ci.yml exec -T api yarn rw test web --no-watch

lint:
	docker-compose -f docker-compose.ci.yml exec -T api yarn rw lint

clean:
	$(MAKE) down
