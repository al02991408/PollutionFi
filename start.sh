#!/bin/bash

echo "🚀 Starting PollutionFi..."

echo "📦 Starting Hardhat node..."
cd contracts
npx hardhat node &
HARDHAT_PID=$!
sleep 5

echo "📝 Deploying contracts..."
npx hardhat run scripts/deploy.js --network localhost

echo "🌐 Starting frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "✅ Started!"
echo "Hardhat PID: $HARDHAT_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop all services"

wait

