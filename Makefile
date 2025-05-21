# Build dev
build-dev:
	docker compose -f docker-compose.dev.yml build --no-cache

up-dev:
	docker compose -f docker-compose.dev.yml up -d

down-dev:
	docker compose -f docker-compose.dev.yml down

restart-dev:
	docker compose -f docker-compose.dev.yml down
	docker compose -f docker-compose.dev.yml up -d

down-dev:
	docker compose -f docker-compose.dev.yml down

# Build prod
build-prod:
	docker compose -f docker-compose.prod.yml build --no-cache

up-prod:
	docker compose -f docker-compose.prod.yml up -d

down-prod:
	docker compose -f docker-compose.prod.yml down

restart-prod:
	docker compose -f docker-compose.prod.yml down
	docker compose -f docker-compose.prod.yml up -d