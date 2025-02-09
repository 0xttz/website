#!/bin/bash

# Exit on error and print commands
set -e
set -x

echo "🚀 Starting deployment..."

# Print system info
echo "System information:"
uname -a || echo "uname not available"
ls -la /usr/bin/node* || echo "No node in /usr/bin"
ls -la /usr/local/bin/node* || echo "No node in /usr/local/bin"
ls -la /opt/plesk || echo "No plesk directory"

# Try to find Node.js installation
POSSIBLE_PATHS=(
    "/opt/plesk/node/22/bin"
    "/opt/plesk/node/current/bin"
    "/usr/local/bin"
    "/usr/bin"
    "/opt/plesk/node/22.13.1/bin"
    "/opt/plesk/nodejs/22/bin"
    "/opt/plesk/nodejs/current/bin"
    "/opt/nodejs/bin"
    "/usr/local/nodejs/bin"
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
    echo "Searching for node binary anywhere in /usr:"
    find /usr -name node 2>/dev/null || echo "No node found in /usr"
    echo "Searching for node binary anywhere in /opt:"
    find /opt -name node 2>/dev/null || echo "No node found in /opt"
    exit 1
fi

echo "📍 Found Node.js at: $NODE_BIN"
export PATH="$NODE_BIN:$PATH"

# Navigate to the correct application directory
cd /var/www/vhosts/tei.world/lennardkaye.me
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