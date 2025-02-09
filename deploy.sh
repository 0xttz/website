#!/bin/bash

# Exit on error and print commands
set -e
set -x

echo "🚀 Starting deployment..."

# Print environment info
echo "Current directory: $(pwd)"
echo "Current user: $(whoami)"
which node || echo "node not found in PATH"
which npm || echo "npm not found in PATH"

# Try to find Node.js installation
POSSIBLE_PATHS=(
    "/opt/plesk/node/22/bin"
    "/opt/plesk/node/current/bin"
    "/usr/local/bin"
    "/opt/plesk/node/22.13.1/bin"
)

echo "Checking possible Node.js paths..."
for path in "${POSSIBLE_PATHS[@]}"; do
    echo "Checking $path..."
    if [ -f "$path/node" ]; then
        echo "Found node at $path"
        NODE_BIN=$path
        break
    fi
done

if [ -z "$NODE_BIN" ]; then
    echo "❌ Could not find Node.js installation"
    ls -la /opt/plesk/node || echo "Cannot access /opt/plesk/node"
    exit 1
fi

echo "📍 Found Node.js at: $NODE_BIN"
export PATH="$NODE_BIN:$PATH"

# Navigate to the application directory
echo "Navigating to application directory..."
cd /lennardkaye.me
echo "Current directory: $(pwd)"
ls -la

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# List contents after build
echo "Build directory contents:"
ls -la build || echo "Build directory not found"

# Ensure correct permissions
echo "🔒 Setting permissions..."
chmod -R 755 .

echo "✅ Deployment complete!" 