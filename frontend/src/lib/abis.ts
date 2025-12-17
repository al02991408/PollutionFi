export const POLU_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [{ "name": "account", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "name": "to", "type": "address" },
            { "name": "amount", "type": "uint256" },
            { "name": "reason", "type": "string" }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "name": "minter", "type": "address" }],
        "name": "addMinter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const;

export const REWARDS_ABI = [
    {
        "inputs": [{ "name": "_tokenAddress", "type": "address" }],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            { "name": "companyAddr", "type": "address" },
            { "name": "amount", "type": "uint256" },
            { "name": "reason", "type": "string" }
        ],
        "name": "distributeRewards",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "name": "companyAddr", "type": "address" },
            { "name": "name", "type": "string" }
        ],
        "name": "registerCompany",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "name": "", "type": "address" }],
        "name": "companies",
        "outputs": [
            { "name": "name", "type": "string" },
            { "name": "totalRewards", "type": "uint256" },
            { "name": "lastRewardDate", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const;

// Addresses (Update after deployment)
export const POLU_ADDRESS = '0x0000000000000000000000000000000000000000';
export const REWARDS_ADDRESS = '0x0000000000000000000000000000000000000000';
