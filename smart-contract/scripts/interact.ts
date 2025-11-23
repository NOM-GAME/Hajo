import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

async function increaseTime(seconds: number) {
  await ethers.provider.send("evm_increaseTime", [seconds]);
  await ethers.provider.send("evm_mine", []);
}

const ERC20_MIN_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 value) returns (bool)",
];

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("Signer:", signer.address);

  const ACTION = process.env.ACTION || "contribute"; // contribute | execute
  const POOL_ADDRESS = process.env.POOL_ADDRESS;
  if (!POOL_ADDRESS) throw new Error("Set POOL_ADDRESS in .env");

  const pool = await ethers.getContractAt("HajoRotatingPool", POOL_ADDRESS);

  if (ACTION === "contribute") {
    const tokenAddress = process.env.TOKEN_ADDRESS;
    if (!tokenAddress) throw new Error("Set TOKEN_ADDRESS in .env for approval");

    const contributionAmount = BigInt(process.env.CONTRIBUTION_AMOUNT || "1000000000000000000");
    const erc20 = new ethers.Contract(tokenAddress, ERC20_MIN_ABI, signer);
    const allowance = (await erc20.allowance(signer.address, POOL_ADDRESS)) as bigint;
    if (allowance < contributionAmount) {
      const txA = await erc20.approve(POOL_ADDRESS, contributionAmount);
      await txA.wait();
      console.log("Approved", contributionAmount.toString());
    }

    const tx = await pool.contribute();
    const rcpt = await tx.wait();
    console.log("Contributed. Tx:", rcpt?.hash);
  } else if (ACTION === "execute") {
    // optionally bump time if running locally
    const bump = Number(process.env.BUMP_SECONDS || "0");
    if (bump > 0) {
      await increaseTime(bump);
    }
    const tx = await pool.executePayout();
    const rcpt = await tx.wait();
    console.log("Payout executed. Tx:", rcpt?.hash);
  } else {
    throw new Error(`Unknown ACTION: ${ACTION}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
