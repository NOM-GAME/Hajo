// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HajoRotatingPool is Ownable(msg.sender) {
    address[] public participants;
    mapping(address => bool) public hasContributed;
    uint256 public participantCount;
    uint256 public contributionAmount;
    uint256 public roundIndex;
    uint256 public treasuryFeeBps;
    uint256 public callerFeeBps;
    address public treasuryWallet;
    uint256 public nextPayoutAt;
    uint256 public epochDuration;
    bool public isActive;
    IERC20 public immutable asset;

    event ContributionMade(address indexed contributor, uint256 amount);
    event PayoutExecuted(address indexed beneficiary, uint256 amount, uint256 treasuryCut, uint256 callerCut);
    event PenaltyApplied(address indexed offender, uint256 penalty);
    event CycleCompleted();

    uint256 private constant BPS = 10000;

    constructor(
        address _token,
        address[] memory _participants,
        uint256 _contributionAmount,
        uint256 _epochDuration,
        uint256 _treasuryFeeBps,
        uint256 _callerFeeBps,
        address _treasuryWallet
    ) {
        require(_token != address(0), "token 0");
        require(_participants.length >= 2, "need >=2 members");
        require(_contributionAmount > 0, "deposit 0");
        require(_epochDuration > 0, "roundDuration 0");
        require(_treasuryWallet != address(0), "treasury 0");

        asset = IERC20(_token);
        participants = _participants;
        participantCount = _participants.length;
        contributionAmount = _contributionAmount;
        epochDuration = _epochDuration;
        treasuryFeeBps = _treasuryFeeBps;
        callerFeeBps = _callerFeeBps;
        treasuryWallet = _treasuryWallet;

        roundIndex = 0;
        nextPayoutAt = block.timestamp + epochDuration;
        isActive = true;
    }

    function contribute() external {
        require(isActive, "pool inactive");
        require(isParticipant(msg.sender), "not member");
        require(!hasContributed[msg.sender], "already deposited");

        bool ok = asset.transferFrom(msg.sender, address(this), contributionAmount);
        require(ok, "transferFrom failed");

        hasContributed[msg.sender] = true;
        emit ContributionMade(msg.sender, contributionAmount);
    }

    function executePayout() external {
        require(isActive, "pool inactive");
        require(block.timestamp >= nextPayoutAt, "too early");

        uint256 depositCount = 0;
        for (uint256 i = 0; i < participantCount; i++) {
            if (hasContributed[participants[i]]) depositCount++;
        }

        if (depositCount < participantCount) {
            uint256 penalty = (contributionAmount * 10) / 100;
            for (uint256 i = 0; i < participantCount; i++) {
                address candidate = participants[i];
                if (!hasContributed[candidate]) {
                    try IERC20(asset).transferFrom(candidate, address(this), penalty) returns (bool success) {
                        if (success) {
                            uint256 toTreasury = penalty / 2;
                            if (toTreasury > 0) {
                                IERC20(asset).transfer(treasuryWallet, toTreasury);
                            }
                            emit PenaltyApplied(candidate, penalty);
                        }
                    } catch {}
                }
            }

            depositCount = 0;
            for (uint256 i = 0; i < participantCount; i++) {
                if (hasContributed[participants[i]]) depositCount++;
            }
            require(depositCount > 0, "no deposits");
        }

        uint256 totalCollected = contributionAmount * depositCount;
        uint256 treasuryCut = (totalCollected * treasuryFeeBps) / BPS;
        uint256 callerCut = (totalCollected * callerFeeBps) / BPS;
        uint256 payoutAmount = totalCollected - treasuryCut - callerCut;

        address beneficiary = participants[roundIndex];

        if (treasuryCut > 0) {
            bool tOk = asset.transfer(treasuryWallet, treasuryCut);
            require(tOk, "treasury transfer failed");
        }

        if (callerCut > 0) {
            bool rOk = asset.transfer(msg.sender, callerCut);
            require(rOk, "caller transfer failed");
        }

        bool pOk = asset.transfer(beneficiary, payoutAmount);
        require(pOk, "payout failed");

        emit PayoutExecuted(beneficiary, payoutAmount, treasuryCut, callerCut);

        for (uint256 i = 0; i < participantCount; i++) {
            hasContributed[participants[i]] = false;
        }

        roundIndex = (roundIndex + 1);
        if (roundIndex >= participantCount) {
            isActive = false;
            emit CycleCompleted();
        } else {
            nextPayoutAt = block.timestamp + epochDuration;
        }
    }

    function isParticipant(address who) public view returns (bool) {
        for (uint256 i = 0; i < participantCount; i++) {
            if (participants[i] == who) return true;
        }
        return false;
    }

    function getParticipants() external view returns (address[] memory) {
        return participants;
    }
}

/* ========== FACTORY ========== */
contract HajoPoolFactory {
    address public immutable token;
    address public treasury;
    address[] public allPools;
    address public owner;

    event PoolCreated(address indexed pool, address indexed creator);

    constructor(address _token, address _treasury) {
        require(_token != address(0), "token 0");
        require(_treasury != address(0), "treasury 0");
        token = _token;
        treasury = _treasury;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    function createPool(
        address[] calldata participants,
        uint256 contributionAmount,
        uint256 epochDuration,
        uint256 treasuryFeeBps,
        uint256 callerFeeBps
    ) external returns (address) {
        HajoRotatingPool pool = new HajoRotatingPool(
            token, participants, contributionAmount, epochDuration, treasuryFeeBps, callerFeeBps, treasury
        );
        pool.transferOwnership(msg.sender);
        allPools.push(address(pool));
        emit PoolCreated(address(pool), msg.sender);
        return address(pool);
    }

    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "treasury 0");
        treasury = _treasury;
    }
}
