# PollutionFi - Environmental Monitoring & Rewards Platform

Real-time air quality monitoring with blockchain incentives for Nuevo León, Mexico.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MetaMask browser extension
- Google Maps API key (optional, for map visualization)

### Installation

1. **Install dependencies:**
```bash
# Contracts
cd contracts
npm install

# Frontend
cd ../frontend
npm install
```

2. **Start Hardhat node:**
```bash
cd contracts
npx hardhat node
```

3. **Deploy contracts:**
```bash
# In a new terminal
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```

Copy the contract addresses from the deployment output.

4. **Configure frontend:**
```bash
cd frontend
cp .env.example .env.local
```

Edit `.env.local` and add:
- Your Google Maps API key (if you have one)
- Contract addresses from deployment (or use default Hardhat addresses)

5. **Start frontend:**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000`

## 🔧 Setup MetaMask

1. Open MetaMask
2. Add network:
   - Network Name: Hardhat Local
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 31337
   - Currency Symbol: ETH

3. Import the deployer account:
   - Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
   - This is the owner account that can register and distribute rewards

## 📋 Features

- **Real-time Air Quality Monitoring** - Visual heatmap of pollution levels
- **Sensor Network Dashboard** - 8 sensors across Nuevo León
- **Blockchain Rewards** - Claim POLU tokens for environmental compliance
- **Company Registration** - Owner can register companies to receive rewards

## 🏗️ Smart Contracts

POLUToken
https://sepolia.scrollscan.com/address/0x3fe0D624E4C14549A3891Cc2369C8616846aD821#code

PollutionRewards
https://sepolia.scrollscan.com/address/0xFFDE945BF1e565b32f147756a02c21C6e262cB08#code 

### POLUToken (ERC-20)
- Total Supply: 1,000,000 POLU
- Minting: Authorized minters only
- Transfers: Standard ERC-20

### PollutionRewards
- Company registration (owner only)
- Reward distribution (owner only)
- Company tracking and history

## 🔑 Contract Functions

### Owner Functions
- `registerCompany(address, string)` - Register a company
- `distributeRewards(address, uint256, string)` - Distribute POLU tokens

### Public Functions
- `getCompanyCount()` - Get total registered companies
- `companies(address)` - Get company details

## 🌐 Default Contract Addresses (Hardhat)

- POLUToken: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`
- PollutionRewards: `0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0`
- Owner: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`

**Note:** These addresses are deterministic for Hardhat. If you redeploy, check the deployment output for actual addresses.

## 🐛 Troubleshooting

### "Circuit breaker is open" error
- Make sure Hardhat node is running
- Redeploy contracts: `npx hardhat run scripts/deploy.js --network localhost`
- Verify you're using the owner account in MetaMask

### Wallet won't connect
- Ensure MetaMask is installed
- Check network is set to Hardhat Local (Chain ID 31337)
- Restart Hardhat node if needed

### Contracts not found
- Verify contract addresses in `.env.local`
- Check deployment output for correct addresses
- Ensure contracts were deployed successfully

## 📁 Project Structure

```
PollutionFi/
├── contracts/          # Smart contracts
│   ├── contracts/      # Solidity files
│   └── scripts/        # Deployment scripts
├── frontend/           # Next.js application
│   ├── src/app/        # Application pages
│   └── providers/      # React providers
└── README.md
```

## 📝 License

MIT License
