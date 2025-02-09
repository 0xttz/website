#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment..."

# Set up Node.js environment
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

# Use Node.js from Plesk
export PATH="/opt/plesk/node/22/bin:$PATH"

echo "📍 Using Node.js $(node --version)"
echo "📍 Using npm $(npm --version)"

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