# Make sure these targets don't conflict with any files named the same.
.PHONY: help start-local stop-local sam-build supabase-start drizzle-generate drizzle-migrate

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
	sam build

supabase-start:
	@echo "Starting Supabase..."
	supabase start

drizzle-generate:
	@echo "Generating Drizzle migrations..."
	npx drizzle-kit generate --config=drizzle.dev.config.ts

drizzle-migrate:
	@echo "Running Drizzle migrations..."
	npx drizzle-kit migrate --config=drizzle.dev.config.ts

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
	sam local start-api

start-localstack: 
	# localstack auth set-token ls-KijAlAfo-9192-suje-4729-SoPiGAkU7da5;
	localstack start -d
	# awslocal sam local start-api

start-local-sam: sam-build supabase-start drizzle-generate drizzle-migrate start-sam 
start-local: start-localstack
stop-local:
	@echo "Stopping Supabase..."
	supabase stop --no-backup
