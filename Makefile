.PHONY: docker-up install-deps start-dev generate-scaffold storybook test lint build docker-down clean

build:
  docker-compose -f docker-compose.ci.yml exec -T api yarn rw build

docker-up:
	docker-compose -f docker-compose.yml -f docker-compose.ci.yml up

docker-up-detached:
	docker-compose -f docker-compose.yml -f docker-compose.ci.yml up -d

docker-down:
	docker-compose -f docker-compose.yml -f docker-compose.ci.yml down

install-deps:
	docker-compose -f docker-compose.ci.yml exec -T api yarn install

start-dev:
	docker-compose -f docker-compose.ci.yml exec -T api yarn rw dev

generate-scaffold:
	docker-compose -f docker-compose.ci.yml exec -T api yarn rw generate scaffold

storybook:
	docker-compose -f docker-compose.ci.yml exec -T web yarn rw storybook

test:
	docker-compose -f docker-compose.ci.yml exec -T api yarn rw test --no-watch

lint:
	docker-compose -f docker-compose.ci.yml exec -T api yarn rw lint

clean:
	docker-compose -f docker-compose.yml -f docker-compose.ci.yml down -v --remove-orphans
