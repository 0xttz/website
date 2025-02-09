#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment..."

# Try to find Node.js installation
POSSIBLE_PATHS=(
    "/opt/plesk/node/22/bin"
    "/opt/plesk/node/current/bin"
    "/usr/local/bin"
    "/opt/plesk/node/22.13.1/bin"
)

NODE_BIN=""
for path in "${POSSIBLE_PATHS[@]}"; do
    if [ -f "$path/node" ]; then
        NODE_BIN=$path
        break
    fi
done

if [ -z "$NODE_BIN" ]; then
    echo "❌ Could not find Node.js installation"
    exit 1
fi

echo "📍 Found Node.js at: $NODE_BIN"
export PATH="$NODE_BIN:$PATH"

# Navigate to the application directory
cd /lennardkaye.me

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Ensure correct permissions
echo "🔒 Setting permissions..."
chmod -R 755 .

echo "✅ Deployment complete!" 