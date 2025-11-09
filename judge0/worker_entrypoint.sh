#!/bin/bash
set -e

echo "Waiting for Redis to be ready..."
until nc -z "$REDIS_HOST" "$REDIS_PORT"; do
  echo "Redis not yet available..."
  sleep 2
done

echo "Redis is up — starting Sidekiq worker..."
echo "Detected Redis env: host=$REDIS_HOST port=$REDIS_PORT password=$REDIS_PASSWORD"

REDIS_URL="redis://:$REDIS_PASSWORD@$REDIS_HOST:$REDIS_PORT/0"
echo "Using REDIS_URL=$REDIS_URL"

# Verify Redis connectivity
if redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" -a "$REDIS_PASSWORD" ping | grep -q PONG; then
  echo "✅ Redis connection test successful!"
else
  echo "❌ Redis connection failed!"
  exit 1
fi

SIDEKIQ_BIN=$(command -v sidekiq || echo "/opt/.gem/bin/sidekiq")
echo "Found Sidekiq at: $SIDEKIQ_BIN"

# Locate Judge0 worker file (now directly under /api/lib)
if [ -f /api/lib/worker.rb ]; then
  echo "Found Judge0 worker at /api/lib/worker.rb"
  exec env REDIS_URL="$REDIS_URL" "$SIDEKIQ_BIN" -r /api/lib/worker.rb -C /config/sidekiq.yml
else
  echo "❌ Could not find /api/lib/worker.rb"
  ls -R /api/lib || true
  exit 1
fi
