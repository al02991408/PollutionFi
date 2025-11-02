Write-Host "🚀 Starting PollutionFi..." -ForegroundColor Green

Write-Host "📦 Starting Hardhat node..." -ForegroundColor Yellow
cd contracts
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npx hardhat node" -WindowStyle Minimized
Start-Sleep -Seconds 5

Write-Host "📝 Deploying contracts..." -ForegroundColor Yellow
npx hardhat run scripts/deploy.js --network localhost

Write-Host "🌐 Starting frontend..." -ForegroundColor Yellow
cd ../frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host "✅ All services started!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Hardhat: http://127.0.0.1:8545" -ForegroundColor Cyan

