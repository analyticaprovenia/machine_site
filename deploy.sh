#!/bin/bash
# Run on the EC2 instance to build and (re)deploy the site.
# Usage: bash deploy.sh

set -e

echo "==> Pulling latest code"
git pull

echo "==> Building and starting container"
docker compose down --remove-orphans
docker compose build --no-cache
docker compose up -d

echo "==> Done — site is live on port 80"
docker compose ps
