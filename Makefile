# Al-Haram WMS Makefile

# Variables
FRONTEND_DIR = frontend
BACKEND_DIR = backend

# Default target
.DEFAULT_GOAL := help

# Help command
.PHONY: help
help: ## Show available commands
	@echo "Al-Haram WMS - Available Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

# Development commands
.PHONY: dev
dev: ## Start full development environment
	docker-compose -f docker-compose.dev.yml up --build

.PHONY: dev-fe
dev-fe: ## Start frontend development
	cd $(FRONTEND_DIR) && pnpm dev

.PHONY: dev-be
dev-be: ## Start backend development
	cd $(BACKEND_DIR) && pnpm dev

# Production commands
.PHONY: build
build: ## Build production images
	docker-compose build

.PHONY: up
up: ## Start production environment
	docker-compose up -d

.PHONY: down
down: ## Stop all services
	docker-compose down
	docker-compose -f docker-compose.dev.yml down

# Docker development commands
.PHONY: build-dev
build-dev: ## Build development images
	cd $(BACKEND_DIR) && docker build -f Dockerfile.dev -t al-haram-wms-backend:dev .
	cd $(FRONTEND_DIR) && docker build -f Dockerfile.dev -t al-haram-wms-frontend:dev .

.PHONY: run-be-dev
run-be-dev: ## Run backend development container
	docker run -p 8000:8000 -v ./$(BACKEND_DIR)/src:/app/src --name al-haram-wms-backend-dev al-haram-wms-backend:dev

.PHONY: run-fe-dev
run-fe-dev: ## Run frontend development container
	docker run -p 3000:3000 -v ./$(FRONTEND_DIR):/app --name al-haram-wms-frontend-dev al-haram-wms-frontend:dev

.PHONY: stop-dev
stop-dev: ## Stop development containers
	docker stop al-haram-wms-backend-dev al-haram-wms-frontend-dev || true
	docker rm al-haram-wms-backend-dev al-haram-wms-frontend-dev || true

# Utility commands
.PHONY: install
install: ## Install dependencies
	cd $(FRONTEND_DIR) && pnpm install
	cd $(BACKEND_DIR) && pnpm install

.PHONY: logs
logs: ## Show logs
	docker-compose logs -f

.PHONY: logs-fe
logs-fe: ## Show frontend logs
	docker logs -f al-haram-wms-frontend-dev

.PHONY: logs-be
logs-be: ## Show backend logs
	docker logs -f al-haram-wms-backend-dev

.PHONY: clean
clean: ## Clean Docker resources
	docker-compose down -v --remove-orphans
	docker-compose -f docker-compose.dev.yml down -v --remove-orphans
	docker system prune -f

.PHONY: reset
reset: clean ## Reset everything
	docker rmi al-haram-wms-backend:dev al-haram-wms-backend al-haram-wms-frontend:dev al-haram-wms-frontend || true
	cd $(FRONTEND_DIR) && rm -rf .next node_modules || true
	cd $(BACKEND_DIR) && rm -rf dist node_modules || true

# Quick commands
.PHONY: quick
quick: install build-dev run-fe-dev ## Quick start development

.PHONY: status
status: ## Show container status
	docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
