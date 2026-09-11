.PHONY: setup dev build lint typecheck check clean

# One-command local dev setup: install deps and copy .env if not present
setup:
	npm install
	@if [ ! -f .env.local ]; then \
		cp .env.example .env.local; \
		echo "Created .env.local from .env.example — fill in any required values."; \
	else \
		echo ".env.local already exists, skipping copy."; \
	fi
	@echo ""
	@echo "Setup complete. Run 'make dev' (or 'npm run dev') to start."

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

typecheck:
	npm run typecheck

# Run all CI checks locally
check: lint typecheck build

clean:
	rm -rf .next node_modules
