#!/bin/sh
set -e

# Run migrations
node ace migration:run --force
node ace db:seed

# Execute the main command (CMD from Dockerfile)
exec "$@"