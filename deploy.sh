#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment..."

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