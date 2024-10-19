#!/bin/sh
set -e

# Run migrations
node ace migration:run

# Execute the main command (CMD from Dockerfile)
exec "$@"