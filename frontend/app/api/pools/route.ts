import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// In-memory storage for pools (replace with database later)
interface Pool {
  id: string
  name: string
  description: string | null
  type: 'rotational' | 'target' | 'flexible'
  status: 'active' | 'completed' | 'paused'
  creator_address: string
  contract_address: string
  token_address: string
  members_count: number
  total_saved: number
  progress: number
  frequency?: string
  next_payout?: string
  created_at: string
  tx_hash: string | null
}

interface Member {
  id: string
  member_address: string
  contribution_amount: number
  status: 'pending' | 'paid' | 'late'
  joined_at: string
}

// File-based data store
const DATA_DIR = path.join(process.cwd(), '.data')
const POOLS_FILE = path.join(DATA_DIR, 'pools.json')
const ACTIVITIES_FILE = path.join(DATA_DIR, 'activities.json')
const MEMBERS_FILE = path.join(DATA_DIR, 'members.json')

// Helper to ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

// Helper to read from file
async function readDataFile<T>(filePath: string, defaultValue: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data) as T
  } catch (error) {
    console.log(`File ${filePath} doesn't exist yet, using default value`)
    return defaultValue
  }
}

// Helper to write to file
async function writeDataFile<T>(filePath: string, data: T): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

// Helper to generate pool IDs
function generatePoolId(): string {
  return `pool_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export async function GET(request: NextRequest) {
  try {
    await ensureDataDir()
    
    const searchParams = request.nextUrl.searchParams
    const poolId = searchParams.get('id')
    const creator = searchParams.get('creator')
    
    // Read data from files
    const poolsData = await readDataFile<Pool[]>(POOLS_FILE, [])
    const poolActivityData = await readDataFile<any[]>(ACTIVITIES_FILE, [])
    const poolMembersData = await readDataFile<{ [poolId: string]: Member[] }>(MEMBERS_FILE, {})
    
    console.log('GET /api/pools called with poolId:', poolId, 'creator:', creator, 'total pools:', poolsData.length)

    // Get single pool by ID
    if (poolId) {
      const pool = poolsData.find(p => p.id === poolId)
      if (!pool) {
        return NextResponse.json({ error: 'Pool not found' }, { status: 404 })
      }
      
      // Return pool with activities and members
      const activities = poolActivityData.filter(a => a.pool_id === poolId)
      const members = poolMembersData[poolId] || []
      return NextResponse.json({
        ...pool,
        pool_activity: activities,
        pool_members: members
      })
    }

    // Get pools by creator
    if (creator) {
      const pools = poolsData.filter(
        p => p.creator_address.toLowerCase() === creator.toLowerCase()
      )
      return NextResponse.json(pools)
    }

    // Return all pools (for development)
    return NextResponse.json(poolsData)
  } catch (error) {
    console.error('Error fetching pools:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureDataDir()
    
    const body = await request.json()
    console.log('POST /api/pools called with body:', body)
    
    const {
      name,
      description,
      poolType,
      creatorAddress,
      poolAddress,
      tokenAddress,
      members,
      contributionAmount,
      roundDuration,
      frequency,
      txHash
    } = body

    // Validation
    if (!name || !creatorAddress || !poolAddress) {
      console.log('Validation failed - missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Read existing data
    const poolsData = await readDataFile<Pool[]>(POOLS_FILE, [])
    const poolActivityData = await readDataFile<any[]>(ACTIVITIES_FILE, [])
    const poolMembersData = await readDataFile<{ [poolId: string]: Member[] }>(MEMBERS_FILE, {})

    // Create new pool
    const newPool: Pool = {
      id: generatePoolId(),
      name,
      description,
      type: poolType || 'rotational',
      status: 'active',
      creator_address: creatorAddress.toLowerCase(),
      contract_address: poolAddress,
      token_address: tokenAddress || process.env.NEXT_PUBLIC_TOKEN_ADDRESS || '',
      members_count: members?.length || 0,
      total_saved: 0,
      progress: 0,
      frequency: frequency || 'weekly',
      next_payout: new Date(Date.now() + (roundDuration || 604800) * 1000).toISOString(),
      created_at: new Date().toISOString(),
      tx_hash: txHash || null
    }

    poolsData.push(newPool)

    // Create member entries
    if (members && members.length > 0) {
      const memberEntries: Member[] = members.map((memberAddress: string, index: number) => ({
        id: `member_${newPool.id}_${index}`,
        member_address: memberAddress.toLowerCase(),
        contribution_amount: parseFloat(contributionAmount || '0'),
        status: 'pending' as const,
        joined_at: new Date().toISOString()
      }))
      poolMembersData[newPool.id] = memberEntries

      // Create initial activity entry
      const activity = {
        id: `activity_${Date.now()}`,
        pool_id: newPool.id,
        activity_type: 'created',
        user_address: creatorAddress,
        amount: null,
        description: `Pool created with ${members.length} members`,
        created_at: new Date().toISOString(),
        tx_hash: txHash
      }
      poolActivityData.push(activity)
    }

    // Write updated data back to files
    await writeDataFile(POOLS_FILE, poolsData)
    await writeDataFile(ACTIVITIES_FILE, poolActivityData)
    await writeDataFile(MEMBERS_FILE, poolMembersData)

    console.log('Created pool:', newPool)
    
    return NextResponse.json(newPool, { status: 201 })
  } catch (error) {
    console.error('Error creating pool:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

