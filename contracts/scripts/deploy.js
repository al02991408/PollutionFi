async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  const POLUToken = await ethers.getContractFactory("POLUToken");
  const poluToken = await POLUToken.deploy();
  await poluToken.waitForDeployment();
  const poluTokenAddress = await poluToken.getAddress();
  
  console.log("POLUToken deployed to:", poluTokenAddress);

  const PollutionRewards = await ethers.getContractFactory("PollutionRewards");
  const pollutionRewards = await PollutionRewards.deploy(poluTokenAddress);
  await pollutionRewards.waitForDeployment();
  const pollutionRewardsAddress = await pollutionRewards.getAddress();
  
  console.log("PollutionRewards deployed to:", pollutionRewardsAddress);

  await poluToken.addMinter(pollutionRewardsAddress);
  console.log("PollutionRewards authorized as minter");

  console.log("\n=== DEPLOYMENT COMPLETE ===");
  console.log("POLUToken:", poluTokenAddress);
  console.log("PollutionRewards:", pollutionRewardsAddress);
  console.log("Owner:", deployer.address);
  console.log("\nAdd these to your .env file:");
  console.log(`NEXT_PUBLIC_POLU_TOKEN_ADDRESS=${poluTokenAddress}`);
  console.log(`NEXT_PUBLIC_REWARDS_CONTRACT_ADDRESS=${pollutionRewardsAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
