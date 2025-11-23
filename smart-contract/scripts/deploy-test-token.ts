import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const TT = await ethers.getContractFactory("TestToken");
  const tt = await TT.deploy();
  await tt.waitForDeployment();

  const addr = await tt.getAddress();
  console.log("TestToken deployed at:", addr);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
