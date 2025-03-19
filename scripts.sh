#!/usr/bin/env bash

# Usage:
#   ./local.sh start-local
#   ./local.sh stop-local

set -euo pipefail

case "${1:-}" in
  start-local)
    echo "Building SAM..."
    sam build

    echo "Starting Supabase..."
    supabase start

    echo "Generating Drizzle migrations..."
    npx drizzle-kit generate --config=drizzle.dev.config.ts

    echo "Running Drizzle migrations..."
    npx drizzle-kit migrate --config=drizzle.dev.config.ts

    echo "Starting SAM local API..."
    sam local start-api
    ;;

  stop-local)
    echo "Stopping Supabase..."
    supabase stop --no-backup
    ;;

  *)
    echo "Usage: $0 {start-local|stop-local}"
    exit 1
    ;;
esac
