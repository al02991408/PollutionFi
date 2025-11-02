// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./POLUToken.sol";

contract PollutionRewards is Ownable {
    POLUToken public immutable poluToken;
    
    struct Company {
        string name;
        uint256 totalRewards;
        uint256 lastRewardDate;
    }
    
    mapping(address => Company) public companies;
    address[] public companyAddresses;
    
    event CompanyRegistered(address indexed company, string name);
    event RewardsDistributed(address indexed company, uint256 amount, string reason);
    
    constructor(address _tokenAddress) Ownable(msg.sender) {
        poluToken = POLUToken(_tokenAddress);
    }
    
    function registerCompany(address companyAddr, string memory name) external onlyOwner {
        require(bytes(companies[companyAddr].name).length == 0, "Company already registered");
        require(bytes(name).length > 0, "Name cannot be empty");

        Company storage company = companies[companyAddr];
        company.name = name; 
        company.totalRewards = 0;
        company.lastRewardDate = block.timestamp;
        
        companyAddresses.push(companyAddr);
        emit CompanyRegistered(companyAddr, name);
    }
    
    function distributeRewards(
        address companyAddr,
        uint256 amount,
        string memory reason
    ) external onlyOwner {
        require(bytes(companies[companyAddr].name).length > 0, "Company not registered");
        require(amount > 0, "Amount must be greater than zero");
        
        poluToken.mint(companyAddr, amount, reason); 
        
        companies[companyAddr].totalRewards += amount;
        companies[companyAddr].lastRewardDate = block.timestamp;
        
        emit RewardsDistributed(companyAddr, amount, reason);
    }
    
    function getCompanyCount() external view returns (uint256) {
        return companyAddresses.length;
    }
}
