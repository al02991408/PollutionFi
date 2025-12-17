const hre = require("hardhat");

async function main() {
  console.log("Deploying contracts...");

  // 1. Deploy POLU Token
  const POLUToken = await hre.ethers.getContractFactory("POLUToken");
  const poluToken = await POLUToken.deploy();
  await poluToken.waitForDeployment();
  const poluTokenAddress = await poluToken.getAddress();
  console.log(`POLUToken deployed to: ${poluTokenAddress}`);

  // 2. Deploy PollutionRewards
  const PollutionRewards = await hre.ethers.getContractFactory("PollutionRewards");
  const pollutionRewards = await PollutionRewards.deploy(poluTokenAddress);
  await pollutionRewards.waitForDeployment();
  const pollutionRewardsAddress = await pollutionRewards.getAddress();
  console.log(`PollutionRewards deployed to: ${pollutionRewardsAddress}`);

  // 3. Authorize Rewards Contract as Minter
  console.log("Authorizing PollutionRewards as Minter...");
  const tx = await poluToken.addMinter(pollutionRewardsAddress);
  await tx.wait();
  console.log("PollutionRewards authorized as minter.");

  // 4. Verify (Optional log)
  console.log("Deployment complete!");
  console.log("-----------------------------------");
  console.log("POLU Token:", poluTokenAddress);
  console.log("Rewards Contract:", pollutionRewardsAddress);
  console.log("-----------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
