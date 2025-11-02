# 🌱 PollutionFi - DePIN Environmental Monitoring

**Real-time air quality monitoring with blockchain incentives**

[![Live Demo](https://img.shields.io/badge/Demo-Live-green)](http://localhost:3000)
[![Smart Contracts](https://img.shields.io/badge/Contracts-Deployed-blue)](./contracts)
[![Arbitrum Stylus](https://img.shields.io/badge/Arbitrum-Stylus-orange)](https://arbitrum.io/stylus)

## 🎯 What is PollutionFi?

PollutionFi is a DePIN (Decentralized Physical Infrastructure) platform that:
- 📊 **Monitors** air quality in real-time across Nuevo León
- 🏭 **Incentivizes** companies to reduce emissions with POLU tokens
- 🌍 **Transforms** environmental data into verifiable digital assets
- 🔗 **Uses blockchain** for transparent, tamper-proof reward distribution

## 🚀 Quick Start

### Frontend (Dashboard)
```bash
cd frontend
npm install
npm run dev
```
Visit: http://localhost:3000

### Smart Contracts
```bash
cd contracts
npm install
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

## 📁 Project Structure
```
PollutionFi/
├── frontend/                 # Next.js Dashboard
│   ├── src/app/             # Main application
│   ├── public/              # Static assets
│   └── package.json
├── contracts/               # Smart Contracts
│   ├── contracts/           # SOL files
│   ├── scripts/             # Deployment scripts
│   └── hardhat.config.js
└── README.md
```

## 🛠 Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Google Maps API
- **Blockchain**: Solidity, Hardhat, Ethers.js, OpenZeppelin
- **Token**: POLU (ERC-20) on Arbitrum/Localhost
- **Features**: Real-time heatmaps, Wallet integration, Reward system

## 💰 POLU Token Economy
- **Token**: POLU (PollutionFi Token)
- **Supply**: 1,000,000 initial
- **Use Case**: Reward companies for emission reductions
- **Blockchain**: Deployed on localhost (ready for Arbitrum Stylus)

## 🎥 Demo Features
1. **Real-time Air Quality Map** - Heatmaps showing PM2.5/PM10 levels
2. **Live Sensor Data** - 8 simulated sensors across Nuevo León
3. **POLU Token Rewards** - Demo blockchain integration
4. **Company Dashboard** - Track emissions and rewards
5. **Alert System** - Critical pollution notifications

## 🏗 Smart Contracts
- **POLUToken.sol**: ERC-20 token with minting capabilities
- **PollutionRewards.sol**: Manages company registration and reward distribution

**Deployed Addresses (localhost)**:
- POLUToken: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`
- PollutionRewards: `0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0`

## 🎯 Hackathon Tracks
This project qualifies for:
- 🏢 **Enterprise Solutions** - Government environmental monitoring
- 🌱 **Arbitrum Stylus** - Rust/WASM ready contracts
- 💸 **DeFi & Payments** - Token reward system
- 🔗 **Web2 Integrations** - Google Maps API

## 🚀 Future Roadmap
- [ ] Deploy to Arbitrum Stylus Testnet
- [ ] Integrate real IoT sensors
- [ ] Mobile app for citizens
- [ ] Expand to other Mexican cities
- [ ] POLU token staking and governance

## 👥 Team
Built for Blockchain Hackathon Mexico 2024

## 📄 License
MIT License - Feel free to build upon this project!

---

**💚 Making environmental responsibility profitable through blockchain**
