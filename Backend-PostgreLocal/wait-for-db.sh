#!/bin/sh
set -e

HOST="$1"
PORT=5432

echo "🔍 Waiting for PostgreSQL at ${HOST}:${PORT}..."

# Wait until the database port is open
while ! nc -z "$HOST" "$PORT"; do
  echo "⏳ Still waiting for database..."
  sleep 1
done

echo "✅ Database is ready! Running migrations..."
