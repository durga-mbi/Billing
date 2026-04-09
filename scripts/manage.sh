#!/bin/bash

MODE=$1

# Ensure scripts are executable (Host-side fix for Docker volume overwrites)
chmod +x scripts/manage.sh
chmod +x server/scripts/entrypoint.sh

# Check for .env file
if [ ! -f .env ]; then
    echo "⚠️  No .env file found in the root directory."
    if [ -f .env.example ]; then
        echo -n "❓ Would you like to copy .env.example to .env? (y/n): "
        read response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            cp .env.example .env
            echo "✅ Created .env from .env.example"
        else
            echo "❌ Exiting..."
            exit 1
        fi
    else
        echo "❌ Error: .env.example not found. Please create a .env file manually."
        exit 1
    fi
fi

# Run Docker Compose based on mode
if [ "$MODE" == "prod" ]; then
    echo "🚀 Starting Production Environment (Detached)..."
    docker compose up -d --build
else
    echo "🛠️  Starting Development Environment (Watch Mode)..."
    # We use --build to ensure any permission changes in the Dockerfile layer are caught, 
    # though the host chmod +x is the real fix for the volume.
    docker compose up --build
fi
