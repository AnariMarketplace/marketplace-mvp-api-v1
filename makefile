# Make sure these targets don't conflict with any files named the same.
.PHONY: help start-local stop-local sam-build supabase-start drizzle-generate drizzle-migrate

RED    := \033[31m
GREEN  := \033[32m
YELLOW := \033[33m
BLUE   := \033[34m
MAGENTA:= \033[35m
CYAN   := \033[36m
WHITE  := \033[37m
RESET  := \033[0m
BOLD  := \033[1m

# A "help" target is often handy so team members can quickly see the available targets.
help:
	@echo "Available targets:"
	@echo "  make start-local  - Build + start local environment"
	@echo "  make stop-local   - Stop local environment (Supabase)"
	@echo "  make sam-build    - Build AWS SAM"
	@echo "  make supabase-start"
	@echo "  make drizzle-generate"
	@echo "  make drizzle-migrate"

# Break down your larger operations into smaller tasks:
sam-build:
	@echo "Building SAM..."
	samlocal build

supabase-start:
	@echo "Starting Supabase..."
	supabase start

drizzle-generate:
	@echo "Generating Drizzle migrations..."
	npx drizzle-kit generate --config=drizzle.local.config.ts

drizzle-migrate:
	@echo "Running Drizzle migrations..."
	npx drizzle-kit migrate --config=drizzle.local.config.ts

connect-stripe:
	@echo "Connecting to Stripe with dev-cli access"
	stripe login --api-key rk_test_51QiMYvGUPCXDYpQ6h5AHlbDs6SkQPv0kpsBDuDla9cmAQ8lIUaHiKmRAadmIHEzE2FpKejjKf4P1ABZOUtoDOMUt001XRwXuBY

setup-stripe:
	@echo "Setting up Stripe services"
	stripe listen --events payment_intent.created,customer.created,payment_intent.succeeded,checkout.session.completed,payment_intent.payment_failed \
  --forward-to http://localhost:3000/payment-service/webhook
# Now combine the tasks for "start-local":
start-sam:
	@echo "Starting SAM local API..."
	sam  start-api

start-localstack: 
	# localstack auth set-token ls-KijAlAfo-9192-suje-4729-SoPiGAkU7da5;
	docker run -d --rm -it -p 4566:4566 -p 4510-4559:4510-4559 -v /var/run/docker.sock:/var/run/docker.sock localstack/localstack
	samlocal local start-api

sam-local-stack:
	samlocal local start-api

start-local-sam: sam-build supabase-start drizzle-generate drizzle-migrate start-sam 
start-local: sam-build supabase-start sam-local-stack
start-local-full: sam-build supabase-start drizzle-generate drizzle-migrate sam-local-stack

local-deploy:
	serverless deploy --stage local --region us-west-2 --config serverless.yaml
prod-deploy:
	serverless deploy --stage production --region us-west-2
stop-local:
	@echo "Stopping Supabase..."
	npx supabase stop --no-backup

serv-local:
	serverless deploy --stage local --region us-west-2

serv-prod:
	serverless deploy --stage production --region us-west-2

serv-dev:
	serverless deploy --stage dev --region us-west-2

stripe-docker-cli:
	docker run --rm -it stripe/stripe-cli listen \
    --api-key rk_test_51QiMYvGUPCXDYpQ6h5AHlbDs6SkQPv0kpsBDuDla9cmAQ8lIUaHiKmRAadmIHEzE2FpKejjKf4P1ABZOUtoDOMUt001XRwXuBY



open-browser:
	@if [ "$$(uname)" = "Darwin" ]; then \
	  echo "Detected macOS. Opening supabase studio..."; \
	  open "http://localhost:54323/"; \
	elif [ "$$(uname)" = "Linux" ]; then \
	  echo "Detected Linux. Opening supabase studio..."; \
	  xdg-open "http://localhost:54323/"; \
	else \
	  echo "Unsupported OS. Please open http://localhost:54323/ manually."; \
	fi




init-locals:
	@echo "$(BLUE)Initializing local services🛠️...$(RESET)"
	@echo "$(MAGENTA)Starting localstack container...$(RESET)"
	docker run -d --rm -it -p 4566:4566 -p 4510-4559:4510-4559 -v /var/run/docker.sock:/var/run/docker.sock localstack/localstack;
	@echo "$(GREEN)Localstack container started...$(RESET)"
	@echo "$(MAGENTA)Deploying cloud infrastructure locally...$(RESET)"
	serverless deploy --stage local --region us-west-2;
	@echo "$(GREEN)localstack container started...$(RESET)"
	@echo "$(MAGENTA)Starting local database...$(RESET)"
	npx supabase start;
	@echo "$(GREEN)Database locally running...$(RESET)"
	@echo "$(MAGENTA)Migrating local database schema...$(RESET)"
	# npx drizzle-kit generate --config=drizzle.local.config.ts
	npx drizzle-kit migrate --config=drizzle.local.config.ts
	@echo "$(GREEN)Migration complete...$(RESET)"
# 	@echo "$(MAGENTA)Migrating local database schema...$(RESET)"
# 	stripe listen --events payment_intent.created,customer.created,payment_intent.succeeded,checkout.session.completed,payment_intent.payment_failed \
#   --forward-to http://localhost:3000/payment-service/webhook
	@echo "$(GREEN)All services deployed successfully🚀...$(RESET)"
	@echo "💫 Access Supabase studio -> $(BOLD)$(BLUE)http://localhost:54323/$(RESET)"

deploy-listing:
	serverless deploy function -f listingService --stage local --region us-west-2

deploy-payment:
	serverless deploy function -f paymentService --stage local --region us-west-2

deploy-delivery:
	serverless deploy function -f deliveryService --stage local --region us-west-2

deploy-order:
	serverless deploy function -f orderService --stage local --region us-west-2

deploy-notification:
	npx serverless deploy function -f notificationService --stage local --region us-west-2

deploy-all:
	 serverless deploy --stage local --region us-west-2;


update-db:
	@echo "$(MAGENTA)Starting local database...$(RESET)"
	npx supabase start;
	@echo "$(GREEN)Database locally running...$(RESET)"
	@echo "$(MAGENTA)Migrating local database schema...$(RESET)"
	npx drizzle-kit generate --config=drizzle.local.config.ts
	npx drizzle-kit migrate --config=drizzle.local.config.ts
