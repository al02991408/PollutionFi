// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract POLUToken is ERC20, Ownable {
    mapping(address => bool) public authorizedMinters;
    
    event TokensMinted(address indexed to, uint256 amount, string reason);
    
    constructor() ERC20("PollutionFi Token", "POLU") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10**18); // 1 millón POLU
    }
    
    function mint(address to, uint256 amount, string memory reason) external onlyAuthorized {
        _mint(to, amount);
        emit TokensMinted(to, amount, reason);
    }
    
    function addMinter(address minter) external onlyOwner {
        authorizedMinters[minter] = true;
    }
    
    modifier onlyAuthorized() {
        require(authorizedMinters[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }
}