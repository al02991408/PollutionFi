async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying POLU contracts with account:", deployer.address);

  // Deploy POLU Token
  const POLUToken = await ethers.getContractFactory("POLUToken");
  const poluToken = await POLUToken.deploy();
  await poluToken.waitForDeployment();
  const poluTokenAddress = await poluToken.getAddress();
  
  console.log("POLUToken deployed to:", poluTokenAddress);

  // Deploy Reward System
  const PollutionRewards = await ethers.getContractFactory("PollutionRewards");
  const pollutionRewards = await PollutionRewards.deploy(poluTokenAddress);
  await pollutionRewards.waitForDeployment();
  const pollutionRewardsAddress = await pollutionRewards.getAddress();
  
  console.log("PollutionRewards deployed to:", pollutionRewardsAddress);

  // Autorizar RewardSystem para mint tokens
  await poluToken.addMinter(pollutionRewardsAddress);
  console.log("PollutionRewards authorized as minter");

  console.log("\n=== POLU DEPLOYMENT COMPLETE ===");
  console.log("POLUToken:", poluTokenAddress);
  console.log("PollutionRewards:", pollutionRewardsAddress);
  console.log("\nYou can now use these addresses in your frontend!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});