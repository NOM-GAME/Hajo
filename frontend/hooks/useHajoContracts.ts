import { useState } from 'react'
import { useWriteContract, usePublicClient, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'

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
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash })
    
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
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined)
  const { writeContractAsync, isPending } = useWriteContract()
  const {
    isLoading: isConfirming,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  })

  const approve = async () => {
    try {
      if (!spender || !amount) return

      const value = parseEther(amount as `${number}`)

      const txHash = await writeContractAsync({
        address: TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [spender as `0x${string}`, value],
      })

      setHash(txHash as `0x${string}`)
    } catch (err) {
      console.error('Approve token failed:', err)
    }
  }

  return {
    approve,
    isLoading: isPending || isConfirming,
    isSuccess,
    hash,
  }
}

// ROTATIONAL POOL HOOKS
export function useRotationalDeposit(poolAddress: string) {
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined)
  const { writeContractAsync, isPending } = useWriteContract()
  const {
    isLoading: isConfirming,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  })

  const deposit = async () => {
    try {
      if (!poolAddress) return

      const txHash = await writeContractAsync({
        address: poolAddress as `0x${string}`,
        abi: ROTATIONAL_ABI,
        functionName: 'contribute',
        args: [],
      })

      setHash(txHash as `0x${string}`)
    } catch (err) {
      console.error('Rotational deposit failed:', err)
    }
  }

  return {
    deposit,
    isLoading: isPending || isConfirming,
    isSuccess,
    hash,
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
  const [poolAddress, setPoolAddress] = useState<string | null>(null)
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const publicClient = usePublicClient()
  const { writeContractAsync } = useWriteContract()

  const create = async () => {
    try {
      if (!FACTORY_ADDRESS || members.length === 0 || !depositAmount) return

      setIsLoading(true)
      setIsSuccess(false)

      const amountWei = parseEther(depositAmount as `${number}`)

      const frequencyMap: Record<string, number> = {
        daily: 86400,
        weekly: 604800,
        biweekly: 1209600,
        monthly: 2592000,
      }

      const epochDurationSeconds = frequencyMap[frequency] ?? frequencyMap.weekly

      const txHash = await writeContractAsync({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: 'createPool',
        args: [members as `0x${string}`[], amountWei, BigInt(epochDurationSeconds), BigInt(treasuryFeeBps), BigInt(relayerFeeBps)],
      })

      setHash(txHash as `0x${string}`)

      if (publicClient) {
        const poolAddr = await extractPoolAddress(publicClient, txHash as `0x${string}`)
        setPoolAddress(poolAddr)
      }

      setIsSuccess(true)
    } catch (err) {
      console.error('Create rotational pool failed:', err)
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    create,
    isLoading,
    isSuccess,
    hash,
    poolAddress,
  }
}
