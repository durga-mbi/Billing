#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

echo "⏳ Waiting for database to be ready..."
until nc -z mysql 3306; do
  echo "MySQL is still starting up... sleeping 2s"
  sleep 2
done

echo "✅ Database is up! Preparing Prisma..."

# Generate Prisma Client
npx prisma generate

# Synchronize schema
if [ "$NODE_ENV" = "production" ]; then
  echo "🚀 Running production migrations (deploy)..."
  npx prisma migrate deploy
else
  # db push is intelligent: it creates the DB if missing AND syncs without data reset
  echo "🛠️  Syncing schema (db push)..."
  echo "💡 Tip: If this is a fresh run, Prisma will automatically create the database now."
  npx prisma db push --accept-data-loss --skip-generate
fi

echo "🚀 Starting application in $NODE_ENV mode..."
exec "$@"
