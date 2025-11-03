#!/bin/bash

# HODLBox Deployment Script
echo "🚀 HODLBox Contract Deployment"
echo "=============================="
echo ""

# Check if devnet is running
echo "Checking if devnet is running..."
if curl -s http://localhost:20443/v2/info > /dev/null 2>&1; then
    echo "✅ Devnet is running"
    echo ""
    echo "Deploying contract..."
    clarinet deployments apply --devnet
else
    echo "❌ Devnet is not running"
    echo ""
    echo "Starting devnet..."
    echo "⚠️  Please run this in a separate terminal:"
    echo "   clarinet devnet start"
    echo ""
    echo "Then run this script again, or run:"
    echo "   clarinet deployments apply --devnet"
fi

