import { expect } from "chai";
import { ethers } from "hardhat";

describe("HajoRotatingPool", () => {
  async function deploySuite() {
    const [owner, a1, a2, a3] = await ethers.getSigners();

    const TestToken = await ethers.getContractFactory("TestToken");
    const token = await TestToken.deploy();
    await token.waitForDeployment();

    const Factory = await ethers.getContractFactory("HajoPoolFactory");
    const factory = await Factory.deploy(await token.getAddress(), owner.address);
    await factory.waitForDeployment();

    const participants = [a1.address, a2.address, a3.address];
    const contribution = ethers.parseEther("1");
    const epoch = 60n;
    const treasuryFeeBps = 500n; // 5%
    const callerFeeBps = 100n; // 1%

    const tx = await factory.createPool(
      participants,
      contribution,
      epoch,
      treasuryFeeBps,
      callerFeeBps
    );
    const rc = await tx.wait();

    let poolAddr = "";
    for (const l of rc!.logs) {
      try {
        const parsed = (factory as any).interface.parseLog(l);
        if (parsed.name === "PoolCreated") {
          poolAddr = parsed.args.pool;
          break;
        }
      } catch {}
    }
    if (!poolAddr) throw new Error("Pool address not found in logs");

    const pool = await ethers.getContractAt("HajoRotatingPool", poolAddr);

    // fund participants
    for (const s of [a1, a2, a3]) {
      await (await (token as any).connect(owner).mint(s.address, ethers.parseEther("10"))).wait();
      await (await (token as any).connect(s).approve(poolAddr, ethers.MaxUint256)).wait();
    }

    return { owner, a1, a2, a3, token, factory, pool, contribution };
  }

  it("accepts contributions and executes payout to round beneficiary with fees", async () => {
    const { a1, a2, a3, token, pool, contribution } = await deploySuite();

    // round 0 beneficiary = participants[0] (a1)
    await (await (pool as any).connect(a1).contribute()).wait();
    await (await (pool as any).connect(a2).contribute()).wait();
    await (await (pool as any).connect(a3).contribute()).wait();

    // increase time to enable payout
    await ethers.provider.send("evm_increaseTime", [60]);
    await ethers.provider.send("evm_mine", []);

    const balBefore = await token.balanceOf(a1.address);
    const tx = await (pool as any).connect(a2).executePayout(); // a2 triggers, should receive caller fee
    const rc = await tx.wait();

    // Parse event
    let payoutAmount = 0n;
    let callerCut = 0n;
    for (const l of rc!.logs) {
      try {
        const parsed = (pool as any).interface.parseLog(l);
        if (parsed.name === "PayoutExecuted") {
          payoutAmount = parsed.args.amount as bigint;
          callerCut = parsed.args.callerCut as bigint;
          break;
        }
      } catch {}
    }

    // expected totals: 3 contributions of 1 ether = 3e18
    // treasury 5% = 0.15e18, caller 1% = 0.03e18, payout = 2.82e18
    expect(payoutAmount).to.equal(ethers.parseEther("2.82"));

    const balAfter = await token.balanceOf(a1.address);
    expect(balAfter - balBefore).to.equal(payoutAmount);

    // caller (a2) should get caller fee
    const callerGain = await token.balanceOf(a2.address);
    // a2 started with 10, minus 1 contribution, plus 0.03 caller cut
    expect(callerGain).to.be.greaterThan(0n); // basic sanity
    expect(callerCut).to.equal(ethers.parseEther("0.03"));
  });
});
