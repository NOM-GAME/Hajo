import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  let TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
  const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS || deployer.address;

  // Optionally deploy a TestToken if not provided
  if (!TOKEN_ADDRESS && process.env.AUTO_DEPLOY_TEST_TOKEN === "true") {
    console.log("AUTO_DEPLOY_TEST_TOKEN enabled. Deploying TestToken...");
    const TT = await ethers.getContractFactory("TestToken");
    const tt = await TT.deploy();
    await tt.waitForDeployment();
    TOKEN_ADDRESS = await tt.getAddress();
    console.log("TestToken deployed:", TOKEN_ADDRESS);
  }

  if (!TOKEN_ADDRESS) throw new Error("Set TOKEN_ADDRESS in .env to an ERC20, or set AUTO_DEPLOY_TEST_TOKEN=true");

  // Validate addresses to avoid name resolution errors
  const isAddr = (v: string | undefined) => !!v && ethers.isAddress(v);
  if (!isAddr(TOKEN_ADDRESS)) {
    throw new Error(`Invalid TOKEN_ADDRESS (must be 0x EVM address): ${TOKEN_ADDRESS}`);
  }
  if (!isAddr(TREASURY_ADDRESS)) {
    throw new Error(`Invalid TREASURY_ADDRESS (must be 0x EVM address). Omit it to default to deployer.`);
  }

  const Factory = await ethers.getContractFactory("HajoPoolFactory");
  const factory = await Factory.deploy(TOKEN_ADDRESS, TREASURY_ADDRESS);
  await factory.waitForDeployment();
  console.log("HajoPoolFactory:", await factory.getAddress());

  // Optional: create an initial pool if env provided
  const participantsEnv = process.env.PARTICIPANTS; // comma-separated
  if (participantsEnv) {
    const participants = participantsEnv.split(",").map((s: string) => s.trim());
    if (participants.length < 2) {
      throw new Error("PARTICIPANTS must include at least 2 comma-separated 0x addresses");
    }
    for (const p of participants) {
      if (!ethers.isAddress(p)) {
        throw new Error(`Invalid participant address (must be 0x): ${p}`);
      }
    }
    const contributionAmount = BigInt(process.env.CONTRIBUTION_AMOUNT || "1000000000000000000"); // 1 token
    const epochDuration = BigInt(process.env.EPOCH_DURATION || "60"); // 60s
    const treasuryFeeBps = BigInt(process.env.TREASURY_FEE_BPS || "0");
    const callerFeeBps = BigInt(process.env.CALLER_FEE_BPS || "0");

    const tx = await factory.createPool(
      participants,
      contributionAmount,
      epochDuration,
      treasuryFeeBps,
      callerFeeBps
    );
    const receipt = await tx.wait();

    const logs = (receipt?.logs || []) as any[];
    let createdPool: string | undefined;
    for (const l of logs) {
      try {
        const parsed = (factory as any).interface.parseLog(l);
        if (parsed?.name === "PoolCreated") {
          createdPool = parsed?.args?.pool as string;
          break;
        }
      } catch {}
    }

    if (createdPool) {
      console.log("PoolCreated:", createdPool);
    } else {
      console.log("Pool created. Check tx:", receipt?.hash);
    }
  }
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
