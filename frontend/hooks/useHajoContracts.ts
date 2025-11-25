import { useEffect, useState } from 'react'

// Import ABIs as const
const FACTORY_ABI = [
  {
    name: 'createPool',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'participants', type: 'address[]' },
      { name: 'contributionAmount', type: 'uint256' },
      { name: 'epochDuration', type: 'uint256' },
      { name: 'treasuryFeeBps', type: 'uint256' },
      { name: 'callerFeeBps', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'address' }],
  },
] as const

const ROTATIONAL_ABI = [
  {
    name: 'contribute',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'executePayout',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
] as const

const ERC20_ABI = [
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const

const FACTORY_ADDRESS = (process.env.NEXT_PUBLIC_FACTORY_ADDRESS || '0x0') as `0x${string}`
const TOKEN_ADDRESS = (process.env.NEXT_PUBLIC_TOKEN_ADDRESS || '0x0') as `0x${string}`

// Helper to extract pool address from transaction receipt
async function extractPoolAddress(publicClient: any, txHash: `0x${string}`): Promise<string | null> {
  try {
    const receipt = await publicClient.getTransactionReceipt({ hash: txHash })
    
    if (!receipt || !receipt.logs || receipt.logs.length === 0) return null

    for (const log of receipt.logs) {
      try {
        // Check if this log is from the factory
        if (log.address.toLowerCase() !== FACTORY_ADDRESS.toLowerCase()) continue

        // The pool address is indexed and appears in topics[1]
        // Event signature is topics[0], pool address is topics[1], creator is topics[2]
        if (log.topics.length >= 2) {
          // Extract address from topic (remove 0x and take last 40 hex chars = 20 bytes)
          const poolAddr = '0x' + log.topics[1].slice(-40)
          if (poolAddr.match(/^0x[a-fA-F0-9]{40}$/)) {
            return poolAddr
          }
        }
      } catch (e) {
        continue
      }
    }
  } catch (err) {
    console.error('Failed to extract pool address:', err)
  }
  
  return null
}

// Approve token spending
export function useApproveToken(spender: string, amount: string) {
  // Placeholder - wallet connection removed
  return {
    approve: () => console.log('Wallet connection removed'),
    isLoading: false,
    isSuccess: false,
    hash: undefined,
  }
}

// ROTATIONAL POOL HOOKS
export function useRotationalDeposit(poolAddress: string) {
  // Placeholder - wallet connection removed
  return {
    deposit: () => console.log('Wallet connection removed'),
    isLoading: false,
    isSuccess: false,
    hash: undefined,
  }
}

// FACTORY HOOKS - UPDATED WITH POOL ADDRESS EXTRACTION
export function useCreateRotational(
  members: string[],
  depositAmount: string,
  frequency: string,
  treasuryFeeBps: number,
  relayerFeeBps: number
) {
  // Placeholder - wallet connection removed
  const [poolAddress, setPoolAddress] = useState<string | null>(null)

  return {
    create: () => console.log('Wallet connection removed'),
    isLoading: false,
    isSuccess: false,
    hash: undefined,
    poolAddress,
  }
}
