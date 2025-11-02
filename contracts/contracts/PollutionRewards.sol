// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./POLUToken.sol";

contract PollutionRewards is Ownable {
    POLUToken public poluToken;
    
    struct Company {
        string name;
        uint256 totalRewards;
        uint256 lastRewardDate;
        bool registered;
    }
    
    mapping(address => Company) public companies;
    address[] public companyAddresses;
    
    event CompanyRegistered(address indexed company, string name);
    event RewardsDistributed(address indexed company, uint256 amount, string reason);
    
    constructor(address _tokenAddress) Ownable(msg.sender) {
        poluToken = POLUToken(_tokenAddress);
    }
    
    function registerCompany(address companyAddr, string memory name) external onlyOwner {
        companies[companyAddr] = Company(name, 0, block.timestamp, true);
        companyAddresses.push(companyAddr);
        poluToken.addMinter(address(this));
        
        emit CompanyRegistered(companyAddr, name);
    }
    
    function distributeRewards(
        address companyAddr,
        uint256 amount,
        string memory reason
    ) external onlyOwner {
        require(companies[companyAddr].registered, "Company not registered");
        
        poluToken.mint(companyAddr, amount, reason);
        companies[companyAddr].totalRewards += amount;
        companies[companyAddr].lastRewardDate = block.timestamp;
        
        emit RewardsDistributed(companyAddr, amount, reason);
    }
    
    function getCompanyCount() external view returns (uint256) {
        return companyAddresses.length;
    }
}