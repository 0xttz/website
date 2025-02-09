#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment..."

# Use Node.js from Plesk (common paths)
NODE_BIN="/opt/plesk/node/22.13.1/bin"
export PATH="$NODE_BIN:$PATH"

# Navigate to the application directory
cd /lennardkaye.me

# Install dependencies
echo "📦 Installing dependencies..."
"$NODE_BIN/npm" install

# Build the application
echo "🔨 Building application..."
"$NODE_BIN/npm" run build

# Ensure correct permissions
echo "🔒 Setting permissions..."
chmod -R 755 .

echo "✅ Deployment complete!" 