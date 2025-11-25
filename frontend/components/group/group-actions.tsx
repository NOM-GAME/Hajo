"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowUpRight, Check, AlertCircle } from "lucide-react"
import {
  useApproveToken,
  useRotationalDeposit,
} from "@/hooks/useHajoContracts"

interface GroupActionsProps {
  groupId: string
  poolAddress: string
  poolType: "rotational"
  tokenAddress: string
}

export function GroupActions({
  groupId,
  poolAddress,
  poolType,
  tokenAddress,
}: GroupActionsProps) {
  const address = null // Wallet connection removed
  const [depositAmount, setDepositAmount] = useState("")
  const [isApproving, setIsApproving] = useState(false)
  const [approved, setApproved] = useState(false)
  const [error, setError] = useState("")

  // Approval hook
  const approveToken = useApproveToken(poolAddress, depositAmount)

  // Rotational pool hook
  const rotationalDeposit = useRotationalDeposit(poolAddress)

  // Handle approval + transaction flow
  useEffect(() => {
    if (approveToken.isSuccess) {
      setApproved(true)
      setIsApproving(false)
    }
  }, [approveToken.isSuccess])

  const handleApproveAndDeposit = async () => {
    setError("")
    if (!address) {
      setError("Please connect your wallet first")
      return
    }
    setIsApproving(true)
    if (approveToken.approve) {
      approveToken.approve()
    }
  }

  const handleDeposit = async () => {
    setError("")
    if (!depositAmount || !address) {
      setError("Please enter an amount")
      return
    }

    // If not approved yet, approve first
    if (!approved) {
      await handleApproveAndDeposit()
      return
    }

    // Call deposit function
    rotationalDeposit.deposit?.()
  }

  const isDepositLoading = rotationalDeposit.isLoading

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

      {error && (
        <div className="flex gap-2 p-3 rounded-lg bg-destructive/10 text-destructive mb-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* DEPOSIT SECTION */}
        <div className="space-y-3">
          <Label htmlFor="deposit">
            Deposit Fixed Amount (ETH)
          </Label>
          <Input
            id="deposit"
            type="number"
            step="0.01"
            placeholder="0.5"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            disabled={isDepositLoading || isApproving}
          />
          <p className="text-xs text-muted-foreground">
            Deposit the fixed pool amount. Same amount for all members.
          </p>
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleDeposit}
            disabled={isDepositLoading || isApproving || !depositAmount || !address}
          >
            {isDepositLoading || isApproving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {approved ? "Depositing..." : "Approving..."}
              </>
            ) : approved ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Deposit
              </>
            ) : (
              <>
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Deposit
              </>
            )}
          </Button>
        </div>

        {/* INFO SECTION */}
        <div className="border-t border-border pt-6 bg-blue-50 dark:bg-blue-950 p-3 rounded">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Rotational Pool:</strong> No direct withdrawals.
            Payouts are automatic when your turn comes. A relayer triggers
            payouts on schedule.
          </p>
        </div>

        {/* WALLET INFO */}
        <div className="border-t border-border pt-6">
          <p className="text-xs text-muted-foreground mb-2">Your wallet</p>
          <p className="text-sm font-mono bg-muted/30 p-2 rounded break-all">
            {address || "Not connected"}
          </p>
        </div>
      </div>
    </Card>
  )
}
