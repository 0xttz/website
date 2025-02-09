#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Ensure the port is set
export PORT=3000

# Start/Restart the application with PM2
echo "🔄 Starting application with PM2..."
pm2 delete lennardkaye.me 2>/dev/null || true
pm2 start build/index.js --name "lennardkaye.me" --env production

# Save PM2 process list
echo "💾 Saving PM2 process list..."
pm2 save

echo "✅ Deployment complete!" 